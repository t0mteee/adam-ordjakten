/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Interaktiv Göteborgskarta & väggaffisch
   ═══════════════════════════════════════════════════════════════ */

import { TRAM_LINES, STOP_XY, NAT_SEGMENT, segNyckel } from "./gbg-data.mjs";
import { INK, escapeHtml, ljusFarg } from "./konst.mjs";
import { formatOrd } from "./ord-data.mjs";

export const HELA_NATET = { x: -65, y: -65, w: 1180, h: 1180 };

export function natLinjePath(l){
  const bitar = [];
  for(let i = 0; i + 1 < l.stops.length; i++){
    const A = STOP_XY[l.stops[i]], B = STOP_XY[l.stops[i + 1]];
    if(!A || !B) continue;
    const refs = NAT_SEGMENT[segNyckel(l.stops[i], l.stops[i + 1])] || [l.ref];
    const plats = refs.indexOf(l.ref), mitt = (refs.length - 1) / 2;
    const dx = B[0] - A[0], dy = B[1] - A[1], len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len * 4.5 * (plats - mitt), ny = dx / len * 4.5 * (plats - mitt);
    bitar.push(`M${(A[0] + nx).toFixed(1)} ${(A[1] + ny).toFixed(1)}L${(B[0] + nx).toFixed(1)} ${(B[1] + ny).toFixed(1)}`);
  }
  return bitar.join("");
}

export function natFonster(l, i, rikt = 1){
  const P = STOP_XY[l.stops[i]] || [530, 530];
  let r = 0;
  for(const j of [i - 1, i + 1]){
    const Q = l.stops[j] && STOP_XY[l.stops[j]];
    if(Q) r = Math.max(r, Math.hypot(Q[0] - P[0], Q[1] - P[1]));
  }
  const bredd = Math.max(210, Math.min(430, r * 2.75));
  const N = STOP_XY[l.stops[i + rikt]] || STOP_XY[l.stops[i - rikt]] || P;
  const cx = P[0] + (N[0] - P[0]) * 0.3, cy = P[1] + (N[1] - P[1]) * 0.3;
  return { x: cx - bredd / 2, y: cy - bredd / 2, w: bredd, h: bredd };
}

export const viewBoxStr = (f) => `${f.x.toFixed(1)} ${f.y.toFixed(1)} ${f.w.toFixed(1)} ${f.h.toFixed(1)}`;

