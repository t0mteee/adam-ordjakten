/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Huvudkontroller för Göteborgs läs- & spårvagnsspel
   ═══════════════════════════════════════════════════════════════ */

import {
  TRAM_LINES, ALLA_STOPP, STARTPLATSER, STOP_PHOTOS, TRAM_PHOTOS,
  VAGNTYPER, ALLA_VAGNKORT_NR,
  linjeAv, avgangarFran, arSparrad, tipsForMal, valjResmal, valjSparr,
  vagnTypAv, stegaVagnNummer, vagnkortFor, vagnFoto, avstand
} from "./gbg-data.mjs";
import {
  NIVAAER, ORDBANK, formatOrd, hittaOrd
} from "./ord-data.mjs";
import {
  CHARACTERS, TILLBEHOR, VAGN_PYNT, LEKSAKER, MARKEN,
  INK, escapeHtml, ljusFarg, charSVG, kompisSVG, coinSVG,
  tramSVG, vagnSidoSVG, ledSkyltHTML, stoppSkyltHTML, ordBildHTML, sceneSVG
} from "./konst.mjs";
import {
  byggRunda, forklaraFel, uppdateraNiva, pick
} from "./uppgifter.mjs";
import {
  natkartaSVG, rullaVagnPaKarta, vaggKartaSVG
} from "./karta.mjs";
import {
  SFX, KLIPP, klippProva, vackLjud, prata, stoppaTal,
  sagBokstav, ljudaOrd, svenskaRoster
} from "./ljud.mjs";
import {
  SPELVERSION, laddaData, sparaData, nySpelare,
  statSvar, statTid, laggKluring, kluringKlarad, kollaMarken, valideraKopia, idagStr
} from "./lagring.mjs";

/* ── Globalt tillstånd ──────────────────────────────────────────────── */
let DATA = laddaData();
let aktivSkarm = "welcome";
let fotonMiss = 0;
let visaTecknadScen = false;
let sistaBeloning = null;
let rullarNu = false;

/* Pågående omgång (5 uppgifter för en hållplatssträcka) */
let runda = null;

const $ = (sel) => document.querySelector(sel);
const topBarEl = $("#top-bar");
const sheetBackdrop = $("#sheet-backdrop");
const sheetEl = $("#sheet");

const P = () => DATA.players.find(x => x.id === DATA.activeId) || null;
const spara = () => sparaData(DATA);
const stilAv = (p) => (p && p.settings && p.settings.bokstavsStil) || "versaler";

function synkaLjudInstallningar(){
  const p = P();
  SFX.aktiv = !p || p.settings.sound !== false;
  document.body.classList.toggle("minska-rorelse", !!(p && p.settings.minskaRorelse));
}

function aktiveraForstaTryck(){
  const p = P();
  vackLjud(!!(p && p.settings.spelaPaTyst));
}

/* ── Konfetti ────────────────────────────────────────────────────────── */
function konfetti(){
  const p = P();
  if(p && p.settings.minskaRorelse) return;
  const canvas = $("#confetti");
  if(!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const farger = ["#FFC42E", "#57C96B", "#62CDF2", "#FF6B6B", "#FF8AD0", "#9061F9"];
  const bitar = Array.from({ length: 72 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 140,
    vx: (Math.random() - 0.5) * 4,
    vy: 3 + Math.random() * 5,
    r: 5 + Math.random() * 6,
    a: Math.random() * Math.PI * 2,
    va: (Math.random() - 0.5) * 0.25,
    col: pick(farger)
  }));
  let frame = 0;
  function tick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let kvar = 0;
    for(const b of bitar){
      b.x += b.vx; b.y += b.vy; b.a += b.va;
      if(b.y < canvas.height + 30) kvar++;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.a);
      ctx.fillStyle = b.col;
      ctx.fillRect(-b.r / 2, -b.r / 2, b.r, b.r * 0.65);
      ctx.restore();
    }
    if(kvar > 0 && frame++ < 140) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(tick);
}

/* ── Skärm- & modalhantering ─────────────────────────────────────────── */
function visaSkarm(namn){
  stoppaTal();
  aktivSkarm = namn;
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("is-active"));
  const el = $(`#screen-${namn}`);
  if(el) el.classList.add("is-active");
  topBarEl.style.display = (namn === "welcome" || namn === "game") ? "none" : "grid";
  if(namn !== "welcome") renderTopBar();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function oppnaSheet(html){
  sheetEl.innerHTML = html;
  sheetBackdrop.classList.add("open");
  sheetBackdrop.setAttribute("aria-hidden", "false");
}

function stangSheet(){
  sheetBackdrop.classList.remove("open");
  sheetBackdrop.setAttribute("aria-hidden", "true");
  sheetEl.innerHTML = "";
}

sheetBackdrop.addEventListener("click", (e) => {
  if(e.target === sheetBackdrop) stangSheet();
});

/* ── Topprad ─────────────────────────────────────────────────────────── */
function renderTopBar(){
  const p = P();
  if(!p) return;
  const bes = (p.visitedStops || []).length;
  topBarEl.innerHTML = `
    <div class="who">
      <button class="who-art" id="tb-kompis" type="button" aria-label="Hej ${escapeHtml(p.name)}">${kompisSVG(p, "idle")}</button>
      <div class="who-txt">
        <button class="who-name" id="tb-namn" type="button">${escapeHtml(p.name)}</button>
        <button class="who-sub" id="tb-mynt" type="button" aria-label="Öppna Skattkistan">${coinSVG} <span>${p.coins}</span></button>
      </div>
    </div>
    <button class="pill-btn" id="tb-resor" type="button" aria-label="Besökta hållplatser">🚋 ${bes}/${ALLA_STOPP.length}</button>
    <button class="icon-btn" id="tb-gear" type="button" aria-label="Inställningar">⚙️</button>
  `;
  $("#tb-kompis").onclick = () => { aktiveraForstaTryck(); SFX.klick(); sagKompisReplik(); };
  $("#tb-namn").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openMinaOrdOchMarken(); };
  $("#tb-mynt").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openSkattkistan(); };
  $("#tb-resor").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openMinaResor(); };
  $("#tb-gear").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openInstallningar(); };
}

function sagKompisReplik(){
  const p = P();
  if(!p) return;
  const repliker = [
    `Hej ${p.name}! Ska vi åka spårvagn i Göteborg?`,
    `M34 är 45 meter lång — längst i hela stan!`,
    `Du har läst ${(p.klaradeOrd || []).length} olika ord. Heja ${p.name}!`,
    `Tut tut! Här kommer spårvagnen!`,
    `M32 heter Sirio, precis som stjärnan Sirius!`,
    `Vilken hållplats ska vi till nästa gång?`
  ];
  prata(pick(repliker), { settings: p.settings, namn: p.name });
}

/* ═══════════════════════════════════════════════════════════════
   1. VÄLKOMST & SPELARVAL
   ═══════════════════════════════════════════════════════════════ */
let nyValdChar = "bloppy";

function renderWelcome(){
  visaSkarm("welcome");
  const el = $("#screen-welcome");
  const harSpelare = DATA.players.length > 0;
  el.innerHTML = `
    <div class="brand">
      <h1>Ordjakten</h1>
      <div class="tagline">🚋 Göteborgs spårvagnar · Bokstäver &amp; ord</div>
    </div>
    ${harSpelare ? `
      <div class="panel">
        <div class="panel-title"><span class="step">1</span> Vem ska åka idag?</div>
        <div class="profile-list">
          ${DATA.players.map(pl => `
            <button class="profile-card" data-pick-player="${escapeHtml(pl.id)}" type="button">
              ${kompisSVG(pl, "happy")}
              <div>
                <div class="p-name">${escapeHtml(pl.name)}</div>
                <div class="p-meta">🚋 ${(pl.visitedStops || []).length} hållplatser · 📖 ${(pl.klaradeOrd || []).length} ord · 🪙 ${pl.coins}</div>
              </div>
              <span class="p-go" aria-hidden="true">▶</span>
            </button>
          `).join("")}
        </div>
      </div>
    ` : ""}
    <div class="panel">
      <div class="panel-title"><span class="step">${harSpelare ? "2" : "1"}</span> ${harSpelare ? "Ny förare" : "Skapa din förare"}</div>
      <input id="ny-namn" class="name-field" type="text" maxlength="20" placeholder="Adam" autocomplete="off" aria-label="Ditt namn">
      <div class="char-grid" id="char-grid">
        ${CHARACTERS.map(c => `
          <button class="char-card" type="button" data-char="${c.id}" aria-pressed="${c.id === nyValdChar}">
            ${charSVG(c.id, c.id === nyValdChar ? "happy" : "idle")}
            <span class="char-name">${c.name}</span>
          </button>
        `).join("")}
      </div>
      <div style="margin-top:16px">
        <button class="btn btn-big" id="skapa-btn" type="button">🚋 Börja åka!</button>
      </div>
    </div>
    <div style="text-align:center">
      <button class="btn btn-soft btn-sm" id="welcome-import" type="button">📂 Läs in säkerhetskopia</button>
    </div>
  `;

  el.querySelectorAll("[data-pick-player]").forEach(btn => {
    btn.onclick = () => {
      aktiveraForstaTryck();
      SFX.klocka();
      DATA.activeId = btn.dataset.pickPlayer;
      spara();
      synkaLjudInstallningar();
      const pl = P();
      prata(`Hej ${pl.name}!`, { settings: pl.settings, namn: pl.name });
      renderHome();
    };
  });

  el.querySelectorAll("[data-char]").forEach(btn => {
    btn.onclick = () => {
      aktiveraForstaTryck();
      SFX.klick();
      nyValdChar = btn.dataset.char;
      el.querySelectorAll("[data-char]").forEach(b => {
        const vald = b.dataset.char === nyValdChar;
        b.setAttribute("aria-pressed", String(vald));
        b.querySelector("svg").outerHTML = charSVG(b.dataset.char, vald ? "happy" : "idle");
      });
    };
  });

  $("#skapa-btn").onclick = () => {
    aktiveraForstaTryck();
    const namnIn = $("#ny-namn").value.trim() || "Adam";
    const pl = nySpelare(namnIn, nyValdChar);
    DATA.players.push(pl);
    DATA.activeId = pl.id;
    spara();
    synkaLjudInstallningar();
    SFX.klocka();
    prata(`Hej ${pl.name}! Välkommen till Ordjakten!`, { settings: pl.settings, namn: pl.name });
    renderHome();
  };

  $("#welcome-import").onclick = () => oppnaImportDialog();
}

/* ═══════════════════════════════════════════════════════════════
   2. STARTSKÄRM — GÖTEBORGS SPÅRVAGNSNÄT
   ═══════════════════════════════════════════════════════════════ */
function minVagnSVG(p, stor = false){
  const mv = p.minVagn || { typ: "M34", nr: 601, ref: "11", rikt: 1 };
  const typ = vagnTypAv(mv.typ) || VAGNTYPER[VAGNTYPER.length - 1];
  const linje = linjeAv(mv.ref || "11");
  const mot = mv.rikt === -1 ? linje.a : linje.b;
  return vagnSidoSVG(typ, {
    nr: mv.nr, linje, mot,
    flaggor: !!mv.flaggor && p.kopta.includes("flaggor"),
    jul: !!mv.jul && p.kopta.includes("jul"),
    stor
  });
}

