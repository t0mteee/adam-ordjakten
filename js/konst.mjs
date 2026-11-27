/* ═══════════════════════════════════════════════════════════════
   Ordjakten — SVG-konst, kompisar, spårvagnar, scener & ordbilder
   ═══════════════════════════════════════════════════════════════ */

import { stopKind } from "./gbg-data.mjs";
import { formatOrd } from "./ord-data.mjs";

export const INK = "#2E1A66";
export const GBG_BLA = "#2F6FBF";
export const GBG_VIT = "#F4F7FA";
export const GBG_SVART = "#232A36";
export const GLAS = "#A6E7FF";

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

/* ── Ansikten & Kompisar ─────────────────────────────────────────────── */
function eyes(mood, x, y, r, spread){
  const L = x - spread, R = x + spread;
  if(mood === "happy"){
    return [L, R].map(cx =>
      `<path d="M${cx - r - 2} ${y + 3} Q${cx} ${y - r - 5} ${cx + r + 2} ${y + 3}" fill="none" stroke="${INK}" stroke-width="${r * 0.55}" stroke-linecap="round"/>`
    ).join("");
  }
  const dy = mood === "sad" ? r * 0.42 : 0;
  const brow = mood === "sad"
    ? [L, R].map((cx, i) =>
        `<path d="M${cx - r} ${y - r * 1.5 + (i ? -3 : 3)} L${cx + r} ${y - r * 1.5 + (i ? 3 : -3)}" stroke="${INK}" stroke-width="${r * 0.45}" stroke-linecap="round"/>`
      ).join("")
    : "";
  return [L, R].map(cx =>
    `<ellipse cx="${cx}" cy="${y}" rx="${r}" ry="${r * 1.14}" fill="#FFFDF7" stroke="${INK}" stroke-width="3.4"/>` +
    `<circle cx="${cx}" cy="${y + dy}" r="${r * 0.5}" fill="${INK}"/>` +
    `<circle cx="${cx + r * 0.22}" cy="${y + dy - r * 0.2}" r="${r * 0.17}" fill="#FFFDF7"/>`
  ).join("") + brow;
}