export function natkartaSVG(l, at, o = {}){
  const f = o.utzoomad ? HELA_NATET : natFonster(l, at, o.rikt || 1);
  const skala = f.w / 260;
  const besokta = o.besokta || new Set();
  const stil = o.bokstavsStil || "blandat";
  const stopp = new Set(l.stops);
  const andra = TRAM_LINES.filter(x => x.ref !== l.ref);

  let html = "";
  /* Göta älv & hamninloppet — ger Göteborgskartan riktig kustkänsla */
  html += `<path d="M-90 790 C 60 720, 180 650, 290 610 C 375 575, 430 505, 480 435 C 535 350, 585 215, 650 -70 L 705 -70 C 635 225, 585 365, 528 455 C 470 545, 412 615, 315 655 C 195 705, 75 785, -90 885 Z" fill="#D4EAF7" opacity=".78"/>`;
  /* Övriga linjer dämpade */
  html += andra.map(x =>
    `<path class="nat-linje annan" d="${natLinjePath(x)}" stroke="${x.col.toLowerCase() === "#ffffff" ? "#A79E90" : x.col}" stroke-width="${(4.6 * skala).toFixed(1)}"/>`
  ).join("");

  /* Den egna linjen */
  html += `<path class="nat-linje" d="${natLinjePath(l)}" stroke="${INK}" stroke-width="${(9.2 * skala).toFixed(1)}"/>`;
  html += `<path class="nat-linje" d="${natLinjePath(l)}" stroke="${l.col}" stroke-width="${(5.8 * skala).toFixed(1)}"/>`;

  const rikt = o.rikt || 1;
  const nastaAt = at + rikt;
  const A = STOP_XY[l.stops[at]], B = STOP_XY[l.stops[nastaAt]];
  if(A && B){
    html += `<path class="nat-etapp" d="M${A[0]} ${A[1]}L${B[0]} ${B[1]}" fill="none" stroke="#F2B705" stroke-width="${(12 * skala).toFixed(1)}" opacity=".8" stroke-linecap="round"/>`;
    html += `<circle class="nat-nasta" cx="${B[0]}" cy="${B[1]}" r="${(10.5 * skala).toFixed(1)}" fill="none" stroke="${INK}" stroke-width="${(2.2 * skala).toFixed(1)}" stroke-dasharray="${(3 * skala).toFixed(1)} ${(3 * skala).toFixed(1)}"/>`;
  }

  /* Andra linjers hållplatser */
  for(const [namn, P] of Object.entries(STOP_XY)){
    if(stopp.has(namn)) continue;
    html += `<circle class="nat-stopp" data-stopp-namn="${escapeHtml(namn)}" cx="${P[0]}" cy="${P[1]}" r="${(3.2 * skala).toFixed(1)}" fill="${besokta.has(namn) ? "#2D8A56" : "#FFFDF7"}" stroke="#9C9385" stroke-width="${(1.5 * skala).toFixed(1)}"/>`;
  }

  /* Egen linjes hållplatser */
  l.stops.forEach((namn, i) => {
    const P = STOP_XY[namn]; if(!P) return;
    if(i === at) return;
    const akt = besokta.has(namn);
    html += `<circle class="nat-stopp" data-stopp="${i}" data-stopp-namn="${escapeHtml(namn)}" cx="${P[0]}" cy="${P[1]}" r="${((o.utzoomad ? 4.2 : 6.2) * skala).toFixed(1)}" fill="${akt ? "#2D8A56" : "#FFFDF7"}" stroke="${INK}" stroke-width="${(2.5 * skala).toFixed(1)}"/>`;
  });

  const upptaget = [];
  const krockar = (b) => b.x < f.x || b.x + b.w > f.x + f.w || b.y < f.y || b.y + b.h > f.y + f.h
    || upptaget.some(u => b.x < u.x + u.w && b.x + b.w > u.x && b.y < u.y + u.h && b.y + b.h > u.y);

  l.stops.forEach((namn) => {
    const P = STOP_XY[namn];
    if(P) upptaget.push({ x: P[0] - 7 * skala, y: P[1] - 7 * skala, w: 14 * skala, h: 14 * skala });
  });
  const vagnP = STOP_XY[l.stops[at]];
  if(vagnP) upptaget.push({ x: vagnP[0] - 14 * skala, y: vagnP[1] - 20 * skala, w: 28 * skala, h: 40 * skala });
  upptaget.push({ x: f.x + f.w * 0.56, y: f.y, w: f.w * 0.44, h: f.h * 0.16 });

  /* Spårarbete */
  let sparrHtml = "";
  if(o.sparr && STOP_XY[o.sparr[0]] && STOP_XY[o.sparr[1]]){
    const SA = STOP_XY[o.sparr[0]], SB = STOP_XY[o.sparr[1]];
    const mx = (SA[0] + SB[0]) / 2, my = (SA[1] + SB[1]) / 2;
    upptaget.push({ x: mx - 18 * skala, y: my - 14 * skala, w: 36 * skala, h: 28 * skala });
    sparrHtml = `<g class="nat-sparr">
      <path d="M${SA[0]} ${SA[1]}L${SB[0]} ${SB[1]}" stroke="#FFFDF7" stroke-width="${(11 * skala).toFixed(1)}" stroke-linecap="round"/>
      <path d="M${SA[0]} ${SA[1]}L${SB[0]} ${SB[1]}" stroke="#DD4747" stroke-width="${(5 * skala).toFixed(1)}" stroke-dasharray="${(6 * skala).toFixed(1)} ${(5 * skala).toFixed(1)}" stroke-linecap="round"/>
      <g transform="translate(${mx.toFixed(1)},${my.toFixed(1)}) scale(${skala.toFixed(3)})">
        <rect x="-15" y="-7" width="30" height="9" rx="2" fill="#FFFDF7" stroke="${INK}" stroke-width="2"/>
        <path d="M-11 -7l5 9M-3 -7l5 9M5 -7l5 9" stroke="#DD4747" stroke-width="3"/>
        <path d="M-10 2v8M10 2v8" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
      </g></g>`;
  }

  /* Resmål */
  let malHtml = "";
  if(o.mal && STOP_XY[o.mal]){
    const M = STOP_XY[o.mal], m = 26 * skala;
    const inne = M[0] >= f.x + m && M[0] <= f.x + f.w - m && M[1] >= f.y + m && M[1] <= f.y + f.h - m;
    let X = M[0], Y = M[1], pil = "";
    if(!inne){
      const cx = f.x + f.w / 2, cy = f.y + f.h / 2;
      const dx = M[0] - cx || 0.001, dy = M[1] - cy || 0.001;
      const k = Math.min((f.w / 2 - m) / Math.abs(dx), (f.h / 2 - m) / Math.abs(dy));
      X = cx + dx * k; Y = cy + dy * k;
      if(X > f.x + f.w * 0.6 && Y < f.y + f.h * 0.17) Y = f.y + f.h * 0.2;
      const vinkel = Math.atan2(dy, dx) * 180 / Math.PI + 90;
      pil = `<path d="M0 -19l5.5 7h-11z" fill="${INK}" transform="rotate(${vinkel.toFixed(0)})"/>`;
    }
    const malNamn = formatOrd(o.mal, stil);
    if(inne){
      const px = 11 * skala, w = malNamn.length * px * 0.65 + 6 * skala;
      upptaget.push({ x: X - w / 2, y: Y - 38 * skala, w, h: 14 * skala });
    }
    malHtml = `<g class="nat-mal" transform="translate(${X.toFixed(1)},${Y.toFixed(1)}) scale(${skala.toFixed(3)})">
      ${inne ? `<circle r="9" fill="none" stroke="${INK}" stroke-width="2.4" stroke-dasharray="3 2.5"/>`
             : `<circle r="12" fill="#FFFDF7" stroke="${INK}" stroke-width="2.2"/>${pil}`}
      <path d="M0 ${inne ? -8 : -6}V${inne ? -24 : -18}" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M0 ${inne ? -24 : -18}h13l-4 5 4 5H0z" fill="#FF6B6B" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
      ${inne ? `<text class="nat-namn mal" y="-27" font-size="11" text-anchor="middle">${escapeHtml(malNamn)}</text>` : ""}
    </g>`;
  }

  /* Namn på hållplatser utan krock */
  const ordning = (o.utzoomad ? [at, nastaAt, 0, l.stops.length - 1] : [at, nastaAt, at - rikt, 0, l.stops.length - 1, at - 2, at + 2])
    .filter((i, k, arr) => i >= 0 && i < l.stops.length && arr.indexOf(i) === k);

  ordning.forEach(i => {
    const namn = l.stops[i], P = STOP_XY[namn];
    if(!P || (o.mal === namn && !o.utzoomad)) return;
    const har = i === at, nasta = i === nastaAt;
    const visNamn = formatOrd(namn, stil);
    const px = (har ? 11.5 : nasta ? 10.5 : 9.5) * skala;
    const w = visNamn.length * px * 0.62 + 8 * skala, h = px * 1.25;
    const d = (har ? 22 : 11) * skala;
    const lagen = har
      ? [{ x: P[0], y: P[1] - d, anchor: "middle", bx: P[0] - w / 2, by: P[1] - d - h * 0.85 },
         { x: P[0], y: P[1] + d + h * 0.6, anchor: "middle", bx: P[0] - w / 2, by: P[1] + d - h * 0.15 },
         { x: P[0] + d, y: P[1] + px * 0.35, anchor: "start", bx: P[0] + d, by: P[1] - h * 0.5 },
         { x: P[0] - d, y: P[1] + px * 0.35, anchor: "end", bx: P[0] - d - w, by: P[1] - h * 0.5 }]
      : [{ x: P[0] + d, y: P[1] + px * 0.35, anchor: "start", bx: P[0] + d, by: P[1] - h * 0.5 },
         { x: P[0] - d, y: P[1] + px * 0.35, anchor: "end", bx: P[0] - d - w, by: P[1] - h * 0.5 },
         { x: P[0], y: P[1] - d, anchor: "middle", bx: P[0] - w / 2, by: P[1] - d - h * 0.85 },
         { x: P[0], y: P[1] + d + h * 0.7, anchor: "middle", bx: P[0] - w / 2, by: P[1] + d }];
    const valt = lagen.find(L => !krockar({ x: L.bx, y: L.by, w, h })) || (har ? lagen[0] : null);
    if(!valt) return;
    upptaget.push({ x: valt.bx, y: valt.by, w, h });
    html += `<text class="nat-namn ${har ? "har" : nasta ? "nasta" : ""}" data-stopp-namn="${escapeHtml(namn)}" x="${valt.x.toFixed(1)}" y="${valt.y.toFixed(1)}" font-size="${px.toFixed(1)}" text-anchor="${valt.anchor}">${escapeHtml(visNamn)}</text>`;
  });

  html += sparrHtml + malHtml;

  /* Spårvagnen där man står */
  if(vagnP){
    const textFarg = ljusFarg(l.col) ? INK : "#FFFDF7";
    html += `<g class="nat-vagn" data-vagn="1" transform="translate(${vagnP[0]},${vagnP[1]}) scale(${skala.toFixed(3)})">
      <circle class="nat-ring" r="15" fill="none" stroke="${l.col.toLowerCase() === "#ffffff" ? INK : l.col}" stroke-width="3" opacity=".55"/>
      <rect x="-11" y="-14" width="22" height="25" rx="6" fill="${l.col}" stroke="${INK}" stroke-width="2.5"/>
      <rect x="-7" y="-10" width="14" height="8" rx="2.5" fill="${INK}"/>
      <text x="0" y="-3.6" text-anchor="middle" font-family="Lilita One, system-ui" font-size="7.5" fill="#FFC42E">${escapeHtml(l.ref)}</text>
      <rect x="-7" y="1" width="14" height="6" rx="2" fill="#A6E7FF" stroke="${INK}" stroke-width="1.4"/>
      <circle cx="-5" cy="9.5" r="1.4" fill="${textFarg === INK ? "#FFC42E" : "#FFF3B0"}"/>
      <circle cx="5" cy="9.5" r="1.4" fill="${textFarg === INK ? "#FFC42E" : "#FFF3B0"}"/>
    </g>`;
  }

  return `<svg viewBox="${viewBoxStr(f)}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${html}</svg>`;
}