function renderHome(){
  const p = P();
  if(!p){ renderWelcome(); return; }
  visaSkarm("home");
  const el = $("#screen-home");
  const resa = p.resa;
  const rLinje = resa ? linjeAv(resa.ref) : null;
  const rStopp = rLinje ? rLinje.stops[resa.at] : null;
  const rMot = rLinje ? (resa.rikt === -1 ? rLinje.a : rLinje.b) : null;
  const stil = stilAv(p);
  const nivaObj = NIVAAER[Math.max(0, Math.min(5, Math.round(p.settings.niva || 2) - 1))];
  const leksaker = (p.kopta || []).map(id => LEKSAKER.find(x => x.id === id)).filter(Boolean);

  el.innerHTML = `
    <div class="hero-vagn">
      <div class="kompis-wrap" id="home-kompis" title="Tryck på kompisen">${kompisSVG(p, "happy")}</div>
      <div class="vagn-wrap" id="home-vagn-preview" style="cursor:pointer" title="Öppna Min vagn">
        ${minVagnSVG(p, false)}
        <div style="text-align:center;font-size:.78rem;color:var(--ink-2);margin-top:2px">
          ${escapeHtml(p.minVagn.typ)} #${p.minVagn.nr} · Linje ${escapeHtml(p.minVagn.ref)}
          ${leksaker.length ? " · " + leksaker.map(l => l.bild).join(" ") : ""}
        </div>
      </div>
    </div>

    <div class="panel">
      ${resa && rStopp ? `
        <button class="btn btn-big" id="fortsatt-btn" type="button" style="margin-bottom:12px">
          🚋 Fortsätt från ${escapeHtml(formatOrd(rStopp, stil))}!
        </button>
        <div style="text-align:center;font-size:.88rem;color:var(--ink-2);margin-bottom:14px">
          Linje ${escapeHtml(rLinje.ref)} mot ${escapeHtml(formatOrd(rMot, stil))} · Nivå: <b>${escapeHtml(nivaObj.namn)}</b>
        </div>
      ` : `
        <div class="panel-title">🚋 Välj var resan börjar</div>
        <p style="font-size:.9rem;color:var(--ink-2);margin-bottom:10px">
          Läs ord, bygg med bokstäver och åk hållplats för hållplats genom Göteborg!
        </p>
      `}

      <div class="start-choices">
        ${STARTPLATSER.map(s => {
          const l = linjeAv(s.ref);
          const dark = ljusFarg(l.col);
          return `<button class="start-choice" data-start-stopp="${escapeHtml(s.namn)}" data-start-ref="${l.ref}" data-start-rikt="${s.rikt}" type="button">
            <span class="sc-badge" style="background:${l.col};color:${dark ? INK : "#FFFDF7"}">${l.ref}</span>
            <span>
              <b>${escapeHtml(formatOrd(s.namn, stil))}</b>
              <small>${escapeHtml(s.beskrivning)}</small>
            </span>
          </button>`;
        }).join("")}
      </div>

      <button class="btn btn-soft" id="valj-annan-start" type="button" style="width:100%">
        🗺️ Välj en annan linje eller hållplats
      </button>
    </div>

    <div class="home-tiles">
      <button class="home-tile" id="tile-vagn" type="button">
        <span class="ht-ico">🚃</span>
        <span><b>Min vagn &amp; vagnkort</b><small>${escapeHtml(p.minVagn.typ)} · ${(p.vagnkort || []).length}/${ALLA_VAGNKORT_NR.length} kort</small></span>
      </button>
      <button class="home-tile" id="tile-ord" type="button">
        <span class="ht-ico">📖</span>
        <span><b>Mina ord &amp; märken</b><small>${(p.klaradeOrd || []).length} lästa ord · ${(p.badges || []).length}/${MARKEN.length} märken</small></span>
      </button>
      <button class="home-tile" id="tile-resor" type="button">
        <span class="ht-ico">🗺️</span>
        <span><b>Mina resor</b><small>${(p.visitedStops || []).length}/${ALLA_STOPP.length} hållplatser · Väggkarta</small></span>
      </button>
      <button class="home-tile" id="tile-kista" type="button">
        <span class="ht-ico">🪙</span>
        <span><b>Skattkistan</b><small>${p.coins} guldmynt att handla för</small></span>
      </button>
    </div>
  `;

  $("#home-kompis").onclick = () => { aktiveraForstaTryck(); SFX.klick(); sagKompisReplik(); };
  $("#home-vagn-preview").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openMinVagn(); };
  if($("#fortsatt-btn")){
    $("#fortsatt-btn").onclick = () => {
      aktiveraForstaTryck();
      SFX.klocka();
      sistaBeloning = null;
      renderResa();
    };
  }
  el.querySelectorAll("[data-start-stopp]").forEach(btn => {
    btn.onclick = () => {
      aktiveraForstaTryck();
      startaResaVid(btn.dataset.startStopp, btn.dataset.startRef, Number(btn.dataset.startRikt));
    };
  });
  $("#valj-annan-start").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openValjStartplats(); };
  $("#tile-vagn").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openMinVagn(); };
  $("#tile-ord").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openMinaOrdOchMarken(); };
  $("#tile-resor").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openMinaResor(); };
  $("#tile-kista").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openSkattkistan(); };
}

function startaResaVid(stoppNamn, ref, rikt = 1){
  const p = P();
  const l = linjeAv(ref);
  let at = l.stops.indexOf(stoppNamn);
  if(at < 0) at = 0;
  let r = rikt;
  if(at === 0) r = 1;
  if(at === l.stops.length - 1) r = -1;
  p.resa = {
    ref: l.ref,
    at,
    rikt: r,
    mal: p.resa?.mal || null,
    sparr: p.resa?.sparr || null,
    nyss: p.resa?.nyss || []
  };
  if(!p.visitedStops.includes(l.stops[at])) p.visitedStops.push(l.stops[at]);
  kollaMarken(p);
  spara();
  SFX.klocka();
  sistaBeloning = null;
  prata(`Linje ${l.ref} mot ${r === -1 ? l.a : l.b}. Vi står vid ${l.stops[at]}.`, { settings: p.settings, namn: p.name });
  renderResa();
}

/* ═══════════════════════════════════════════════════════════════
   3. RESEVY — KARTAN I CENTRUM
   ═══════════════════════════════════════════════════════════════ */
function renderResa(){
  const p = P();
  if(!p || !p.resa){ renderHome(); return; }
  visaSkarm("resa");
  const el = $("#screen-resa");
  const r = p.resa;
  const l = linjeAv(r.ref);
  const nuStopp = l.stops[r.at];
  const nastaIdx = r.at + r.rikt;
  const nastaStopp = l.stops[nastaIdx] || null;
  const mot = r.rikt === -1 ? l.a : l.b;
  const sparradFram = nastaStopp && arSparrad(nuStopp, nastaStopp, r.sparr);
  const dark = ljusFarg(l.col);
  const stil = stilAv(p);
  const besokta = new Set(p.visitedStops || []);
  const tips = r.mal ? tipsForMal(l, r.at, r.rikt, r.mal, r.sparr) : null;

  /* Foto eller tecknad scen för aktuell hållplats */
  const fotoPost = STOP_PHOTOS[nuStopp] || vagnFoto(nuStopp);
  const harEgetFoto = !!STOP_PHOTOS[nuStopp];
  const visaFoto = p.settings.foton !== false && !visaTecknadScen && fotonMiss < 3;

  el.innerHTML = `
    <div class="rese-head" style="background:${l.col};color:${dark ? INK : "#FFFDF7"}">
      <div class="rese-head-left">
        <span class="linje-bricka" style="background:${dark ? "#FFFDF7" : "rgba(0,0,0,.22)"};color:${dark ? INK : "#FFFDF7"}">${l.ref}</span>
        <div class="rese-head-txt">
          <b>mot ${escapeHtml(formatOrd(mot, stil))}</b>
          <small>Hållplats ${r.at + 1} av ${l.stops.length} · ${escapeHtml(formatOrd(nuStopp, stil))}</small>
        </div>
      </div>
      <button class="btn btn-sm" id="resa-hem" type="button">🏠 Start</button>
    </div>

    <div class="natkarta-box" id="natkarta-box" aria-label="Göteborgs spårvagnskarta">
      ${natkartaSVG(l, r.at, {
        rikt: r.rikt,
        besokta,
        utzoomad: !!p.settings.utzoomad,
        mal: r.mal,
        sparr: r.sparr,
        bokstavsStil: stil
      })}
      <button class="karta-zoom-btn" id="karta-zoom" type="button">
        ${p.settings.utzoomad ? "🔍 Närbild" : "🗺️ Hela nätet"}
      </button>
      <div class="karta-status">
        <span class="karta-pill">Nu: ${escapeHtml(formatOrd(nuStopp, stil))}</span>
        ${nastaStopp ? `<span class="karta-pill">Nästa: ${escapeHtml(formatOrd(nastaStopp, stil))}</span>` : `<span class="karta-pill">Ändstation!</span>`}
      </div>
    </div>

    ${r.mal && tips ? `
      <div class="resmal-banner">
        <div>
          <b>🚩 Resmål: ${escapeHtml(formatOrd(r.mal, stil))} ${r.sparr ? "· 🚧 Spårarbete!" : ""}</b>
          <small>${tips.kvar} hållplatser kvar · <b>${escapeHtml(tips.text)}</b></small>
        </div>
        <button class="btn btn-sm btn-soft" id="resmal-hantera" type="button">Byt</button>
      </div>
    ` : ""}

    ${sistaBeloning ? `
      <div class="beloning-rad">
        <span>🎉 <b>${escapeHtml(sistaBeloning.rubrik)}</b> · +${sistaBeloning.mynt} 🪙 ${sistaBeloning.extra ? "· " + escapeHtml(sistaBeloning.extra) : ""}</span>
        ${sistaBeloning.kortNr ? `<button class="btn btn-sm" id="visa-nytt-kort" type="button">🃏 Se vagnkort!</button>` : ""}
      </div>
    ` : ""}

    <div class="rese-actions">
      ${nastaStopp && !sparradFram ? `
        <button class="btn btn-big" id="ak-nasta" type="button" ${rullarNu ? "disabled" : ""}>
          🔔 Åk till ${escapeHtml(formatOrd(nastaStopp, stil))}!
        </button>
      ` : `
        <button class="btn btn-big btn-gbg" id="byt-vagn-prim" type="button">
          ${sparradFram ? "🚧 Spårarbete! Byt vagn eller vänd" : "🔄 Ändstation! Välj nästa vagn"}
        </button>
      `}
      <div class="rese-sub-btns">
        <button class="btn btn-soft" id="byt-vagn" type="button">🔄 Byt vagn eller riktning</button>
        <button class="btn btn-soft" id="valj-resmal" type="button">🚩 ${r.mal ? "Nytt resmål" : "Välj ett resmål"}</button>
      </div>
    </div>

    <details class="fold-card">
      <summary>📸 Se hållplatsen: ${escapeHtml(formatOrd(nuStopp, stil))} <span>▾</span></summary>
      <div class="fold-body">
        <div class="stopp-foto-wrap" id="foto-toggle" title="Tryck för att växla mellan foto och tecknad bild">
          ${visaFoto
            ? `<img id="stopp-img" src="./bilder/${fotoPost.f}.jpg" alt="${escapeHtml(nuStopp)}">`
            : sceneSVG(nuStopp)}
        </div>
        <div class="foto-credit">
          <span>${visaFoto ? (harEgetFoto ? `Foto: ${escapeHtml(fotoPost.by)} (${escapeHtml(fotoPost.lic)})` : `Spårvagnsfoto: ${escapeHtml(fotoPost.by)} (${escapeHtml(fotoPost.lic)})`) : "Tecknad hållplatsbild"}</span>
          <span>Tryck på bilden för att byta</span>
        </div>
      </div>
    </details>

    <details class="fold-card">
      <summary>📋 Alla hållplatser på linje ${l.ref} (${l.stops.filter(s => besokta.has(s)).length}/${l.stops.length}) <span>▾</span></summary>
      <div class="fold-body">
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${l.stops.map((s, idx) => `
            <button class="mode-chip" data-hoppa-stopp="${idx}" type="button"
              style="${idx === r.at ? "background:var(--sun)" : besokta.has(s) ? "background:#D7FAD9" : ""}">
              ${idx === r.at ? "🚋 " : besokta.has(s) ? "✓ " : ""}${escapeHtml(formatOrd(s, stil))}
            </button>
          `).join("")}
        </div>
      </div>
    </details>
  `;

  $("#resa-hem").onclick = () => { aktiveraForstaTryck(); SFX.klick(); renderHome(); };
  $("#karta-zoom").onclick = () => {
    aktiveraForstaTryck(); SFX.klick();
    p.settings.utzoomad = !p.settings.utzoomad;
    spara();
    renderResa();
  };

  /* Tryck på hållplats på kartan säger namnet */
  $("#natkarta-box").addEventListener("click", (e) => {
    const t = e.target.closest("[data-stopp-namn]");
    if(t){
      aktiveraForstaTryck();
      SFX.klick();
      prata(t.dataset.stoppNamn, { settings: p.settings, namn: p.name });
    }
  });

  if($("#ak-nasta")){
    $("#ak-nasta").onclick = () => {
      aktiveraForstaTryck();
      SFX.klocka();
      startaOrdRunda(l, r.at, r.rikt, nastaStopp);
    };
  }
  if($("#byt-vagn-prim")) $("#byt-vagn-prim").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openPerrongen(); };
  $("#byt-vagn").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openPerrongen(); };
  $("#valj-resmal").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openResmalDialog(); };
  if($("#resmal-hantera")) $("#resmal-hantera").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openResmalDialog(); };
  if($("#visa-nytt-kort")){
    const nr = sistaBeloning.kortNr;
    $("#visa-nytt-kort").onclick = () => { aktiveraForstaTryck(); SFX.klick(); openMinVagn("kort", nr); };
  }
  $("#foto-toggle").onclick = () => {
    aktiveraForstaTryck(); SFX.klick();
    visaTecknadScen = !visaTecknadScen;
    renderResa();
  };
  const img = $("#stopp-img");
  if(img){
    img.onerror = () => {
      fotonMiss++;
      const wrap = $("#foto-toggle");
      if(wrap) wrap.innerHTML = sceneSVG(nuStopp);
    };
  }
  el.querySelectorAll("[data-hoppa-stopp]").forEach(b => {
    b.onclick = () => {
      aktiveraForstaTryck(); SFX.klick();
      const idx = Number(b.dataset.hoppaStopp);
      prata(l.stops[idx], { settings: p.settings, namn: p.name });
    };
  });
}

