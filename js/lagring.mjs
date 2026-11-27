/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Spelarprofiler, framsteg, statistik & säkerhetskopia
   ═══════════════════════════════════════════════════════════════ */

import { TRAM_LINES, ALLA_VAGNKORT_NR, ALLA_STOPP } from "./gbg-data.mjs";

export const STORAGE_KEY = "ordjakten_v1";
export const SPELVERSION = "2.1";

export function standardSettings(){
  return {
    bokstavsStil: "versaler", // "versaler" | "gemener" | "blandat"
    nivaLage: "stigande",     // "stigande" | "fast"
    niva: 2.0,                // 1..6 (2 = Korta ord: SOL, BIL, TÅG)
    nivaGolv: 1,
    stavaLage: "brickor",     // "brickor" | "tangentbord"
    lasa: true,
    stava: true,
    gbg: true,
    sound: true,
    voice: true,
    rate: 1,
    voiceURI: "auto",
    klipprost: true,
    spelaPaTyst: false,
    minskaRorelse: false,
    foton: true,
    utzoomad: false
  };
}

export function nySpelare(name, charId = "kaj"){
  return {
    id: "p_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6),
    name: (name || "Kompis").trim() || "Kompis",
    char: charId || "kaj",
    coins: 0,
    streak: 0,
    bestStreak: 0,
    visitedStops: [],
    linesDone: [],
    klaradeOrd: [],
    kluringar: [],
    klaradeKluringar: 0,
    vagnkort: [],
    vagnModellerRatt: 0,
    badges: [],
    kopta: ["gbg"],
    minVagn: { typ: "M34", nr: 601, ref: "11", rikt: 1, tema: "gbg", flaggor: false, jul: false, stjarna: false, egenSkylt: "", byggd: false },
    resa: null,
    resmalKlarade: 0,
    omvagKlarade: 0,
    stats: { dagar: {}, sorter: {} },
    settings: standardSettings(),
    skapad: new Date().toISOString().slice(0, 10)
  };
}

export function idagStr(d = new Date()){
  return d.toISOString().slice(0, 10);
}

export function laddaData(){
  try{
    if(typeof localStorage === "undefined") return { players: [], activeId: null, senastKopia: null };
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return { players: [], activeId: null, senastKopia: null };
    const d = JSON.parse(raw);
    if(!d || !Array.isArray(d.players)) return { players: [], activeId: null, senastKopia: null };
    d.players = d.players.map(repareraSpelare);
    return d;
  }catch(_){
    return { players: [], activeId: null, senastKopia: null };
  }
}

