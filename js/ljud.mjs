/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Ljud, Klippröst (Alva Premium), talsyntes & Ljudning
   Bygger på iPad/iPhone-lärdomarna från Räknelandet.
   ═══════════════════════════════════════════════════════════════ */

import { BOKSTAVSLJUD } from "./ord-data.mjs";

const APPLE = typeof navigator !== "undefined" && (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

let audioCtx = null;
function getCtx(){
  if(typeof window === "undefined") return null;
  if(!audioCtx){
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if(Ctx) audioCtx = new Ctx();
  }
  if(audioCtx && audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  return audioCtx;
}

export function vackLjud(spelaPaTyst = false){
  try{
    if(typeof navigator !== "undefined" && navigator.audioSession){
      navigator.audioSession.type = spelaPaTyst ? "playback" : "auto";
    }
  }catch(_){}
  const ctx = getCtx();
  if(ctx && (ctx.state === "suspended" || ctx.state === "interrupted")){
    ctx.resume().catch(() => {});
  }
}

/* ── Syntetiserade ljudeffekter ──────────────────────────────────────── */
export const SFX = {
  aktiv: true,
  tone(freq, delay, dur, type = "sine", vol = 0.14){
    if(!this.aktiv) return;
    const ctx = getCtx();
    if(!ctx) return;
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, now + Math.max(0.02, dur - 0.012));
    g.gain.linearRampToValueAtTime(0, now + dur);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur + 0.015);
  },
  klick(){
    this.tone(520, 0, 0.055, "triangle", 0.09);
  },
  ratt(){
    this.tone(523.25, 0, 0.16, "triangle", 0.16);
    this.tone(659.25, 0.09, 0.18, "triangle", 0.16);
    this.tone(783.99, 0.18, 0.28, "triangle", 0.18);
  },
  fel(){
    this.tone(290, 0, 0.14, "sine", 0.12);
    this.tone(240, 0.1, 0.2, "sine", 0.11);
  },
  mynt(){
    this.tone(987.77, 0, 0.08, "sine", 0.12);
    this.tone(1318.5, 0.07, 0.18, "sine", 0.12);
  },
  fanfar(){
    [[523.25, 0], [659.25, 0.1], [783.99, 0.2], [1046.5, 0.32]].forEach(([f, t]) => {
      this.tone(f, t, 0.35, "triangle", 0.16);
    });
  },
  /* Spårvagnsklocka: slagen metallklocka med deltoner */
  klocka(){
    if(!this.aktiv) return;
    const f = 1120;
    [[1, 0.14, 0.7], [2.02, 0.06, 0.45], [2.98, 0.04, 0.32], [4.18, 0.025, 0.22]].forEach(([m, v, d]) => {
      this.tone(f * m, 0, d, "sine", v);
      this.tone(f * m, 0.22, d * 0.9, "sine", v * 0.85);
    });
  },
  /* Dörrsignal: tre lätta pip */
  dorr(){
    this.tone(880, 0, 0.1, "sine", 0.11);
    this.tone(880, 0.15, 0.1, "sine", 0.11);
    this.tone(1046.5, 0.3, 0.16, "sine", 0.11);
  },
  /* Två mjuka toner före hållplatsutrop */
  utrop(){
    [[987.77, 0], [739.99, 0.24]].forEach(([f, t]) => {
      this.tone(f, t, 0.72, "sine", 0.15);
      this.tone(f * 2, t, 0.4, "sine", 0.045);
    });
  }
};

/* ── Klippröst (Alva Premium-klipp i ljud/rost/) ─────────────────────── */
export const KLIPP = {
  bas: "./ljud/rost/",
  finns: null,
  rost: "",
  format: "m4a",
  takt: 165,
  buffrar: new Map(),
  laddar: new Map(),
  kor: 0,
  noder: []
};

export const klippNorm = (t) => String(t == null ? "" : t)
  .toLowerCase()
  .replace(/[–—]/g, ",")
  .replace(/[^a-z0-9åäöéü\s.,!?:]/g, "")
  .replace(/\s+/g, " ")
  .trim();