/* ═══════════════════════════════════════════════════════════════
   4. SPELRUNDA — 5 LÄS- & BOKSTAVSUPPGIFTER PER HÅLLPLATS
   ═══════════════════════════════════════════════════════════════ */
function startaOrdRunda(linje, at, rikt, nastaStopp){
  const p = P();
  const fragor = byggRunda(p.settings.niva || 2, {
    linje,
    stopp: linje.stops[at],
    nasta: nastaStopp
  }, {
    antal: 5,
    undvik: p.resa?.nyss || [],
    lasa: p.settings.lasa !== false,
    stava: p.settings.stava !== false,
    gbg: p.settings.gbg !== false,
    kluringar: p.kluringar || []
  });
  runda = {
    linje,
    franAt: at,
    tillAt: at + rikt,
    rikt,
    nastaStopp,
    fragor,
    index: 0,
    utfall: [],
    mynt: 0,
    nyaOrd: [],
    nyttKortNr: null,
    startTid: Date.now(),
    forsokKvar: 0,
    las: false,
    felValda: new Set(),
    byggIn: [], // [{ ch, brickId }]
    stavaLage: p.settings.stavaLage || "brickor",
    feedback: null,
    kompisMood: "idle"
  };
  forberedFraga();
  visaSkarm("game");
  renderGame(true);
}

function forberedFraga(){
  const q = runda.fragor[runda.index];
  runda.forsokKvar = q.forsok || 2;
  runda.las = false;
  runda.felValda = new Set();
  runda.byggIn = [];
  runda.feedback = null;
  runda.kompisMood = "idle";
}

function renderGame(lasUpp = false){
  const p = P();
  if(!p || !runda){ renderResa(); return; }
  const q = runda.fragor[runda.index];
  const stil = stilAv(p);
  const el = $("#screen-game");
  const fmt = (s) => formatOrd(s, stil);
  const arBygg = q.typ === "bygg-ord" || q.typ === "bygg-hallplats";

  el.innerHTML = `
    <div class="game-top">
      <button class="icon-btn" id="game-back" type="button" aria-label="Tillbaka till kartan">←</button>
      <div class="prog-dots" aria-label="Fråga ${runda.index + 1} av ${runda.fragor.length}">
        ${runda.fragor.map((_, i) => {
          const u = runda.utfall[i];
          const cls = u === "direkt" ? "done" : u ? "hjalp" : i === runda.index ? "now" : "";
          return `<span class="prog-dot ${cls}"></span>`;
        }).join("")}
      </div>
      <button class="icon-btn" id="game-say" type="button" aria-label="Lyssna igen">🔊</button>
    </div>

    <div class="q-stage">
      ${q.kluring ? `<span class="kluring-tag">💡 Kluring! +5 extra mynt</span>` : ""}
      <div class="q-header">
        <div class="q-prompt">${escapeHtml(q.fragaText)}</div>
      </div>

      <div class="q-visual" id="q-visual">
        ${renderFragaVisuell(q, stil)}
      </div>

      <div id="q-interaktion">
        ${arBygg ? renderByggOmrade(q, stil) : renderValOmrade(q, stil)}
      </div>

      <div class="feedback-bar ${runda.feedback ? runda.feedback.typ : ""}" id="feedback-bar">
        <div class="fb-kompis" id="fb-kompis" title="Tryck för att lyssna igen">${kompisSVG(p, runda.kompisMood)}</div>
        <div class="fb-text">
          ${runda.feedback
            ? escapeHtml(runda.feedback.text)
            : `På väg mot <b>${escapeHtml(fmt(runda.nastaStopp))}</b>! Tryck på 🔊 om du vill höra igen.`}
        </div>
        ${runda.las ? `<button class="btn btn-green btn-sm" id="nasta-fraga-btn" type="button">${runda.index + 1 < runda.fragor.length ? "Nästa ▶" : "Rulla! 🚋"}</button>` : ""}
      </div>
    </div>
  `;

  $("#game-back").onclick = () => {
    aktiveraForstaTryck(); SFX.klick(); stoppaTal();
    statTid(p, (Date.now() - runda.startTid) / 1000);
    spara();
    runda = null;
    renderResa();
  };
  const lasFragan = () => {
    aktiveraForstaTryck();
    prata(q.talText, { settings: p.settings, namn: p.name });
  };
  $("#game-say").onclick = lasFragan;
  $("#fb-kompis").onclick = lasFragan;

  if($("#nasta-fraga-btn")){
    $("#nasta-fraga-btn").onclick = () => {
      aktiveraForstaTryck(); SFX.klick();
      gaVidareIrunda();
    };
  }

  /* Ljudning per bokstav i las-bild */
  el.querySelectorAll("[data-ljud-idx]").forEach(btn => {
    btn.onclick = () => {
      aktiveraForstaTryck();
      const ch = btn.dataset.ljudCh;
      btn.classList.add("aktiv");
      setTimeout(() => btn.classList.remove("aktiv"), 380);
      sagBokstav(ch, p.settings);
    };
  });
  const ljudaBtn = $("#ljuda-ord-btn");
  if(ljudaBtn){
    ljudaBtn.onclick = () => {
      aktiveraForstaTryck();
      const tiles = el.querySelectorAll("[data-ljud-idx]");
      ljudaOrd(q.ord, p.settings, (idx) => {
        tiles.forEach((t, i) => t.classList.toggle("aktiv", idx === "alla" || i === idx));
      });
    };
  }

  /* Interaktion för flerval eller bygg-ord */
  if(arBygg){
    bindByggHandelser(q, stil);
  }else{
    el.querySelectorAll("[data-choice]").forEach(btn => {
      btn.onclick = () => {
        if(runda.las) return;
        aktiveraForstaTryck();
        bedomVal(q, btn.dataset.choice);
      };
    });
  }

  if(lasUpp){
    prata(q.talText, { settings: p.settings, namn: p.name });
  }
}

function renderFragaVisuell(q, stil){
  const fmt = (s) => formatOrd(s, stil);
  if(q.typ === "las-bild"){
    const bokst = [...q.ord.toLocaleUpperCase("sv")];
    return `
      <div class="ljud-ord-rad">
        ${bokst.map((ch, i) => `
          <button class="ljud-bokstav" type="button" data-ljud-idx="${i}" data-ljud-ch="${ch}">
            <span>${escapeHtml(fmt(ch))}</span>
            <span class="ljud-prick" aria-hidden="true"></span>
          </button>
        `).join("")}
      </div>
      <button class="ljuda-btn" id="ljuda-ord-btn" type="button">🔊 Ljuda ordet</button>
    `;
  }
  if(q.typ === "bild-ord" || q.typ === "forsta-ljud"){
    return `${ordBildHTML(q.ordObj, true)}`;
  }
  if(q.typ === "lucka"){
    return `
      ${ordBildHTML(q.ordObj, false)}
      <div class="ljud-ord-rad">
        ${q.bokstaver.map((ch, i) => {
          const arLucka = i === q.luckIndex;
          const fylld = arLucka && runda.las;
          const vis = arLucka ? (fylld ? fmt(q.svar) : "?") : fmt(ch);
          return `<span class="ljud-bokstav ${arLucka ? (fylld ? "ratt-fylld" : "lucka-tom") : ""}">${escapeHtml(vis)}</span>`;
        }).join("")}
      </div>
    `;
  }
  if(q.typ === "bygg-ord"){
    return `${ordBildHTML(q.ordObj, true)}`;
  }
  if(q.typ === "bygg-hallplats"){
    if(q.arVagnOrd && q.vagnTyp){
      const t = vagnTypAv(q.vagnTyp) || VAGNTYPER[4];
      return `<div style="width:100%;max-width:340px">${vagnSidoSVG(t, { stor: true })}</div>`;
    }
    return `<div style="font-size:.95rem;color:var(--ink-2)">📍 Göteborgs spårvagnsnät</div>`;
  }
  if(q.typ === "skylt-las"){
    return `<div style="font-size:1rem;color:var(--ink-2)">Lyssna och titta på destinationsskylten!</div>`;
  }
  if(q.typ === "hallplats-skylt"){
    return `<div style="font-size:2.4rem" aria-hidden="true">🔊 🚏</div>`;
  }
  if(q.typ === "vagn-modell"){
    return `
      <div style="width:100%;max-width:360px">${vagnSidoSVG(q.vagnTyp, { stor: true })}</div>
      <div style="font-size:.92rem;color:var(--ink-2);text-align:center">${escapeHtml(q.ledtrad)}</div>
    `;
  }
  return "";
}