/* Mjuk animation längs sträckan på kartan */
export function rullaVagnPaKarta(container, l, franAt, tillAt, opts = {}){
  return new Promise(resolve => {
    const svg = container?.querySelector("svg");
    const vagn = svg?.querySelector('[data-vagn="1"]');
    const A = STOP_XY[l.stops[franAt]], B = STOP_XY[l.stops[tillAt]];
    if(!svg || !vagn || !A || !B || opts.minskaRorelse){
      resolve();
      return;
    }
    const f0 = opts.utzoomad ? HELA_NATET : natFonster(l, franAt, opts.rikt || 1);
    const f1 = opts.utzoomad ? HELA_NATET : natFonster(l, tillAt, opts.rikt || 1);
    const dur = 1150;
    const t0 = performance.now();
    function step(now){
      const p = Math.min(1, (now - t0) / dur);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const x = A[0] + (B[0] - A[0]) * e;
      const y = A[1] + (B[1] - A[1]) * e;
      const f = {
        x: f0.x + (f1.x - f0.x) * e,
        y: f0.y + (f1.y - f0.y) * e,
        w: f0.w + (f1.w - f0.w) * e,
        h: f0.h + (f1.h - f0.h) * e
      };
      const skala = f.w / 260;
      svg.setAttribute("viewBox", viewBoxStr(f));
      vagn.setAttribute("transform", `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${skala.toFixed(3)})`);
      if(p < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}

/* Väggkarta för utskrift eller nedladdning */
export function vaggKartaSVG(spelare){
  const bes = new Set(spelare?.visitedStops || []);
  const namn = spelare?.name || "Kompis";
  let out = `<svg viewBox="-70 -100 1190 1320" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF7">
    <rect x="-70" y="-100" width="1190" height="1320" fill="#FFFDF7"/>
    <text x="525" y="-42" text-anchor="middle" font-family="Baloo 2, system-ui" font-weight="800" font-size="44" fill="${INK}">${escapeHtml(namn)}s Ordjakt i Göteborg</text>
    <text x="525" y="-10" text-anchor="middle" font-family="Nunito, system-ui" font-weight="800" font-size="22" fill="#5B47A0">${bes.size} av ${Object.keys(STOP_XY).length} hållplatser besökta · ${(spelare?.klaradeOrd || []).length} lästa ord</text>`;
  for(const l of TRAM_LINES){
    out += `<path d="${natLinjePath(l)}" fill="none" stroke="${l.col.toLowerCase() === "#ffffff" ? "#9A92B5" : l.col}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>`;
  }
  const andstationer = new Set(TRAM_LINES.flatMap(l => [l.stops[0], l.stops[l.stops.length - 1]]));
  for(const [stopp, P] of Object.entries(STOP_XY)){
    const akt = bes.has(stopp);
    out += `<circle cx="${P[0]}" cy="${P[1]}" r="${akt ? 7 : 4.5}" fill="${akt ? "#57C96B" : "#FFFDF7"}" stroke="${INK}" stroke-width="2"/>`;
    if(akt || andstationer.has(stopp)){
      out += `<text x="${P[0] + 10}" y="${P[1] + 4}" font-family="Nunito, system-ui" font-weight="800" font-size="${akt ? 13 : 11}" fill="${akt ? INK : "#7A6A9E"}">${escapeHtml(stopp)}</text>`;
    }
  }
  /* Linjeförteckning längst ner */
  TRAM_LINES.forEach((l, i) => {
    const colIdx = i % 4, rowIdx = Math.floor(i / 4);
    const x = -20 + colIdx * 285, y = 1090 + rowIdx * 38;
    const dark = ljusFarg(l.col);
    out += `<rect x="${x}" y="${y - 18}" width="32" height="24" rx="6" fill="${l.col}" stroke="${INK}" stroke-width="2"/>`;
    out += `<text x="${x + 16}" y="${y - 1}" text-anchor="middle" font-family="Lilita One, system-ui" font-size="16" fill="${dark ? INK : "#FFFDF7"}">${l.ref}</text>`;
    out += `<text x="${x + 40}" y="${y - 1}" font-family="Nunito, system-ui" font-weight="800" font-size="14" fill="${INK}">${escapeHtml(l.a)} – ${escapeHtml(l.b)}</text>`;
  });
  return out + `</svg>`;
}