export function klippId(text){
  const s = klippNorm(text)
    .replace(/[.,!?:]/g, "")
    .replace(/å/g, "aa").replace(/ä/g, "ae").replace(/ö/g, "oe")
    .replace(/é/g, "e").replace(/ü/g, "u")
    .trim().replace(/\s+/g, "-");
  if(s.length <= 80) return s;
  let h = 5381;
  for(let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return s.slice(0, 60).replace(/-$/, "") + "-" + h.toString(16);
}

export function klippDelar(text, finns, namn = ""){
  if(!finns || !finns.size) return null;
  const ord = klippNorm(text).replace(/([.,!?:])/g, " $1 ").split(/\s+/).filter(Boolean);
  const tecken = (t) => /^[.,!?:]$/.test(t);
  const namnN = klippNorm(namn);
  const ut = [];
  let i = 0, paus = 0;
  const lagg = (d) => { if(paus && ut.length) ut.push({ paus }); paus = 0; ut.push(...d); };
  while(i < ord.length){
    const t = ord[i];
    if(tecken(t)){ paus = Math.max(paus, /[.!?]/.test(t) ? 240 : 120); i++; continue; }
    const idx = [];
    for(let j = i; j < ord.length && idx.length < 40; j++) if(!tecken(ord[j])) idx.push(j);
    let traff = null;
    for(let n = idx.length; n >= 1 && !traff; n--){
      const id = klippId(idx.slice(0, n).map(j => ord[j]).join(" "));
      if(finns.has(id)) traff = { id, slut: idx[n - 1] };
    }
    if(traff){ lagg([traff.id]); i = traff.slut + 1; continue; }
    if(namnN && t === namnN){ i++; continue; }
    return null;
  }
  return ut.length ? ut : null;
}

export function klippProva(){
  if(typeof location === "undefined" || !/^https?:$/.test(location.protocol) || typeof fetch !== "function") return;
  fetch(KLIPP.bas + "index.json", { cache: "no-cache" })
    .then(r => r.ok ? r.json() : null)
    .then(j => {
      if(!j || !Array.isArray(j.klipp) || !j.klipp.length) return;
      KLIPP.finns = new Set(j.klipp);
      KLIPP.rost = String(j.rost || "");
      KLIPP.format = String(j.format || "m4a");
      KLIPP.takt = Number(j.takt) || 165;
    })
    .catch(() => {});
}

/* Generös marginal i kanterna + mjuk in-/uttoning i spelaKlipp så klippen aldrig klickar */
function klippKanter(buf){
  const ch = buf.getChannelData(0), sr = buf.sampleRate, tr = 0.01;
  let a = 0, b = ch.length;
  while(a < b && Math.abs(ch[a]) < tr) a++;
  while(b > a && Math.abs(ch[b - 1]) < tr) b--;
  if(a >= b) return { buf, start: 0, dur: buf.duration };
  const start = Math.max(0, a / sr - 0.025);
  const slut = Math.min(buf.duration, b / sr + 0.085);
  return { buf, start, dur: Math.max(0.06, slut - start) };
}

function klippHamta(id){
  if(KLIPP.buffrar.has(id)) return Promise.resolve(KLIPP.buffrar.get(id));
  if(KLIPP.laddar.has(id)) return KLIPP.laddar.get(id);
  const ctx = getCtx();
  if(!ctx) return Promise.reject(new Error("no-audio-ctx"));
  const pr = fetch(KLIPP.bas + id + "." + KLIPP.format)
    .then(r => r.ok ? r.arrayBuffer() : Promise.reject(new Error(id)))
    .then(ab => ctx.decodeAudioData(ab))
    .then(buf => {
      const k = klippKanter(buf);
      KLIPP.laddar.delete(id);
      KLIPP.buffrar.set(id, k);
      while(KLIPP.buffrar.size > 200) KLIPP.buffrar.delete(KLIPP.buffrar.keys().next().value);
      return k;
    })
    .catch(e => { KLIPP.laddar.delete(id); throw e; });
  KLIPP.laddar.set(id, pr);
  return pr;
}

export function klippStopp(){
  KLIPP.kor++;
  for(const n of KLIPP.noder){ try{ n.stop(); }catch(_){} }
  KLIPP.noder = [];
}

function spelaKlipp(delar, takt = 1, onDone = null, annars = null){
  const ctx = getCtx();
  if(!ctx){ if(annars) annars(); return; }
  const kor = ++KLIPP.kor;
  const ids = [...new Set(delar.filter(d => typeof d === "string"))];
  Promise.all(ids.map(klippHamta)).then(() => {
    if(kor !== KLIPP.kor) return;
    let t = ctx.currentTime + 0.025;
    let sistaNod = null;
    for(const d of delar){
      if(typeof d !== "string"){ t += (d.paus || 120) / 1000 / takt; continue; }
      const k = KLIPP.buffrar.get(d);
      if(!k) continue;
      const src = ctx.createBufferSource();
      const gain = ctx.createGain();
      const spelDur = k.dur / takt;
      const fadeIn = Math.min(0.012, spelDur * 0.15);
      const fadeOut = Math.min(0.035, spelDur * 0.25);

      src.buffer = k.buf;
      src.playbackRate.value = takt;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(1, t + fadeIn);
      gain.gain.setValueAtTime(1, Math.max(t + fadeIn, t + spelDur - fadeOut));
      gain.gain.linearRampToValueAtTime(0, t + spelDur);

      src.connect(gain);
      gain.connect(ctx.destination);
      src.start(t, k.start, k.dur);
      KLIPP.noder.push(src);
      src.onended = () => {
        const i = KLIPP.noder.indexOf(src);
        if(i >= 0) KLIPP.noder.splice(i, 1);
      };
      sistaNod = src;
      t += spelDur + 0.04;
    }
    if(sistaNod && onDone){
      const orig = sistaNod.onended;
      sistaNod.onended = () => { if(orig) orig(); if(kor === KLIPP.kor) onDone(); };
    }else if(onDone){
      onDone();
    }
  }).catch(() => {
    if(kor === KLIPP.kor && annars) annars();
  });
}

/* ── Talsyntes (SpeechSynthesis) ─────────────────────────────────────── */
let talTimer = null;
let ljudningTimers = [];
let ljudningAvbruten = false;
let avbrutetVid = 0;

export function svenskaRoster(){
  if(typeof speechSynthesis === "undefined") return [];
  const alla = speechSynthesis.getVoices().filter(v => /^sv\b/i.test(v.lang));
  const rank = (v) => {
    const n = (v.name + " " + v.voiceURI).toLowerCase();
    if(/premium/.test(n)) return 4;
    if(/enhanced|förbättrad|natural|neural|wavenet/.test(n)) return 3;
    if(!v.localService) return 2;
    return 1;
  };
  return alla.sort((a, b) => rank(b) - rank(a));
}

export function stoppaTal(){
  ljudningAvbruten = true;
  if(talTimer){ clearTimeout(talTimer); talTimer = null; }
  for(const tm of ljudningTimers) clearTimeout(tm);
  ljudningTimers = [];
  klippStopp();
  if(typeof speechSynthesis !== "undefined" && (speechSynthesis.speaking || speechSynthesis.pending)){
    try{ speechSynthesis.cancel(); avbrutetVid = performance.now(); }catch(_){}
  }
}

export function prata(text, opts = {}){
  if(!text) return;
  if(opts.tyst) return;
  const s = opts.settings || {};
  if(s.voice === false) return;
  const hastighet = [0.86, 0.96, 1.08][s.rate != null ? s.rate : 1] || 0.96;
  const klippTakt = [0.92, 1.0, 1.08][s.rate != null ? s.rate : 1] || 1.0;

  stoppaTal();

  const anvandKlipp = s.klipprost !== false && KLIPP.finns && KLIPP.finns.size && !opts.tvingaTTS;
  if(anvandKlipp){
    const delar = klippDelar(text, KLIPP.finns, opts.namn || "");
    if(delar){
      spelaKlipp(delar, klippTakt, opts.onDone, () => prataTTS(text, hastighet, s, opts.onDone));
      return;
    }
  }
  prataTTS(text, hastighet, s, opts.onDone);
}

function skapaUtsaga(text, rate, s = {}){
  const u = new SpeechSynthesisUtterance(String(text));
  u.lang = "sv-SE";
  u.rate = rate;
  u.pitch = 1;
  const roster = svenskaRoster();
  if(s.voiceURI && s.voiceURI !== "auto" && s.voiceURI !== "system"){
    const v = roster.find(x => x.voiceURI === s.voiceURI);
    if(v) u.voice = v;
  }else if(s.voiceURI !== "system"){
    const bast = roster[0];
    if(bast && (!APPLE || /premium|enhanced|förbättrad|natural/i.test(bast.name + bast.voiceURI))){
      u.voice = bast;
    }
  }
  return u;
}

function prataTTS(text, rate, s = {}, onDone = null, onBoundary = null){
  if(typeof speechSynthesis === "undefined"){
    if(onDone) onDone();
    return;
  }
  const gor = () => {
    try{
      const u = skapaUtsaga(text, rate, s);
      if(onBoundary) u.onboundary = onBoundary;
      if(onDone){
        u.onend = () => onDone();
        u.onerror = () => onDone();
      }
      speechSynthesis.speak(u);
    }catch(_){
      if(onDone) onDone();
    }
  };
  /* Vänta bara efter cancel() om något faktiskt nyss avbröts */
  const sedanAvbrott = performance.now() - avbrutetVid;
  const vant = avbrutetVid && sedanAvbrott < 140 ? Math.max(20, (APPLE ? 130 : 40) - sedanAvbrott) : 0;
  if(vant > 0) talTimer = setTimeout(gor, vant);
  else gor();
}

/* Säg ett enstaka bokstavsljud när barnet trycker på en bricka eller bokstav */
export function sagBokstav(ch, settings = {}){
  if(settings.voice === false) return;
  const stor = String(ch || "").toLocaleUpperCase("sv");
  const ljud = BOKSTAVSLJUD[stor] || stor.toLocaleLowerCase("sv");
  prata(ljud, { settings, tvingaTTS: true });
}

/* Interaktiv ljudning i EN sammanhängande talsyntes-utsaga (inga klick mellan
   bokstäverna!). Synkar markeringen via onboundary med mjuk reserv-timer. */
export function ljudaOrd(ord, settings = {}, onIndex = () => {}, onDone = () => {}){
  stoppaTal();
  ljudningAvbruten = false;
  const bokst = [...String(ord || "").toLocaleUpperCase("sv")];
  if(!bokst.length){ onDone(); return; }

  if(settings.voice === false){
    bokst.forEach((_, i) => {
      ljudningTimers.push(setTimeout(() => { if(!ljudningAvbruten) onIndex(i); }, i * 420));
    });
    ljudningTimers.push(setTimeout(() => { if(!ljudningAvbruten) onIndex("alla"); }, bokst.length * 420 + 180));
    ljudningTimers.push(setTimeout(() => { if(!ljudningAvbruten){ onIndex(-1); onDone(); } }, bokst.length * 420 + 750));
    return;
  }

  /* Bygg en enda mjuk fras, t.ex. "ss, o, ll. Sol" och spara startposition per del */
  const delar = bokst.map(ch => BOKSTAVSLJUD[ch] || ch.toLocaleLowerCase("sv"));
  let fras = "";
  const spann = [];
  delar.forEach((d, i) => {
    const start = fras.length;
    fras += d;
    spann.push({ start, idx: i });
    fras += i + 1 < delar.length ? ", " : ". ";
  });
  const ordStart = fras.length;
  fras += String(ord);

  let fickBoundary = false;
  onIndex(0);

  /* Mjuk reserv-animation om webbläsarens röst inte skickar onboundary */
  bokst.forEach((_, i) => {
    if(i === 0) return;
    ljudningTimers.push(setTimeout(() => {
      if(!ljudningAvbruten && !fickBoundary) onIndex(i);
    }, i * 460));
  });
  ljudningTimers.push(setTimeout(() => {
    if(!ljudningAvbruten && !fickBoundary) onIndex("alla");
  }, bokst.length * 460 + 220));

  prataTTS(fras, 0.88, settings, () => {
    if(ljudningAvbruten) return;
    for(const tm of ljudningTimers) clearTimeout(tm);
    ljudningTimers = [];
    onIndex(-1);
    onDone();
  }, (ev) => {
    if(ljudningAvbruten || typeof ev.charIndex !== "number") return;
    fickBoundary = true;
    const pos = ev.charIndex;
    if(pos >= ordStart){
      onIndex("alla");
      return;
    }
    let vald = 0;
    for(const sp of spann){
      if(pos >= sp.start) vald = sp.idx;
    }
    onIndex(vald);
  });
}