function renderValOmrade(q, stil){
  const fmt = (s) => formatOrd(s, stil);
  const cols = q.typ === "hallplats-skylt" ? "cols-1" : q.alternativ.length === 3 ? "cols-3" : "";
  return `<div class="choice-grid ${cols}">
    ${q.alternativ.map(a => {
      const arRatt = runda.las && a.varde === q.svar;
      const arFel = runda.felValda.has(a.varde);
      const cls = arRatt ? "is-correct" : arFel ? "is-wrong" : "";
      if(q.typ === "las-bild"){
        return `<button class="choice-btn ${cls}" data-choice="${escapeHtml(a.varde)}" type="button" ${arFel || runda.las ? "disabled" : ""}>
          ${ordBildHTML(a, false)}
        </button>`;
      }
      if(q.typ === "skylt-las"){
        return `<button class="choice-btn vagn-val-btn ${cls}" data-choice="${escapeHtml(a.varde)}" type="button" ${arFel || runda.las ? "disabled" : ""}>
          ${tramSVG(a.col, a.ref)}
          <span class="vagn-val-dest">${escapeHtml(fmt(a.mot))}</span>
        </button>`;
      }
      if(q.typ === "hallplats-skylt"){
        return `<button class="choice-btn ${cls}" data-choice="${escapeHtml(a.varde)}" type="button" ${arFel || runda.las ? "disabled" : ""}>
          ${stoppSkyltHTML(a.text, stil)}
        </button>`;
      }
      if(q.typ === "vagn-modell"){
        return `<button class="choice-btn ${cls}" data-choice="${escapeHtml(a.varde)}" type="button" ${arFel || runda.las ? "disabled" : ""}>
          <span>${escapeHtml(fmt(a.kortText))}</span>
          <small style="font-size:.82rem;color:var(--ink-2)">${escapeHtml(fmt(a.smek))}</small>
        </button>`;
      }
      return `<button class="choice-btn ${cls}" data-choice="${escapeHtml(a.varde)}" type="button" ${arFel || runda.las ? "disabled" : ""}>
        ${escapeHtml(fmt(a.text))}
      </button>`;
    }).join("")}
  </div>`;
}

function renderByggOmrade(q, stil){
  const fmt = (s) => formatOrd(s, stil);
  const langd = q.svar.length;
  const anvandaIds = new Set(runda.byggIn.map(x => x.brickId).filter(id => id != null));
  const kbRader = [
    ["Q","W","E","R","T","Y","U","I","O","P","Å"],
    ["A","S","D","F","G","H","J","K","L","Ö","Ä"],
    ["Z","X","C","V","B","N","M","⌫"]
  ];

  return `
    <div class="stava-mode-bar">
      <button class="mode-chip" id="mode-brickor" type="button" aria-pressed="${runda.stavaLage === "brickor"}">🧱 Brickor</button>
      <button class="mode-chip" id="mode-kb" type="button" aria-pressed="${runda.stavaLage === "tangentbord"}">⌨️ Tangentbord</button>
    </div>

    <div class="bygg-slots">
      ${Array.from({ length: langd }, (_, i) => {
        const post = runda.byggIn[i];
        const vis = runda.las ? q.svar[i] : (post ? post.ch : "");
        const cls = runda.las ? "ratt" : post ? "fylld" : "";
        return `<button class="bygg-slot ${cls}" data-slot="${i}" type="button" aria-label="Plats ${i + 1}">${escapeHtml(vis ? fmt(vis) : "")}</button>`;
      }).join("")}
    </div>

    ${runda.stavaLage === "brickor" ? `
      <div class="brick-bank">
        ${q.brickor.map(b => `
          <button class="bricka ${anvandaIds.has(b.id) ? "anvand" : ""}" data-brick-id="${b.id}" data-brick-ch="${b.ch}" type="button" ${runda.las ? "disabled" : ""}>
            ${escapeHtml(fmt(b.ch))}
          </button>
        `).join("")}
      </div>
    ` : `
      <div class="sv-tangentbord">
        ${kbRader.map(rad => `
          <div class="kb-row">
            ${rad.map(k => `
              <button class="kb-key ${k === "⌫" ? "wide" : ""}" data-kb="${k}" type="button" ${runda.las ? "disabled" : ""}>
                ${escapeHtml(k === "⌫" ? "⌫" : fmt(k))}
              </button>
            `).join("")}
          </div>
        `).join("")}
      </div>
    `}
  `;
}

function bindByggHandelser(q, stil){
  const p = P();
  const mb = $("#mode-brickor"), mk = $("#mode-kb");
  if(mb) mb.onclick = () => {
    aktiveraForstaTryck(); SFX.klick();
    runda.stavaLage = "brickor";
    p.settings.stavaLage = "brickor";
    runda.byggIn = [];
    spara();
    renderGame(false);
  };
  if(mk) mk.onclick = () => {
    aktiveraForstaTryck(); SFX.klick();
    runda.stavaLage = "tangentbord";
    p.settings.stavaLage = "tangentbord";
    runda.byggIn = [];
    spara();
    renderGame(false);
  };

  /* Tryck på fylld ruta tar bort den bokstaven */
  document.querySelectorAll("[data-slot]").forEach(btn => {
    btn.onclick = () => {
      if(runda.las) return;
      const i = Number(btn.dataset.slot);
      if(i < runda.byggIn.length){
        aktiveraForstaTryck(); SFX.klick();
        runda.byggIn.splice(i, 1);
        renderGame(false);
      }
    };
  });

  /* Brickor */
  document.querySelectorAll("[data-brick-id]").forEach(btn => {
    btn.onclick = () => {
      if(runda.las) return;
      aktiveraForstaTryck();
      laggByggBokstav(q, btn.dataset.brickCh, Number(btn.dataset.brickId));
    };
  });

  /* Skärmtangentbord */
  document.querySelectorAll("[data-kb]").forEach(btn => {
    btn.onclick = () => {
      if(runda.las) return;
      aktiveraForstaTryck();
      const k = btn.dataset.kb;
      if(k === "⌫"){
        if(runda.byggIn.length){ SFX.klick(); runda.byggIn.pop(); renderGame(false); }
      }else{
        laggByggBokstav(q, k, null);
      }
    };
  });
}

function laggByggBokstav(q, ch, brickId){
  const p = P();
  if(runda.byggIn.length >= q.svar.length) return;
  if(p.settings.voice === false) SFX.klick();
  else sagBokstav(ch, p.settings);
  runda.byggIn.push({ ch: ch.toLocaleUpperCase("sv"), brickId });
  if(runda.byggIn.length === q.svar.length){
    const ordIn = runda.byggIn.map(x => x.ch).join("");
    bedomBygg(q, ordIn);
  }else{
    renderGame(false);
  }
}

/* Fysiskt tangentbord på dator/iPad-tangentbord */
document.addEventListener("keydown", (e) => {
  if(aktivSkarm !== "game" || !runda || sheetBackdrop.classList.contains("open")) return;
  const q = runda.fragor[runda.index];
  if(runda.las){
    if(e.key === "Enter" || e.key === " "){ e.preventDefault(); gaVidareIrunda(); }
    return;
  }
  const arBygg = q.typ === "bygg-ord" || q.typ === "bygg-hallplats";
  if(arBygg){
    if(e.key === "Backspace"){
      if(runda.byggIn.length){ e.preventDefault(); SFX.klick(); runda.byggIn.pop(); renderGame(false); }
      return;
    }
    const ch = e.key.toLocaleUpperCase("sv");
    if(/^[A-ZÅÄÖ]$/.test(ch)){
      e.preventDefault();
      if(runda.stavaLage === "brickor"){
        const anv = new Set(runda.byggIn.map(x => x.brickId));
        const match = q.brickor.find(b => b.ch === ch && !anv.has(b.id));
        if(match) laggByggBokstav(q, match.ch, match.id);
      }else{
        laggByggBokstav(q, ch, null);
      }
    }
  }else if(q.typ === "lucka" || q.typ === "forsta-ljud"){
    const ch = e.key.toLocaleUpperCase("sv");
    const match = q.alternativ.find(a => a.varde === ch && !runda.felValda.has(a.varde));
    if(match){ e.preventDefault(); bedomVal(q, match.varde); }
  }
});

function registreraRatt(q, direkt){
  const p = P();
  const stil = stilAv(p);
  runda.las = true;
  runda.kompisMood = "happy";
  SFX.ratt();
  const utfall = direkt ? "direkt" : "hjalp";
  runda.utfall[runda.index] = utfall;
  statSvar(p, q.typ, utfall);

  if(direkt){
    p.streak = (p.streak || 0) + 1;
    if(p.streak > (p.bestStreak || 0)) p.bestStreak = p.streak;
    const mult = p.streak >= 6 ? 3 : p.streak >= 3 ? 2 : 1;
    let vinst = 10 * mult;
    if(q.kluring){ vinst += 5; kluringKlarad(p, q); }
    p.coins += vinst;
    runda.mynt += vinst;
  }else{
    p.streak = 0;
    p.coins += 5;
    runda.mynt += 5;
    laggKluring(p, q);
  }

  /* Spara i Mina ord */
  if(q.ordObj && !p.klaradeOrd.includes(q.ordObj.ord)){
    p.klaradeOrd.push(q.ordObj.ord);
    runda.nyaOrd.push(q.ordObj.ord);
  }
  /* Spara vagnmodell & vagnkort */
  if(q.typ === "vagn-modell"){
    p.vagnModellerRatt = (p.vagnModellerRatt || 0) + 1;
    if(q.bonusKortNr && !p.vagnkort.includes(q.bonusKortNr)){
      p.vagnkort.push(q.bonusKortNr);
      runda.nyttKortNr = q.bonusKortNr;
    }
  }

  if(p.settings.nivaLage !== "fast"){
    p.settings.niva = uppdateraNiva(p.settings.niva, utfall, p.settings.nivaGolv || 1);
  }
  spara();

  const berom = pick(["Toppen!", "Snyggt läst!", "Heja!", "Helt rätt!", "Suveränt!"]);
  const visaOrd = formatOrd(q.ord || q.svar, stil);
  runda.feedback = {
    typ: "ok",
    text: `${berom} ${visaOrd}!${q.typ === "vagn-modell" && q.kortInfo && runda.nyttKortNr ? ` Du låste upp vagnkort #${q.kortInfo.nr}!` : ""}`
  };
  renderGame(false);
  prata(`${berom} ${q.ord || q.svar}!`, { settings: p.settings, namn: p.name });
}

function registreraVisad(q){
  const p = P();
  const stil = stilAv(p);
  runda.las = true;
  runda.kompisMood = "idle";
  runda.utfall[runda.index] = "visad";
  p.streak = 0;
  statSvar(p, q.typ, "visad");
  laggKluring(p, q);
  if(p.settings.nivaLage !== "fast"){
    p.settings.niva = uppdateraNiva(p.settings.niva, "visad", p.settings.nivaGolv || 1);
  }
  spara();
  const rattVis = formatOrd(q.ord || q.svar, stil);
  runda.feedback = {
    typ: "fel",
    text: `Rätt svar är ${rattVis}! Nu tar vi nästa.`
  };
  renderGame(false);
  prata(`Rätt svar är ${q.ord || q.svar}!`, { settings: p.settings, namn: p.name });
}

function bedomVal(q, valt){
  const p = P();
  if(valt === q.svar){
    registreraRatt(q, runda.felValda.size === 0);
    return;
  }
  runda.felValda.add(valt);
  runda.forsokKvar--;
  runda.kompisMood = "sad";
  SFX.fel();
  if(runda.forsokKvar <= 0){
    registreraVisad(q);
  }else{
    const hint = forklaraFel(q, valt, stilAv(p));
    runda.feedback = { typ: "fel", text: hint.text };
    renderGame(false);
    prata(hint.tal, { settings: p.settings, namn: p.name });
  }
}

