/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Uppgiftsgenerator, förvillare, kluringar & nivåmotor
   Rena funktioner utan DOM-beroenden, testbara direkt i Node.
   ═══════════════════════════════════════════════════════════════ */

import {
  TRAM_LINES, ALLA_STOPP, VAGNTYPER, VAGNAR, VAGNNAMN,
  avgangarFran, vagnkortFor
} from "./gbg-data.mjs";
import {
  ALFABET, VOKALER, BOKSTAVSGRANNAR, ORDBANK, BYGG_HALLPLATSER,
  VAGN_NAMN_ORD, formatOrd, bokstaverI, hittaOrd
} from "./ord-data.mjs";

export function rnd(n){ return Math.floor(Math.random() * n); }
export function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = rnd(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export function pick(arr){ return arr[rnd(arr.length)]; }

/* ── Urval ur ordbanken utifrån nivå (1–6) ───────────────────────────── */
export function ordPoolFor(niva){
  const n = Math.max(1, Math.min(6, Math.round(niva)));
  if(n <= 1) return ORDBANK.filter(o => o.niva <= 2 && o.ord.length <= 3);
  if(n === 2) return ORDBANK.filter(o => o.niva === 2);
  if(n === 3) return ORDBANK.filter(o => o.niva === 2 || o.niva === 3);
  if(n === 4) return ORDBANK.filter(o => o.niva === 3 || o.niva === 4);
  return ORDBANK.filter(o => o.niva >= 3);
}

function valjOrd(pool, undvik){
  const fria = pool.filter(o => !undvik.has("ord:" + o.ord.toLowerCase()));
  return pick(fria.length ? fria : pool);
}

/* Smarta förvillare bland ord: tar först ordens egna förvillare om de finns i banken,
   fyller sedan på med ord med samma begynnelsebokstav eller liknande längd. */
function smartaOrdfel(target, antal, baraIBanken = true){
  const out = [];
  const seen = new Set([target.ord.toLowerCase()]);
  const lagg = (obj) => {
    if(!obj) return;
    const k = obj.ord.toLowerCase();
    if(seen.has(k)) return;
    seen.add(k);
    out.push(obj);
  };
  for(const f of shuffle(target.forvillare || [])){
    if(out.length >= antal) break;
    const iBank = hittaOrd(f);
    if(iBank) lagg(iBank);
    else if(!baraIBanken) lagg({ ord: f, niva: target.niva });
  }
  const forsta = target.ord[0].toLowerCase();
  const sammaBorjan = shuffle(ORDBANK.filter(o => o.ord[0].toLowerCase() === forsta && !seen.has(o.ord.toLowerCase())));
  for(const o of sammaBorjan){ if(out.length >= antal) break; lagg(o); }
  const sammaLangd = shuffle(ORDBANK.filter(o => Math.abs(o.ord.length - target.ord.length) <= 1 && !seen.has(o.ord.toLowerCase())));
  for(const o of sammaLangd){ if(out.length >= antal) break; lagg(o); }
  for(const o of shuffle(ORDBANK)){ if(out.length >= antal) break; lagg(o); }
  return out.slice(0, antal);
}

/* ── 1. LJUDA & LÄSA ORD ────────────────────────────────────────────── */

/* Läs ordet på kortet (med ljudhjälp per bokstav) → välj rätt bild */
export function gorLasBild(niva, undvik = new Set()){
  const pool = ordPoolFor(niva);
  const w = valjOrd(pool, undvik);
  const antalAlt = niva <= 2 ? 3 : 4;
  const fel = smartaOrdfel(w, antalAlt - 1, true);
  const alt = shuffle([w, ...fel]).map(x => ({
    varde: x.ord,
    bild: x.bild,
    bg: x.bg,
    ord: x.ord
  }));
  return {
    id: `las-bild:${w.ord}`,
    typ: "las-bild",
    grupp: "lasa",
    niva: Math.round(niva),
    ord: w.ord,
    ordObj: w,
    svar: w.ord,
    alternativ: alt,
    forsok: niva <= 2 ? 3 : 2,
    fragaText: "Läs ordet! Vilken bild är det?",
    talText: "Läs ordet! Vilken bild är det?",
    kanLjuda: true,
    nyckel: "ord:" + w.ord.toLowerCase()
  };
}

/* Se bilden → välj rätt skrivet ord */
export function gorBildOrd(niva, undvik = new Set()){
  const pool = ordPoolFor(niva);
  const w = valjOrd(pool, undvik);
  const antalAlt = niva <= 2 ? 3 : 4;
  const fel = smartaOrdfel(w, antalAlt - 1, false);
  const alt = shuffle([w, ...fel]).map(x => ({
    varde: x.ord,
    text: x.ord
  }));
  return {
    id: `bild-ord:${w.ord}`,
    typ: "bild-ord",
    grupp: "lasa",
    niva: Math.round(niva),
    ord: w.ord,
    ordObj: w,
    svar: w.ord,
    alternativ: alt,
    forsok: niva <= 2 ? 3 : 2,
    fragaText: "Vilket ord passar till bilden?",
    talText: `Vilket ord är ${w.ord}?`,
    kanLjuda: false,
    nyckel: "ord:" + w.ord.toLowerCase()
  };
}

/* Första ljudet (särskilt på nivå 1–2) */
export function gorForstaLjud(niva, undvik = new Set()){
  const pool = ordPoolFor(Math.min(niva, 3));
  const w = valjOrd(pool, undvik);
  const ratt = w.ord[0].toLocaleUpperCase("sv");
  const grannar = shuffle(BOKSTAVSGRANNAR[ratt] || ["A", "S", "M", "L"]);
  const fel = [];
  for(const g of grannar){ if(g !== ratt && !fel.includes(g)) fel.push(g); if(fel.length >= 3) break; }
  while(fel.length < 3){
    const c = pick(ALFABET);
    if(c !== ratt && !fel.includes(c)) fel.push(c);
  }
  const antalAlt = niva <= 1 ? 3 : 4;
  return {
    id: `forsta-ljud:${w.ord}`,
    typ: "forsta-ljud",
    grupp: "lasa",
    niva: Math.round(niva),
    ord: w.ord,
    ordObj: w,
    svar: ratt,
    alternativ: shuffle([ratt, ...fel.slice(0, antalAlt - 1)]).map(ch => ({ varde: ch, text: ch })),
    forsok: 3,
    fragaText: "Vilken bokstav börjar ordet på?",
    talText: `Vilken bokstav börjar ${w.ord} på?`,
    kanLjuda: false,
    nyckel: "ord:" + w.ord.toLowerCase()
  };
}

/* ── 2. STAVA & BYGGA ORD ───────────────────────────────────────────── */

/* Vilken bokstav fattas i ordet? (t.ex. S _ L) */
export function gorLucka(niva, undvik = new Set()){
  const pool = ordPoolFor(niva).filter(o => o.ord.length >= 3 && o.ord.length <= 7);
  const w = valjOrd(pool.length ? pool : ORDBANK.filter(o => o.ord.length >= 3), undvik);
  const bokst = [...w.ord.toLocaleUpperCase("sv")];
  /* På nivå 1–2 saknas helst första eller sista bokstaven; på nivå 3+ även vokalen i mitten */
  let idx;
  if(niva <= 2){
    idx = pick([0, bokst.length - 1, Math.min(1, bokst.length - 1)]);
  }else{
    idx = rnd(bokst.length);
  }
  const ratt = bokst[idx];
  const grannar = shuffle(BOKSTAVSGRANNAR[ratt] || []);
  const vokalPool = VOKALER.has(ratt) ? shuffle([...VOKALER]) : shuffle(ALFABET.filter(c => !VOKALER.has(c)));
  const fel = [];
  for(const c of [...grannar, ...vokalPool]){
    if(c !== ratt && !fel.includes(c)) fel.push(c);
    if(fel.length >= 3) break;
  }
  const antalAlt = niva <= 2 ? 3 : 4;
  return {
    id: `lucka:${w.ord}:${idx}`,
    typ: "lucka",
    grupp: "stava",
    niva: Math.round(niva),
    ord: w.ord,
    ordObj: w,
    luckIndex: idx,
    bokstaver: bokst,
    svar: ratt,
    alternativ: shuffle([ratt, ...fel.slice(0, antalAlt - 1)]).map(ch => ({ varde: ch, text: ch })),
    forsok: niva <= 2 ? 3 : 2,
    fragaText: "Vilken bokstav fattas?",
    talText: `Vilken bokstav fattas i ${w.ord}?`,
    nyckel: "ord:" + w.ord.toLowerCase()
  };
}

/* Bygg hela ordet med bokstavsbrickor (eller tangentbord) */
export function gorByggOrd(niva, undvik = new Set()){
  const maxLen = niva <= 2 ? 3 : niva === 3 ? 4 : niva === 4 ? 6 : 8;
  const minLen = niva <= 1 ? 2 : 3;
  const pool = ordPoolFor(niva).filter(o => o.ord.length >= minLen && o.ord.length <= maxLen);
  const w = valjOrd(pool.length ? pool : ORDBANK.filter(o => o.ord.length === 3), undvik);
  const ratt = [...w.ord.toLocaleUpperCase("sv")];
  /* Extra förvillarbrickor: 1 på nivå 2, 2 på nivå 3+ */
  const extraAntal = niva <= 1 ? 0 : niva <= 2 ? 1 : 2;
  const extra = [];
  const anvanda = new Set(ratt);
  for(const ch of shuffle(ratt)){
    for(const g of shuffle(BOKSTAVSGRANNAR[ch] || [])){
      if(extra.length >= extraAntal) break;
      if(!anvanda.has(g)){ extra.push(g); anvanda.add(g); }
    }
  }
  while(extra.length < extraAntal){
    const c = pick(ALFABET);
    if(!anvanda.has(c)){ extra.push(c); anvanda.add(c); }
  }
  const brickor = shuffle([...ratt, ...extra]).map((ch, i) => ({ id: i, ch }));
  return {
    id: `bygg-ord:${w.ord}`,
    typ: "bygg-ord",
    grupp: "stava",
    niva: Math.round(niva),
    ord: w.ord,
    ordObj: w,
    svar: w.ord.toLocaleUpperCase("sv"),
    brickor,
    forsok: 3,
    fragaText: "Bygg ordet!",
    talText: `Bygg ordet ${w.ord}!`,
    nyckel: "ord:" + w.ord.toLowerCase()
  };
}

/* ── 3. GÖTEBORGS- & SPÅRVAGNSLÄSNING ────────────────────────────────── */

/* Läs destinationsskylten! Riktiga linjer från hållplatsen eller nätet. */
export function gorSkyltLas(niva, plats, undvik = new Set()){
  let avg = plats && plats.stopp ? avgangarFran(plats.stopp) : [];
  /* Unika destinationer bland avgångarna */
  const unika = [];
  const seddaDest = new Set();
  for(const a of shuffle(avg)){
    if(!seddaDest.has(a.mot)){
      seddaDest.add(a.mot);
      unika.push(a);
    }
  }
  /* Fyll på från hela nätet om hållplatsen bara har 2 riktningar */
  for(const l of shuffle(TRAM_LINES)){
    for(const mot of [l.a, l.b]){
      if(unika.length >= 4) break;
      if(!seddaDest.has(mot)){
        seddaDest.add(mot);
        unika.push({ ref: l.ref, col: l.col, mot });
      }
    }
  }
  const antalAlt = niva <= 2 ? 3 : 4;
  const valda = unika.slice(0, antalAlt);
  const ratt = valda.find(a => !undvik.has("dest:" + a.mot.toLowerCase())) || valda[0];
  /* Två varianter:
     A) "Vilken vagn åker mot <destination>?" -> tryck på rätt spårvagn med skylt
     B) Visa en stor LED-skylt "[11] BERGSJÖN" -> välj rätt destination bland 3-4 skyltar (eller omvänt) */
  const vagnVal = rnd(2) === 0;
  return {
    id: `skylt-las:${ratt.ref}:${ratt.mot}`,
    typ: "skylt-las",
    grupp: "gbg",
    niva: Math.round(niva),
    ord: ratt.mot,
    svar: ratt.mot,
    rattAvg: ratt,
    vagnVal,
    alternativ: shuffle(valda).map(a => ({
      varde: a.mot,
      ref: a.ref,
      col: a.col,
      mot: a.mot
    })),
    forsok: niva <= 2 ? 3 : 2,
    fragaText: `Vilken vagn åker mot ${ratt.mot}?`,
    talText: `Vilken vagn åker mot ${ratt.mot}?`,
    nyckel: "dest:" + ratt.mot.toLowerCase()
  };
}

/* Hitta rätt hållplatsskylt! Rösten ropar ut en riktig hållplats (Alva Premium-klipp!) */
export function gorHallplatsSkylt(niva, plats, undvik = new Set()){
  const kortLista = ALLA_STOPP.filter(s => s.length <= 10);
  const linjeStopp = plats && plats.linje ? plats.linje.stops : ALLA_STOPP;
  let kandidater;
  if(niva <= 3){
    kandidater = linjeStopp.filter(s => s.length <= 12);
    if(kandidater.length < 3) kandidater = kortLista;
  }else{
    kandidater = linjeStopp.length >= 4 ? linjeStopp : ALLA_STOPP;
  }
  const fria = kandidater.filter(s => !undvik.has("stopp:" + s.toLowerCase()));
  const ratt = pick(fria.length ? fria : kandidater);
  const antalAlt = niva <= 2 ? 3 : 4;
  /* På högre nivåer blandas hållplatser med samma begynnelsebokstav in! */
  const fel = [];
  const seen = new Set([ratt]);
  if(niva >= 4){
    const samma = shuffle(ALLA_STOPP.filter(s => s[0] === ratt[0] && !seen.has(s)));
    for(const s of samma){ if(fel.length >= 2) break; seen.add(s); fel.push(s); }
  }
  const franLinje = shuffle(linjeStopp.filter(s => !seen.has(s) && (niva > 2 || s[0] !== ratt[0])));
  for(const s of franLinje){ if(fel.length >= antalAlt - 1) break; seen.add(s); fel.push(s); }
  for(const s of shuffle(ALLA_STOPP)){
    if(fel.length >= antalAlt - 1) break;
    if(!seen.has(s)){ seen.add(s); fel.push(s); }
  }
  return {
    id: `hallplats-skylt:${ratt}`,
    typ: "hallplats-skylt",
    grupp: "gbg",
    niva: Math.round(niva),
    ord: ratt,
    svar: ratt,
    alternativ: shuffle([ratt, ...fel]).map(s => ({ varde: s, text: s })),
    forsok: niva <= 2 ? 3 : 2,
    fragaText: "Tryck på rätt hållplatsskylt!",
    talText: `Hitta skylten: ${ratt}`,
    nyckel: "stopp:" + ratt.toLowerCase()
  };
}

/* Bygg ett riktigt göteborgskt hållplatsnamn eller spårvagnsnamn med brickor */
export function gorByggHallplats(niva, undvik = new Set()){
  const maxNiva = Math.max(3, Math.min(6, Math.round(niva) + 1));
  const pool = [
    ...BYGG_HALLPLATSER.filter(h => h.niva <= maxNiva),
    ...VAGN_NAMN_ORD.filter(v => v.niva <= maxNiva)
  ];
  const fria = pool.filter(p => !undvik.has("bygg-gbg:" + p.ord.toLowerCase()));
  const vald = pick(fria.length ? fria : pool);
  const ratt = [...vald.ord.toLocaleUpperCase("sv")];
  const extraAntal = niva <= 3 ? 1 : 2;
  const extra = [];
  const anvanda = new Set(ratt);
  for(const ch of shuffle(ratt)){
    for(const g of shuffle(BOKSTAVSGRANNAR[ch] || [])){
      if(extra.length >= extraAntal) break;
      if(!anvanda.has(g)){ extra.push(g); anvanda.add(g); }
    }
  }
  while(extra.length < extraAntal){
    const c = pick(ALFABET);
    if(!anvanda.has(c)){ extra.push(c); anvanda.add(c); }
  }
  const arVagnOrd = !!vald.ledtrad;
  return {
    id: `bygg-hallplats:${vald.ord}`,
    typ: "bygg-hallplats",
    grupp: "gbg",
    niva: Math.round(niva),
    ord: vald.ord,
    arVagnOrd,
    vagnTyp: vald.typ || null,
    ledtrad: vald.ledtrad || `Hållplats i Göteborg`,
    svar: vald.ord.toLocaleUpperCase("sv"),
    brickor: shuffle([...ratt, ...extra]).map((ch, i) => ({ id: i, ch })),
    forsok: 3,
    fragaText: arVagnOrd ? vald.ledtrad : `Bygg hållplatsen ${vald.ord}!`,
    talText: arVagnOrd ? `${vald.ledtrad} Bygg ordet ${vald.ord}!` : `Bygg hållplatsen ${vald.ord}!`,
    nyckel: "bygg-gbg:" + vald.ord.toLowerCase()
  };
}

/* Känn igen & läs spårvagnsmodellen (M28, M29, M31, M31B, M32 Sirio, M33 Flexity, M34) */
export function gorVagnModell(niva, undvik = new Set()){
  const fria = VAGNTYPER.filter(t => !undvik.has("vagn:" + t.typ));
  const ratt = pick(fria.length ? fria : VAGNTYPER);
  const fel = shuffle(VAGNTYPER.filter(t => t.typ !== ratt.typ)).slice(0, niva <= 2 ? 2 : 3);
  /* Lotta också ett vagnkort som kan låsas upp om spelaren klarar frågan */
  const kortKandidater = Object.values(VAGNAR)
    .map(v => v.nr)
    .filter(nr => {
      const k = vagnkortFor(nr);
      return k && k.typ.typ === ratt.typ;
    });
  const bonusKortNr = kortKandidater.length ? pick(kortKandidater) : null;
  const kortInfo = bonusKortNr ? vagnkortFor(bonusKortNr) : null;
  const visaLedtrad = `${ratt.delar.length === 1 ? "En del" : `${ratt.delar.length} delar`} · ${ratt.langd} meter · ${ratt.band === "svart" ? "svart fönsterband" : "vitt fönsterband"}`;
  return {
    id: `vagn-modell:${ratt.typ}`,
    typ: "vagn-modell",
    grupp: "gbg",
    niva: Math.round(niva),
    ord: ratt.typ,
    vagnTyp: ratt,
    bonusKortNr,
    kortInfo,
    svar: ratt.typ,
    ledtrad: visaLedtrad,
    alternativ: shuffle([ratt, ...fel]).map(t => ({
      varde: t.typ,
      text: `${t.typ} ${t.smek}`,
      kortText: t.typ,
      smek: t.smek
    })),
    forsok: 2,
    fragaText: "Vilken spårvagnsmodell är det här?",
    talText: `Vilken spårvagnsmodell är det här? Den är ${ratt.langd} meter lång.`,
    nyckel: "vagn:" + ratt.typ
  };
}

/* ── Pedagogiska felsvarsförklaringar ────────────────────────────────── */
export function forklaraFel(q, valt, stil = "versaler"){
  const fmt = (s) => formatOrd(s, stil);
  if(q.typ === "las-bild"){
    const forsta = fmt(q.svar[0]);
    const slutar = fmt(q.svar[q.svar.length - 1]);
    if(String(valt)[0]?.toLowerCase() === q.svar[0].toLowerCase()){
      return {
        text: `Det där är ${fmt(valt)}! Titta på slutet — ordet slutar på ${slutar}.`,
        tal: `Det där är ${valt}! Titta på slutet.`
      };
    }
    return {
      text: `Det där är ${fmt(valt)}! Börja med ljudet ${forsta}.`,
      tal: `Det där är ${valt}! Lyssna på första bokstaven i ordet.`
    };
  }
  if(q.typ === "bild-ord"){
    const forsta = fmt(q.svar[0]);
    if(String(valt)[0]?.toLowerCase() === q.svar[0].toLowerCase()){
      return {
        text: `Nästan! Båda börjar på ${forsta}, men vi letar efter ${fmt(q.svar)}.`,
        tal: `Nästan! Båda börjar på ${q.svar[0]}, men titta på hela ordet!`
      };
    }
    return {
      text: `Det står ${fmt(valt)}. Lyssna på första ljudet i ${fmt(q.svar)}!`,
      tal: `Det står ${valt}. Lyssna noga på hur ${q.svar} börjar!`
    };
  }
  if(q.typ === "forsta-ljud"){
    return {
      text: `Inte ${fmt(valt)} — lyssna på början av ${fmt(q.ord)}!`,
      tal: `Nej, lyssna hur ${q.ord} börjar!`
    };
  }
  if(q.typ === "lucka"){
    const felOrd = q.bokstaver.map((c, i) => i === q.luckIndex ? String(valt) : c).join("");
    return {
      text: `Med ${fmt(valt)} blir det ${fmt(felOrd)}! Prova en annan bokstav.`,
      tal: `Nej, prova en annan bokstav så blir det ${q.ord}!`
    };
  }
  if(q.typ === "bygg-ord" || q.typ === "bygg-hallplats"){
    const ratta = q.svar;
    const inmat = String(valt || "").toLocaleUpperCase("sv");
    if(inmat[0] && inmat[0] !== ratta[0]){
      return {
        text: `Börja med ${fmt(ratta[0])}!`,
        tal: `Börja med bokstaven ${ratta[0]}!`
      };
    }
    for(let i = 0; i < ratta.length; i++){
      if(inmat[i] !== ratta[i]){
        return {
          text: `Titta på plats ${i + 1} — där ska ${fmt(ratta[i])} vara!`,
          tal: `Nästan! Titta noga på bokstav nummer ${i + 1}.`
        };
      }
    }
    return { text: `Försök igen!`, tal: `Försök igen!` };
  }
  if(q.typ === "skylt-las"){
    return {
      text: `Den skylten visar ${fmt(valt)}! Vi letar efter ${fmt(q.svar)}.`,
      tal: `Den vagnen åker mot ${valt}! Hitta vagnen mot ${q.svar}.`
    };
  }
  if(q.typ === "hallplats-skylt"){
    return {
      text: `Det där är ${fmt(valt)}! Lyssna igen.`,
      tal: `Det där är ${valt}! Hitta ${q.svar}.`
    };
  }
  if(q.typ === "vagn-modell"){
    return {
      text: `Inte ${fmt(valt)} — den här är ${q.vagnTyp.langd} meter och har ${q.vagnTyp.band} fönsterband!`,
      tal: `Inte ${valt}. Titta på längden och fönsterbandet!`
    };
  }
  return { text: "Prova igen!", tal: "Prova igen!" };
}

/* ── Runda för en hållplats (5 uppgifter) ────────────────────────────── */
export function arrangeKinds(kinds){
  const list = shuffle(kinds);
  for(let tries = 0; tries < 20; tries++){
    let ok = true;
    for(let i = 2; i < list.length; i++){
      if(list[i] === list[i - 1] && list[i] === list[i - 2]){ ok = false; break; }
    }
    if(ok) return list;
    for(let i = list.length - 1; i > 0; i--){
      const j = rnd(i + 1);
      [list[i], list[j]] = [list[j], list[i]];
    }
  }
  return list;
}

export function byggRunda(niva, plats, opts = {}){
  const antal = opts.antal || 5;
  const undvik = new Set(opts.undvik || []);
  const aktivLasa = opts.lasa !== false;
  const aktivStava = opts.stava !== false;
  const aktivGbg = opts.gbg !== false;
  const kluringar = opts.kluringar || [];

  const n = Math.max(1, Math.min(6, Number(niva) || 2));
  const nAvrund = Math.round(n);

  /* Bygg en balanserad mix av övningstyper anpassad efter Adams nivå */
  const sorter = [];
  if(aktivLasa){
    sorter.push("las-bild");
    sorter.push(nAvrund <= 1 ? "forsta-ljud" : "bild-ord");
  }
  if(aktivStava){
    sorter.push("lucka");
    sorter.push("bygg-ord");
  }
  if(aktivGbg){
    if(nAvrund >= 4){
      sorter.push(pick(["skylt-las", "hallplats-skylt", "bygg-hallplats", "vagn-modell"]));
      sorter.push(pick(["hallplats-skylt", "vagn-modell", "skylt-las"]));
    }else{
      sorter.push(pick(["skylt-las", "hallplats-skylt", "vagn-modell"]));
    }
  }
  if(!sorter.length) sorter.push("las-bild", "bild-ord", "lucka", "bygg-ord", "skylt-las");

  const valdaSorter = [];
  const pool = shuffle(sorter);
  for(let i = 0; i < antal; i++){
    valdaSorter.push(pool[i % pool.length]);
  }
  const ordnade = arrangeKinds(valdaSorter);

  const fragor = [];
  for(const sort of ordnade){
    let q;
    switch(sort){
      case "las-bild":        q = gorLasBild(n, undvik); break;
      case "bild-ord":        q = gorBildOrd(n, undvik); break;
      case "forsta-ljud":     q = gorForstaLjud(n, undvik); break;
      case "lucka":           q = gorLucka(n, undvik); break;
      case "bygg-ord":        q = gorByggOrd(n, undvik); break;
      case "skylt-las":       q = gorSkyltLas(n, plats, undvik); break;
      case "hallplats-skylt": q = gorHallplatsSkylt(n, plats, undvik); break;
      case "bygg-hallplats":  q = gorByggHallplats(n, undvik); break;
      case "vagn-modell":     q = gorVagnModell(n, undvik); break;
      default:                q = gorLasBild(n, undvik); break;
    }
    if(q.nyckel) undvik.add(q.nyckel);
    fragor.push(q);
  }

  /* Blanda in en kluring ibland (aldrig som första uppgift) */
  if(kluringar.length && opts.taMedKluring !== false && rnd(2) === 0 && fragor.length >= 2){
    const k = pick(kluringar);
    const reparerad = byggKluring(k, n, plats);
    if(reparerad){
      reparerad.kluring = true;
      fragor[1 + rnd(fragor.length - 1)] = reparerad;
    }
  }

  return fragor;
}

export function byggKluring(k, niva, plats){
  if(!k || !k.typ || !k.ord) return null;
  const ordObj = hittaOrd(k.ord);
  if(k.typ === "las-bild" && ordObj){
    const q = gorLasBild(niva, new Set());
    const fel = smartaOrdfel(ordObj, q.alternativ.length - 1, true);
    return { ...q, id: `kluring:las-bild:${ordObj.ord}`, ord: ordObj.ord, ordObj, svar: ordObj.ord,
      alternativ: shuffle([ordObj, ...fel]).map(x => ({ varde: x.ord, bild: x.bild, bg: x.bg, ord: x.ord })) };
  }
  if(k.typ === "bild-ord" && ordObj){
    const q = gorBildOrd(niva, new Set());
    const fel = smartaOrdfel(ordObj, q.alternativ.length - 1, false);
    return { ...q, id: `kluring:bild-ord:${ordObj.ord}`, ord: ordObj.ord, ordObj, svar: ordObj.ord,
      talText: `Vilket ord är ${ordObj.ord}?`,
      alternativ: shuffle([ordObj, ...fel]).map(x => ({ varde: x.ord, text: x.ord })) };
  }
  if(k.typ === "bygg-ord" && ordObj){
    const ratt = [...ordObj.ord.toLocaleUpperCase("sv")];
    const extra = [];
    const seen = new Set(ratt);
    for(const g of shuffle(BOKSTAVSGRANNAR[ratt[0]] || [])){
      if(!seen.has(g)){ extra.push(g); seen.add(g); break; }
    }
    return {
      id: `kluring:bygg-ord:${ordObj.ord}`,
      typ: "bygg-ord",
      grupp: "stava",
      niva: Math.round(niva),
      ord: ordObj.ord,
      ordObj,
      svar: ordObj.ord.toLocaleUpperCase("sv"),
      brickor: shuffle([...ratt, ...extra]).map((ch, i) => ({ id: i, ch })),
      forsok: 3,
      fragaText: "Bygg ordet!",
      talText: `Bygg ordet ${ordObj.ord}!`,
      nyckel: "ord:" + ordObj.ord.toLowerCase()
    };
  }
  if(k.typ === "hallplats-skylt" && ALLA_STOPP.includes(k.ord)){
    const fel = shuffle(ALLA_STOPP.filter(s => s !== k.ord)).slice(0, 3);
    return {
      id: `kluring:hallplats:${k.ord}`,
      typ: "hallplats-skylt",
      grupp: "gbg",
      niva: Math.round(niva),
      ord: k.ord,
      svar: k.ord,
      alternativ: shuffle([k.ord, ...fel]).map(s => ({ varde: s, text: s })),
      forsok: 2,
      fragaText: "Tryck på rätt hållplatsskylt!",
      talText: `Hitta skylten: ${k.ord}`,
      nyckel: "stopp:" + k.ord.toLowerCase()
    };
  }
  return null;
}

/* ── Adaptiv nivå (Stigande) ─────────────────────────────────────────── */
export function uppdateraNiva(nuNiva, utfall, golv = 1){
  let n = Number(nuNiva) || 2;
  if(utfall === "direkt") n += 0.12;
  else if(utfall === "hjalp") n -= 0.04;
  else if(utfall === "visad") n -= 0.18;
  else if(utfall === "felfri-hallplats") n += 0.2;
  return Math.max(golv, Math.min(6, Math.round(n * 100) / 100));
}