function mouth(mood, x, y, s){
  let d;
  if(mood === "happy"){
    d = `<path d="M-21 -4 Q0 26 21 -4 Q0 4 -21 -4 Z" fill="${INK}"/><path d="M-9 11 Q0 23 9 11 Q0 8 -9 11 Z" fill="#FF6B6B"/>`;
  }else if(mood === "sad"){
    d = `<path d="M-13 8 Q0 -4 13 8" fill="none" stroke="${INK}" stroke-width="4.6" stroke-linecap="round"/>`;
  }else{
    d = `<path d="M-13 -2 Q0 12 13 -2" fill="none" stroke="${INK}" stroke-width="4.6" stroke-linecap="round"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">${d}</g>`;
}

export const CHARACTERS = [
  { id:"bloppy", name:"Bloppy", tint:"#62CDF2", draw(m){ return `
      <path d="M148 150 q34 -6 30 -38" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>
      <path d="M148 150 q34 -6 30 -38" fill="none" stroke="#62CDF2" stroke-width="9" stroke-linecap="round"/>
      <ellipse cx="100" cy="168" rx="46" ry="36" fill="#62CDF2" stroke="${INK}" stroke-width="5"/>
      <ellipse cx="100" cy="178" rx="27" ry="24" fill="#FFFDF7" stroke="${INK}" stroke-width="4"/>
      <ellipse cx="52" cy="72" rx="17" ry="30" transform="rotate(-18 52 72)" fill="#2FA9D8" stroke="${INK}" stroke-width="5"/>
      <ellipse cx="148" cy="72" rx="17" ry="30" transform="rotate(18 148 72)" fill="#2FA9D8" stroke="${INK}" stroke-width="5"/>
      <circle cx="100" cy="84" r="54" fill="#62CDF2" stroke="${INK}" stroke-width="5"/>
      <path d="M70 44 q16 -12 30 -2" fill="none" stroke="#2FA9D8" stroke-width="9" stroke-linecap="round"/>
      <ellipse cx="100" cy="110" rx="35" ry="26" fill="#FFFDF7" stroke="${INK}" stroke-width="4.5"/>
      ${eyes(m, 100, 66, 12, 21)}
      <ellipse cx="100" cy="98" rx="10" ry="7.5" fill="${INK}"/>
      ${mouth(m, 100, 118, 0.8)}`; } },
  { id:"zippy", name:"Zippy", tint:"#FFC42E", draw(m){ return `
      <path d="M100 26 v14" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="22" r="9" fill="#FF6B6B" stroke="${INK}" stroke-width="4.5"/>
      <ellipse cx="62" cy="182" rx="17" ry="11" fill="#2E1A66"/>
      <ellipse cx="138" cy="182" rx="17" ry="11" fill="#2E1A66"/>
      <circle cx="100" cy="112" r="64" fill="#FFC42E" stroke="${INK}" stroke-width="5"/>
      <path d="M36 106 a64 64 0 0 1 128 0 z" fill="#57C96B" stroke="${INK}" stroke-width="5"/>
      <path d="M36 106 h128" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="30" cy="132" rx="11" ry="17" fill="#FFC42E" stroke="${INK}" stroke-width="4.5"/>
      <ellipse cx="170" cy="132" rx="11" ry="17" fill="#FFC42E" stroke="${INK}" stroke-width="4.5"/>
      <path d="M74 128 h52" stroke="${INK}" stroke-width="5"/>
      <circle cx="74" cy="128" r="25" fill="rgba(255,255,255,.55)" stroke="${INK}" stroke-width="5"/>
      <circle cx="126" cy="128" r="25" fill="rgba(255,255,255,.55)" stroke="${INK}" stroke-width="5"/>
      ${eyes(m, 100, 128, 12, 26)}
      ${mouth(m, 100, 162, 0.72)}`; } },
  { id:"toffe", name:"Toffe", tint:"#FF6B6B", draw(m){ return `
      <rect x="62" y="96" width="76" height="88" rx="26" fill="#FFF1D2" stroke="${INK}" stroke-width="5"/>
      <ellipse cx="46" cy="140" rx="12" ry="15" fill="#FFF1D2" stroke="${INK}" stroke-width="4.5"/>
      <ellipse cx="154" cy="140" rx="12" ry="15" fill="#FFF1D2" stroke="${INK}" stroke-width="4.5"/>
      <path d="M18 106 a82 66 0 0 1 164 0 q-82 16 -164 0 z" fill="#FF6B6B" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="58" cy="72" r="14" fill="#FFFDF7"/><circle cx="112" cy="56" r="17" fill="#FFFDF7"/><circle cx="152" cy="86" r="11" fill="#FFFDF7"/>
      ${eyes(m, 100, 128, 11, 20)}
      ${mouth(m, 100, 154, 0.66)}`; } },
  { id:"stella", name:"Stella", tint:"#FF8AD0", draw(m){ return `
      <circle cx="46" cy="86" r="22" fill="#FF6B6B" stroke="${INK}" stroke-width="4.5"/>
      <circle cx="36" cy="122" r="20" fill="#FFC42E" stroke="${INK}" stroke-width="4.5"/>
      <circle cx="46" cy="156" r="18" fill="#57C96B" stroke="${INK}" stroke-width="4.5"/>
      <circle cx="64" cy="52" r="18" fill="#62CDF2" stroke="${INK}" stroke-width="4.5"/>
      <path d="M118 26 L104 62 L136 58 Z" fill="#FFC42E" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M70 44 L60 66 L84 62 Z" fill="#FF8AD0" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
      <ellipse cx="106" cy="112" rx="58" ry="52" fill="#FFC9E6" stroke="${INK}" stroke-width="5"/>
      <ellipse cx="118" cy="140" rx="34" ry="25" fill="#FFE7F3" stroke="${INK}" stroke-width="4"/>
      <circle cx="106" cy="138" r="4" fill="${INK}"/><circle cx="130" cy="138" r="4" fill="${INK}"/>
      ${eyes(m, 104, 100, 12, 23)}
      ${mouth(m, 118, 152, 0.6)}`; } },
  { id:"bip", name:"Bip", tint:"#4ED8C8", draw(m){ return `
      <path d="M100 22 v18" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="18" r="10" fill="#FFC42E" stroke="${INK}" stroke-width="4.5"/>
      <rect x="66" y="150" width="68" height="42" rx="16" fill="#9061F9" stroke="${INK}" stroke-width="5"/>
      <circle cx="86" cy="172" r="7" fill="#FFC42E" stroke="${INK}" stroke-width="3"/>
      <circle cx="114" cy="172" r="7" fill="#FF6B6B" stroke="${INK}" stroke-width="3"/>
      <rect x="30" y="118" width="16" height="26" rx="7" fill="#9061F9" stroke="${INK}" stroke-width="4.5"/>
      <rect x="154" y="118" width="16" height="26" rx="7" fill="#9061F9" stroke="${INK}" stroke-width="4.5"/>
      <rect x="42" y="44" width="116" height="110" rx="30" fill="#4ED8C8" stroke="${INK}" stroke-width="5"/>
      <rect x="58" y="60" width="84" height="20" rx="10" fill="#2FA9D8" stroke="${INK}" stroke-width="4"/>
      ${eyes(m, 100, 108, 13, 24)}
      ${mouth(m, 100, 138, 0.72)}`; } },
  { id:"mans", name:"Måns", tint:"#FF9E4A", draw(m){ return `
      <ellipse cx="100" cy="176" rx="42" ry="30" fill="#FF9E4A" stroke="${INK}" stroke-width="5"/>
      <path d="M56 62 L50 20 L88 42 Z" fill="#FF9E4A" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M144 62 L150 20 L112 42 Z" fill="#FF9E4A" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="100" cy="98" r="58" fill="#FF9E4A" stroke="${INK}" stroke-width="5"/>
      <path d="M76 52 q10 -9 20 -2M104 50 q10 -9 20 -2" fill="none" stroke="#E2762A" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="84" cy="126" rx="20" ry="15" fill="#FFF1D2" stroke="${INK}" stroke-width="3.5"/>
      <ellipse cx="116" cy="126" rx="20" ry="15" fill="#FFF1D2" stroke="${INK}" stroke-width="3.5"/>
      <path d="M92 114 h16 l-8 9 z" fill="#FF6B6B" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M40 116 h22M40 130 h22M138 116 h22M138 130 h22" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
      ${eyes(m, 100, 88, 12, 22)}
      ${mouth(m, 100, 128, 0.62)}`; } }
];

const HJASSA = { bloppy:[100, 32], zippy:[100, 50], toffe:[100, 40], stella:[106, 60], bip:[100, 44], mans:[100, 42] };

export const TILLBEHOR = [
  { id:"keps", name:"Keps", pris:60, ord:"en keps",
    rita:`<path d="M-46 4 q46 -52 92 0 z" fill="#FF6B6B" stroke="${INK}" stroke-width="5"/><path d="M-50 2 h104 l24 14 q-14 8 -40 4 h-88 z" fill="#DD4747" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="-42" r="6" fill="#FFC42E" stroke="${INK}" stroke-width="4"/>` },
  { id:"rosett", name:"Rosett", pris:90, ord:"en rosett",
    rita:`<g transform="translate(34 -6)"><path d="M0 0 l-32 -22 v44 z M0 0 l32 -22 v44 z" fill="#FF8AD0" stroke="${INK}" stroke-width="5"/><circle r="9" fill="#FF6B6B" stroke="${INK}" stroke-width="4"/></g>` },
  { id:"forare", name:"Förarmössa", pris:140, ord:"en förarmössa",
    rita:`<path d="M-48 6 q48 -44 96 0 z" fill="#2E4A9E" stroke="${INK}" stroke-width="5"/><path d="M-54 4 h108 q4 8 -6 12 h-96 q-10 -4 -6 -12z" fill="#1F3579" stroke="${INK}" stroke-width="5"/><path d="M-30 16 h60 l8 10 h-76 z" fill="#2E1A66" stroke="${INK}" stroke-width="4"/><circle cx="0" cy="-8" r="11" fill="#FFC42E" stroke="${INK}" stroke-width="4"/><rect x="-6" y="-14" width="12" height="12" rx="3" fill="#62CDF2" stroke="${INK}" stroke-width="3"/>` },
  { id:"party", name:"Partyhatt", pris:180, ord:"en partyhatt",
    rita:`<path d="M-30 8 l30 -74 30 74 z" fill="#9061F9" stroke="${INK}" stroke-width="5"/><circle cx="-8" cy="-14" r="5" fill="#FFC42E"/><circle cx="10" cy="-34" r="5" fill="#FF8AD0"/><circle cx="4" cy="-4" r="5" fill="#57C96B"/><circle cx="0" cy="-70" r="9" fill="#FF6B6B" stroke="${INK}" stroke-width="4"/>` },
  { id:"krona", name:"Krona", pris:260, ord:"en krona",
    rita:`<path d="M-40 8 l-6 -46 22 22 24 -34 24 34 22 -22 -6 46 z" fill="#FFC42E" stroke="${INK}" stroke-width="5"/><circle cx="-46" cy="-38" r="6" fill="#FF6B6B" stroke="${INK}" stroke-width="3.5"/><circle cx="0" cy="-50" r="6" fill="#62CDF2" stroke="${INK}" stroke-width="3.5"/><circle cx="46" cy="-38" r="6" fill="#57C96B" stroke="${INK}" stroke-width="3.5"/>` },
  { id:"stjarna", name:"Stjärnpannband", pris:360, ord:"ett stjärnpannband",
    rita:`<path d="M-56 10 q56 -24 112 0" fill="none" stroke="#9061F9" stroke-width="10" stroke-linecap="round"/><path d="M-56 10 q56 -24 112 0" fill="none" stroke="${INK}" stroke-width="3"/><g transform="translate(0 -22) scale(1.25)"><path d="M0-14l4.1 8.6 9.5 1.3-6.9 6.5 1.8 9.4L0 7.4l-8.5 4.4 1.8-9.4-6.9-6.5 9.5-1.3z" fill="#FFC42E" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/></g>` }
];

export const VAGN_PYNT = [
  { id:"flaggor", name:"Flaggor på vagnen", pris:80, bild:"🇸🇪", desc:"Svenska flaggor på taket som på flaggdagar" },
  { id:"jul",     name:"Julbelysning",      pris:150, bild:"✨", desc:"Färgglada lampor längs hela taket" }
];

export const LEKSAKER = [
  { id:"bok",     name:"Sagobok",       pris:50,  bild:"📖" },
  { id:"vagnlek", name:"Minispårvagn",  pris:70,  bild:"🚋" },
  { id:"katt",    name:"Kattkompis",    pris:90,  bild:"🐱" },
  { id:"glass",   name:"Glass",         pris:110, bild:"🍦" },
  { id:"raket",   name:"Rymdraket",     pris:150, bild:"🚀" },
  { id:"gitarr",  name:"Gitarr",        pris:200, bild:"🎸" }
];

export const tillbehorAv = (id) => TILLBEHOR.find(t => t.id === id);

export function charSVG(id, mood = "idle", hatt = null){
  const c = CHARACTERS.find(x => x.id === id) || CHARACTERS[0];
  const t = hatt && tillbehorAv(hatt);
  const h = HJASSA[c.id] || [100, 40];
  return `<svg viewBox="0 0 200 208" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">${c.draw(mood)}${t ? `<g transform="translate(${h[0]} ${h[1]})">${t.rita}</g>` : ""}</svg>`;
}

export const kompisSVG = (p, mood = "idle") => charSVG(p?.char || "bloppy", mood, p?.tillbehor || null);

/* ── Ikoner ─────────────────────────────────────────────────────────── */
export const coinSVG = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="13" fill="#FFC42E" stroke="${INK}" stroke-width="3"/><circle cx="16" cy="16" r="8.5" fill="none" stroke="#E29A00" stroke-width="2.4"/><path d="M16 10v12M13 13.5h6M13 18.5h6" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/></svg>`;

export function starSVG(filled = true){
  return `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M18 3l4.6 9.5 10.4 1.5-7.6 7.3 1.8 10.4L18 26.8l-9.2 4.9 1.8-10.4L3 14l10.4-1.5z" fill="${filled ? "#FFC42E" : "#E5DDF5"}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/></svg>`;
}

/* ── Spårvagn framifrån & från sidan ─────────────────────────────────── */
export function tramSVG(col, ref){
  return `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <path d="M50 6V2" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M36 2h28" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>
    <rect x="10" y="10" width="80" height="94" rx="22" fill="${col}" stroke="${INK}" stroke-width="5"/>
    <rect x="20" y="22" width="60" height="20" rx="7" fill="${INK}"/>
    <text x="50" y="38" text-anchor="middle" font-family="Lilita One, system-ui" font-size="17" fill="#FFC42E">${escapeHtml(ref)}</text>
    <path d="M18 52h64v26a10 10 0 0 1-10 10H28a10 10 0 0 1-10-10z" fill="#A6E7FF" stroke="${INK}" stroke-width="4.5"/>
    <path d="M50 52v36" stroke="${INK}" stroke-width="4"/>
    <circle cx="24" cy="97" r="6" fill="#FFF3B0" stroke="${INK}" stroke-width="3.4"/>
    <circle cx="76" cy="97" r="6" fill="#FFF3B0" stroke="${INK}" stroke-width="3.4"/>
    <rect x="16" y="104" width="68" height="9" rx="4" fill="${INK}"/>
  </svg>`;
}

const VAGN_W = 360, VAGN_H = 84;
export function vagnSidoSVG(typ, o = {}){
  const bredd = Math.min(344, typ.langd * 7.5);
  const delar = typ.delar, summa = delar.reduce((a, b) => a + b, 0);
  const gap = delar.length > 1 ? 3 : 0;
  const x0 = (VAGN_W - bredd) / 2, y = 24, h = 38, by = y + 7, bh = 16;
  const svart = typ.band === "svart";
  const fram = x0 + bredd;
  const vb = o.stor
    ? `${(x0 - Math.max(16, (220 - bredd) / 2)).toFixed(1)} 0 ${Math.max(220, bredd + 32).toFixed(1)} ${VAGN_H}`
    : `0 0 ${VAGN_W} ${VAGN_H}`;
  let s = `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" class="vagn-sida">`;
  s += `<path d="M${(x0 - 6).toFixed(1)} 76H${(fram + 6).toFixed(1)}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  const px = delar.length === 1
    ? x0 + bredd * 0.5
    : fram - (bredd - gap * (delar.length - 1)) * delar[delar.length - 1] / summa * 0.45;
  s += `<path d="M${(px - 9).toFixed(1)} ${y - 2}l9 -10 9 10M${(px - 13).toFixed(1)} ${y - 12}h26" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  let x = x0;
  const kaross = (x, w, rl, rr) => `M${(x + rl).toFixed(1)} ${y}h${(w - rl - rr).toFixed(1)}a${rr} ${rr} 0 0 1 ${rr} ${rr}v${h - 2 * rr}a${rr} ${rr} 0 0 1 -${rr} ${rr}h-${(w - rl - rr).toFixed(1)}a${rl} ${rl} 0 0 1 -${rl} -${rl}v-${h - 2 * rl}a${rl} ${rl} 0 0 1 ${rl} -${rl}z`;
  delar.forEach((d, i) => {
    const dw = (bredd - gap * (delar.length - 1)) * d / summa;
    const forst = i === 0, sist = i === delar.length - 1, kort = delar.length > 1 && d <= 4;
    const rl = forst ? 10 : 3, rr = sist ? 10 : 3;
    s += `<path d="${kaross(x, dw, rl, rr)}" fill="${GBG_BLA}" stroke="${INK}" stroke-width="3"/>`;
    s += `<path d="M${(x + rl).toFixed(1)} ${y + 1.5}h${(dw - rl - rr).toFixed(1)}" stroke="${GBG_VIT}" stroke-width="3" opacity=".9"/>`;
    s += `<rect x="${(x + 2).toFixed(1)}" y="${by}" width="${(dw - 4).toFixed(1)}" height="${bh}" fill="${svart ? GBG_SVART : GBG_VIT}"/>`;
    const dorrar = delar.length === 1 ? [0.16, 0.7] : kort ? [] : [forst && delar.length > 1 ? 0.62 : 0.3];
    const dx = dorrar.map(f => x + dw * f - 6);
    for(const p of dx){
      s += `<rect x="${p.toFixed(1)}" y="${by}" width="12" height="${h - 9}" rx="1.5" fill="${GBG_BLA}" stroke="${INK}" stroke-width="1.6"/>`;
      s += `<rect x="${(p + 1.5).toFixed(1)}" y="${by + 2}" width="9" height="${bh - 4}" rx="1" fill="${GLAS}"/>`;
      s += `<path d="M${(p + 6).toFixed(1)} ${by}v${h - 9}" stroke="${INK}" stroke-width="1.2"/>`;
    }
    const fn = Math.max(1, Math.round((dw - dorrar.length * 14) / 21));
    const fw = (dw - 10 - dorrar.length * 14 - (fn - 1) * 5) / fn;
    let fx = x + 5;
    for(let k = 0; k < fn; k++){
      while(dx.some(p => fx < p + 13 && fx + fw > p - 1)) fx += 1;
      if(fx + fw > x + dw - 4) break;
      const hytt = sist && k === fn - 1;
      s += `<rect x="${fx.toFixed(1)}" y="${by + 2.5}" width="${fw.toFixed(1)}" height="${bh - 5}" rx="2.5" fill="${GLAS}" stroke="${svart ? "#5B6B85" : INK}" stroke-width="1.6"/>`;
      if(hytt) s += `<path d="M${(fx + fw - 1).toFixed(1)} ${by + 2.5}l3 ${bh - 5}" stroke="${svart ? "#5B6B85" : INK}" stroke-width="1.4"/>`;
      fx += fw + 5;
    }
    if(i > 0) s += `<rect x="${(x - gap - 1.5).toFixed(1)}" y="${y + 5}" width="${gap + 3}" height="${h - 10}" rx="1" fill="${INK}"/>`;
    const n = typ.boggier[i] || 0;
    const lagen = n === 1 ? [0.5] : n === 2 ? [0.2, 0.8] : [];
    for(const f of lagen){
      const cx = x + dw * f;
      s += `<rect x="${(cx - 12).toFixed(1)}" y="${y + h - 3}" width="24" height="6" rx="2" fill="${INK}"/>`;
      s += `<circle cx="${(cx - 6.5).toFixed(1)}" cy="${y + h + 5}" r="4.6" fill="${INK}"/><circle cx="${(cx + 6.5).toFixed(1)}" cy="${y + h + 5}" r="4.6" fill="${INK}"/>`;
    }
    x += dw + gap;
  });
  s += `<circle cx="${(fram - 5).toFixed(1)}" cy="${y + h - 9}" r="3.6" fill="#FFF3B0" stroke="${INK}" stroke-width="2"/>`;
  if(o.linje){
    const l = o.linje;
    s += `<rect x="${(fram - 34).toFixed(1)}" y="${y + 1.5}" width="22" height="7" rx="1.5" fill="#111"/>`;
    s += `<text x="${(fram - 23).toFixed(1)}" y="${y + 7.4}" text-anchor="middle" font-family="Lilita One, system-ui" font-size="6.5" fill="#FFB300">${escapeHtml(l.ref)}</text>`;
    if(o.stor && o.mot) s += `<text x="${(fram - 38).toFixed(1)}" y="${y + 7.2}" text-anchor="end" font-family="Nunito, system-ui" font-weight="800" font-size="5.6" fill="#FFB300">${escapeHtml(o.mot)}</text>`;
  }
  if(o.nr) s += `<text x="${(fram - 14).toFixed(1)}" y="${y + h - 5}" text-anchor="end" font-family="Lilita One, system-ui" font-size="7.5" fill="#FFFDF7">${escapeHtml(o.nr)}</text>`;
  if(o.flaggor) for(const fx of [fram - 16, fram - 30]){
    s += `<path d="M${fx} ${y - 1}v-14" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`;
    s += `<rect x="${fx}" y="${y - 15}" width="11" height="7" fill="#1F6FD1" stroke="${INK}" stroke-width="1.2"/>`;
    s += `<path d="M${fx} ${y - 11.5}h11M${fx + 3.5} ${y - 15}v7" stroke="#FFC42E" stroke-width="1.6"/>`;
  }
  if(o.jul){
    const farger = ["#FF6B6B", "#FFC42E", "#57C96B", "#62CDF2", "#FF8AD0"];
    for(let k = 0, gx = x0 + 8; gx < fram - 6; gx += 8, k++){
      s += `<circle cx="${gx.toFixed(1)}" cy="${y - 3.5}" r="2" fill="${farger[k % farger.length]}" stroke="${INK}" stroke-width=".8"/>`;
    }
    s += `<path d="M${(x0 + 8).toFixed(1)} ${y - 3.5}H${(fram - 6).toFixed(1)}" stroke="${INK}" stroke-width=".8" stroke-dasharray="1 3"/>`;
  }
  return s + `</svg>`;
}