function bedomBygg(q, ordIn){
  const p = P();
  if(ordIn === q.svar){
    registreraRatt(q, runda.forsokKvar === (q.forsok || 3));
    return;
  }
  runda.forsokKvar--;
  runda.kompisMood = "sad";
  SFX.fel();
  if(runda.forsokKvar <= 0){
    registreraVisad(q);
  }else{
    const hint = forklaraFel(q, ordIn, stilAv(p));
    runda.feedback = { typ: "fel", text: hint.text };
    /* Behåll bara de rätta bokstäverna från början så det blir lättare att rätta! */
    const behall = [];
    for(let i = 0; i < runda.byggIn.length; i++){
      if(runda.byggIn[i].ch === q.svar[i]) behall.push(runda.byggIn[i]);
      else break;
    }
    runda.byggIn = behall;
    renderGame(false);
    prata(hint.tal, { settings: p.settings, namn: p.name });
  }
}

async function gaVidareIrunda(){
  const p = P();
  if(!runda) return;
  if(runda.index + 1 < runda.fragor.length){
    runda.index++;
    forberedFraga();
    renderGame(true);
    return;
  }

  /* Hela sträckan klar! Rulla spårvagnen till nästa hållplats på kartan! */
  const klarRunda = runda;
  runda = null;
  statTid(p, (Date.now() - klarRunda.startTid) / 1000);
  const felfri = klarRunda.utfall.every(u => u === "direkt");
  if(felfri && p.settings.nivaLage !== "fast"){
    p.settings.niva = uppdateraNiva(p.settings.niva, "felfri-hallplats", p.settings.nivaGolv || 1);
  }
  /* Spara nyss använda nycklar så nästa hållplats inte upprepar ord */
  const nyss = [...(p.resa.nyss || []), ...klarRunda.fragor.map(f => f.nyckel).filter(Boolean)].slice(-24);
  p.resa.nyss = nyss;

  /* Först visa kartan vid gamla hållplatsen, rulla vagnen till den nya! */
  rullarNu = true;
  sistaBeloning = null;
  renderResa();

  SFX.utrop();
  const nyttStopp = klarRunda.linje.stops[klarRunda.tillAt];
  setTimeout(() => {
    prata(`Nästa hållplats: ${nyttStopp}`, { settings: p.settings, namn: p.name });
  }, 420);

  await rullaVagnPaKarta($("#natkarta-box"), klarRunda.linje, klarRunda.franAt, klarRunda.tillAt, {
    rikt: klarRunda.rikt,
    utzoomad: !!p.settings.utzoomad,
    minskaRorelse: !!p.settings.minskaRorelse
  });

  /* Ankomst! */
  p.resa.at = klarRunda.tillAt;
  if(!p.visitedStops.includes(nyttStopp)) p.visitedStops.push(nyttStopp);

  let extra = [];
  if(klarRunda.nyaOrd.length) extra.push(`${klarRunda.nyaOrd.length} nya ord`);
  if(p.resa.mal && nyttStopp === p.resa.mal){
    const bonus = p.resa.sparr ? 60 : 40;
    p.coins += bonus;
    klarRunda.mynt += bonus;
    p.resmalKlarade = (p.resmalKlarade || 0) + 1;
    if(p.resa.sparr) p.omvagKlarade = (p.omvagKlarade || 0) + 1;
    p.resa.mal = null;
    p.resa.sparr = null;
    extra.push("🚩 Resmål klarat!");
    SFX.fanfar();
    konfetti();
  }else{
    SFX.dorr();
  }

  const nyaMarken = kollaMarken(p);
  if(nyaMarken.length){
    extra.push(`🏆 Nytt märke!`);
    konfetti();
  }

  sistaBeloning = {
    rubrik: `Framme vid ${formatOrd(nyttStopp, stilAv(p))}!`,
    mynt: klarRunda.mynt,
    extra: extra.join(" · "),
    kortNr: klarRunda.nyttKortNr
  };
  rullarNu = false;
  spara();
  renderResa();
}

/* ═══════════════════════════════════════════════════════════════
   MODALER: PERRONGEN, STARTPLATS, RESMÅL, MIN VAGN, SKATTKISTAN,
   MINA ORD & MÄRKEN, MINA RESOR, INSTÄLLNINGAR & SÅ GÅR DET
   ═══════════════════════════════════════════════════════════════ */
function openPerrongen(){
  const p = P();
  const l = linjeAv(p.resa.ref);
  const nuStopp = l.stops[p.resa.at];
  const stil = stilAv(p);
  const avg = avgangarFran(nuStopp);
  const mal = p.resa.mal;
  const sparr = p.resa.sparr;
  const nuDist = mal ? avstand(nuStopp, mal, sparr) : Infinity;

  /* Sortera avgångar som tar en närmare resmålet först! */
  const sorterade = avg.map(a => {
    const blokk = arSparrad(nuStopp, a.nasta, sparr);
    const d = mal && !blokk ? avstand(a.nasta, mal, sparr) : Infinity;
    return { ...a, blokk, narmare: mal && !blokk && d < nuDist };
  }).sort((a, b) => Number(b.narmare) - Number(a.narmare) || Number(a.blokk) - Number(b.blokk) || Number(a.ref) - Number(b.ref));

  oppnaSheet(`
    <div class="sheet-head">
      <h2>🚉 Perrongen: ${escapeHtml(formatOrd(nuStopp, stil))}</h2>
      <button class="icon-btn" id="stang-sheet" type="button" aria-label="Stäng">✕</button>
    </div>
    <p style="font-size:.9rem;color:var(--ink-2);margin-bottom:12px">Välj vilken spårvagn och riktning du vill hoppa på!</p>
    ${sorterade.map((a, idx) => `
      <button class="avgang-card ${a.narmare ? "tips" : ""} ${a.blokk ? "sparrad" : ""}" data-avg="${idx}" type="button" ${a.blokk ? "disabled" : ""}>
        ${tramSVG(a.col, a.ref)}
        <div>
          <div style="font-family:'Baloo 2',system-ui;font-size:1.18rem;font-weight:800">
            Linje ${a.ref} mot ${escapeHtml(formatOrd(a.mot, stil))}
          </div>
          <small style="color:var(--ink-2)">
            ${a.blokk ? "🚧 Spårarbete på sträckan!" : `Nästa: ${escapeHtml(formatOrd(a.nasta, stil))}${a.narmare ? " · ⭐ Närmare målet!" : ""}`}
          </small>
        </div>
      </button>
    `).join("")}
    <button class="btn btn-soft" id="perrong-annan" type="button" style="width:100%;margin-top:6px">🗺️ Hoppa till en annan plats i stan</button>
  `);
  $("#stang-sheet").onclick = stangSheet;
  $("#perrong-annan").onclick = () => openValjStartplats();
  sheetEl.querySelectorAll("[data-avg]").forEach(b => {
    b.onclick = () => {
      const a = sorterade[Number(b.dataset.avg)];
      p.resa.ref = a.ref;
      p.resa.at = a.at;
      p.resa.rikt = a.rikt;
      spara();
      stangSheet();
      SFX.klocka();
      prata(`Linje ${a.ref} mot ${a.mot}`, { settings: p.settings, namn: p.name });
      renderResa();
    };
  });
}

function openValjStartplats(valdRef = null){
  const p = P();
  const stil = stilAv(p);
  const linje = valdRef ? linjeAv(valdRef) : null;
  oppnaSheet(`
    <div class="sheet-head">
      <h2>🗺️ ${linje ? `Linje ${linje.ref}: ${escapeHtml(linje.a)} – ${escapeHtml(linje.b)}` : "Välj en linje"}</h2>
      <button class="icon-btn" id="stang-sheet" type="button" aria-label="Stäng">✕</button>
    </div>
    ${!linje ? `
      <div style="display:grid;gap:8px">
        ${TRAM_LINES.map(l => {
          const dark = ljusFarg(l.col);
          return `<button class="avgang-card" data-pick-line="${l.ref}" type="button" style="margin:0">
            <span class="linje-bricka" style="background:${l.col};color:${dark ? INK : "#FFFDF7"}">${l.ref}</span>
            <div>
              <b>${escapeHtml(formatOrd(l.a, stil))} – ${escapeHtml(formatOrd(l.b, stil))}</b>
              <div><small style="color:var(--ink-2)">${l.stops.length} hållplatser</small></div>
            </div>
          </button>`;
        }).join("")}
      </div>
    ` : `
      <button class="btn btn-sm btn-soft" id="tillbaka-linjer" type="button" style="margin-bottom:12px">← Alla 12 linjer</button>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${linje.stops.map(s => `
          <button class="btn btn-sm btn-soft" data-pick-stop="${escapeHtml(s)}" type="button">${escapeHtml(formatOrd(s, stil))}</button>
        `).join("")}
      </div>
    `}
  `);
  $("#stang-sheet").onclick = stangSheet;
  if($("#tillbaka-linjer")) $("#tillbaka-linjer").onclick = () => openValjStartplats(null);
  sheetEl.querySelectorAll("[data-pick-line]").forEach(b => {
    b.onclick = () => { SFX.klick(); openValjStartplats(b.dataset.pickLine); };
  });
  sheetEl.querySelectorAll("[data-pick-stop]").forEach(b => {
    b.onclick = () => {
      stangSheet();
      startaResaVid(b.dataset.pickStop, linje.ref, 1);
    };
  });
}

function openResmalDialog(){
  const p = P();
  const l = linjeAv(p.resa.ref);
  const nu = l.stops[p.resa.at];
  const stil = stilAv(p);
  const nyttMal = () => {
    const mal = valjResmal(nu, new Set(p.visitedStops), p.resmalKlarade || 0);
    const gorSparr = (p.resmalKlarade || 0) >= 2 && Math.random() < 0.5;
    p.resa.mal = mal;
    p.resa.sparr = gorSparr ? valjSparr(nu, mal) : null;
    spara();
    stangSheet();
    SFX.fanfar();
    prata(p.resa.sparr ? `Ta dig till ${mal}! Obs, det är spårarbete på vägen!` : `Ta dig till ${mal}!`, { settings: p.settings, namn: p.name });
    renderResa();
  };
  oppnaSheet(`
    <div class="sheet-head">
      <h2>🚩 Resmål i Göteborg</h2>
      <button class="icon-btn" id="stang-sheet" type="button" aria-label="Stäng">✕</button>
    </div>
    <p style="margin-bottom:14px">
      ${p.resa.mal
        ? `Ditt resmål just nu är <b>${escapeHtml(formatOrd(p.resa.mal, stil))}</b>. Vill du lotta ett nytt resmål eller åka fritt utan mål?`
        : `Vill du ha ett spännande resmål några hållplatser bort? Kartan visar flaggan och tipsar när du ska byta linje!`}
    </p>
    <div style="display:grid;gap:10px">
      <button class="btn btn-big" id="lotta-resmal" type="button">🚩 ${p.resa.mal ? "Lotta nytt resmål" : "Ge mig ett resmål!"}</button>
      ${p.resa.mal ? `<button class="btn btn-soft" id="avsluta-resmal" type="button">Åk fritt utan resmål</button>` : ""}
    </div>
  `);
  $("#stang-sheet").onclick = stangSheet;
  $("#lotta-resmal").onclick = nyttMal;
  if($("#avsluta-resmal")){
    $("#avsluta-resmal").onclick = () => {
      p.resa.mal = null; p.resa.sparr = null; spara(); stangSheet(); renderResa();
    };
  }
}