export function sparaData(data){
  try{
    if(typeof localStorage !== "undefined"){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }catch(_){}
}

export function repareraSpelare(p){
  const bas = nySpelare(p?.name, p?.char);
  const ut = Object.assign(bas, p || {});
  ut.settings = Object.assign(standardSettings(), p?.settings || {});
  ut.minVagn = Object.assign(bas.minVagn, p?.minVagn || {});
  ut.stats = Object.assign({ dagar: {}, sorter: {} }, p?.stats || {});
  ut.visitedStops = Array.isArray(ut.visitedStops) ? [...new Set(ut.visitedStops)] : [];
  ut.linesDone = Array.isArray(ut.linesDone) ? [...new Set(ut.linesDone)] : [];
  ut.klaradeOrd = Array.isArray(ut.klaradeOrd) ? [...new Set(ut.klaradeOrd)] : [];
  ut.vagnkort = Array.isArray(ut.vagnkort) ? [...new Set(ut.vagnkort)] : [];
  ut.badges = Array.isArray(ut.badges) ? [...new Set(ut.badges)] : [];
  ut.kopta = Array.isArray(ut.kopta) ? [...new Set(ut.kopta)] : [];
  ut.kluringar = Array.isArray(ut.kluringar) ? ut.kluringar.filter(k => k && k.typ && k.ord).slice(-20) : [];
  return ut;
}

/* ── Statistik ("Så går det") ────────────────────────────────────────── */
export function statSvar(p, typ, utfall, datum = idagStr()){
  const st = p.stats || (p.stats = { dagar: {}, sorter: {} });
  const dag = st.dagar[datum] || (st.dagar[datum] = { antal: 0, direkt: 0, visad: 0, sek: 0 });
  dag.antal++;
  if(utfall === "direkt") dag.direkt++;
  if(utfall === "visad") dag.visad++;
  const sort = st.sorter[typ] || (st.sorter[typ] = { antal: 0, direkt: 0, visad: 0 });
  sort.antal++;
  if(utfall === "direkt") sort.direkt++;
  if(utfall === "visad") sort.visad++;
  /* Behåll max 30 dagar */
  const nycklar = Object.keys(st.dagar).sort();
  while(nycklar.length > 30){
    delete st.dagar[nycklar.shift()];
  }
}

export function statTid(p, sek, datum = idagStr()){
  const s = Math.max(0, Math.min(900, Math.round(sek)));
  if(!s) return;
  const st = p.stats || (p.stats = { dagar: {}, sorter: {} });
  const dag = st.dagar[datum] || (st.dagar[datum] = { antal: 0, direkt: 0, visad: 0, sek: 0 });
  dag.sek = (dag.sek || 0) + s;
}

export function laggKluring(p, q){
  if(!q || !q.ord) return;
  const tillatna = new Set(["las-bild", "bild-ord", "bygg-ord", "hallplats-skylt"]);
  if(!tillatna.has(q.typ)) return;
  const ny = { typ: q.typ, ord: q.ord };
  p.kluringar = (p.kluringar || []).filter(k => !(k.typ === ny.typ && k.ord === ny.ord));
  p.kluringar.push(ny);
  if(p.kluringar.length > 20) p.kluringar = p.kluringar.slice(-20);
}

export function kluringKlarad(p, q){
  if(!q || !q.kluring) return;
  p.kluringar = (p.kluringar || []).filter(k => !(k.typ === q.typ && k.ord === q.ord));
  p.klaradeKluringar = (p.klaradeKluringar || 0) + 1;
}

export function kollaMarken(p){
  const nya = [];
  const lagg = (id, villkor) => {
    if(villkor && !p.badges.includes(id)){
      p.badges.push(id);
      nya.push(id);
    }
  };
  const bes = new Set(p.visitedStops || []);
  /* Kolla hela linjer */
  for(const l of TRAM_LINES){
    if(l.stops.every(s => bes.has(s)) && !p.linesDone.includes(l.ref)){
      p.linesDone.push(l.ref);
    }
  }
  lagg("forsta-stopp", bes.size >= 1);
  lagg("ord-10", (p.klaradeOrd || []).length >= 10);
  lagg("ord-30", (p.klaradeOrd || []).length >= 30);
  lagg("ord-60", (p.klaradeOrd || []).length >= 60);
  lagg("svit-6", (p.bestStreak || 0) >= 6);
  lagg("svit-12", (p.bestStreak || 0) >= 12);
  lagg("kluring-5", (p.klaradeKluringar || 0) >= 5);
  lagg("stopp-15", bes.size >= 15);
  lagg("stopp-40", bes.size >= 40);
  lagg("stopp-80", bes.size >= 80);
  lagg("stopp-132", bes.size >= ALLA_STOPP.length);
  lagg("hel-linje", (p.linesDone || []).length >= 1);
  lagg("resmal-1", (p.resmalKlarade || 0) >= 1);
  lagg("resmal-5", (p.resmalKlarade || 0) >= 5);
  lagg("omvag", (p.omvagKlarade || 0) >= 1);
  lagg("egen-vagn", !!(p.minVagn && p.minVagn.byggd));
  lagg("egen-skylt", !!(p.minVagn && p.minVagn.egenSkylt && p.minVagn.egenSkylt.trim().length >= 2));
  lagg("kort-5", (p.vagnkort || []).length >= 5);
  lagg("kort-alla", (p.vagnkort || []).length >= ALLA_VAGNKORT_NR.length);
  lagg("vagn-modell", (p.vagnModellerRatt || 0) >= 10);
  return nya;
}

export function valideraKopia(obj){
  if(!obj || typeof obj !== "object" || obj.app !== "ordjakten" || !Array.isArray(obj.players)) return null;
  const rena = obj.players.filter(p => p && typeof p === "object" && typeof p.name === "string").map(repareraSpelare);
  return rena.length ? rena : null;
}