/* ── LED-destinationsskylt & Hållplatsskylt ──────────────────────────── */
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

/* ── Specialritade SVG-bilder för spårvagns- & stadsord ─────────────── */
const CUSTOM_ORD_SVG = {
  bro: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <rect y="68" width="120" height="32" fill="#4FB6E8"/>
    <path d="M12 82q10-5 20 0t20 0M68 86q10-5 20 0t20 0" fill="none" stroke="#FFFDF7" stroke-width="3" stroke-linecap="round"/>
    <path d="M8 68V46h104v22H92a18 18 0 0 0-32 0H60a18 18 0 0 0-32 0z" fill="#E8B98A" stroke="${INK}" stroke-width="3.5"/>
    <path d="M4 46h112" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M18 46V28M42 46V28M78 46V28M102 46V28M18 32h84" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  vagn: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <path d="M8 82h104" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <path d="M48 26l12-12 12 12M42 14h36" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
    <rect x="14" y="28" width="92" height="44" rx="12" fill="${GBG_BLA}" stroke="${INK}" stroke-width="4"/>
    <rect x="17" y="38" width="86" height="18" fill="${GBG_VIT}"/>
    <rect x="24" y="41" width="18" height="12" rx="3" fill="${GLAS}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="50" y="41" width="20" height="12" rx="3" fill="${GLAS}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="78" y="41" width="18" height="12" rx="3" fill="${GLAS}" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="34" cy="76" r="7" fill="${INK}"/><circle cx="86" cy="76" r="7" fill="${INK}"/>
  </svg>`,
  sparvagn: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <path d="M6 82h108" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <path d="M74 26l10-12 10 12M68 14h32" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
    <rect x="10" y="28" width="44" height="44" rx="10" fill="${GBG_BLA}" stroke="${INK}" stroke-width="3.6"/>
    <rect x="54" y="34" width="10" height="34" fill="${INK}"/>
    <rect x="64" y="28" width="46" height="44" rx="10" fill="${GBG_BLA}" stroke="${INK}" stroke-width="3.6"/>
    <rect x="13" y="38" width="38" height="16" fill="${GBG_SVART}"/>
    <rect x="67" y="38" width="40" height="16" fill="${GBG_SVART}"/>
    <rect x="18" y="40" width="12" height="11" rx="2" fill="${GLAS}"/><rect x="34" y="40" width="12" height="11" rx="2" fill="${GLAS}"/>
    <rect x="72" y="40" width="13" height="11" rx="2" fill="${GLAS}"/><rect x="89" y="40" width="13" height="11" rx="2" fill="${GLAS}"/>
    <circle cx="104" cy="62" r="3.5" fill="#FFC42E"/>
    <circle cx="28" cy="76" r="6" fill="${INK}"/><circle cx="60" cy="76" r="6" fill="${INK}"/><circle cx="92" cy="76" r="6" fill="${INK}"/>
  </svg>`,
  spar: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <rect width="120" height="100" fill="#DDE8F5"/>
    <path d="M18 82h84M24 68h72M30 54h60M36 42h48M41 32h38M45 23h30" stroke="#9C6B3C" stroke-width="6" stroke-linecap="round"/>
    <path d="M24 90L50 14M96 90L70 14" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <path d="M24 90L50 14M96 90L70 14" stroke="#B7C4D8" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`,
  rals: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <path d="M16 74h88M24 56h72M32 38h56M40 22h40" stroke="#8A5A2B" stroke-width="7" stroke-linecap="round"/>
    <path d="M26 88L48 12M94 88L72 12" stroke="${INK}" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M26 88L48 12M94 88L72 12" stroke="#D8E2F0" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,
  skylt: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <path d="M60 54v38" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <rect x="14" y="18" width="92" height="40" rx="10" fill="${GBG_BLA}" stroke="${INK}" stroke-width="4"/>
    <rect x="20" y="24" width="80" height="28" rx="6" fill="#FFFDF7"/>
    <circle cx="34" cy="38" r="9" fill="${GBG_BLA}"/>
    <text x="34" y="42" text-anchor="middle" font-family="Baloo 2, system-ui" font-weight="800" font-size="13" fill="#FFFDF7">H</text>
    <path d="M50 34h40M50 43h28" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  </svg>`,
  perrong: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <rect y="64" width="120" height="36" fill="#D5CFE4" stroke="${INK}" stroke-width="3.5"/>
    <path d="M0 74h120" stroke="#FFC42E" stroke-width="5" stroke-dasharray="10 6"/>
    <path d="M26 64V26h68v38" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
    <rect x="20" y="18" width="80" height="12" rx="4" fill="${GBG_BLA}" stroke="${INK}" stroke-width="3.5"/>
    <rect x="38" y="46" width="44" height="8" rx="3" fill="#FF6B6B" stroke="${INK}" stroke-width="3"/>
    <path d="M44 54v10M76 54v10" stroke="${INK}" stroke-width="4"/>
  </svg>`,
  biljett: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <g transform="rotate(-8 60 50)">
      <path d="M16 26h88v16a8 8 0 0 0 0 16v16H16V58a8 8 0 0 0 0-16z" fill="#FFC42E" stroke="${INK}" stroke-width="4"/>
      <path d="M44 28v44" stroke="${INK}" stroke-width="3" stroke-dasharray="5 5"/>
      <rect x="54" y="38" width="38" height="8" rx="3" fill="#FFFDF7" stroke="${INK}" stroke-width="2.5"/>
      <path d="M56 56h32" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="30" cy="50" r="7" fill="${GBG_BLA}" stroke="${INK}" stroke-width="2.5"/>
    </g>
  </svg>`,
  vagnhall: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <rect x="12" y="34" width="96" height="54" rx="5" fill="#E3DCF4" stroke="${INK}" stroke-width="4"/>
    <path d="M6 36h108L98 16H22z" fill="#9061F9" stroke="${INK}" stroke-width="4"/>
    <rect x="22" y="48" width="32" height="40" rx="4" fill="#2E1A66"/>
    <rect x="26" y="54" width="24" height="34" rx="4" fill="${GBG_BLA}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="30" y="60" width="16" height="10" rx="2" fill="${GLAS}"/>
    <rect x="66" y="48" width="32" height="40" rx="4" fill="#2E1A66"/>
    <rect x="70" y="54" width="24" height="34" rx="4" fill="#FF6B6B" stroke="${INK}" stroke-width="2.5"/>
    <rect x="74" y="60" width="16" height="10" rx="2" fill="${GLAS}"/>
  </svg>`,
  forare: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <circle cx="60" cy="56" r="24" fill="#FFE0C2" stroke="${INK}" stroke-width="4"/>
    <path d="M36 42q24-26 48 0z" fill="#2E4A9E" stroke="${INK}" stroke-width="4"/>
    <rect x="32" y="38" width="56" height="8" rx="4" fill="#1F3579" stroke="${INK}" stroke-width="3.5"/>
    <circle cx="60" cy="31" r="6" fill="#FFC42E" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="51" cy="56" r="3.2" fill="${INK}"/><circle cx="69" cy="56" r="3.2" fill="${INK}"/>
    <path d="M51 67q9 8 18 0" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M34 90q26-14 52 0" fill="${GBG_BLA}" stroke="${INK}" stroke-width="4"/>
  </svg>`,
  gata: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <rect x="10" y="24" width="34" height="44" rx="4" fill="#FF9E9E" stroke="${INK}" stroke-width="3.5"/>
    <rect x="52" y="16" width="32" height="52" rx="4" fill="#FFD98A" stroke="${INK}" stroke-width="3.5"/>
    <rect x="90" y="30" width="22" height="38" rx="4" fill="#A8D8F0" stroke="${INK}" stroke-width="3.5"/>
    <rect y="68" width="120" height="32" fill="#B9AFD6" stroke="${INK}" stroke-width="3.5"/>
    <path d="M8 84h20M44 84h24M84 84h26" stroke="#FFFDF7" stroke-width="4.5" stroke-linecap="round"/>
  </svg>`,
  torg: `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">
    <rect y="68" width="120" height="32" fill="#E3D7C5" stroke="${INK}" stroke-width="3.5"/>
    <rect x="26" y="42" width="68" height="32" fill="#FFFDF7" stroke="${INK}" stroke-width="3.5"/>
    <path d="M18 44h84l-10-20H28z" fill="#FF6B6B" stroke="${INK}" stroke-width="3.5"/>
    <circle cx="42" cy="58" r="7" fill="#FFC42E" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="60" cy="58" r="7" fill="#57C96B" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="78" cy="58" r="7" fill="#FF8AD0" stroke="${INK}" stroke-width="2.5"/>
  </svg>`
};

export function ordBildHTML(entry, stor = false){
  if(!entry) return "";
  const bg = entry.bg || "#F0EAFF";
  const b = entry.bild || "✨";
  if(b.startsWith("svg:")){
    const key = b.slice(4);
    return `<span class="ord-bild ${stor ? "stor" : ""}" style="background:${bg}">${CUSTOM_ORD_SVG[key] || ""}</span>`;
  }
  return `<span class="ord-bild emoji ${stor ? "stor" : ""}" style="background:${bg}" aria-hidden="true">${b}</span>`;
}

/* ── Hållplatsscener (tecknade alternativ till fotona) ───────────────── */
const HIMMEL = `<rect width="320" height="150" fill="#BFE6FA"/><circle cx="268" cy="30" r="17" fill="#FFC42E" stroke="${INK}" stroke-width="3"/>`;
const MARK = `<rect y="112" width="320" height="38" fill="#8FD98F" stroke="${INK}" stroke-width="3"/>`;
const GATA = `<rect y="112" width="320" height="38" fill="#B9AFD6" stroke="${INK}" stroke-width="3"/><path d="M0 131h34M56 131h34M112 131h34M168 131h34M224 131h34M280 131h34" stroke="#FFFDF7" stroke-width="4" stroke-linecap="round"/>`;
const hus = (x, w, h, f) => `<rect x="${x}" y="${112 - h}" width="${w}" height="${h}" rx="4" fill="${f}" stroke="${INK}" stroke-width="3"/>`;
const fonster = (x, y, n, m) => { let o = ""; for(let i = 0; i < n; i++) for(let j = 0; j < m; j++) o += `<rect x="${x + i * 16}" y="${y + j * 17}" width="10" height="11" rx="2" fill="#FFF3B0" stroke="${INK}" stroke-width="2"/>`; return o; };
const gran = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="0" width="8" height="14" fill="#8A5A2B" stroke="${INK}" stroke-width="2.6"/><path d="M0-46l20 26h-40zM0-30l24 30h-48z" fill="#3E9E51" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/></g>`;
const lov = (x, y, s, f) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-14" width="8" height="16" fill="#8A5A2B" stroke="${INK}" stroke-width="2.6"/><circle cy="-28" r="21" fill="${f || "#57C96B"}" stroke="${INK}" stroke-width="3"/></g>`;
const moln = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-26 8a13 13 0 0 1 2-26 18 18 0 0 1 34-3 13 13 0 0 1 2 29z" fill="#FFFDF7" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/></g>`;

const SCENES = {
  gata: HIMMEL + moln(70, 34, .8) + GATA + hus(18, 74, 66, "#FF9E9E") + fonster(30, 60, 3, 2) + hus(104, 62, 52, "#FFD98A") + fonster(114, 74, 2, 2) + hus(180, 82, 74, "#A8D8F0") + fonster(194, 52, 3, 3),
  torg: HIMMEL + moln(58, 30, .75) + `<rect y="112" width="320" height="38" fill="#D9CFC0" stroke="${INK}" stroke-width="3"/>` + hus(6, 56, 60, "#F2B8D8") + hus(250, 64, 66, "#B8E0C8") + `<rect x="76" y="76" width="72" height="36" fill="#FFFDF7" stroke="${INK}" stroke-width="3"/><path d="M70 76h84l-10-18H80z" fill="#FF6B6B" stroke="${INK}" stroke-width="3"/><rect x="168" y="80" width="62" height="32" fill="#FFFDF7" stroke="${INK}" stroke-width="3"/><path d="M162 80h74l-9-16h-56z" fill="#62CDF2" stroke="${INK}" stroke-width="3"/>`,
  hoghus: HIMMEL + moln(46, 28, .7) + MARK + hus(14, 58, 96, "#C9B9E8") + fonster(24, 30, 3, 5) + hus(88, 52, 74, "#F5C7A0") + fonster(98, 52, 2, 4) + hus(154, 64, 108, "#9ED4E8") + fonster(166, 18, 3, 6) + hus(232, 60, 82, "#F3B7C8") + fonster(244, 44, 3, 4),
  skog: HIMMEL + moln(56, 26, .7) + `<path d="M0 112c60-46 120-30 170-52s110-6 150 12v78H0z" fill="#6BC97E" stroke="${INK}" stroke-width="3"/>` + gran(46, 108, .95) + gran(104, 116, .8) + gran(214, 96, .85) + gran(268, 108, 1) + lov(158, 118, .7),
  hav: `<rect width="320" height="150" fill="#BFE6FA"/><circle cx="266" cy="28" r="16" fill="#FFC42E" stroke="${INK}" stroke-width="3"/><rect y="96" width="320" height="54" fill="#4FB6E8" stroke="${INK}" stroke-width="3"/><path d="M120 96l16-56 30 56z" fill="#FFFDF7" stroke="${INK}" stroke-width="3"/><path d="M112 96h64l-10 14h-44z" fill="#FF6B6B" stroke="${INK}" stroke-width="3"/>`,
  hamn: HIMMEL + `<rect y="104" width="320" height="46" fill="#4FB6E8" stroke="${INK}" stroke-width="3"/><g stroke="${INK}" stroke-width="3.4" fill="none"><path d="M40 104V34h96M40 46h22M136 34v22"/></g><rect x="124" y="56" width="24" height="18" rx="3" fill="#FFC42E" stroke="${INK}" stroke-width="3"/><rect x="176" y="72" width="118" height="32" rx="5" fill="#FF6B6B" stroke="${INK}" stroke-width="3"/><rect x="196" y="52" width="40" height="22" rx="4" fill="#FFFDF7" stroke="${INK}" stroke-width="3"/>`,
  station: HIMMEL + GATA + `<rect x="46" y="36" width="228" height="76" rx="6" fill="#E8B98A" stroke="${INK}" stroke-width="3"/><path d="M38 40h244l-18-22H56z" fill="#B36A3A" stroke="${INK}" stroke-width="3"/><circle cx="160" cy="60" r="15" fill="#FFFDF7" stroke="${INK}" stroke-width="3"/><path d="M160 52v9l6 4" stroke="${INK}" stroke-width="3" stroke-linecap="round" fill="none"/><rect x="140" y="82" width="40" height="30" rx="4" fill="#7B5B3A" stroke="${INK}" stroke-width="3"/>`,
  sjukhus: HIMMEL + GATA + hus(52, 216, 84, "#FFFDF7") + fonster(70, 46, 4, 3) + `<g transform="translate(232 56)"><rect x="-9" y="-26" width="18" height="52" rx="3" fill="#FF6B6B" stroke="${INK}" stroke-width="3"/><rect x="-26" y="-9" width="52" height="18" rx="3" fill="#FF6B6B" stroke="${INK}" stroke-width="3"/></g>`,
  skola: HIMMEL + GATA + `<rect x="40" y="52" width="240" height="60" fill="#FFE9C4" stroke="${INK}" stroke-width="3"/><path d="M30 52h260L160 16z" fill="#6FA8DC" stroke="${INK}" stroke-width="3"/><rect x="142" y="70" width="36" height="42" rx="3" fill="#8A5A2B" stroke="${INK}" stroke-width="3"/>`,
  kyrka: HIMMEL + MARK + `<rect x="96" y="60" width="128" height="52" fill="#FFE3C4" stroke="${INK}" stroke-width="3"/><rect x="140" y="20" width="40" height="42" fill="#FFFDF7" stroke="${INK}" stroke-width="3"/><path d="M134 22h52l-26-20z" fill="#8FBEDC" stroke="${INK}" stroke-width="3"/>`,
  arena: HIMMEL + MARK + `<path d="M30 112V72a130 26 0 0 1 260 0v40z" fill="#D9DEE8" stroke="${INK}" stroke-width="3"/><ellipse cx="160" cy="72" rx="130" ry="26" fill="#8FD98F" stroke="${INK}" stroke-width="3"/>`,
  noje: HIMMEL + MARK + `<g stroke="${INK}" stroke-width="3.4"><path d="M110 112l40-46 40 46" fill="none"/><circle cx="150" cy="56" r="46" fill="#FFFDF7"/><circle cx="150" cy="56" r="9" fill="#FFC42E"/><path d="M150 10v92M104 56h92" fill="none"/></g><circle cx="150" cy="10" r="8" fill="#FF6B6B" stroke="${INK}" stroke-width="2.6"/><circle cx="196" cy="56" r="8" fill="#FF8AD0" stroke="${INK}" stroke-width="2.6"/>`,
  rymd: `<rect width="320" height="150" fill="#2B2A6E"/><circle cx="30" cy="26" r="2.6" fill="#FFFDF7"/><circle cx="140" cy="34" r="2.6" fill="#FFFDF7"/><circle cx="288" cy="42" r="2.6" fill="#FFFDF7"/><g transform="translate(252 40)"><circle r="24" fill="#FF8AD0" stroke="${INK}" stroke-width="3"/><ellipse rx="38" ry="9" fill="none" stroke="#FFC42E" stroke-width="5" transform="rotate(-18)"/></g><rect y="118" width="320" height="32" fill="#6B5BB5" stroke="${INK}" stroke-width="3"/>`,
  sten: `<rect width="320" height="150" fill="#3E2E6B"/><path d="M0 118h320v32H0z" fill="#6B5BB5" stroke="${INK}" stroke-width="3"/><path d="M74 118L48 74l26-30 26 30z" fill="#62CDF2" stroke="${INK}" stroke-width="3"/><path d="M172 118l-20-34 20-24 20 24z" fill="#57C96B" stroke="${INK}" stroke-width="3"/><path d="M254 118l-24-40 24-28 24 28z" fill="#FF8AD0" stroke="${INK}" stroke-width="3"/>`,
  vader: `<rect width="320" height="150" fill="#CDEBFB"/><circle cx="72" cy="48" r="26" fill="#FFC42E" stroke="${INK}" stroke-width="3"/>` + moln(196, 44, 1.2) + MARK,
  fabrik: HIMMEL + GATA + hus(40, 200, 62, "#C4B5A0") + `<rect x="204" y="14" width="26" height="96" fill="#B04B4B" stroke="${INK}" stroke-width="3"/><rect x="248" y="34" width="26" height="76" fill="#B04B4B" stroke="${INK}" stroke-width="3"/>`,
  vagnhall: HIMMEL + GATA + `<rect x="24" y="34" width="272" height="78" rx="6" fill="#D8CFE8" stroke="${INK}" stroke-width="3"/><path d="M16 38h288l-20-20H36z" fill="#9061F9" stroke="${INK}" stroke-width="3"/><rect x="58" y="66" width="66" height="46" rx="5" fill="#FF6B6B" stroke="${INK}" stroke-width="3"/><rect x="192" y="66" width="66" height="46" rx="5" fill="#62CDF2" stroke="${INK}" stroke-width="3"/>`,
  blomma: HIMMEL + MARK + `<circle cx="160" cy="60" r="18" fill="#FF8AD0" stroke="${INK}" stroke-width="3"/><circle cx="160" cy="60" r="8" fill="#FFC42E" stroke="${INK}" stroke-width="2.5"/>`,
  affar: HIMMEL + GATA + `<rect x="34" y="44" width="252" height="68" rx="5" fill="#FFE9C4" stroke="${INK}" stroke-width="3"/><rect x="26" y="30" width="268" height="20" rx="6" fill="#FF6B6B" stroke="${INK}" stroke-width="3"/>`,
  musik: HIMMEL + GATA + hus(20, 80, 70, "#C9B9E8") + hus(214, 84, 60, "#FFD98A"),
  fontan: HIMMEL + `<rect y="112" width="320" height="38" fill="#D9CFC0" stroke="${INK}" stroke-width="3"/><ellipse cx="160" cy="106" rx="58" ry="16" fill="#4FB6E8" stroke="${INK}" stroke-width="3"/><rect x="154" y="58" width="12" height="42" fill="#C4B5A0" stroke="${INK}" stroke-width="3"/>`
};

export function sceneSVG(namn){
  return `<svg class="scene" viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">${SCENES[stopKind(namn)] || SCENES.gata}</svg>`;
}

/* ── Märken (Achievements) ───────────────────────────────────────────── */
export const MARKEN = [
  { id:"forsta-stopp", name:"Första resan",    emoji:"🚋", desc:"Åk din första hållplats" },
  { id:"ord-10",       name:"Ordfångare",      emoji:"📖", desc:"Läs 10 olika ord rätt" },
  { id:"ord-30",       name:"Bokmal",          emoji:"📚", desc:"Läs 30 olika ord rätt" },
  { id:"ord-60",       name:"Ordmästare",      emoji:"🌟", desc:"Läs 60 olika ord rätt" },
  { id:"svit-6",       name:"Hett spår",       emoji:"🔥", desc:"Sex rätt i rad" },
  { id:"svit-12",      name:"Snabbvagn",       emoji:"⚡", desc:"Tolv rätt i rad" },
  { id:"kluring-5",    name:"Klurig",          emoji:"💡", desc:"Klara 5 kluriga ord" },
  { id:"stopp-15",     name:"På väg i stan",   emoji:"🗺️", desc:"Besök 15 hållplatser" },
  { id:"stopp-40",     name:"Göteborgare",     emoji:"⚓", desc:"Besök 40 hållplatser" },
  { id:"stopp-80",     name:"Halva stan",      emoji:"🏙️", desc:"Besök 80 hållplatser" },
  { id:"stopp-132",    name:"Hela nätet!",     emoji:"👑", desc:"Besök alla 132 hållplatser" },
  { id:"hel-linje",    name:"Hel linje",       emoji:"🏁", desc:"Åk en hel spårvagnslinje" },
  { id:"resmal-1",     name:"Första resmålet", emoji:"🚩", desc:"Klara ditt första resmål" },
  { id:"resmal-5",     name:"Kartläsare",      emoji:"🧭", desc:"Klara 5 resmål" },
  { id:"omvag",        name:"Omvägen",         emoji:"🚧", desc:"Klara ett resmål med spårarbete" },
  { id:"egen-vagn",    name:"Egen vagn",       emoji:"🛠️", desc:"Bygg din egen spårvagn" },
  { id:"kort-5",       name:"Kortsamlare",     emoji:"🃏", desc:"Samla 5 vagnkort" },
  { id:"kort-alla",    name:"Hela vagnhallen", emoji:"🏆", desc:"Samla alla vagnkort" },
  { id:"vagn-modell",  name:"Vagnkännare",     emoji:"🚃", desc:"Känn igen 10 spårvagnsmodeller" }
];