/* ── Min vagn & Vagnkort ─────────────────────────────────────────────── */
function openMinVagn(flik = "bygg", fokusKortNr = null){
  const p = P();
  const mv = p.minVagn;
  const typ = vagnTypAv(mv.typ) || VAGNTYPER[6];
  const linje = linjeAv(mv.ref);
  const stil = stilAv(p);

  oppnaSheet(`
    <div class="sheet-head">
      <h2>🚃 Min vagn &amp; vagnkort</h2>
      <button class="icon-btn" id="stang-sheet" type="button" aria-label="Stäng">✕</button>
    </div>
    <div class="stava-mode-bar">
      <button class="mode-chip" id="flik-bygg" type="button" aria-pressed="${flik === "bygg"}">🛠️ Bygg min vagn</button>
      <button class="mode-chip" id="flik-modeller" type="button" aria-pressed="${flik === "modeller"}">🚃 Alla 7 modeller</button>
      <button class="mode-chip" id="flik-kort" type="button" aria-pressed="${flik === "kort"}">🃏 Vagnkort (${(p.vagnkort || []).length}/${ALLA_VAGNKORT_NR.length})</button>
    </div>

    ${flik === "bygg" ? `
      <div class="panel" style="background:#E8F6FF;margin-bottom:12px;text-align:center">
        ${minVagnSVG(p, true)}
        <div style="margin-top:6px;font-family:'Baloo 2',system-ui;font-size:1.15rem">
          <b>${escapeHtml(typ.typ)} ${escapeHtml(typ.smek)}</b> · Vagn #${mv.nr}
        </div>
        <small style="color:var(--ink-2)">${typ.langd} m · ${typ.delar.length === 1 ? "1 del" : `${typ.delar.length} delar`} · ${typ.platser} platser</small>
      </div>

      <div class="set-row" style="margin-bottom:8px;flex-wrap:wrap">
        <b>Modell</b>
        <div class="seg-group">
          ${VAGNTYPER.map(t => `<button class="seg-btn" data-vtyp="${t.typ}" type="button" aria-pressed="${t.typ === typ.typ}">${t.typ}</button>`).join("")}
        </div>
      </div>

      <div class="set-row" style="margin-bottom:8px">
        <span><b>Vagnsnummer</b><small>${typ.fran}–${typ.till}</small></span>
        <div class="seg-group">
          <button class="seg-btn" data-steg="-10" type="button">−10</button>
          <button class="seg-btn" data-steg="-1" type="button">−1</button>
          <span style="padding:4px 8px;font-weight:800">${mv.nr}</span>
          <button class="seg-btn" data-steg="1" type="button">+1</button>
          <button class="seg-btn" data-steg="10" type="button">+10</button>
        </div>
      </div>

      <div class="set-row" style="margin-bottom:8px;flex-wrap:wrap">
        <b>Linje på skylten</b>
        <div class="seg-group">
          ${TRAM_LINES.map(l => `<button class="seg-btn" data-vlinje="${l.ref}" type="button" aria-pressed="${l.ref === linje.ref}">${l.ref}</button>`).join("")}
        </div>
      </div>

      <div class="set-row" style="margin-bottom:8px">
        <b>Skyltad riktning</b>
        <button class="seg-btn" id="vagn-vand" type="button">mot ${escapeHtml(formatOrd(mv.rikt === -1 ? linje.a : linje.b, stil))} 🔄</button>
      </div>

      ${p.kopta.includes("flaggor") || p.kopta.includes("jul") ? `
        <div class="set-row">
          <b>Takpynt</b>
          <div class="seg-group">
            ${p.kopta.includes("flaggor") ? `<button class="seg-btn" id="tog-flaggor" type="button" aria-pressed="${!!mv.flaggor}">🇸🇪 Flaggor</button>` : ""}
            ${p.kopta.includes("jul") ? `<button class="seg-btn" id="tog-jul" type="button" aria-pressed="${!!mv.jul}">✨ Lampor</button>` : ""}
          </div>
        </div>
      ` : `<p style="font-size:.82rem;color:var(--ink-2);text-align:center">Tips: Köp flaggor och julbelysning i Skattkistan!</p>`}
    ` : flik === "modeller" ? `
      <div style="display:grid;gap:10px">
        ${VAGNTYPER.map(t => `
          <div class="panel" style="margin:0;padding:12px">
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px">
              <h3>${t.typ} · ${escapeHtml(t.smek)}</h3>
              <small style="color:var(--ink-2)">${t.langd} m · ${t.byggd}</small>
            </div>
            ${vagnSidoSVG(t, { stor: false })}
            <p style="font-size:.86rem;margin-top:6px;line-height:1.35">${escapeHtml(t.om)}</p>
          </div>
        `).join("")}
      </div>
    ` : `
      <p style="font-size:.88rem;color:var(--ink-2);margin-bottom:10px">
        Känn igen spårvagnsmodeller under resan för att samla Göteborgs namngivna vagnar!
      </p>
      <div class="grid-cards">
        ${ALLA_VAGNKORT_NR.map(nr => {
          const har = (p.vagnkort || []).includes(nr);
          const k = vagnkortFor(nr);
          return `<div class="mini-card ${har ? "" : "locked"}" style="${nr === fokusKortNr ? "background:#FFF3BF" : ""}">
            <b style="font-family:'Baloo 2',system-ui;font-size:1.1rem">#${nr} · ${k.typ.typ}</b>
            ${vagnSidoSVG(k.typ, { nr, stor: true })}
            <div style="font-size:.85rem;font-weight:800">${har ? escapeHtml(k.namn || k.typ.smek) : "???"}</div>
            ${har && k.namnOm ? `<small style="font-size:.74rem;color:var(--ink-2)">${escapeHtml(k.namnOm)}</small>` : ""}
          </div>`;
        }).join("")}
      </div>
    `}
  `);

  $("#stang-sheet").onclick = () => { stangSheet(); if(aktivSkarm === "home") renderHome(); };
  $("#flik-bygg").onclick = () => { SFX.klick(); openMinVagn("bygg"); };
  $("#flik-modeller").onclick = () => { SFX.klick(); openMinVagn("modeller"); };
  $("#flik-kort").onclick = () => { SFX.klick(); openMinVagn("kort"); };

  sheetEl.querySelectorAll("[data-vtyp]").forEach(b => {
    b.onclick = () => {
      SFX.klick();
      const nt = vagnTypAv(b.dataset.vtyp);
      mv.typ = nt.typ;
      mv.nr = nt.fran;
      mv.byggd = true;
      kollaMarken(p);
      spara();
      prata(`${nt.typ}, ${nt.smek}!`, { settings: p.settings });
      openMinVagn("bygg");
    };
  });
  sheetEl.querySelectorAll("[data-steg]").forEach(b => {
    b.onclick = () => {
      SFX.klick();
      mv.nr = stegaVagnNummer(typ, mv.nr, Number(b.dataset.steg));
      mv.byggd = true;
      kollaMarken(p);
      spara();
      const k = vagnkortFor(mv.nr);
      prata(k && k.namn ? `Vagn ${mv.nr}, ${k.namn}` : `Vagn ${mv.nr}`, { settings: p.settings });
      openMinVagn("bygg");
    };
  });
  sheetEl.querySelectorAll("[data-vlinje]").forEach(b => {
    b.onclick = () => {
      SFX.klick();
      mv.ref = b.dataset.vlinje;
      mv.byggd = true;
      spara();
      openMinVagn("bygg");
    };
  });
  if($("#vagn-vand")) $("#vagn-vand").onclick = () => { SFX.klick(); mv.rikt = mv.rikt === -1 ? 1 : -1; spara(); openMinVagn("bygg"); };
  if($("#tog-flaggor")) $("#tog-flaggor").onclick = () => { SFX.klick(); mv.flaggor = !mv.flaggor; spara(); openMinVagn("bygg"); };
  if($("#tog-jul")) $("#tog-jul").onclick = () => { SFX.klick(); mv.jul = !mv.jul; spara(); openMinVagn("bygg"); };
}

/* ── Skattkistan ─────────────────────────────────────────────────────── */
function openSkattkistan(){
  const p = P();
  oppnaSheet(`
    <div class="sheet-head">
      <h2>🪙 Skattkistan (${p.coins} mynt)</h2>
      <button class="icon-btn" id="stang-sheet" type="button" aria-label="Stäng">✕</button>
    </div>
    <h3 style="margin-bottom:8px">Till kompisen</h3>
    <div class="grid-cards" style="margin-bottom:14px">
      ${TILLBEHOR.map(t => {
        const ager = p.kopta.includes(t.id);
        const pa = p.tillbehor === t.id;
        return `<div class="mini-card">
          <div style="width:68px">${charSVG(p.char, "happy", t.id)}</div>
          <b>${t.name}</b>
          ${ager
            ? `<button class="btn btn-sm ${pa ? "btn-green" : "btn-soft"}" data-hatt="${t.id}" type="button">${pa ? "På ✓" : "Ta på"}</button>`
            : `<button class="btn btn-sm" data-kop="${t.id}" data-pris="${t.pris}" type="button" ${p.coins < t.pris ? "disabled" : ""}>🪙 ${t.pris}</button>`}
        </div>`;
      }).join("")}
    </div>

    <h3 style="margin-bottom:8px">Till min spårvagn</h3>
    <div class="grid-cards" style="margin-bottom:14px">
      ${VAGN_PYNT.map(v => {
        const ager = p.kopta.includes(v.id);
        return `<div class="mini-card">
          <div style="font-size:2.2rem">${v.bild}</div>
          <b>${v.name}</b>
          <small style="font-size:.75rem;color:var(--ink-2)">${v.desc}</small>
          ${ager
            ? `<span style="color:var(--grass-deep);font-weight:800">Köpt ✓</span>`
            : `<button class="btn btn-sm" data-kop="${v.id}" data-pris="${v.pris}" type="button" ${p.coins < v.pris ? "disabled" : ""}>🪙 ${v.pris}</button>`}
        </div>`;
      }).join("")}
    </div>

    <h3 style="margin-bottom:8px">Saker på startskärmen</h3>
    <div class="grid-cards">
      ${LEKSAKER.map(l => {
        const ager = p.kopta.includes(l.id);
        return `<div class="mini-card">
          <div style="font-size:2.2rem">${l.bild}</div>
          <b>${l.name}</b>
          ${ager
            ? `<span style="color:var(--grass-deep);font-weight:800">Äger ✓</span>`
            : `<button class="btn btn-sm" data-kop="${l.id}" data-pris="${l.pris}" type="button" ${p.coins < l.pris ? "disabled" : ""}>🪙 ${l.pris}</button>`}
        </div>`;
      }).join("")}
    </div>
  `);
  $("#stang-sheet").onclick = () => { stangSheet(); renderTopBar(); if(aktivSkarm === "home") renderHome(); };
  sheetEl.querySelectorAll("[data-kop]").forEach(b => {
    b.onclick = () => {
      const id = b.dataset.kop, pris = Number(b.dataset.pris);
      if(p.coins < pris || p.kopta.includes(id)) return;
      p.coins -= pris;
      p.kopta.push(id);
      if(TILLBEHOR.some(t => t.id === id)) p.tillbehor = id;
      if(id === "flaggor") p.minVagn.flaggor = true;
      if(id === "jul") p.minVagn.jul = true;
      spara();
      SFX.fanfar();
      konfetti();
      renderTopBar();
      openSkattkistan();
    };
  });
  sheetEl.querySelectorAll("[data-hatt]").forEach(b => {
    b.onclick = () => {
      SFX.klick();
      const id = b.dataset.hatt;
      p.tillbehor = p.tillbehor === id ? null : id;
      spara();
      renderTopBar();
      openSkattkistan();
    };
  });
}

