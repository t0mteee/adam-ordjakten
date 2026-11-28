/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Samlad bilderbok (115+ egna SVG-illustrationer)
   ═══════════════════════════════════════════════════════════════ */

import { BILDER_1 } from "./ordbilder-1.mjs";
import { BILDER_2 } from "./ordbilder-2.mjs";

export const ORDBILDER = { ...BILDER_1, ...BILDER_2 };

export function harOrdBild(nyckel){
  return !!ORDBILDER[nyckel];
}

export function ordBildSVG(nyckel){
  const inner = ORDBILDER[nyckel];
  if(!inner) return "";
  return `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round">${inner}</svg>`;
}
