/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Nordiska bilderboks-illustrationer (Del 2)
   Mat, hem, kläder, kropp, stad & musik — inga iOS-emojis!
   ═══════════════════════════════════════════════════════════════ */

const I = "#13315C";
const SH = `<ellipse cx="60" cy="89" rx="34" ry="6.5" fill="rgba(19,49,92,.11)"/>`;
const BG = (c = "#FBF5E9") => `<rect width="120" height="100" fill="${c}"/>`;
const GRD = (sky = "#E4F3FC", grd = "#D8CFBE") => `<rect width="120" height="100" fill="${sky}"/><rect y="70" width="120" height="30" fill="${grd}"/>`;

export const BILDER_2 = {
  /* ── MAT & FIKA ────────────────────────────────────────────────────── */
  bar: BG("#FCEEF2") + SH + `
    <path d="M60 22q18 2 22 22q4 28-22 38q-26-10-22-38q4-20 22-22z" fill="#D93B54" stroke="${I}" stroke-width="3.2"/>
    <path d="M44 26q16 10 32 0l-6-10l-10 6l-10-6z" fill="#2D8A56" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
    <circle cx="52" cy="44" r="2.2" fill="#FFF3B0"/><circle cx="68" cy="46" r="2.2" fill="#FFF3B0"/><circle cx="60" cy="58" r="2.2" fill="#FFF3B0"/><circle cx="52" cy="64" r="2" fill="#FFF3B0"/><circle cx="68" cy="64" r="2" fill="#FFF3B0"/>`,

  not: BG("#FBF2E4") + SH + `
    <path d="M36 52q0-20 24-20q24 0 24 20q0 28-24 34q-24-6-24-34z" fill="#A66A38" stroke="${I}" stroke-width="3.2"/>
    <path d="M34 44q26-18 52 0v6H34z" fill="#6E4423" stroke="${I}" stroke-width="3"/>
    <path d="M60 26v-10" stroke="${I}" stroke-width="4" stroke-linecap="round"/>`,

  ost: BG("#FFF7DC") + SH + `
    <path d="M18 76V46l76-22l8 52z" fill="#F2B705" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M18 46h84" stroke="${I}" stroke-width="2.4"/>
    <circle cx="40" cy="60" r="6" fill="#D99B00" stroke="${I}" stroke-width="2"/>
    <circle cx="64" cy="56" r="8" fill="#D99B00" stroke="${I}" stroke-width="2"/>
    <circle cx="82" cy="68" r="5" fill="#D99B00" stroke="${I}" stroke-width="2"/>`,

  agg: BG("#FBF4E4") + SH + `
    <path d="M60 16q24 0 26 38q0 28-26 28q-26 0-26-28q2-38 26-38z" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <path d="M48 34q4-10 12-10" fill="none" stroke="#EDE4D2" stroke-width="4" stroke-linecap="round"/>`,

  lok: BG("#F6EFFA") + SH + `
    <path d="M60 24q26 12 24 38q-2 20-24 20q-22 0-24-20q-2-26 24-38z" fill="#C97040" stroke="${I}" stroke-width="3.2"/>
    <path d="M60 24q8 24 0 58M60 24q-8 24 0 58" fill="none" stroke="#A65528" stroke-width="2"/>
    <path d="M60 24l-4-12M60 24l4-12" stroke="#2D8A56" stroke-width="3.2" stroke-linecap="round"/>`,

  paj: BG("#FFF3E0") + SH + `
    <path d="M18 58h84l-10 22H28z" fill="#D98B48" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M16 58q8-14 22-8q10-12 22-4q12-8 22 4q14-6 22 8z" fill="#F2C179" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="48" cy="52" r="4" fill="#D93B54"/><circle cx="68" cy="50" r="4" fill="#D93B54"/>`,

  kex: BG("#FFF5E2") + SH + `
    <rect x="26" y="22" width="68" height="58" rx="10" fill="#E8B86D" stroke="${I}" stroke-width="3.2"/>
    <g fill="${I}">
      <circle cx="44" cy="38" r="2.6"/><circle cx="60" cy="38" r="2.6"/><circle cx="76" cy="38" r="2.6"/>
      <circle cx="44" cy="52" r="2.6"/><circle cx="60" cy="52" r="2.6"/><circle cx="76" cy="52" r="2.6"/>
      <circle cx="44" cy="66" r="2.6"/><circle cx="60" cy="66" r="2.6"/><circle cx="76" cy="66" r="2.6"/>
    </g>`,

  kaka: BG("#FBF0DF") + SH + `
    <circle cx="60" cy="50" r="32" fill="#D99B58" stroke="${I}" stroke-width="3.2"/>
    <circle cx="48" cy="40" r="5" fill="#5A3318"/><circle cx="72" cy="42" r="4.5" fill="#5A3318"/>
    <circle cx="56" cy="58" r="5.5" fill="#5A3318"/><circle cx="74" cy="62" r="4" fill="#5A3318"/>
    <circle cx="42" cy="60" r="4" fill="#5A3318"/>`,

  glass: BG("#FCEEF4") + SH + `
    <path d="M42 50h36l-18 36z" fill="#E5AE63" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="50" cy="42" r="14" fill="#F5A4B8" stroke="${I}" stroke-width="3"/>
    <circle cx="70" cy="42" r="14" fill="#BCE3F7" stroke="${I}" stroke-width="3"/>
    <circle cx="60" cy="28" r="14" fill="#FFF3C4" stroke="${I}" stroke-width="3"/>
    <circle cx="60" cy="14" r="5" fill="#D93B54" stroke="${I}" stroke-width="2.2"/>`,

  apple: BG("#FCEEEB") + SH + `
    <path d="M60 32q26-6 26 22q0 28-26 28q-26 0-26-28q0-28 26-22z" fill="#D93B3B" stroke="${I}" stroke-width="3.2"/>
    <path d="M60 32v-14" stroke="#7A4F2B" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="70" cy="22" rx="10" ry="5" transform="rotate(-20 70 22)" fill="#2D8A56" stroke="${I}" stroke-width="2.4"/>
    <path d="M44 46q2-10 8-12" fill="none" stroke="#FFF" stroke-width="3.5" stroke-linecap="round" opacity=".7"/>`,

  banan: BG("#FFF8DE") + SH + `
    <path d="M26 68q26 14 54-14q12-14 14-30q-10 18-26 26q-22 10-42 10z" fill="#F2C94C" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M90 20l6 4" stroke="#7A4F2B" stroke-width="4" stroke-linecap="round"/>`,

  paron: BG("#EDF7E6") + SH + `
    <path d="M60 22q12 0 14 16q12 10 12 24q0 20-26 20q-26 0-26-20q0-14 12-24q2-16 14-16z" fill="#8CC452" stroke="${I}" stroke-width="3.2"/>
    <path d="M60 22v-10" stroke="#7A4F2B" stroke-width="3.8" stroke-linecap="round"/>
    <ellipse cx="69" cy="15" rx="8" ry="4" transform="rotate(-18 69 15)" fill="#2D8A56" stroke="${I}" stroke-width="2.2"/>`,

  brod: BG("#FBF1E1") + SH + `
    <path d="M22 68q0-34 38-34q38 0 38 34v10H22z" fill="#D99852" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M40 42l8 12M56 38l8 12M72 42l8 12" stroke="#A66528" stroke-width="3.2" stroke-linecap="round"/>`,

  bulle: BG("#FBF2E4") + SH + `
    <circle cx="60" cy="52" r="30" fill="#C97E3B" stroke="${I}" stroke-width="3.2"/>
    <path d="M60 52m-18 0a18 18 0 1 1 32 8a12 12 0 1 1-22-4a6 6 0 1 1 10-4" fill="none" stroke="#6E3B16" stroke-width="4" stroke-linecap="round"/>
    <circle cx="48" cy="36" r="2.8" fill="#FFFDF7"/><circle cx="70" cy="38" r="2.8" fill="#FFFDF7"/><circle cx="62" cy="64" r="2.8" fill="#FFFDF7"/>`,

  tarta: BG("#FCEEF4") + SH + `
    <rect x="24" y="48" width="72" height="32" rx="6" fill="#F5B8C8" stroke="${I}" stroke-width="3.2"/>
    <path d="M24 54q12 10 24 0t24 0t24 0" fill="none" stroke="#FFFDF7" stroke-width="5" stroke-linecap="round"/>
    <rect x="46" y="28" width="6" height="20" rx="2" fill="#1B68B3" stroke="${I}" stroke-width="2"/>
    <rect x="68" y="28" width="6" height="20" rx="2" fill="#2D8A56" stroke="${I}" stroke-width="2"/>
    <circle cx="49" cy="22" r="4.5" fill="#F2B705"/><circle cx="71" cy="22" r="4.5" fill="#F2B705"/>`,

  korv: BG("#FFF2E2") + SH + `
    <rect x="20" y="42" width="80" height="26" rx="13" fill="#E8B872" stroke="${I}" stroke-width="3.2"/>
    <rect x="14" y="48" width="92" height="14" rx="7" fill="#C94A38" stroke="${I}" stroke-width="3"/>
    <path d="M28 54q8-5 16 0t16 0t16 0t16 0" fill="none" stroke="#F2B705" stroke-width="3.5" stroke-linecap="round"/>`,

  pizza: BG("#FFF3E0") + SH + `
    <path d="M60 16L96 78Q60 88 24 78Z" fill="#F2C14E" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M24 76q36 10 72 0" fill="none" stroke="#C9823A" stroke-width="9" stroke-linecap="round"/>
    <circle cx="56" cy="46" r="6" fill="#D93B3B" stroke="${I}" stroke-width="2"/>
    <circle cx="68" cy="60" r="6" fill="#D93B3B" stroke="${I}" stroke-width="2"/>
    <circle cx="46" cy="64" r="5.5" fill="#D93B3B" stroke="${I}" stroke-width="2"/>`,

  morot: BG("#FFF3E2") + SH + `
    <path d="M36 78L76 26l14 14L44 82z" fill="#E57A25" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M78 28l10-14M84 32l16-6M80 24l-2-14" stroke="#2D8A56" stroke-width="4" stroke-linecap="round"/>`,

  majs: BG("#FFF7DC") + SH + `
    <ellipse cx="60" cy="48" rx="16" ry="30" fill="#F2C94C" stroke="${I}" stroke-width="3.2"/>
    <path d="M44 42h32M44 54h32M54 22v50M66 22v50" stroke="#D9A320" stroke-width="2"/>
    <path d="M44 58q-12 20 16 26q-8-14-4-26zM76 58q12 20-16 26q8-14 4-26z" fill="#2D8A56" stroke="${I}" stroke-width="2.8" stroke-linejoin="round"/>`,

  tomat: BG("#FCEEEB") + SH + `
    <circle cx="60" cy="54" r="28" fill="#D93B3B" stroke="${I}" stroke-width="3.2"/>
    <path d="M48 28l12 8l12-8l-8 10l8 4l-12-2l-12 2l8-4z" fill="#2D8A56" stroke="${I}" stroke-width="2.2" stroke-linejoin="round"/>`,

  melon: BG("#EDF7EA") + SH + `
    <path d="M18 60a42 42 0 0 0 84 0z" fill="#2D8A56" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M25 60a35 35 0 0 0 70 0z" fill="#E54F5E"/>
    <circle cx="48" cy="70" r="2.4" fill="${I}"/><circle cx="60" cy="74" r="2.4" fill="${I}"/><circle cx="72" cy="70" r="2.4" fill="${I}"/>`,

  citron: BG("#FFF9DC") + SH + `
    <ellipse cx="60" cy="52" rx="34" ry="24" transform="rotate(-12 60 52)" fill="#F2D024" stroke="${I}" stroke-width="3.2"/>
    <path d="M44 44q12-8 24-4" fill="none" stroke="#FFFDF7" stroke-width="3.5" stroke-linecap="round" opacity=".7"/>`,

  /* ── HEM, VERKTYG, MUSIK & KLÄDER ──────────────────────────────────── */
  bok: BG("#EFEAF8") + SH + `
    <path d="M20 26q20-6 40 6q20-12 40-6v52q-20-6-40 6q-20-12-40-6z" fill="#FFFDF7" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M60 32v52" stroke="${I}" stroke-width="3"/>
    <path d="M28 40h22M28 50h22M28 60h18M70 40h22M70 50h22M70 60h18" stroke="#8C9EAE" stroke-width="3" stroke-linecap="round"/>`,

  sag: BG("#FBF2E4") + SH + `
    <path d="M18 62l56-30l12 16l-52 28l-4-6l-6 4l-4-6z" fill="#B8C4D0" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M72 30l18-10l12 20l-18 10z" fill="#D95D39" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>`,

  sko: BG("#E9F2FA") + SH + `
    <path d="M22 68V42l18-8l18 14h24q14 0 14 14v6z" fill="#1B68B3" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <rect x="20" y="66" width="78" height="10" rx="4" fill="#FFFDF7" stroke="${I}" stroke-width="3"/>
    <path d="M54 44l6 6M62 48l6 6" stroke="#FFFDF7" stroke-width="3" stroke-linecap="round"/>`,

  kam: BG("#F4ECF8") + SH + `
    <rect x="18" y="34" width="84" height="14" rx="7" fill="#D95D39" stroke="${I}" stroke-width="3"/>
    <path d="M26 48v24M36 48v24M46 48v24M56 48v24M66 48v24M76 48v24M86 48v24M94 48v24" stroke="${I}" stroke-width="3.5" stroke-linecap="round"/>`,

  nal: BG("#EFEAF8") + `
    <path d="M26 78L88 20" stroke="#9AA8B8" stroke-width="6" stroke-linecap="round"/>
    <path d="M26 78L88 20" stroke="${I}" stroke-width="2.4" stroke-linecap="round"/>
    <ellipse cx="83" cy="25" rx="3" ry="5" transform="rotate(45 83 25)" fill="#EFEAF8" stroke="${I}" stroke-width="2"/>
    <path d="M84 24q16 14 4 36q-12 20 8 24" fill="none" stroke="#D93B54" stroke-width="3.5" stroke-linecap="round"/>`,

  pil: BG("#FBF2E4") + `
    <path d="M22 76L88 24" stroke="#8C5A35" stroke-width="5" stroke-linecap="round"/>
    <path d="M94 20l-18 2l10 14z" fill="#D95D39" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M22 76l-8-10M22 76l10 8M30 70l-8-10M30 70l10 8" stroke="#1B68B3" stroke-width="3.2" stroke-linecap="round"/>`,

  kub: BG("#EAF3FA") + SH + `
    <path d="M60 16l34 16v36L60 84L26 68V32z" fill="#F2B705" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M26 32l34 16l34-16M60 48v36" fill="none" stroke="${I}" stroke-width="2.8"/>`,

  las: BG("#FFF5E0") + SH + `
    <path d="M42 46V32a18 18 0 0 1 36 0v14" fill="none" stroke="${I}" stroke-width="6" stroke-linecap="round"/>
    <rect x="30" y="44" width="60" height="40" rx="10" fill="#F2B705" stroke="${I}" stroke-width="3.2"/>
    <circle cx="60" cy="60" r="6" fill="${I}"/><path d="M60 64v10" stroke="${I}" stroke-width="4" stroke-linecap="round"/>`,

  rep: BG("#FBF2E4") + SH + `
    <circle cx="60" cy="52" r="28" fill="none" stroke="#C99A58" stroke-width="11"/>
    <circle cx="60" cy="52" r="28" fill="none" stroke="${I}" stroke-width="2.5" stroke-dasharray="6 5"/>
    <circle cx="60" cy="52" r="17" fill="none" stroke="#B38240" stroke-width="8"/>`,

  boll: GRD("#EAF5FC", "#C2E0B2") + SH + `
    <circle cx="60" cy="52" r="30" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <polygon points="60,38 71,46 67,59 53,59 49,46" fill="#233142"/>
    <path d="M60 22v16M88 46l-17 0M78 76l-11-17M42 76l11-17M32 46l17 0" stroke="${I}" stroke-width="2.8"/>`,

  dorr: BG("#F4EDE2") + `
    <rect x="34" y="14" width="52" height="76" rx="4" fill="#A66A38" stroke="${I}" stroke-width="3.2"/>
    <rect x="42" y="22" width="36" height="24" rx="2" fill="#8C562B" stroke="${I}" stroke-width="2.2"/>
    <rect x="42" y="54" width="36" height="26" rx="2" fill="#8C562B" stroke="${I}" stroke-width="2.2"/>
    <circle cx="76" cy="52" r="4" fill="#F2B705" stroke="${I}" stroke-width="2"/>`,

  bord: BG("#FBF4E8") + SH + `
    <rect x="18" y="38" width="84" height="12" rx="4" fill="#C98A4A" stroke="${I}" stroke-width="3.2"/>
    <path d="M28 50v34M92 50v34M42 50v26M78 50v26" stroke="${I}" stroke-width="5" stroke-linecap="round"/>`,

  stol: BG("#F4EEF8") + SH + `
    <path d="M38 20v64M82 54v30M38 54h44M38 24h40v22H38z" fill="#D98B48" stroke="${I}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,

  sang: BG("#EAF1FA") + SH + `
    <path d="M16 42v42M104 52v32" stroke="${I}" stroke-width="5" stroke-linecap="round"/>
    <rect x="16" y="56" width="88" height="20" rx="5" fill="#1B68B3" stroke="${I}" stroke-width="3.2"/>
    <rect x="22" y="44" width="24" height="13" rx="6" fill="#FFFDF7" stroke="${I}" stroke-width="2.6"/>
    <rect x="46" y="52" width="56" height="22" rx="5" fill="#D95D39" stroke="${I}" stroke-width="2.8"/>`,

  kopp: BG("#FBF2E6") + SH + `
    <path d="M84 44h10a10 10 0 0 1 0 20H84" fill="none" stroke="${I}" stroke-width="4.5"/>
    <path d="M28 38h56v24a20 20 0 0 1-20 20H48a20 20 0 0 1-20-20z" fill="#1B68B3" stroke="${I}" stroke-width="3.2"/>
    <path d="M46 28q4-8 0-14M60 28q4-8 0-14M72 28q4-8 0-14" fill="none" stroke="#9AA8B8" stroke-width="3" stroke-linecap="round"/>`,

  sked: BG("#EEF3F8") + `
    <ellipse cx="40" cy="40" rx="18" ry="13" transform="rotate(-35 40 40)" fill="#C9D4E0" stroke="${I}" stroke-width="3.2"/>
    <path d="M52 50L90 80" stroke="#C9D4E0" stroke-width="8" stroke-linecap="round"/>
    <path d="M52 50L90 80" stroke="${I}" stroke-width="3" stroke-linecap="round"/>`,

  hatt: BG("#F3EEF8") + SH + `
    <ellipse cx="60" cy="70" rx="44" ry="10" fill="#233142" stroke="${I}" stroke-width="3.2"/>
    <path d="M34 68l6-42h40l6 42z" fill="#233142" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <rect x="37" y="56" width="46" height="9" fill="#D95D39"/>`,

  ring: BG("#FFF7E0") + SH + `
    <circle cx="60" cy="58" r="24" fill="none" stroke="#F2B705" stroke-width="9"/>
    <circle cx="60" cy="58" r="24" fill="none" stroke="${I}" stroke-width="2.6"/>
    <polygon points="60,16 74,28 60,40 46,28" fill="#62CDF2" stroke="${I}" stroke-width="2.8" stroke-linejoin="round"/>`,

  nyckel: BG("#FFF6DE") + SH + `
    <circle cx="36" cy="50" r="16" fill="#F2B705" stroke="${I}" stroke-width="3.2"/>
    <circle cx="36" cy="50" r="6" fill="#FFF6DE" stroke="${I}" stroke-width="2.6"/>
    <path d="M52 50h46M78 50v14M90 50v18" stroke="#F2B705" stroke-width="8" stroke-linecap="round"/>
    <path d="M52 50h46M78 50v14M90 50v18" stroke="${I}" stroke-width="3" stroke-linecap="round"/>`,

  klocka: BG("#FFF3DF") + SH + `
    <circle cx="38" cy="24" r="9" fill="#D95D39" stroke="${I}" stroke-width="3"/>
    <circle cx="82" cy="24" r="9" fill="#D95D39" stroke="${I}" stroke-width="3"/>
    <circle cx="60" cy="54" r="30" fill="#FFFDF7" stroke="${I}" stroke-width="3.5"/>
    <path d="M60 54V36M60 54l14 8" stroke="${I}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="60" cy="54" r="3.5" fill="#D95D39"/>`,

  gitarr: BG("#FBF1E4") + SH + `
    <path d="M74 36L96 14" stroke="#7A4F2B" stroke-width="9" stroke-linecap="round"/>
    <circle cx="48" cy="64" r="22" fill="#D97A38" stroke="${I}" stroke-width="3.2"/>
    <circle cx="64" cy="48" r="15" fill="#D97A38" stroke="${I}" stroke-width="3.2"/>
    <circle cx="55" cy="57" r="7" fill="#4A2B14" stroke="${I}" stroke-width="2.4"/>`,

  trumma: BG("#FCEEEB") + SH + `
    <rect x="24" y="40" width="72" height="38" rx="6" fill="#D95D39" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="40" rx="36" ry="11" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <path d="M30 48l16 28l14-28l14 28l16-28" fill="none" stroke="#F2B705" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M22 18l30 18M98 18L68 36" stroke="#8C5A35" stroke-width="4" stroke-linecap="round"/>`,

  penna: BG("#FFF8E0") + `
    <g transform="rotate(-35 60 52)">
      <rect x="24" y="42" width="64" height="18" rx="3" fill="#F2B705" stroke="${I}" stroke-width="3"/>
      <rect x="16" y="42" width="12" height="18" rx="4" fill="#F4A4B4" stroke="${I}" stroke-width="3"/>
      <path d="M88 42l16 9l-16 9z" fill="#F5DFC0" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M98 48l6 3l-6 3z" fill="${I}"/>
    </g>`,

  sax: BG("#EEF3FA") + `
    <path d="M44 54L88 22M44 46L88 78" stroke="#9AA8B8" stroke-width="7" stroke-linecap="round"/>
    <path d="M44 54L88 22M44 46L88 78" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="32" cy="34" r="12" fill="none" stroke="#D95D39" stroke-width="6"/>
    <circle cx="32" cy="66" r="12" fill="none" stroke="#D95D39" stroke-width="6"/>`,

  hink: BG("#EAF4FC") + SH + `
    <path d="M34 38q26-26 52 0" fill="none" stroke="${I}" stroke-width="3.5"/>
    <path d="M30 38h60l-8 44H38z" fill="#1B68B3" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <ellipse cx="60" cy="38" rx="30" ry="7" fill="#4BA0D4" stroke="${I}" stroke-width="3"/>`,

  spade: BG("#FBF2E4") + `
    <path d="M44 20h32M60 20v38" stroke="#8C5A35" stroke-width="6" stroke-linecap="round"/>
    <path d="M42 56h36v14q0 16-18 18q-18-2-18-18z" fill="#D95D39" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>`,

  talt: GRD("#DCF0FA", "#B8DCA8") + SH + `
    <path d="M16 78L60 22l44 56z" fill="#2A9D8F" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M46 78L60 44l14 34z" fill="#183834" stroke="${I}" stroke-width="2.8" stroke-linejoin="round"/>`,

  lampa: BG("#FFF7DC") + SH + `
    <path d="M32 50L44 20h32l12 30z" fill="#F2B705" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M60 50v30M42 80h36" stroke="${I}" stroke-width="5" stroke-linecap="round"/>`,

  mossa: BG("#EAF3FA") + SH + `
    <circle cx="60" cy="22" r="10" fill="#FFFDF7" stroke="${I}" stroke-width="3"/>
    <path d="M26 64a34 34 0 0 1 68 0z" fill="#D95D39" stroke="${I}" stroke-width="3.2"/>
    <rect x="22" y="60" width="76" height="16" rx="8" fill="#1B68B3" stroke="${I}" stroke-width="3.2"/>`,

  vante: BG("#FCEEEB") + SH + `
    <path d="M38 74V40a20 20 0 0 1 40 0v10l12-6a7 7 0 0 1 8 11l-18 14v5z" fill="#2D8A56" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <rect x="34" y="68" width="48" height="13" rx="5" fill="#F2B705" stroke="${I}" stroke-width="3"/>`,

  paraply: BG("#DDF0FA") + `
    <path d="M60 22v56a8 8 0 0 1-16 0" fill="none" stroke="${I}" stroke-width="4" stroke-linecap="round"/>
    <path d="M18 50a42 32 0 0 1 84 0z" fill="#D95D39" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M42 50q18-32 36 0" fill="#F2B705" stroke="${I}" stroke-width="2.6"/>`,

  /* ── KROPP ─────────────────────────────────────────────────────────── */
  oga: BG("#F1EDF8") + `
    <path d="M16 50q44-32 88 0q-44 32-88 0z" fill="#FFFDF7" stroke="${I}" stroke-width="3.4" stroke-linejoin="round"/>
    <circle cx="60" cy="50" r="16" fill="#2A74B8" stroke="${I}" stroke-width="3"/>
    <circle cx="60" cy="50" r="7" fill="${I}"/><circle cx="65" cy="45" r="3" fill="#FFF"/>`,

  ora: BG("#FDEEE2") + `
    <path d="M54 20q28 0 28 30q0 28-18 32q-12 2-14-10q-2-12 8-14q8-2 8-12q0-12-12-12q-10 0-12 10" fill="#F2C099" stroke="${I}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,

  fot: BG("#FDEEE2") + SH + `
    <path d="M42 22v36q0 14 14 14h28q10 0 10-8q0-8-10-8H62V22z" fill="#F2C099" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>`,

  ta: BG("#FDEEE2") + SH + `
    <path d="M36 22v36q0 14 14 14h26q12 0 12-9q0-9-12-9H58V22z" fill="#F2C099" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="84" cy="63" r="10" fill="none" stroke="#D95D39" stroke-width="3.5" stroke-dasharray="4 3"/>`,

  mun: BG("#FCEEF2") + `
    <path d="M22 48q18-16 38-6q20-10 38 6q-12 24-38 24q-26 0-38-24z" fill="#D94B5C" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M32 50h56q-4 10-28 10q-24 0-28-10z" fill="#FFFDF7"/>`,

  arm: BG("#FDEEE2") + `
    <path d="M26 76l26-26l14 14l22-26" fill="none" stroke="#F2C099" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26 76l26-26l14 14l22-26" fill="none" stroke="${I}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,

  hand: BG("#FDEEE2") + SH + `
    <path d="M40 82V46a5 5 0 0 1 10 0V32a5 5 0 0 1 10 0V28a5 5 0 0 1 10 0V36a5 5 0 0 1 10 0v22l8-6a5 5 0 0 1 7 7L78 82z" fill="#F2C099" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>`,

  /* ── STAD, BYGGNADER & GÖTEBORG ────────────────────────────────────── */
  hus: GRD("#DCF0FA", "#BFE0B2") + SH + `
    <rect x="26" y="44" width="68" height="40" rx="3" fill="#FFF2D6" stroke="${I}" stroke-width="3.2"/>
    <path d="M18 46L60 16l42 30z" fill="#D95D39" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <rect x="52" y="58" width="16" height="26" rx="2" fill="#8C5A35" stroke="${I}" stroke-width="2.6"/>
    <rect x="34" y="54" width="12" height="12" rx="2" fill="#BCE3F7" stroke="${I}" stroke-width="2.2"/>
    <rect x="74" y="54" width="12" height="12" rx="2" fill="#BCE3F7" stroke="${I}" stroke-width="2.2"/>`,

  tak: GRD("#DCF0FA", "#EDE5D6") + `
    <rect x="24" y="54" width="72" height="32" fill="#F5EBDC" stroke="${I}" stroke-width="3"/>
    <path d="M12 56L60 18l48 38z" fill="#D95D39" stroke="${I}" stroke-width="3.4" stroke-linejoin="round"/>
    <rect x="76" y="22" width="12" height="22" fill="#8C4A38" stroke="${I}" stroke-width="2.6"/>`,

  vag: `<rect width="120" height="100" fill="#BFE0B2"/>
    <path d="M46 0h28l26 100H20z" fill="#5A6675" stroke="${I}" stroke-width="3"/>
    <path d="M60 10v14M60 36v16M60 66v20" stroke="#FFFDF7" stroke-width="4.5" stroke-linecap="round"/>`,

  bro: `<rect width="120" height="100" fill="#DCF0FA"/>
    <rect y="68" width="120" height="32" fill="#4BA0D4"/>
    <path d="M8 68V46h104v22H92a18 18 0 0 0-32 0H60a18 18 0 0 0-32 0z" fill="#D99B66" stroke="${I}" stroke-width="3.2"/>
    <path d="M4 46h112" stroke="${I}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M18 46V28M42 46V28M78 46V28M102 46V28M18 32h84" fill="none" stroke="${I}" stroke-width="2.8" stroke-linecap="round"/>`,

  fyr: `<rect width="120" height="100" fill="#D4ECFA"/><rect y="74" width="120" height="26" fill="#3B8AC4"/>
    <path d="M44 76l8-48h16l8 48z" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <path d="M48 56h24M50 40h20" stroke="#D93B3B" stroke-width="7"/>
    <rect x="49" y="18" width="22" height="12" rx="2" fill="#F2B705" stroke="${I}" stroke-width="2.6"/>
    <path d="M45 18l15-10l15 10z" fill="#D93B3B" stroke="${I}" stroke-width="2.6"/>`,

  gata: GRD("#DCF0FA", "#C4B9A9") + `
    <rect x="10" y="26" width="32" height="44" rx="3" fill="#E89E7A" stroke="${I}" stroke-width="3"/>
    <rect x="48" y="18" width="30" height="52" rx="3" fill="#F2CE7E" stroke="${I}" stroke-width="3"/>
    <rect x="84" y="30" width="26" height="40" rx="3" fill="#8FBED9" stroke="${I}" stroke-width="3"/>
    <path d="M8 84h20M44 84h24M84 84h26" stroke="#FFFDF7" stroke-width="4" stroke-linecap="round"/>`,

  torg: GRD("#DCF0FA", "#DFD4C0") + `
    <rect x="26" y="42" width="68" height="32" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <path d="M18 44h84l-10-20H28z" fill="#D95D39" stroke="${I}" stroke-width="3.2"/>
    <circle cx="42" cy="58" r="6.5" fill="#F2B705" stroke="${I}" stroke-width="2.2"/>
    <circle cx="60" cy="58" r="6.5" fill="#2D8A56" stroke="${I}" stroke-width="2.2"/>
    <circle cx="78" cy="58" r="6.5" fill="#1B68B3" stroke="${I}" stroke-width="2.2"/>`,

  hamn: `<rect width="120" height="100" fill="#D9EEFA"/><rect y="70" width="120" height="30" fill="#3B8AC4"/>
    <path d="M60 18v52M40 34h40M32 54q28 24 56 0" fill="none" stroke="${I}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="60" cy="18" r="7" fill="none" stroke="${I}" stroke-width="4"/>`,

  kung: BG("#FFF5DE") + SH + `
    <path d="M22 72l-6-38l24 18l20-28l20 28l24-18l-6 38z" fill="#F2B705" stroke="${I}" stroke-width="3.4" stroke-linejoin="round"/>
    <circle cx="40" cy="58" r="4.5" fill="#D93B3B"/><circle cx="60" cy="54" r="5" fill="#1B68B3"/><circle cx="80" cy="58" r="4.5" fill="#2D8A56"/>`,

  slott: GRD("#DCEFFA", "#B8DCA8") + `
    <rect x="24" y="38" width="72" height="44" fill="#E3D9C8" stroke="${I}" stroke-width="3"/>
    <rect x="16" y="28" width="22" height="54" fill="#D5C8B3" stroke="${I}" stroke-width="3"/>
    <rect x="82" y="28" width="22" height="54" fill="#D5C8B3" stroke="${I}" stroke-width="3"/>
    <path d="M12 28l15-16l15 16zM78 28l15-16l15 16zM48 38l12-16l12 16z" fill="#1B68B3" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M50 82V62a10 10 0 0 1 20 0v20z" fill="#7A4F2B" stroke="${I}" stroke-width="2.6"/>`,

  skola: GRD("#DCF0FA", "#DFD5C5") + `
    <rect x="20" y="38" width="80" height="44" rx="3" fill="#E89A6D" stroke="${I}" stroke-width="3.2"/>
    <path d="M14 40L60 16l46 24z" fill="#1B68B3" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="60" cy="30" r="6" fill="#FFFDF7" stroke="${I}" stroke-width="2.2"/>
    <rect x="52" y="56" width="16" height="26" fill="#7A4F2B" stroke="${I}" stroke-width="2.6"/>
    <rect x="28" y="50" width="16" height="14" rx="2" fill="#BCE3F7" stroke="${I}" stroke-width="2.2"/>
    <rect x="76" y="50" width="16" height="14" rx="2" fill="#BCE3F7" stroke="${I}" stroke-width="2.2"/>`,

  kyrka: GRD("#DCF0FA", "#C2DFB6") + `
    <rect x="30" y="46" width="60" height="36" fill="#FBF2E1" stroke="${I}" stroke-width="3"/>
    <rect x="48" y="24" width="24" height="58" fill="#FFFDF7" stroke="${I}" stroke-width="3"/>
    <path d="M44 26L60 8l16 18z" fill="#2A74B8" stroke="${I}" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M54 82V64a6 6 0 0 1 12 0v18z" fill="#7A4F2B" stroke="${I}" stroke-width="2.4"/>`,

  stopp: BG("#FBF2E6") + SH + `
    <polygon points="44,18 76,18 94,36 94,68 76,86 44,86 26,68 26,36" fill="#D93B3B" stroke="#FFFDF7" stroke-width="5"/>
    <polygon points="44,18 76,18 94,36 94,68 76,86 44,86 26,68 26,36" fill="none" stroke="${I}" stroke-width="3"/>
    <path d="M44 52h32" stroke="#FFFDF7" stroke-width="8" stroke-linecap="round"/>`,

  skylt: BG("#E4F1FA") + `
    <path d="M60 54v38" stroke="${I}" stroke-width="6.5" stroke-linecap="round"/>
    <rect x="14" y="18" width="92" height="40" rx="10" fill="#1B68B3" stroke="${I}" stroke-width="3.6"/>
    <rect x="20" y="24" width="80" height="28" rx="6" fill="#FFFDF7"/>
    <circle cx="34" cy="38" r="9" fill="#1B68B3"/>
    <text x="34" y="42.5" text-anchor="middle" font-family="Fredoka, system-ui" font-weight="700" font-size="13" fill="#FFFDF7">H</text>
    <path d="M50 34h40M50 43h28" stroke="${I}" stroke-width="4" stroke-linecap="round"/>`,

  perrong: GRD("#DCF0FA", "#DDD4C6") + `
    <path d="M0 74h120" stroke="#F2B705" stroke-width="5" stroke-dasharray="10 6"/>
    <path d="M26 70V26h68v44" fill="none" stroke="${I}" stroke-width="4"/>
    <rect x="20" y="18" width="80" height="12" rx="4" fill="#1B68B3" stroke="${I}" stroke-width="3.2"/>
    <rect x="38" y="50" width="44" height="8" rx="3" fill="#D95D39" stroke="${I}" stroke-width="2.8"/>`,

  biljett: BG("#FFF7E0") + `
    <g transform="rotate(-7 60 50)">
      <path d="M16 26h88v16a8 8 0 0 0 0 16v16H16V58a8 8 0 0 0 0-16z" fill="#F2B705" stroke="${I}" stroke-width="3.6"/>
      <path d="M44 28v44" stroke="${I}" stroke-width="2.8" stroke-dasharray="5 5"/>
      <rect x="54" y="38" width="38" height="8" rx="3" fill="#FFFDF7" stroke="${I}" stroke-width="2.2"/>
      <path d="M56 56h32" stroke="${I}" stroke-width="3.8" stroke-linecap="round"/>
      <circle cx="30" cy="50" r="7" fill="#1B68B3" stroke="${I}" stroke-width="2.4"/>
    </g>`,

  vagnhall: GRD("#E4F1FA", "#DDD4C6") + `
    <rect x="12" y="34" width="96" height="50" rx="5" fill="#E8DCCB" stroke="${I}" stroke-width="3.4"/>
    <path d="M6 36h108L98 16H22z" fill="#D95D39" stroke="${I}" stroke-width="3.4"/>
    <rect x="22" y="48" width="32" height="36" rx="4" fill="${I}"/>
    <rect x="26" y="54" width="24" height="30" rx="4" fill="#1B68B3" stroke="${I}" stroke-width="2.2"/>
    <rect x="30" y="60" width="16" height="9" rx="2" fill="#BCE3F7"/>
    <rect x="66" y="48" width="32" height="36" rx="4" fill="${I}"/>
    <rect x="70" y="54" width="24" height="30" rx="4" fill="#2A7A58" stroke="${I}" stroke-width="2.2"/>
    <rect x="74" y="60" width="16" height="9" rx="2" fill="#BCE3F7"/>`,

  forare: BG("#E4F1FA") + `
    <circle cx="60" cy="56" r="24" fill="#FFE0C2" stroke="${I}" stroke-width="3.4"/>
    <path d="M36 42q24-26 48 0z" fill="#1B68B3" stroke="${I}" stroke-width="3.4"/>
    <rect x="32" y="38" width="56" height="8" rx="4" fill="${I}"/>
    <circle cx="60" cy="31" r="6" fill="#F2B705" stroke="${I}" stroke-width="2.2"/>
    <circle cx="51" cy="56" r="3" fill="${I}"/><circle cx="69" cy="56" r="3" fill="${I}"/>
    <path d="M51 67q9 8 18 0" fill="none" stroke="${I}" stroke-width="3" stroke-linecap="round"/>
    <path d="M34 90q26-14 52 0" fill="#1B68B3" stroke="${I}" stroke-width="3.4"/>`,

  tunnel: GRD("#DCF0FA", "#85B87A") + `
    <path d="M8 82q8-62 52-62q44 0 52 62z" fill="#7D91A6" stroke="${I}" stroke-width="3.2"/>
    <path d="M34 82V54a26 26 0 0 1 52 0v28z" fill="#1A2636" stroke="${I}" stroke-width="3"/>
    <path d="M48 82l8-28M72 82l-8-28" stroke="#D3DDE8" stroke-width="3"/>`,

  drake: `<rect width="120" height="100" fill="#D5ECFA"/>
    <path d="M60 12L86 44L60 72L34 44Z" fill="#D95D39" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M60 12v60M34 44h52" stroke="#F2B705" stroke-width="2.6"/>
    <path d="M60 72q12 10 4 22" fill="none" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>`
};