/* ── Mina ord & Märken ───────────────────────────────────────────────── */
function openMinaOrdOchMarken(flik = "ord"){
  const p = P();
  const stil = stilAv(p);
  const klarade = new Set(p.klaradeOrd || []);
  oppnaSheet(`
    <div class="sheet-head">
      <h2>📖 Mina ord &amp; märken</h2>
      <button class="icon-btn" id="stang-sheet" type="button" aria-label="Stäng">✕</button>
    </div>
    <div class="stava-mode-bar">
      <button class="mode-chip" id="flik-ord" type="button" aria-pressed="${flik === "ord"}">📖 Mina ord (${klarade.size}/${ORDBANK.length})</button>
      <button class="mode-chip" id="flik-marken" type="button" aria-pressed="${flik === "marken"}">🏆 Märken (${(p.badges || []).length}/${MARKEN.length})</button>
    </div>
    ${flik === "ord" ? `
      <p style="font-size:.88rem;color:var(--ink-2);margin-bottom:10px">Tryck på ett ord du läst för att höra det ljuda!</p>
      <div class="grid-cards">
        ${ORDBANK.map(o => {
          const har = klarade.has(o.ord);
          return `<button class="mini-card ${har ? "" : "locked"}" data-hor-ord="${escapeHtml(o.ord)}" type="button" style="cursor:pointer;font-family:inherit;color:inherit">
            ${ordBildHTML(o, false)}
            <b style="font-family:'Baloo 2',system-ui;font-size:1.15rem">${har ? escapeHtml(formatOrd(o.ord, stil)) : "???"}</b>
          </button>`;
        }).join("")}
      </div>
    ` : `
      <div class="grid-cards">
        ${MARKEN.map(m => {
          const har = (p.badges || []).includes(m.id);
          return `<div class="mini-card ${har ? "" : "locked"}">
            <div style="font-size:2.2rem">${m.emoji}</div>
            <b>${escapeHtml(m.name)}</b>
            <small style="font-size:.76rem;color:var(--ink-2)">${escapeHtml(m.desc)}</small>
          </div>`;
        }).join("")}
      </div>
    `}
  `);
  $("#stang-sheet").onclick = stangSheet;
  $("#flik-ord").onclick = () => { SFX.klick(); openMinaOrdOchMarken("ord"); };
  $("#flik-marken").onclick = () => { SFX.klick(); openMinaOrdOchMarken("marken"); };
  sheetEl.querySelectorAll("[data-hor-ord]").forEach(b => {
    b.onclick = () => {
      const ord = b.dataset.horOrd;
      if(!klarade.has(ord)) return;
      aktiveraForstaTryck();
      ljudaOrd(ord, p.settings);
    };
  });
}

/* ── Mina resor & Väggkarta ──────────────────────────────────────────── */
function openMinaResor(){
  const p = P();
  const bes = new Set(p.visitedStops || []);
  oppnaSheet(`
    <div class="sheet-head">
      <h2>🗺️ Mina resor i Göteborg</h2>
      <button class="icon-btn" id="stang-sheet" type="button" aria-label="Stäng">✕</button>
    </div>
    <div class="panel" style="background:#E8F6FF;margin-bottom:12px;text-align:center">
      <div style="font-family:'Baloo 2',system-ui;font-size:1.6rem;font-weight:800">${bes.size} av ${ALLA_STOPP.length} hållplatser</div>
      <small style="color:var(--ink-2)">${(p.linesDone || []).length} hela linjer · ${p.resmalKlarade || 0} klarade resmål</small>
      <div style="margin-top:10px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-sm" id="spara-vaggkarta" type="button">🖼️ Spara väggkarta (PNG)</button>
        <button class="btn btn-sm btn-soft" id="skriv-ut-karta" type="button">🖨️ Skriv ut karta</button>
      </div>
    </div>
    ${TRAM_LINES.map(l => {
      const n = l.stops.filter(s => bes.has(s)).length;
      const pct = Math.round(n / l.stops.length * 100);
      const dark = ljusFarg(l.col);
      return `<div class="linje-rad">
        <span class="linje-bricka" style="width:36px;height:36px;font-size:1.2rem;background:${l.col};color:${dark ? INK : "#FFFDF7"}">${l.ref}</span>
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;font-size:.88rem">
            <b>${escapeHtml(l.a)} – ${escapeHtml(l.b)}</b>
            <span>${n}/${l.stops.length}</span>
          </div>
          <div class="linje-bar"><span style="width:${pct}%;background:${pct === 100 ? "var(--grass)" : l.col.toLowerCase() === "#ffffff" ? "#7C749E" : l.col}"></span></div>
        </div>
      </div>`;
    }).join("")}
  `);
  $("#stang-sheet").onclick = stangSheet;
  $("#spara-vaggkarta").onclick = () => sparaVaggkartaPNG(p);
  $("#skriv-ut-karta").onclick = () => {
    const w = window.open("", "_blank");
    if(!w) return;
    w.document.write(`<!doctype html><title>${escapeHtml(p.name)}s Ordjakt</title><body style="margin:0">${vaggKartaSVG(p)}</body>`);
    w.document.close();
    setTimeout(() => w.print(), 250);
  };
}

function sparaVaggkartaPNG(p){
  const svgStr = vaggKartaSVG(p);
  const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const c = document.createElement("canvas");
    c.width = 1600; c.height = 1780;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#FFFDF7";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    c.toBlob(b => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `ordjakten-karta-${(p.name || "adam").toLowerCase()}.png`;
      a.click();
    });
  };
  img.src = url;
}

/* ── Inställningar & Föräldrasidan ("Så går det") ────────────────────── */
function openInstallningar(){
  const p = P();
  const s = p.settings;
  const nivaAvr = Math.max(1, Math.min(6, Math.round(s.niva || 2)));
  const nObj = NIVAAER[nivaAvr - 1];
  const roster = svenskaRoster();

  oppnaSheet(`
    <div class="sheet-head">
      <h2>⚙️ Inställningar</h2>
      <button class="icon-btn" id="stang-sheet" type="button" aria-label="Stäng">✕</button>
    </div>

    <details class="set-group" open>
      <summary>🔤 Bokstäver &amp; läsnivå <span>▾</span></summary>
      <div class="set-body">
        <div class="set-row" style="flex-wrap:wrap">
          <span><b>Bokstavsform</b><small>VERSALER rekommenderas vid nybörjarläsning</small></span>
          <div class="seg-group">
            <button class="seg-btn" data-stil="versaler" type="button" aria-pressed="${s.bokstavsStil === "versaler"}">VERSALER</button>
            <button class="seg-btn" data-stil="gemener" type="button" aria-pressed="${s.bokstavsStil === "gemener"}">gemener</button>
            <button class="seg-btn" data-stil="blandat" type="button" aria-pressed="${s.bokstavsStil === "blandat"}">Blandat</button>
          </div>
        </div>

        <div class="set-row" style="display:block">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
            <span><b>Läsnivå: ${nivaAvr}. ${escapeHtml(nObj.namn)}</b><small>${escapeHtml(nObj.kort)}</small></span>
            <div class="seg-group">
              <button class="seg-btn" id="niva-ned" type="button">−</button>
              <button class="seg-btn" id="niva-upp" type="button">+</button>
            </div>
          </div>
          <div class="niva-meter">
            ${NIVAAER.map(n => `<span class="niva-pip" style="background:${n.id <= nivaAvr ? n.farg : "var(--paper)"}"></span>`).join("")}
          </div>
          <div class="seg-group" style="margin-top:6px">
            <button class="seg-btn" data-nlage="stigande" type="button" aria-pressed="${s.nivaLage !== "fast"}">Stigande (anpassar sig)</button>
            <button class="seg-btn" data-nlage="fast" type="button" aria-pressed="${s.nivaLage === "fast"}">Fast nivå</button>
          </div>
        </div>

        <div class="set-row">
          <span><b>Stava &amp; bygga ord</b><small>Hur ord byggs som standard</small></span>
          <div class="seg-group">
            <button class="seg-btn" data-stava="brickor" type="button" aria-pressed="${s.stavaLage !== "tangentbord"}">🧱 Brickor</button>
            <button class="seg-btn" data-stava="tangentbord" type="button" aria-pressed="${s.stavaLage === "tangentbord"}">⌨️ Tangentbord</button>
          </div>
        </div>

        <div class="set-row"><span><b>Ljuda &amp; läsa ord</b></span><button class="seg-btn" data-tog="lasa" type="button" aria-pressed="${s.lasa !== false}">${s.lasa !== false ? "På" : "Av"}</button></div>
        <div class="set-row"><span><b>Stava &amp; bygga ord</b></span><button class="seg-btn" data-tog="stava" type="button" aria-pressed="${s.stava !== false}">${s.stava !== false ? "På" : "Av"}</button></div>
        <div class="set-row"><span><b>Göteborgs skyltar &amp; vagnar</b></span><button class="seg-btn" data-tog="gbg" type="button" aria-pressed="${s.gbg !== false}">${s.gbg !== false ? "På" : "Av"}</button></div>
      </div>
    </details>

    <details class="set-group">
      <summary>🔊 Ljud &amp; röst <span>▾</span></summary>
      <div class="set-body">
        <div class="set-row"><span><b>Ljudeffekter</b></span><button class="seg-btn" data-tog="sound" type="button" aria-pressed="${s.sound !== false}">${s.sound !== false ? "På" : "Av"}</button></div>
        <div class="set-row"><span><b>Uppläsning</b></span><button class="seg-btn" data-tog="voice" type="button" aria-pressed="${s.voice !== false}">${s.voice !== false ? "På" : "Av"}</button></div>
        <div class="set-row">
          <span><b>Rösthastighet</b></span>
          <div class="seg-group">
            ${["Långsam", "Lagom", "Snabb"].map((lbl, i) => `<button class="seg-btn" data-rate="${i}" type="button" aria-pressed="${(s.rate ?? 1) === i}">${lbl}</button>`).join("")}
          </div>
        </div>
        ${KLIPP.finns && KLIPP.finns.size ? `
          <div class="set-row">
            <span><b>Klippröst (${escapeHtml(KLIPP.rost || "Alva")})</b><small>${KLIPP.finns.size} inlästa hållplatser &amp; fraser</small></span>
            <button class="seg-btn" data-tog="klipprost" type="button" aria-pressed="${s.klipprost !== false}">${s.klipprost !== false ? "På" : "Av"}</button>
          </div>
        ` : ""}
        <div class="set-row">
          <span><b>Spela även på tyst läge</b><small>Bra på iPhone/iPad</small></span>
          <button class="seg-btn" data-tog="spelaPaTyst" type="button" aria-pressed="${!!s.spelaPaTyst}">${s.spelaPaTyst ? "På" : "Av"}</button>
        </div>
        ${roster.length ? `
          <div class="set-row" style="flex-wrap:wrap">
            <span><b>Röst på enheten</b></span>
            <select id="voice-sel" style="padding:6px 10px;border-radius:10px;border:2px solid var(--ink);font-family:inherit;font-weight:700;max-width:220px">
              <option value="auto" ${s.voiceURI === "auto" ? "selected" : ""}>Automatiskt (bästa)</option>
              <option value="system" ${s.voiceURI === "system" ? "selected" : ""}>Plattans val (iPad Premium)</option>
              ${roster.map(v => `<option value="${escapeHtml(v.voiceURI)}" ${s.voiceURI === v.voiceURI ? "selected" : ""}>${escapeHtml(v.name)}</option>`).join("")}
            </select>
          </div>
        ` : ""}
        <button class="btn btn-sm btn-soft" id="testa-rost" type="button">🔊 Testa rösten</button>
      </div>
    </details>

    <details class="set-group">
      <summary>📊 Så går det för ${escapeHtml(p.name)} <span>▾</span></summary>
      <div class="set-body">
        ${renderSaGarDetHTML(p)}
      </div>
    </details>

    <details class="set-group">
      <summary>👤 Spelaren &amp; för vuxna <span>▾</span></summary>
      <div class="set-body">
        <div class="set-row"><span><b>Riktiga hållplatsfoton</b></span><button class="seg-btn" data-tog="foton" type="button" aria-pressed="${s.foton !== false}">${s.foton !== false ? "På" : "Av"}</button></div>
        <div class="set-row"><span><b>Minska rörelse</b></span><button class="seg-btn" data-tog="minskaRorelse" type="button" aria-pressed="${!!s.minskaRorelse}">${s.minskaRorelse ? "På" : "Av"}</button></div>
        <div style="display:grid;gap:8px;grid-template-columns:1fr 1fr">
          <button class="btn btn-sm btn-soft" id="spara-kopia" type="button">💾 Spara kopia</button>
          <button class="btn btn-sm btn-soft" id="las-kopia" type="button">📂 Läs in kopia</button>
          <button class="btn btn-sm btn-soft" id="visa-fotokredit" type="button">📸 Fotografer</button>
          <button class="btn btn-sm btn-soft" id="byt-spelare" type="button">👥 Byt spelare</button>
        </div>
        <button class="btn btn-sm btn-danger" id="ta-bort-spelare" type="button">🗑️ Ta bort ${escapeHtml(p.name)}</button>
        <small style="text-align:center;color:var(--ink-2)">Ordjakten version ${SPELVERSION} · Allt sparas lokalt i webbläsaren</small>
      </div>
    </details>
  `);

  $("#stang-sheet").onclick = () => {
    stangSheet();
    if(aktivSkarm === "home") renderHome();
    else if(aktivSkarm === "resa") renderResa();
  };

  sheetEl.querySelectorAll("[data-stil]").forEach(b => {
    b.onclick = () => { SFX.klick(); s.bokstavsStil = b.dataset.stil; spara(); openInstallningar(); };
  });
  sheetEl.querySelectorAll("[data-nlage]").forEach(b => {
    b.onclick = () => { SFX.klick(); s.nivaLage = b.dataset.nlage; spara(); openInstallningar(); };
  });
  sheetEl.querySelectorAll("[data-stava]").forEach(b => {
    b.onclick = () => { SFX.klick(); s.stavaLage = b.dataset.stava; spara(); openInstallningar(); };
  });
  $("#niva-ned").onclick = () => { SFX.klick(); s.niva = Math.max(1, Math.round(s.niva || 2) - 1); spara(); openInstallningar(); };
  $("#niva-upp").onclick = () => { SFX.klick(); s.niva = Math.min(6, Math.round(s.niva || 2) + 1); spara(); openInstallningar(); };
  sheetEl.querySelectorAll("[data-rate]").forEach(b => {
    b.onclick = () => { SFX.klick(); s.rate = Number(b.dataset.rate); spara(); openInstallningar(); };
  });
  sheetEl.querySelectorAll("[data-tog]").forEach(b => {
    b.onclick = () => {
      const k = b.dataset.tog;
      const nu = k === "spelaPaTyst" || k === "minskaRorelse" ? !!s[k] : s[k] !== false;
      s[k] = !nu;
      /* Minst en övningstyp på */
      if(s.lasa === false && s.stava === false && s.gbg === false) s.lasa = true;
      spara();
      synkaLjudInstallningar();
      if(k === "spelaPaTyst") vackLjud(!!s.spelaPaTyst);
      SFX.klick();
      openInstallningar();
    };
  });
  const vs = $("#voice-sel");
  if(vs) vs.onchange = () => { s.voiceURI = vs.value; spara(); };
  $("#testa-rost").onclick = () => {
    aktiveraForstaTryck();
    prata(`Hej ${p.name}! Sol, bil och tåg. Nästa hållplats: Chalmers!`, { settings: s, namn: p.name });
  };
  $("#spara-kopia").onclick = () => exporteraKopia();
  $("#las-kopia").onclick = () => oppnaImportDialog();
  $("#visa-fotokredit").onclick = () => openFotokredit();
  $("#byt-spelare").onclick = () => { stangSheet(); renderWelcome(); };
  $("#ta-bort-spelare").onclick = () => openTaBortSpelare(p);
}

