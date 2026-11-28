/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Nordisk Göteborgs-konst: nya djurkompisar,
   spårvagnar med lackteman, LED-skyltar, biljetter & ordbilder.
   ═══════════════════════════════════════════════════════════════ */

import { stopKind } from "./gbg-data.mjs";
import { formatOrd } from "./ord-data.mjs";
import { ordBildSVG } from "./ordbilder.mjs";

export const INK = "#13315C";
export const GBG_BLA = "#1B68B3";
export const GBG_VIT = "#F7F4EC";
export const GBG_SVART = "#1B2432";
export const GLAS = "#BCE3F7";

export function escapeHtml(s){
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function ljusFarg(hex){
  const h = (hex || "#888").replace("#", "");
  const n = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) > 150;
}

/* ── Nya Göteborgs-kompisar (helt egna figurer!) ─────────────────────── */
function ogon(mood, lx, rx, y, r = 5.5){
  if(mood === "happy"){
    return `<path d="M${lx - r} ${y + 2}q${r} ${-r * 1.4} ${r * 2} 0M${rx - r} ${y + 2}q${r} ${-r * 1.4} ${r * 2} 0" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`;
  }
  if(mood === "sad"){
    return `<circle cx="${lx}" cy="${y + 1}" r="${r * 0.72}" fill="${INK}"/><circle cx="${rx}" cy="${y + 1}" r="${r * 0.72}" fill="${INK}"/>
      <path d="M${lx - r} ${y - r * 1.3}l${r * 2} -3M${rx - r} ${y - r * 1.3 - 3}l${r * 2} 3" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
  }
  return `<circle cx="${lx}" cy="${y}" r="${r * 0.85}" fill="${INK}"/><circle cx="${lx + 1.8}" cy="${y - 1.8}" r="${r * 0.3}" fill="#FFF"/>
    <circle cx="${rx}" cy="${y}" r="${r * 0.85}" fill="${INK}"/><circle cx="${rx + 1.8}" cy="${y - 1.8}" r="${r * 0.3}" fill="#FFF"/>`;
}

export const CHARACTERS = [
  {
    id: "kaj", name: "Kaj", roll: "Fiskmås med förarmössa", bg: "#DCEEFB",
    draw(m){ return `
      <circle cx="80" cy="84" r="64" fill="#DCEEFB"/>
      <ellipse cx="80" cy="118" rx="34" ry="26" fill="#FFFFFF" stroke="${INK}" stroke-width="3.2"/>
      <path d="M48 112q-18 6 -16 20q16 2 22 -8z" fill="#9BBAD6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M112 112q18 6 16 20q-16 2 -22 -8z" fill="#9BBAD6" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="80" cy="76" r="32" fill="#FFFFFF" stroke="${INK}" stroke-width="3.2"/>
      <!-- Förarmössa -->
      <path d="M50 56q30 -24 60 0z" fill="#1B68B3" stroke="${INK}" stroke-width="3.2"/>
      <rect x="47" y="54" width="66" height="8" rx="4" fill="#13315C"/>
      <circle cx="80" cy="46" r="6" fill="#F2B705" stroke="${INK}" stroke-width="2.2"/>
      ${ogon(m, 68, 92, 74, 5)}
      <!-- Näbb -->
      <path d="M72 82h16l-8 14z" fill="#F2B705" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/>
      ${m === "happy" ? `<path d="M74 87q6 5 12 0" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>` : ""}
      <circle cx="60" cy="84" r="5" fill="#F4A4A4" opacity=".6"/>
      <circle cx="100" cy="84" r="5" fill="#F4A4A4" opacity=".6"/>`; }
  },
  {
    id: "rut", name: "Rut", roll: "Räv från Slottsskogen", bg: "#FDE8D7",
    draw(m){ return `
      <circle cx="80" cy="84" r="64" fill="#FDE8D7"/>
      <path d="M54 58L44 26l26 18zM106 58l10 -32l-26 18z" fill="#D95D39" stroke="${INK}" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="M54 52L49 34l14 11zM106 52l5 -18l-14 11z" fill="#FFF7EB"/>
      <ellipse cx="80" cy="122" rx="30" ry="22" fill="#D95D39" stroke="${INK}" stroke-width="3.2"/>
      <!-- Gul halsduk -->
      <path d="M54 105q26 12 52 0v12q-26 10 -52 0z" fill="#F2B705" stroke="${INK}" stroke-width="2.8"/>
      <rect x="92" y="112" width="12" height="22" rx="5" fill="#F2B705" stroke="${INK}" stroke-width="2.6"/>
      <ellipse cx="80" cy="78" rx="34" ry="29" fill="#D95D39" stroke="${INK}" stroke-width="3.2"/>
      <path d="M48 82q16 -8 32 4q16 -12 32 -4q-4 25 -32 25q-28 0 -32 -25z" fill="#FFF7EB"/>
      ${ogon(m, 67, 93, 74, 5)}
      <ellipse cx="80" cy="86" rx="5.5" ry="4" fill="${INK}"/>
      <path d="${m === "sad" ? "M74 96q6 -5 12 0" : m === "happy" ? "M71 91q9 10 18 0" : "M73 93q7 6 14 0"}" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`; }
  },
  {
    id: "salle", name: "Sälle", roll: "Säl från Saltholmen", bg: "#D8F0EC",
    draw(m){ return `
      <circle cx="80" cy="84" r="64" fill="#D8F0EC"/>
      <ellipse cx="80" cy="120" rx="38" ry="26" fill="#7D98B3" stroke="${INK}" stroke-width="3.2"/>
      <ellipse cx="80" cy="126" rx="22" ry="16" fill="#C7D7E6"/>
      <circle cx="80" cy="78" r="33" fill="#8EA8C2" stroke="${INK}" stroke-width="3.2"/>
      <!-- Röd toppluva -->
      <path d="M52 58q28 -30 56 0z" fill="#D95D39" stroke="${INK}" stroke-width="3.2"/>
      <rect x="49" y="54" width="62" height="9" rx="4.5" fill="#FFF7EB" stroke="${INK}" stroke-width="2.6"/>
      <circle cx="80" cy="31" r="7" fill="#FFF7EB" stroke="${INK}" stroke-width="2.8"/>
      <ellipse cx="72" cy="88" rx="10" ry="7.5" fill="#E8F0F7" stroke="${INK}" stroke-width="2.2"/>
      <ellipse cx="88" cy="88" rx="10" ry="7.5" fill="#E8F0F7" stroke="${INK}" stroke-width="2.2"/>
      <path d="M50 86h13M50 92h12M97 86h13M98 92h12" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
      ${ogon(m, 67, 93, 73, 5)}
      <ellipse cx="80" cy="83" rx="5.5" ry="4" fill="${INK}"/>
      ${m === "happy" ? `<path d="M74 95q6 7 12 0" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>` : ""}`; }
  },
  {
    id: "pelle", name: "Pelle", roll: "Krabba vid Stenpiren", bg: "#FCE3DC",
    draw(m){ return `
      <circle cx="80" cy="84" r="64" fill="#FCE3DC"/>
      <!-- Klor -->
      <path d="M46 100q-16 -12 -14 -26" fill="none" stroke="#E05A47" stroke-width="9" stroke-linecap="round"/>
      <path d="M114 100q16 -12 14 -26" fill="none" stroke="#E05A47" stroke-width="9" stroke-linecap="round"/>
      <circle cx="31" cy="68" r="12" fill="#E05A47" stroke="${INK}" stroke-width="3"/>
      <path d="M26 57l6 10l6 -10z" fill="#FCE3DC"/>
      <circle cx="129" cy="68" r="12" fill="#E05A47" stroke="${INK}" stroke-width="3"/>
      <path d="M124 57l6 10l6 -10z" fill="#FCE3DC"/>
      <!-- Ögonstjälkar -->
      <path d="M68 62v-12M92 62v-12" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="68" cy="48" r="9" fill="#FFF" stroke="${INK}" stroke-width="3"/>
      <circle cx="92" cy="48" r="9" fill="#FFF" stroke="${INK}" stroke-width="3"/>
      ${ogon(m, 68, 92, 48, 4.2)}
      <!-- Kropp -->
      <ellipse cx="80" cy="96" rx="40" ry="30" fill="#E05A47" stroke="${INK}" stroke-width="3.2"/>
      <ellipse cx="80" cy="103" rx="24" ry="15" fill="#F9B89E"/>
      <path d="${m === "sad" ? "M70 100q10 -6 20 0" : m === "happy" ? "M66 93q14 14 28 0" : "M70 96q10 8 20 0"}" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`; }
  },
  {
    id: "lo", name: "Lo", roll: "Läsuggla i Botaniska", bg: "#E6EFE0",
    draw(m){ return `
      <circle cx="80" cy="84" r="64" fill="#E6EFE0"/>
      <path d="M54 52l-8 -16l18 8zM106 52l8 -16l-18 8z" fill="#8C6239" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="80" cy="96" rx="36" ry="42" fill="#9C6F44" stroke="${INK}" stroke-width="3.2"/>
      <ellipse cx="80" cy="112" rx="23" ry="22" fill="#F5E6CC"/>
      <path d="M70 106q4 4 8 0M82 106q4 4 8 0M75 116q5 4 10 0" fill="none" stroke="#9C6F44" stroke-width="2.4" stroke-linecap="round"/>
      <!-- Läsglasögon -->
      <circle cx="66" cy="76" r="14" fill="#FFFDF7" stroke="#2D8A56" stroke-width="3.6"/>
      <circle cx="94" cy="76" r="14" fill="#FFFDF7" stroke="#2D8A56" stroke-width="3.6"/>
      <path d="M80 76h0" stroke="#2D8A56" stroke-width="4"/>
      ${ogon(m, 66, 94, 76, 5)}
      <path d="M75 86h10l-5 9z" fill="#F2B705" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`; }
  },
  {
    id: "tuffe", name: "Tuffe", roll: "Spårvagnsvalp", bg: "#FBF0D5",
    draw(m){ return `
      <circle cx="80" cy="84" r="64" fill="#FBF0D5"/>
      <ellipse cx="44" cy="82" rx="13" ry="24" transform="rotate(14 44 82)" fill="#7A4F2B" stroke="${INK}" stroke-width="3.2"/>
      <ellipse cx="116" cy="82" rx="13" ry="24" transform="rotate(-14 116 82)" fill="#7A4F2B" stroke="${INK}" stroke-width="3.2"/>
      <ellipse cx="80" cy="122" rx="30" ry="22" fill="#D9A05B" stroke="${INK}" stroke-width="3.2"/>
      <!-- Blått halsband med guldklocka -->
      <path d="M56 106q24 10 48 0" fill="none" stroke="#1B68B3" stroke-width="7" stroke-linecap="round"/>
      <circle cx="80" cy="116" r="7" fill="#F2B705" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="80" cy="78" r="32" fill="#D9A05B" stroke="${INK}" stroke-width="3.2"/>
      <ellipse cx="80" cy="88" rx="18" ry="13" fill="#FFF7EB"/>
      ${ogon(m, 68, 92, 72, 5)}
      <ellipse cx="80" cy="83" rx="6" ry="4.5" fill="${INK}"/>
      <path d="${m === "sad" ? "M73 95q7 -5 14 0" : m === "happy" ? "M70 89q10 11 20 0" : "M73 91q7 6 14 0"}" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`; }
  }
];

const GAMLA_ID_MAP = {
  bloppy: "kaj", zippy: "rut", toffe: "salle", stella: "pelle", bip: "lo", mans: "tuffe"
};

export function charSVG(id, mood = "idle"){
  const renId = GAMLA_ID_MAP[id] || id;
  const c = CHARACTERS.find(x => x.id === renId) || CHARACTERS[0];
  return `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">${c.draw(mood)}</svg>`;
}

export const kompisSVG = (p, mood = "idle") => charSVG(p?.char || "kaj", mood);

/* ── Lackteman & Pynt till Vagnhallen (ersätter gamla hat-butiken!) ──── */
export const VAGN_TEMAN = [
  { id: "gbg",       name: "Göteborgsblå",   pris: 0,   kaross: "#1B68B3", tak: "#F7F4EC", desc: "Klassisk blå spårvagn i Göteborg" },
  { id: "ring",      name: "Ringlinien",     pris: 70,  kaross: "#2A7A58", tak: "#F2E2B6", desc: "Grön-krämfärgad veterankänsla" },
  { id: "solsken",   name: "Sommarvagn",     pris: 110, kaross: "#E5A00D", tak: "#FFFDF7", desc: "Solgul som Linje 2 vid Saltholmen" },
  { id: "liseberg",  name: "Lisebergskaninen", pris: 150, kaross: "#C84B6E", tak: "#FFE8F0", desc: "Festlig nöjesparksvagn" },
  { id: "haga",      name: "Haga Tegel",     pris: 190, kaross: "#C95533", tak: "#FBF2E3", desc: "Varm tegelröd som husen i Haga" },
  { id: "natt",      name: "Stjärnlinjen",   pris: 260, kaross: "#1A2B4C", tak: "#F2B705", desc: "Midnattsblå med guldtak" }
];

export const VAGN_PYNT = [
  { id: "flaggor", name: "Flaggdag",        pris: 80,  bild: "🇸🇪", desc: "Två svenska flaggor på taket" },
  { id: "jul",     name: "Julspårvagn",     pris: 140, bild: "✨", desc: "Glittrande ljusslinga längs hela taket" },
  { id: "stjarna", name: "Guldstjärna",     pris: 180, bild: "⭐", desc: "Blänkande ordmästare-stjärna på fronten" }
];

export const vagnTemaAv = (id) => VAGN_TEMAN.find(t => t.id === id) || VAGN_TEMAN[0];

/* ── Guldbiljett-ikon (istället för mynt!) ───────────────────────────── */
export const biljettSVG = `<svg viewBox="0 0 36 26" xmlns="http://www.w3.org/2000/svg"><path d="M3 4h30v5.5a3.5 3.5 0 0 0 0 7V22H3v-5.5a3.5 3.5 0 0 0 0-7z" fill="#F2B705" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 5v16" stroke="${INK}" stroke-width="2" stroke-dasharray="3 3"/><circle cx="22.5" cy="13" r="3.5" fill="#FFF8E1" stroke="${INK}" stroke-width="1.8"/></svg>`;

/* ── Spårvagn framifrån & från sidan ─────────────────────────────────── */
export function tramSVG(col, ref){
  return `<svg viewBox="0 0 100 116" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <path d="M50 8V3M35 3h30" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
    <rect x="12" y="10" width="76" height="90" rx="18" fill="${col}" stroke="${INK}" stroke-width="3.8"/>
    <rect x="20" y="20" width="60" height="20" rx="6" fill="#141C2B"/>
    <text x="50" y="35.5" text-anchor="middle" font-family="Fredoka, system-ui" font-weight="700" font-size="16" fill="#FFB800">${escapeHtml(ref)}</text>
    <rect x="20" y="48" width="60" height="32" rx="8" fill="#CBE8F9" stroke="${INK}" stroke-width="3.2"/>
    <path d="M50 48v32" stroke="${INK}" stroke-width="2.8"/>
    <circle cx="26" cy="90" r="5" fill="#FFF3B0" stroke="${INK}" stroke-width="2.6"/>
    <circle cx="74" cy="90" r="5" fill="#FFF3B0" stroke="${INK}" stroke-width="2.6"/>
    <rect x="20" y="99" width="60" height="8" rx="4" fill="${INK}"/>
  </svg>`;
}

const VAGN_W = 360, VAGN_H = 88;
export function vagnSidoSVG(typ, o = {}){
  const bredd = Math.min(342, typ.langd * 7.45);
  const delar = typ.delar, summa = delar.reduce((a, b) => a + b, 0);
  const gap = delar.length > 1 ? 3 : 0;
  const x0 = (VAGN_W - bredd) / 2, y = 26, h = 38, by = y + 7, bh = 16;
  const svart = typ.band === "svart";
  const fram = x0 + bredd;
  const tema = vagnTemaAv(o.tema);
  const karossFarg = tema.kaross;
  const takFarg = tema.tak;
  const vb = o.stor
    ? `${(x0 - Math.max(16, (220 - bredd) / 2)).toFixed(1)} 0 ${Math.max(220, bredd + 32).toFixed(1)} ${VAGN_H}`
    : `0 0 ${VAGN_W} ${VAGN_H}`;
  let s = `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" class="vagn-sida">`;
  /* Spår */
  s += `<path d="M${(x0 - 8).toFixed(1)} 78H${(fram + 8).toFixed(1)}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  /* Strömavtagare */
  const px = delar.length === 1
    ? x0 + bredd * 0.5
    : fram - (bredd - gap * (delar.length - 1)) * delar[delar.length - 1] / summa * 0.45;
  s += `<path d="M${(px - 9).toFixed(1)} ${y - 2}l9 -10 9 10M${(px - 13).toFixed(1)} ${y - 12}h26" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  let x = x0;
  const kaross = (x, w, rl, rr) => `M${(x + rl).toFixed(1)} ${y}h${(w - rl - rr).toFixed(1)}a${rr} ${rr} 0 0 1 ${rr} ${rr}v${h - 2 * rr}a${rr} ${rr} 0 0 1 -${rr} ${rr}h-${(w - rl - rr).toFixed(1)}a${rl} ${rl} 0 0 1 -${rl} -${rl}v-${h - 2 * rl}a${rl} ${rl} 0 0 1 ${rl} -${rl}z`;
  delar.forEach((d, i) => {
    const dw = (bredd - gap * (delar.length - 1)) * d / summa;
    const forst = i === 0, sist = i === delar.length - 1, kort = delar.length > 1 && d <= 4;
    const rl = forst ? 10 : 3, rr = sist ? 10 : 3;
    s += `<path d="${kaross(x, dw, rl, rr)}" fill="${karossFarg}" stroke="${INK}" stroke-width="2.8"/>`;
    s += `<path d="M${(x + rl).toFixed(1)} ${y + 1.5}h${(dw - rl - rr).toFixed(1)}" stroke="${takFarg}" stroke-width="3" opacity=".95"/>`;
    s += `<rect x="${(x + 2).toFixed(1)}" y="${by}" width="${(dw - 4).toFixed(1)}" height="${bh}" fill="${svart ? GBG_SVART : GBG_VIT}"/>`;
    const dorrar = delar.length === 1 ? [0.16, 0.7] : kort ? [] : [forst && delar.length > 1 ? 0.62 : 0.3];
    const dx = dorrar.map(f => x + dw * f - 6);
    for(const p of dx){
      s += `<rect x="${p.toFixed(1)}" y="${by}" width="12" height="${h - 9}" rx="1.5" fill="${karossFarg}" stroke="${INK}" stroke-width="1.5"/>`;
      s += `<rect x="${(p + 1.5).toFixed(1)}" y="${by + 2}" width="9" height="${bh - 4}" rx="1" fill="${GLAS}"/>`;
      s += `<path d="M${(p + 6).toFixed(1)} ${by}v${h - 9}" stroke="${INK}" stroke-width="1.1"/>`;
    }
    const fn = Math.max(1, Math.round((dw - dorrar.length * 14) / 21));
    const fw = (dw - 10 - dorrar.length * 14 - (fn - 1) * 5) / fn;
    let fx = x + 5;
    for(let k = 0; k < fn; k++){
      while(dx.some(p => fx < p + 13 && fx + fw > p - 1)) fx += 1;
      if(fx + fw > x + dw - 4) break;
      const hytt = sist && k === fn - 1;
      s += `<rect x="${fx.toFixed(1)}" y="${by + 2.5}" width="${fw.toFixed(1)}" height="${bh - 5}" rx="2.5" fill="${GLAS}" stroke="${svart ? "#5B6B85" : INK}" stroke-width="1.5"/>`;
      if(hytt) s += `<path d="M${(fx + fw - 1).toFixed(1)} ${by + 2.5}l3 ${bh - 5}" stroke="${svart ? "#5B6B85" : INK}" stroke-width="1.4"/>`;
      fx += fw + 5;
    }
    if(i > 0) s += `<rect x="${(x - gap - 1.5).toFixed(1)}" y="${y + 5}" width="${gap + 3}" height="${h - 10}" rx="1" fill="${INK}"/>`;
    const n = typ.boggier[i] || 0;
    const lagen = n === 1 ? [0.5] : n === 2 ? [0.2, 0.8] : [];
    for(const f of lagen){
      const cx = x + dw * f;
      s += `<rect x="${(cx - 12).toFixed(1)}" y="${y + h - 3}" width="24" height="6" rx="2" fill="${INK}"/>`;
      s += `<circle cx="${(cx - 6.5).toFixed(1)}" cy="${y + h + 5}" r="4.5" fill="${INK}"/><circle cx="${(cx + 6.5).toFixed(1)}" cy="${y + h + 5}" r="4.5" fill="${INK}"/>`;
    }
    x += dw + gap;
  });
  s += `<circle cx="${(fram - 5).toFixed(1)}" cy="${y + h - 9}" r="3.5" fill="#FFF3B0" stroke="${INK}" stroke-width="1.8"/>`;
  if(o.linje){
    s += `<rect x="${(fram - 34).toFixed(1)}" y="${y + 1.5}" width="22" height="7" rx="1.5" fill="#111824"/>`;
    s += `<text x="${(fram - 23).toFixed(1)}" y="${y + 7.2}" text-anchor="middle" font-family="Fredoka, system-ui" font-weight="700" font-size="6.4" fill="#FFB800">${escapeHtml(o.linje.ref)}</text>`;
  }
  if(o.nr) s += `<text x="${(fram - 14).toFixed(1)}" y="${y + h - 5}" text-anchor="end" font-family="Fredoka, system-ui" font-weight="700" font-size="7.4" fill="#FFFDF7">${escapeHtml(o.nr)}</text>`;
  if(o.stjarna){
    s += `<path d="M0-7 2-2.2 7-2 3.4 1.5 4.3 6.4 0 3.9-4.3 6.4-3.4 1.5-7-2-2-2.2Z" transform="translate(${(fram - 42).toFixed(1)} ${y + h - 8})" fill="#F2B705" stroke="${INK}" stroke-width="1.4"/>`;
  }
  if(o.flaggor) for(const fx of [fram - 16, fram - 30]){
    s += `<path d="M${fx} ${y - 1}v-14" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>`;
    s += `<rect x="${fx}" y="${y - 15}" width="11" height="7" fill="#1B68B3" stroke="${INK}" stroke-width="1.1"/>`;
    s += `<path d="M${fx} ${y - 11.5}h11M${fx + 3.5} ${y - 15}v7" stroke="#F2B705" stroke-width="1.6"/>`;
  }
  if(o.jul){
    const farger = ["#D95D39", "#F2B705", "#2D8A56", "#62CDF2", "#F4A4A4"];
    for(let k = 0, gx = x0 + 8; gx < fram - 6; gx += 8, k++){
      s += `<circle cx="${gx.toFixed(1)}" cy="${y - 3.5}" r="2" fill="${farger[k % farger.length]}" stroke="${INK}" stroke-width=".7"/>`;
    }
    s += `<path d="M${(x0 + 8).toFixed(1)} ${y - 3.5}H${(fram - 6).toFixed(1)}" stroke="${INK}" stroke-width=".7" stroke-dasharray="1 3"/>`;
  }
  return s + `</svg>`;
}

/* ── LED-skylt & Hållplatsskylt ──────────────────────────────────────── */
export function ledSkyltHTML(ref, col, dest, stil = "versaler"){
  const darkTxt = ljusFarg(col);
  return `<div class="led-board" aria-label="Linje ${escapeHtml(ref)} mot ${escapeHtml(dest)}">
    <span class="led-line-badge" style="background:${col};color:${darkTxt ? INK : "#FFFDF7"}">${escapeHtml(ref)}</span>
    <span class="led-dest">${escapeHtml(formatOrd(dest, stil))}</span>
  </div>`;
}

export function stoppSkyltHTML(namn, stil = "versaler"){
  return `<span class="stopp-skylt">
    <span class="stopp-skylt-h">H</span>
    <span class="stopp-skylt-namn">${escapeHtml(formatOrd(namn, stil))}</span>
  </span>`;
}

export function ordBildHTML(entry, stor = false){
  if(!entry) return "";
  const b = entry.bild || "";
  if(b.startsWith("svg:")){
    const key = b.slice(4);
    return `<span class="ord-bild ${stor ? "stor" : ""}">${ordBildSVG(key)}</span>`;
  }
  return `<span class="ord-bild emoji ${stor ? "stor" : ""}" aria-hidden="true">${b}</span>`;
}

/* ── Vykort-scener (reserv till riktiga foton) ───────────────────────── */
const HIMMEL = `<rect width="320" height="150" fill="#DDEEF9"/><circle cx="268" cy="30" r="16" fill="#F2B705" stroke="${INK}" stroke-width="2.5"/>`;
const MARK = `<rect y="112" width="320" height="38" fill="#82BC87" stroke="${INK}" stroke-width="2.5"/>`;
const GATA = `<rect y="112" width="320" height="38" fill="#C9BEB0" stroke="${INK}" stroke-width="2.5"/><path d="M0 131h34M56 131h34M112 131h34M168 131h34M224 131h34M280 131h34" stroke="#FFFDF7" stroke-width="3.5" stroke-linecap="round"/>`;
const hus = (x, w, h, f) => `<rect x="${x}" y="${112 - h}" width="${w}" height="${h}" rx="4" fill="${f}" stroke="${INK}" stroke-width="2.5"/>`;

const SCENES = {
  gata: HIMMEL + GATA + hus(22, 70, 62, "#E8A282") + hus(106, 62, 50, "#F2D184") + hus(182, 80, 70, "#9AC3DC"),
  torg: HIMMEL + `<rect y="112" width="320" height="38" fill="#DFD5C5" stroke="${INK}" stroke-width="2.5"/>` + hus(12, 58, 58, "#E8A282") + hus(246, 62, 64, "#9AC3DC") + `<rect x="110" y="74" width="96" height="38" fill="#FFFDF7" stroke="${INK}" stroke-width="2.5"/><path d="M102 74h112l-12-18h-88z" fill="#D95D39" stroke="${INK}" stroke-width="2.5"/>`,
  hav: `<rect width="320" height="150" fill="#DDEEF9"/><circle cx="266" cy="28" r="15" fill="#F2B705" stroke="${INK}" stroke-width="2.5"/><rect y="94" width="320" height="56" fill="#3B8AC4" stroke="${INK}" stroke-width="2.5"/><path d="M124 94l16-54 28 54z" fill="#FFFDF7" stroke="${INK}" stroke-width="2.5"/><path d="M116 94h62l-10 14h-42z" fill="#D95D39" stroke="${INK}" stroke-width="2.5"/>`,
  hamn: HIMMEL + `<rect y="102" width="320" height="48" fill="#3B8AC4" stroke="${INK}" stroke-width="2.5"/><path d="M44 102V34h92M136 34v22" fill="none" stroke="#D95D39" stroke-width="4"/><rect x="180" y="72" width="112" height="30" rx="5" fill="#1B68B3" stroke="${INK}" stroke-width="2.5"/>`,
  skog: HIMMEL + MARK + `<path d="M60 112l24-54 24 54zM144 112l30-66 30 66zM230 112l22-48 22 48z" fill="#2D8A56" stroke="${INK}" stroke-width="2.5"/>`,
  rymd: `<rect width="320" height="150" fill="#1A2B4C"/><circle cx="48" cy="30" r="2.5" fill="#FFF"/><circle cx="150" cy="40" r="2.5" fill="#FFF"/><circle cx="260" cy="42" r="20" fill="#E89A6D" stroke="#FFF" stroke-width="2"/><ellipse cx="260" cy="42" rx="34" ry="8" fill="none" stroke="#F2B705" stroke-width="4" transform="rotate(-15 260 42)"/><rect y="118" width="320" height="32" fill="#384D75"/>`
};

export function sceneSVG(namn){
  const k = stopKind(namn);
  return `<svg class="scene" viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">${SCENES[k] || SCENES.gata}</svg>`;
}

/* ── Biljettstämplar (Achievements) ──────────────────────────────────── */
export const MARKEN = [
  { id:"forsta-stopp", name:"Första biljetten", emoji:"🎫", desc:"Åk din första hållplats" },
  { id:"ord-10",       name:"Ordsamlare",       emoji:"📖", desc:"Läs 10 olika ord rätt" },
  { id:"ord-30",       name:"Bokslukare",       emoji:"📚", desc:"Läs 30 olika ord rätt" },
  { id:"ord-60",       name:"Ordmästare",       emoji:"🌟", desc:"Läs 60 olika ord rätt" },
  { id:"svit-6",       name:"Rakt på spåret",   emoji:"🔥", desc:"Sex rätt i rad" },
  { id:"svit-12",      name:"Expressvagn",      emoji:"⚡", desc:"Tolv rätt i rad" },
  { id:"kluring-5",    name:"Kluring-knäckare", emoji:"💡", desc:"Klara 5 kluriga ord" },
  { id:"stopp-15",     name:"Ute på stan",      emoji:"🗺️", desc:"Besök 15 hållplatser" },
  { id:"stopp-40",     name:"Göteborgskännare", emoji:"⚓", desc:"Besök 40 hållplatser" },
  { id:"stopp-80",     name:"Halva linjenätet", emoji:"🏙️", desc:"Besök 80 hållplatser" },
  { id:"stopp-132",    name:"Hela Göteborg!",   emoji:"👑", desc:"Besök alla 132 hållplatser" },
  { id:"hel-linje",    name:"Ändstation",       emoji:"🏁", desc:"Åk en hel spårvagnslinje" },
  { id:"resmal-1",     name:"Framme!",          emoji:"🚩", desc:"Klara ditt första resmål" },
  { id:"resmal-5",     name:"Kartmästare",      emoji:"🧭", desc:"Klara 5 resmål" },
  { id:"omvag",        name:"Omvägen",          emoji:"🚧", desc:"Klara ett resmål med spårarbete" },
  { id:"egen-vagn",    name:"Vagnhallen",       emoji:"🛠️", desc:"Bygg din egen spårvagn" },
  { id:"egen-skylt",   name:"Skyltmakare",      emoji:"🪧", desc:"Skriv en egen destinationsskylt" },
  { id:"kort-5",       name:"Kortsamlare",      emoji:"🃏", desc:"Samla 5 vagnkort" },
  { id:"kort-alla",    name:"Hela vagnhallen",  emoji:"🏆", desc:"Samla alla vagnkort" },
  { id:"vagn-modell",  name:"Vagnkännare",      emoji:"🚃", desc:"Känn igen 10 spårvagnsmodeller" }
];