const SORT_NAMN = {
  "las-bild": "Läs ordet → bild",
  "bild-ord": "Bild → välj ord",
  "forsta-ljud": "Första bokstavsljudet",
  "lucka": "Bokstav som fattas",
  "bygg-ord": "Bygg ord med bokstäver",
  "skylt-las": "Destinationsskyltar",
  "hallplats-skylt": "Hållplatsskyltar",
  "bygg-hallplats": "Bygg hållplats / vagnord",
  "vagn-modell": "Spårvagnsmodeller"
};

function renderSaGarDetHTML(p){
  const dagar = (p.stats && p.stats.dagar) || {};
  const sorter = (p.stats && p.stats.sorter) || {};
  const idag = dagar[idagStr()] || { antal: 0, direkt: 0, sek: 0 };
  const rader = Object.entries(sorter)
    .map(([k, v]) => ({ k, namn: SORT_NAMN[k] || k, antal: v.antal || 0, pct: v.antal ? Math.round((v.direkt || 0) / v.antal * 100) : 0 }))
    .sort((a, b) => a.pct - b.pct);
  const klur = p.kluringar || [];
  return `
    <div class="set-row">
      <span><b>Idag</b><small>${Math.round((idag.sek || 0) / 60)} min · ${idag.antal} uppgifter (${idag.direkt} rätt direkt)</small></span>
      <span><b>Bästa svit: ${p.bestStreak || 0}</b></span>
    </div>
    ${rader.length ? rader.map(r => {
      const farg = r.pct < 65 ? "#FF6B6B" : r.pct < 85 ? "#FFC42E" : "#57C96B";
      return `<div class="set-row">
        <span><b>${escapeHtml(r.namn)}</b><small>${r.antal} uppgifter</small></span>
        <span style="padding:3px 10px;border-radius:999px;border:2px solid var(--ink);background:${farg};font-weight:800">${r.pct}%</span>
      </div>`;
    }).join("") : `<p style="font-size:.86rem;color:var(--ink-2)">Ingen statistik än — åk en hållplats för att börja!</p>`}
    ${klur.length ? `<div style="font-size:.84rem;color:var(--ink-2)"><b>Väntande kluringar:</b> ${klur.map(k => escapeHtml(k.ord)).join(", ")}</div>` : ""}
  `;
}

function openFotokredit(){
  oppnaSheet(`
    <div class="sheet-head">
      <h2>📸 Bilderna &amp; fotograferna</h2>
      <button class="icon-btn" id="stang-sheet" type="button" aria-label="Stäng">✕</button>
    </div>
    <p style="font-size:.85rem;color:var(--ink-2);margin-bottom:10px">
      Hållplats- och spårvagnsfotona kommer från Wikimedia Commons och används under sina fria licenser. Kartdata från OpenStreetMap (ODbL) och Västtrafiks spårvagnskarta.
    </p>
    <div style="max-height:52vh;overflow:auto;font-size:.8rem;display:grid;gap:4px">
      ${Object.entries(STOP_PHOTOS).map(([namn, f]) => `<div><b>${escapeHtml(namn)}</b> — ${escapeHtml(f.by)} (${escapeHtml(f.lic)})</div>`).join("")}
      ${TRAM_PHOTOS.map((f, i) => `<div><b>Spårvagnsfoto ${i + 1}</b> — ${escapeHtml(f.by)} (${escapeHtml(f.lic)})</div>`).join("")}
    </div>
  `);
  $("#stang-sheet").onclick = () => openInstallningar();
}

function openTaBortSpelare(p){
  let kvar = 3;
  oppnaSheet(`
    <div class="sheet-head">
      <h2>🗑️ Ta bort ${escapeHtml(p.name)}?</h2>
      <button class="icon-btn" id="stang-sheet" type="button" aria-label="Stäng">✕</button>
    </div>
    <p style="margin-bottom:14px">
      Detta tar bort ${p.coins} mynt, ${(p.visitedStops || []).length} besökta hållplatser och ${(p.klaradeOrd || []).length} lästa ord. Det går inte att ångra.
    </p>
    <div style="display:grid;gap:10px">
      <button class="btn btn-danger" id="bekrafta-tabort" type="button" disabled>Vänta ${kvar} s…</button>
      <button class="btn btn-soft" id="avbryt-tabort" type="button">Behåll spelaren</button>
    </div>
  `);
  const btn = $("#bekrafta-tabort");
  const timer = setInterval(() => {
    kvar--;
    if(kvar <= 0){
      clearInterval(timer);
      if(btn){ btn.disabled = false; btn.textContent = `Ja, ta bort ${p.name}`; }
    }else if(btn){
      btn.textContent = `Vänta ${kvar} s…`;
    }
  }, 1000);
  const avbryt = () => { clearInterval(timer); openInstallningar(); };
  $("#stang-sheet").onclick = avbryt;
  $("#avbryt-tabort").onclick = avbryt;
  btn.onclick = () => {
    clearInterval(timer);
    DATA.players = DATA.players.filter(x => x.id !== p.id);
    DATA.activeId = DATA.players[0]?.id || null;
    spara();
    stangSheet();
    renderWelcome();
  };
}

function exporteraKopia(){
  const payload = JSON.stringify({
    app: "ordjakten",
    version: SPELVERSION,
    datum: new Date().toISOString(),
    players: DATA.players
  }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `ordjakten-kopia-${idagStr()}.json`;
  a.click();
  DATA.senastKopia = idagStr();
  spara();
}

function oppnaImportDialog(){
  const inp = document.createElement("input");
  inp.type = "file";
  inp.accept = ".json,application/json";
  inp.onchange = async () => {
    const file = inp.files?.[0];
    if(!file) return;
    try{
      const txt = await file.text();
      const rena = valideraKopia(JSON.parse(txt));
      if(!rena){ alert("Filen verkar inte vara en giltig säkerhetskopia från Ordjakten."); return; }
      for(const ny of rena){
        const i = DATA.players.findIndex(x => x.id === ny.id || x.name.toLowerCase() === ny.name.toLowerCase());
        if(i >= 0) DATA.players[i] = ny;
        else DATA.players.push(ny);
      }
      DATA.activeId = rena[0].id;
      spara();
      stangSheet();
      synkaLjudInstallningar();
      renderHome();
    }catch(_){
      alert("Kunde inte läsa filen.");
    }
  };
  inp.click();
}

/* ── Start ───────────────────────────────────────────────────────────── */
if("serviceWorker" in navigator && /^https?:$/.test(location.protocol)){
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
document.addEventListener("visibilitychange", () => {
  if(document.hidden) stoppaTal();
});
klippProva();
synkaLjudInstallningar();
if(P()) renderHome();
else renderWelcome();
