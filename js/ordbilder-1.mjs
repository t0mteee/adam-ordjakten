/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Nordiska bilderboks-illustrationer (Del 1)
   Fordon, spårvagnar, djur & natur — handritade skuggade SVG-bilder.
   ═══════════════════════════════════════════════════════════════ */

const I = "#13315C"; // Marinblå kontur
const SH = `<ellipse cx="60" cy="89" rx="34" ry="6.5" fill="rgba(19,49,92,.11)"/>`;
const SKY = (a = "#E4F3FC", b = "#FBF6EC") => `<rect width="120" height="100" fill="${a}"/><rect y="68" width="120" height="32" fill="${b}"/>`;
const GRD = (sky = "#E5F3FC", grd = "#CBE5C2") => `<rect width="120" height="100" fill="${sky}"/><path d="M0 72Q60 62 120 72V100H0Z" fill="${grd}"/>`;
const SEA = (sky = "#DCF0FA") => `<rect width="120" height="100" fill="${sky}"/><rect y="66" width="120" height="34" fill="#4BA0D4"/><path d="M8 78q10-4 20 0t20 0M66 84q10-4 20 0t20 0" fill="none" stroke="#E8F7FF" stroke-width="2.6" stroke-linecap="round"/>`;
const EYES = (lx, rx, y, r = 3.2) => `<circle cx="${lx}" cy="${y}" r="${r}" fill="${I}"/><circle cx="${lx + 1}" cy="${y - 1}" r="${r * 0.35}" fill="#FFF"/><circle cx="${rx}" cy="${y}" r="${r}" fill="${I}"/><circle cx="${rx + 1}" cy="${y - 1}" r="${r * 0.35}" fill="#FFF"/>`;

export const BILDER_1 = {
  /* ── FORDON & SPÅRVAGN ─────────────────────────────────────────────── */
  bil: GRD("#E4F3FC", "#D9D2C5") + SH + `
    <path d="M18 68v-12q0-6 7-7l13-15q4-4 10-4h26q6 0 10 5l10 14h6q6 0 6 7v12z" fill="#D95D39" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M38 49l9-12h25l8 12z" fill="#BCE3F7" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M59 37v12" stroke="${I}" stroke-width="2.6"/>
    <rect x="96" y="54" width="8" height="6" rx="2" fill="#F2B705" stroke="${I}" stroke-width="2"/>
    <circle cx="36" cy="70" r="11" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="36" cy="70" r="4.5" fill="#EDE7DC"/>
    <circle cx="84" cy="70" r="11" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="84" cy="70" r="4.5" fill="#EDE7DC"/>`,

  tag: GRD("#E4F3FC", "#D4DEC9") + `
    <path d="M4 82h112" stroke="${I}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="30" cy="24" r="7" fill="#FFF" opacity=".9"/><circle cx="40" cy="18" r="9" fill="#FFF" opacity=".85"/><circle cx="54" cy="15" r="7" fill="#FFF" opacity=".75"/>
    <rect x="24" y="34" width="12" height="16" rx="2" fill="#2A3950" stroke="${I}" stroke-width="2.8"/>
    <rect x="18" y="48" width="54" height="24" rx="5" fill="#1B68B3" stroke="${I}" stroke-width="3.2"/>
    <rect x="64" y="32" width="34" height="40" rx="5" fill="#D95D39" stroke="${I}" stroke-width="3.2"/>
    <rect x="60" y="28" width="42" height="7" rx="3" fill="#F2B705" stroke="${I}" stroke-width="2.6"/>
    <rect x="72" y="40" width="18" height="14" rx="3" fill="#BCE3F7" stroke="${I}" stroke-width="2.4"/>
    <path d="M18 68l-8 8h10z" fill="#F2B705" stroke="${I}" stroke-width="2.4" stroke-linejoin="round"/>
    <circle cx="32" cy="74" r="8" fill="#2A3950" stroke="${I}" stroke-width="2.8"/><circle cx="32" cy="74" r="3" fill="#F2B705"/>
    <circle cx="54" cy="74" r="8" fill="#2A3950" stroke="${I}" stroke-width="2.8"/><circle cx="54" cy="74" r="3" fill="#F2B705"/>
    <circle cx="80" cy="73" r="10" fill="#2A3950" stroke="${I}" stroke-width="2.8"/><circle cx="80" cy="73" r="4" fill="#F2B705"/>`,

  bat: SEA() + `
    <path d="M58 18v44" stroke="${I}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M60 20L92 56H60Z" fill="#FFFDF7" stroke="${I}" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M56 26L30 56H56Z" fill="#F2B705" stroke="${I}" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M18 62h84l-12 16H30z" fill="#D95D39" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M24 68h72" stroke="#FFFDF7" stroke-width="3"/>`,

  buss: GRD("#E6F4FC", "#D9D2C5") + SH + `
    <rect x="12" y="30" width="96" height="42" rx="9" fill="#F2B705" stroke="${I}" stroke-width="3.2"/>
    <rect x="14" y="56" width="92" height="5" fill="#1B68B3"/>
    <rect x="20" y="37" width="18" height="15" rx="3" fill="#BCE3F7" stroke="${I}" stroke-width="2.4"/>
    <rect x="44" y="37" width="18" height="15" rx="3" fill="#BCE3F7" stroke="${I}" stroke-width="2.4"/>
    <rect x="68" y="37" width="16" height="15" rx="3" fill="#BCE3F7" stroke="${I}" stroke-width="2.4"/>
    <rect x="90" y="37" width="12" height="22" rx="3" fill="#BCE3F7" stroke="${I}" stroke-width="2.4"/>
    <circle cx="32" cy="74" r="9.5" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="32" cy="74" r="4" fill="#EDE7DC"/>
    <circle cx="84" cy="74" r="9.5" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="84" cy="74" r="4" fill="#EDE7DC"/>`,

  vagn: GRD("#E4F3FC", "#DAD3C7") + `
    <path d="M6 82h108" stroke="${I}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M48 26l12-12 12 12M42 14h36" fill="none" stroke="${I}" stroke-width="3" stroke-linecap="round"/>
    <rect x="14" y="28" width="92" height="44" rx="11" fill="#1B68B3" stroke="${I}" stroke-width="3.4"/>
    <rect x="17" y="38" width="86" height="18" fill="#F7F4EC"/>
    <rect x="24" y="41" width="18" height="12" rx="3" fill="#BCE3F7" stroke="${I}" stroke-width="2.2"/>
    <rect x="50" y="41" width="20" height="12" rx="3" fill="#BCE3F7" stroke="${I}" stroke-width="2.2"/>
    <rect x="78" y="41" width="18" height="12" rx="3" fill="#BCE3F7" stroke="${I}" stroke-width="2.2"/>
    <circle cx="34" cy="76" r="6.5" fill="${I}"/><circle cx="86" cy="76" r="6.5" fill="${I}"/>`,

  sparvagn: GRD("#E4F3FC", "#DAD3C7") + `
    <path d="M4 82h112" stroke="${I}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M74 26l10-12 10 12M68 14h32" fill="none" stroke="${I}" stroke-width="2.8" stroke-linecap="round"/>
    <rect x="8" y="28" width="46" height="44" rx="9" fill="#1B68B3" stroke="${I}" stroke-width="3.2"/>
    <rect x="54" y="34" width="10" height="34" fill="${I}"/>
    <rect x="64" y="28" width="48" height="44" rx="9" fill="#1B68B3" stroke="${I}" stroke-width="3.2"/>
    <rect x="11" y="38" width="40" height="16" fill="#1B2432"/>
    <rect x="67" y="38" width="42" height="16" fill="#1B2432"/>
    <rect x="16" y="40" width="13" height="11" rx="2" fill="#BCE3F7"/><rect x="33" y="40" width="13" height="11" rx="2" fill="#BCE3F7"/>
    <rect x="72" y="40" width="14" height="11" rx="2" fill="#BCE3F7"/><rect x="90" y="40" width="14" height="11" rx="2" fill="#BCE3F7"/>
    <circle cx="106" cy="62" r="3.5" fill="#F2B705"/>
    <circle cx="26" cy="76" r="5.8" fill="${I}"/><circle cx="59" cy="76" r="5.8" fill="${I}"/><circle cx="92" cy="76" r="5.8" fill="${I}"/>`,

  spar: `<rect width="120" height="100" fill="#EAE2D3"/>
    <path d="M16 82h88M23 68h74M30 54h60M36 42h48M41 32h38M45 23h30" stroke="#8F6339" stroke-width="6" stroke-linecap="round"/>
    <path d="M24 90L50 14M96 90L70 14" stroke="${I}" stroke-width="6" stroke-linecap="round"/>
    <path d="M24 90L50 14M96 90L70 14" stroke="#D3DDE8" stroke-width="2.5" stroke-linecap="round"/>`,

  rals: `<rect width="120" height="100" fill="#E8EEF4"/>
    <path d="M14 76h92M22 58h76M30 40h60M38 24h44" stroke="#8C5E35" stroke-width="7" stroke-linecap="round"/>
    <path d="M26 90L48 12M94 90L72 12" stroke="${I}" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M26 90L48 12M94 90L72 12" stroke="#E5ECF5" stroke-width="2.6" stroke-linecap="round"/>`,

  cykel: GRD("#EAF5FC", "#D4E8CE") + SH + `
    <circle cx="32" cy="68" r="16" fill="none" stroke="${I}" stroke-width="4"/>
    <circle cx="88" cy="68" r="16" fill="none" stroke="${I}" stroke-width="4"/>
    <path d="M32 68L52 44H76L88 68M52 44L60 68H32M76 44L82 32H70M46 38H58" fill="none" stroke="#D95D39" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="32" cy="68" r="3" fill="${I}"/><circle cx="88" cy="68" r="3" fill="${I}"/>`,

  lastbil: GRD("#E4F3FC", "#D9D2C5") + SH + `
    <rect x="12" y="28" width="58" height="40" rx="5" fill="#2A9D8F" stroke="${I}" stroke-width="3.2"/>
    <path d="M70 40h22l12 14v14H70z" fill="#D95D39" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M76 45h14l8 9H76z" fill="#BCE3F7" stroke="${I}" stroke-width="2.2"/>
    <circle cx="30" cy="72" r="9.5" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="30" cy="72" r="4" fill="#EDE7DC"/>
    <circle cx="86" cy="72" r="9.5" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="86" cy="72" r="4" fill="#EDE7DC"/>`,

  brandbil: GRD("#E4F3FC", "#D9D2C5") + SH + `
    <rect x="12" y="34" width="94" height="36" rx="7" fill="#D93B3B" stroke="${I}" stroke-width="3.2"/>
    <rect x="78" y="40" width="22" height="14" rx="3" fill="#BCE3F7" stroke="${I}" stroke-width="2.4"/>
    <path d="M18 32l54-12" stroke="#EDE7DC" stroke-width="6" stroke-linecap="round"/>
    <path d="M18 32l54-12" stroke="${I}" stroke-width="2.2" stroke-dasharray="4 4"/>
    <rect x="82" y="27" width="12" height="7" rx="3" fill="#4BA0D4" stroke="${I}" stroke-width="2"/>
    <rect x="18" y="46" width="52" height="12" rx="3" fill="#FFFDF7" stroke="${I}" stroke-width="2"/>
    <circle cx="32" cy="74" r="9.5" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="32" cy="74" r="4" fill="#F2B705"/>
    <circle cx="84" cy="74" r="9.5" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="84" cy="74" r="4" fill="#F2B705"/>`,

  polis: GRD("#E4F3FC", "#D9D2C5") + SH + `
    <path d="M18 68v-12q0-6 7-7l13-15q4-4 10-4h24q6 0 10 5l10 14h6q6 0 6 7v12z" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <rect x="19" y="54" width="84" height="8" fill="#1B68B3"/>
    <path d="M38 49l9-12h24l8 12z" fill="#BCE3F7" stroke="${I}" stroke-width="2.4"/>
    <rect x="52" y="23" width="16" height="7" rx="3" fill="#2A9DF4" stroke="${I}" stroke-width="2.2"/>
    <circle cx="36" cy="70" r="10.5" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="36" cy="70" r="4" fill="#F2B705"/>
    <circle cx="84" cy="70" r="10.5" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="84" cy="70" r="4" fill="#F2B705"/>`,

  flygplan: `<rect width="120" height="100" fill="#CFE9FA"/>
    <circle cx="24" cy="24" r="10" fill="#FFF" opacity=".8"/><circle cx="36" cy="24" r="12" fill="#FFF" opacity=".8"/>
    <circle cx="94" cy="76" r="11" fill="#FFF" opacity=".75"/><circle cx="106" cy="76" r="9" fill="#FFF" opacity=".75"/>
    <g transform="rotate(-14 60 52)">
      <path d="M46 48L62 18l10 2l-8 28z" fill="#1B68B3" stroke="${I}" stroke-width="2.8" stroke-linejoin="round"/>
      <path d="M14 52q0-10 16-10h54q18 0 22 10q-4 10-22 10H30q-16 0-16-10z" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
      <path d="M18 44L10 26h10l10 18z" fill="#D95D39" stroke="${I}" stroke-width="2.8" stroke-linejoin="round"/>
      <path d="M48 56l14 26h10l-8-26z" fill="#1B68B3" stroke="${I}" stroke-width="2.8" stroke-linejoin="round"/>
      <circle cx="52" cy="50" r="3" fill="#BCE3F7" stroke="${I}" stroke-width="1.8"/>
      <circle cx="64" cy="50" r="3" fill="#BCE3F7" stroke="${I}" stroke-width="1.8"/>
      <circle cx="76" cy="50" r="3" fill="#BCE3F7" stroke="${I}" stroke-width="1.8"/>
    </g>`,

  raket: `<rect width="120" height="100" fill="#162947"/>
    <circle cx="20" cy="22" r="2" fill="#FFF"/><circle cx="96" cy="18" r="2.5" fill="#F2B705"/><circle cx="102" cy="64" r="2" fill="#FFF"/><circle cx="22" cy="74" r="2.2" fill="#FFF"/>
    <g transform="rotate(24 60 50)">
      <path d="M46 72L32 82l14-2zM74 72L88 82l-14-2z" fill="#D95D39" stroke="#FFF" stroke-width="2"/>
      <path d="M60 12q18 16 18 58H42q0-42 18-58z" fill="#FFFDF7" stroke="${I}" stroke-width="3"/>
      <path d="M51 24q9-12 18 0z" fill="#D95D39"/>
      <circle cx="60" cy="44" r="9" fill="#4BA0D4" stroke="${I}" stroke-width="3"/>
      <path d="M52 72q8 20 16 0z" fill="#F2B705"/>
    </g>`,

  farja: SEA() + `
    <rect x="26" y="34" width="68" height="22" rx="4" fill="#FFFDF7" stroke="${I}" stroke-width="3"/>
    <rect x="44" y="20" width="14" height="14" rx="2" fill="#D95D39" stroke="${I}" stroke-width="2.8"/>
    <rect x="34" y="40" width="12" height="9" rx="2" fill="#BCE3F7" stroke="${I}" stroke-width="2"/>
    <rect x="54" y="40" width="12" height="9" rx="2" fill="#BCE3F7" stroke="${I}" stroke-width="2"/>
    <rect x="74" y="40" width="12" height="9" rx="2" fill="#BCE3F7" stroke="${I}" stroke-width="2"/>
    <path d="M12 56h96l-10 18H22z" fill="#1B68B3" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>`,

  kran: SKY("#E6F2FA", "#E0D6C6") + `
    <path d="M36 86V20h8v66z" fill="#F2B705" stroke="${I}" stroke-width="2.8"/>
    <path d="M22 24h76v8H22z" fill="#F2B705" stroke="${I}" stroke-width="2.8"/>
    <path d="M40 14L86 24M40 14L24 24" stroke="${I}" stroke-width="2.6"/>
    <path d="M84 32v28" stroke="${I}" stroke-width="3"/>
    <path d="M84 60q8 4 0 10q-6 0-6-4" fill="none" stroke="${I}" stroke-width="3.2" stroke-linecap="round"/>
    <rect x="70" y="70" width="28" height="16" rx="3" fill="#D95D39" stroke="${I}" stroke-width="2.8"/>`,

  traktor: GRD("#E4F3FC", "#C9E0B4") + SH + `
    <rect x="24" y="38" width="42" height="28" rx="5" fill="#2D8A56" stroke="${I}" stroke-width="3.2"/>
    <rect x="54" y="22" width="32" height="32" rx="5" fill="#2D8A56" stroke="${I}" stroke-width="3.2"/>
    <rect x="60" y="27" width="20" height="16" rx="3" fill="#BCE3F7" stroke="${I}" stroke-width="2.4"/>
    <rect x="30" y="24" width="6" height="14" rx="2" fill="#2A3950" stroke="${I}" stroke-width="2"/>
    <circle cx="34" cy="70" r="10" fill="#2A3950" stroke="${I}" stroke-width="3"/><circle cx="34" cy="70" r="4" fill="#F2B705"/>
    <circle cx="78" cy="64" r="16" fill="#2A3950" stroke="${I}" stroke-width="3.2"/><circle cx="78" cy="64" r="7" fill="#F2B705"/>`,

  helikopter: `<rect width="120" height="100" fill="#D9EFFB"/>
    <path d="M20 22h76M58 22v14" stroke="${I}" stroke-width="4" stroke-linecap="round"/>
    <path d="M36 52H14M14 44v16" stroke="${I}" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="64" cy="52" rx="30" ry="18" fill="#D95D39" stroke="${I}" stroke-width="3.2"/>
    <path d="M64 36q24 2 28 16H64z" fill="#BCE3F7" stroke="${I}" stroke-width="2.6"/>
    <path d="M44 74h42M54 68v6M74 68v6" stroke="${I}" stroke-width="3.5" stroke-linecap="round"/>`,

  hjul: SKY("#F4EFE6", "#E5DCCD") + SH + `
    <circle cx="60" cy="50" r="32" fill="#2A3950" stroke="${I}" stroke-width="3.5"/>
    <circle cx="60" cy="50" r="19" fill="#EDE7DC" stroke="${I}" stroke-width="3"/>
    <path d="M60 31v38M41 50h38M47 37l26 26M73 37L47 63" stroke="${I}" stroke-width="3"/>
    <circle cx="60" cy="50" r="6" fill="#F2B705" stroke="${I}" stroke-width="2.4"/>`,

  skepp: SEA() + `
    <path d="M58 14v48M38 24v38" stroke="${I}" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M40 26q16 6 16 24H40zM60 18q22 8 24 34H60z" fill="#FFFDF7" stroke="${I}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M16 58h88l-12 18H28z" fill="#8C5A35" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="42" cy="67" r="3" fill="#F2B705"/><circle cx="60" cy="67" r="3" fill="#F2B705"/><circle cx="78" cy="67" r="3" fill="#F2B705"/>`,

  /* ── DJUR ──────────────────────────────────────────────────────────── */
  ko: GRD("#E4F3FC", "#BFE2B0") + SH + `
    <ellipse cx="60" cy="64" rx="28" ry="20" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <circle cx="48" cy="60" r="7" fill="#2A3950"/><circle cx="72" cy="68" r="6" fill="#2A3950"/>
    <circle cx="60" cy="40" r="19" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <path d="M45 26q-8-6-6-12q6 2 10 8M75 26q8-6 6-12q-6 2-10 8" fill="#E6D2A2" stroke="${I}" stroke-width="2.6"/>
    <ellipse cx="38" cy="36" rx="7" ry="4" fill="#FFFDF7" stroke="${I}" stroke-width="2.6"/>
    <ellipse cx="82" cy="36" rx="7" ry="4" fill="#FFFDF7" stroke="${I}" stroke-width="2.6"/>
    <ellipse cx="60" cy="49" rx="14" ry="9" fill="#F5B8B8" stroke="${I}" stroke-width="2.6"/>
    ${EYES(52, 68, 36, 3)}
    <circle cx="55" cy="49" r="2" fill="${I}"/><circle cx="65" cy="49" r="2" fill="${I}"/>`,

  bi: `<rect width="120" height="100" fill="#FFF7DC"/>
    <ellipse cx="52" cy="34" rx="14" ry="18" transform="rotate(-18 52 34)" fill="#E3F4FF" stroke="${I}" stroke-width="2.8"/>
    <ellipse cx="70" cy="34" rx="14" ry="18" transform="rotate(18 70 34)" fill="#E3F4FF" stroke="${I}" stroke-width="2.8"/>
    <ellipse cx="60" cy="58" rx="28" ry="20" fill="#F2B705" stroke="${I}" stroke-width="3.2"/>
    <path d="M48 40v36M62 39v38M76 42v32" stroke="${I}" stroke-width="5.5"/>
    <path d="M88 58l10 0l-10 5z" fill="${I}"/>
    <circle cx="40" cy="54" r="3.4" fill="${I}"/><circle cx="41" cy="53" r="1.1" fill="#FFF"/>
    <path d="M36 40q-4-10-10-10M44 38q-2-10-6-12" fill="none" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>`,

  al: SEA("#DCF0FA") + `
    <path d="M18 60q16-24 34 0t34 0q10-12 18-4" fill="none" stroke="#3D6B7D" stroke-width="15" stroke-linecap="round"/>
    <path d="M18 60q16-24 34 0t34 0q10-12 18-4" fill="none" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="96" cy="52" r="3" fill="#FFFDF7"/><circle cx="97" cy="52" r="1.4" fill="${I}"/>`,

  lo: GRD("#EBF3E8", "#C8DCB8") + SH + `
    <ellipse cx="60" cy="64" rx="24" ry="20" fill="#D9A86C" stroke="${I}" stroke-width="3.2"/>
    <path d="M40 34L36 14l14 14zM80 34l4-20-14 14z" fill="#D9A86C" stroke="${I}" stroke-width="3"/>
    <path d="M36 14l-3-6M84 14l3-6" stroke="${I}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="60" cy="44" r="21" fill="#D9A86C" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="52" rx="12" ry="9" fill="#FBF2E1"/>
    ${EYES(51, 69, 41, 3.2)}
    <path d="M56 49h8l-4 5z" fill="#D95D39" stroke="${I}" stroke-width="2"/>`,

  apa: GRD("#E9F4E4", "#C7DFB8") + SH + `
    <circle cx="34" cy="42" r="10" fill="#9E6A3D" stroke="${I}" stroke-width="3"/><circle cx="34" cy="42" r="5" fill="#F2CFA0"/>
    <circle cx="86" cy="42" r="10" fill="#9E6A3D" stroke="${I}" stroke-width="3"/><circle cx="86" cy="42" r="5" fill="#F2CFA0"/>
    <ellipse cx="60" cy="70" rx="22" ry="18" fill="#9E6A3D" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="72" rx="13" ry="12" fill="#F2CFA0"/>
    <circle cx="60" cy="42" r="22" fill="#9E6A3D" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="49" rx="16" ry="12" fill="#F2CFA0"/>
    <circle cx="51" cy="39" r="7" fill="#F2CFA0"/><circle cx="69" cy="39" r="7" fill="#F2CFA0"/>
    ${EYES(52, 68, 39, 3)}
    <path d="M52 51q8 6 16 0" fill="none" stroke="${I}" stroke-width="2.8" stroke-linecap="round"/>`,

  orm: GRD("#EAF5E4", "#C2DFB3") + `
    <path d="M22 72q12-26 28-10t28-8q12-8 14-20" fill="none" stroke="${I}" stroke-width="19" stroke-linecap="round"/>
    <path d="M22 72q12-26 28-10t28-8q12-8 14-20" fill="none" stroke="#45A864" stroke-width="13" stroke-linecap="round"/>
    <ellipse cx="90" cy="30" rx="12" ry="9" fill="#45A864" stroke="${I}" stroke-width="3"/>
    <circle cx="93" cy="28" r="2.6" fill="${I}"/>
    <path d="M101 31h9l4-3M110 31l4 3" stroke="#D95D39" stroke-width="2.4" stroke-linecap="round"/>`,

  mus: SKY("#F4EFE6", "#E5DAC8") + SH + `
    <path d="M84 74q20 2 18-16" fill="none" stroke="#E09A9A" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="42" cy="32" r="13" fill="#9BA6B2" stroke="${I}" stroke-width="3"/><circle cx="42" cy="32" r="7" fill="#F4B6B6"/>
    <circle cx="72" cy="32" r="13" fill="#9BA6B2" stroke="${I}" stroke-width="3"/><circle cx="72" cy="32" r="7" fill="#F4B6B6"/>
    <ellipse cx="60" cy="64" rx="28" ry="20" fill="#9BA6B2" stroke="${I}" stroke-width="3.2"/>
    <circle cx="50" cy="56" r="3" fill="${I}"/><circle cx="66" cy="56" r="3" fill="${I}"/>
    <circle cx="57" cy="66" r="4.5" fill="#E07A84" stroke="${I}" stroke-width="2.2"/>
    <path d="M34 64h14M34 70h14M68 64h14M68 70h14" stroke="${I}" stroke-width="2" stroke-linecap="round"/>`,

  sal: SEA() + `
    <ellipse cx="60" cy="62" rx="34" ry="18" fill="#8EA8C2" stroke="${I}" stroke-width="3.2"/>
    <circle cx="40" cy="44" r="17" fill="#8EA8C2" stroke="${I}" stroke-width="3.2"/>
    <path d="M90 62l16-10l-4 14l4 10z" fill="#7692AE" stroke="${I}" stroke-width="2.8" stroke-linejoin="round"/>
    ${EYES(34, 46, 40, 2.8)}
    <ellipse cx="40" cy="49" rx="6" ry="4" fill="#DCE8F2"/><circle cx="40" cy="47" r="2.8" fill="${I}"/>`,

  rav: GRD("#FDEEE2", "#D3E2C0") + SH + `
    <path d="M78 74q24-6 22-24q-12-2-22 14z" fill="#D95D39" stroke="${I}" stroke-width="3"/>
    <path d="M93 52q7 0 7 6q-6 4-11 0z" fill="#FFFDF7"/>
    <ellipse cx="58" cy="68" rx="22" ry="18" fill="#D95D39" stroke="${I}" stroke-width="3.2"/>
    <path d="M40 38L34 14l18 14zM76 38l6-24-18 14z" fill="#D95D39" stroke="${I}" stroke-width="3"/>
    <ellipse cx="58" cy="46" rx="22" ry="18" fill="#D95D39" stroke="${I}" stroke-width="3.2"/>
    <path d="M38 48q10-4 20 3q10-7 20-3q-4 16-20 16q-16 0-20-16z" fill="#FFFDF7"/>
    ${EYES(50, 66, 43, 3)}
    <circle cx="58" cy="53" r="3.5" fill="${I}"/>`,

  alg: GRD("#E4F1E5", "#C2D9B8") + SH + `
    <path d="M40 34q-18-8-18-20q8 4 10 10q4-10 10-8M80 34q18-8 18-20q-8 4-10 10q-4-10-10-8" fill="none" stroke="#C7A678" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="60" cy="68" rx="24" ry="18" fill="#7A5638" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="46" rx="18" ry="20" fill="#7A5638" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="56" rx="14" ry="10" fill="#9E734E" stroke="${I}" stroke-width="2.6"/>
    ${EYES(52, 68, 40, 3)}
    <circle cx="55" cy="56" r="2" fill="${I}"/><circle cx="65" cy="56" r="2" fill="${I}"/>`,

  val: SEA("#D4ECFA") + `
    <path d="M62 24q-6-10-14-8M62 24q6-10 14-8M62 24v12" fill="none" stroke="#4BA0D4" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M20 62q0-24 38-24q28 0 34 22l14-12l-4 18l8 10H24q-4 0-4-14z" fill="#2A74B8" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M22 66q22 10 48 6v4H24z" fill="#E3F2FC"/>
    <circle cx="38" cy="54" r="3.2" fill="${I}"/><circle cx="39" cy="53" r="1.1" fill="#FFF"/>`,

  haj: SEA("#D2EBF9") + `
    <path d="M52 38L62 16l10 22z" fill="#6F8AA6" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M18 56q18-18 52-14l22 10l14-14l-6 18l6 16l-16-12q-28 16-54 10q-12-2-18-4z" fill="#6F8AA6" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M24 58h24l-4 6l-4-5l-4 5l-4-5z" fill="#FFFDF7" stroke="${I}" stroke-width="1.8"/>
    <circle cx="36" cy="50" r="3" fill="${I}"/>`,

  far: GRD("#E4F3FC", "#BFE0B1") + SH + `
    <g fill="#FFFDF7" stroke="${I}" stroke-width="3">
      <circle cx="44" cy="58" r="14"/><circle cx="62" cy="52" r="16"/><circle cx="78" cy="58" r="14"/><circle cx="54" cy="68" r="14"/><circle cx="70" cy="68" r="14"/>
    </g>
    <ellipse cx="36" cy="48" rx="11" ry="13" fill="#2A3950" stroke="${I}" stroke-width="3"/>
    <circle cx="32" cy="45" r="2.2" fill="#FFF"/><circle cx="40" cy="45" r="2.2" fill="#FFF"/>
    <path d="M46 80v8M72 80v8" stroke="${I}" stroke-width="4" stroke-linecap="round"/>`,

  get: GRD("#EBF4E4", "#C8DFBA") + SH + `
    <path d="M48 26q-4-12-10-12M72 26q4-12 10-12" fill="none" stroke="#C7A678" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="60" cy="68" rx="22" ry="16" fill="#E8DFD1" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="44" rx="16" ry="18" fill="#E8DFD1" stroke="${I}" stroke-width="3.2"/>
    <path d="M55 60l5 10l5-10z" fill="#C9BEB0" stroke="${I}" stroke-width="2.2"/>
    ${EYES(53, 67, 41, 2.8)}`,

  ren: GRD("#E6F2FA", "#EDF4FA") + SH + `
    <path d="M44 32L30 12M36 22l-8 2M76 32l14-20M84 22l8 2" stroke="#7A5230" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="60" cy="68" rx="22" ry="18" fill="#A67C52" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="46" rx="17" ry="18" fill="#A67C52" stroke="${I}" stroke-width="3.2"/>
    ${EYES(53, 67, 42, 3)}
    <circle cx="60" cy="54" r="5" fill="#D95D39" stroke="${I}" stroke-width="2.2"/>`,

  katt: SKY("#FFF4E6", "#F0DFC8") + SH + `
    <path d="M84 74q16-6 14-22" fill="none" stroke="#E59247" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="60" cy="68" rx="22" ry="18" fill="#E59247" stroke="${I}" stroke-width="3.2"/>
    <path d="M40 38L36 16l18 14zM80 38l4-22-18 14z" fill="#E59247" stroke="${I}" stroke-width="3"/>
    <circle cx="60" cy="46" r="21" fill="#E59247" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="53" rx="11" ry="8" fill="#FFF7EB"/>
    ${EYES(51, 69, 43, 3.2)}
    <path d="M56 50h8l-4 4z" fill="#E07A84"/>
    <path d="M32 49h14M32 55h14M74 49h14M74 55h14" stroke="${I}" stroke-width="2" stroke-linecap="round"/>`,

  hund: GRD("#EAF4FC", "#CBE3BE") + SH + `
    <ellipse cx="34" cy="48" rx="9" ry="16" transform="rotate(14 34 48)" fill="#7A4F2B" stroke="${I}" stroke-width="3"/>
    <ellipse cx="86" cy="48" rx="9" ry="16" transform="rotate(-14 86 48)" fill="#7A4F2B" stroke="${I}" stroke-width="3"/>
    <ellipse cx="60" cy="68" rx="22" ry="18" fill="#C98F52" stroke="${I}" stroke-width="3.2"/>
    <circle cx="60" cy="46" r="21" fill="#C98F52" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="54" rx="13" ry="9" fill="#FFF5E4"/>
    ${EYES(51, 69, 42, 3.2)}
    <ellipse cx="60" cy="50" rx="5" ry="3.5" fill="${I}"/>
    <path d="M55 57q5 5 10 0" fill="none" stroke="${I}" stroke-width="2.4" stroke-linecap="round"/>`,

  hast: GRD("#E4F3FC", "#C2E0B2") + SH + `
    <path d="M48 16q8 10 4 24" stroke="#5A3A1E" stroke-width="9" stroke-linecap="round"/>
    <ellipse cx="62" cy="66" rx="24" ry="18" fill="#9E6236" stroke="${I}" stroke-width="3.2"/>
    <path d="M44 36L40 20l12 10zM74 36l4-16-12 10z" fill="#9E6236" stroke="${I}" stroke-width="2.8"/>
    <rect x="42" y="28" width="34" height="36" rx="14" fill="#9E6236" stroke="${I}" stroke-width="3.2"/>
    <rect x="55" y="30" width="8" height="20" rx="4" fill="#FFFDF7"/>
    <ellipse cx="59" cy="58" rx="14" ry="9" fill="#D9B08C" stroke="${I}" stroke-width="2.4"/>
    ${EYES(50, 68, 42, 2.8)}`,

  gris: GRD("#FCEEF2", "#C9E0BA") + SH + `
    <ellipse cx="60" cy="66" rx="26" ry="20" fill="#F5A8B8" stroke="${I}" stroke-width="3.2"/>
    <path d="M40 34L34 20l16 8zM80 34l6-14-16 8z" fill="#F5A8B8" stroke="${I}" stroke-width="3"/>
    <circle cx="60" cy="46" r="21" fill="#F5A8B8" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="53" rx="11" ry="8" fill="#F08A9E" stroke="${I}" stroke-width="2.6"/>
    <circle cx="56" cy="53" r="2.2" fill="${I}"/><circle cx="64" cy="53" r="2.2" fill="${I}"/>
    ${EYES(50, 70, 41, 3)}`,

  anka: SEA("#E2F3FC") + `
    <ellipse cx="60" cy="64" rx="28" ry="16" fill="#F2B705" stroke="${I}" stroke-width="3.2"/>
    <circle cx="44" cy="40" r="15" fill="#F2B705" stroke="${I}" stroke-width="3.2"/>
    <path d="M22 42h14q0 7-8 7q-6 0-6-7z" fill="#D95D39" stroke="${I}" stroke-width="2.6"/>
    <circle cx="40" cy="36" r="3" fill="${I}"/><circle cx="41" cy="35" r="1" fill="#FFF"/>
    <path d="M52 60q16-6 22 4q-10 8-22-4z" fill="#E2A400" stroke="${I}" stroke-width="2.2"/>`,

  fisk: SEA("#D4EEFA") + `
    <path d="M84 52l20-16v32z" fill="#D95D39" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="56" cy="52" rx="32" ry="20" fill="#F28F3B" stroke="${I}" stroke-width="3.2"/>
    <path d="M50 33q8 19 0 38M64 34q8 18 0 36" fill="none" stroke="#FFFDF7" stroke-width="5"/>
    <circle cx="38" cy="48" r="3.5" fill="${I}"/><circle cx="39" cy="47" r="1.2" fill="#FFF"/>
    <circle cx="18" cy="34" r="3.5" fill="#FFF" opacity=".8"/><circle cx="24" cy="24" r="2.5" fill="#FFF" opacity=".8"/>`,

  groda: GRD("#E4F5EC", "#98D1A8") + SH + `
    <circle cx="44" cy="36" r="11" fill="#4BA862" stroke="${I}" stroke-width="3"/>
    <circle cx="76" cy="36" r="11" fill="#4BA862" stroke="${I}" stroke-width="3"/>
    <circle cx="44" cy="35" r="6" fill="#FFF"/><circle cx="76" cy="35" r="6" fill="#FFF"/>
    <circle cx="44" cy="35" r="3" fill="${I}"/><circle cx="76" cy="35" r="3" fill="${I}"/>
    <ellipse cx="60" cy="60" rx="28" ry="20" fill="#4BA862" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="68" rx="18" ry="10" fill="#D5F2C9"/>
    <path d="M44 58q16 10 32 0" fill="none" stroke="${I}" stroke-width="3" stroke-linecap="round"/>`,

  lejon: GRD("#FFF5DD", "#E2D5A5") + SH + `
    <circle cx="60" cy="48" r="30" fill="#C96528" stroke="${I}" stroke-width="3.2"/>
    <circle cx="42" cy="28" r="8" fill="#F2B705" stroke="${I}" stroke-width="2.8"/>
    <circle cx="78" cy="28" r="8" fill="#F2B705" stroke="${I}" stroke-width="2.8"/>
    <circle cx="60" cy="48" r="20" fill="#F2B705" stroke="${I}" stroke-width="3"/>
    ${EYES(52, 68, 44, 3)}
    <path d="M56 51h8l-4 5z" fill="#7A3E1D"/>
    <path d="M52 59q8 5 16 0" fill="none" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>`,

  bjorn: GRD("#E9F2E4", "#C2D8B4") + SH + `
    <circle cx="38" cy="28" r="10" fill="#7D5233" stroke="${I}" stroke-width="3"/>
    <circle cx="82" cy="28" r="10" fill="#7D5233" stroke="${I}" stroke-width="3"/>
    <ellipse cx="60" cy="70" rx="24" ry="18" fill="#7D5233" stroke="${I}" stroke-width="3.2"/>
    <circle cx="60" cy="46" r="22" fill="#7D5233" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="54" rx="12" ry="9" fill="#D9B38C"/>
    ${EYES(51, 69, 42, 3)}
    <ellipse cx="60" cy="50" rx="5" ry="3.5" fill="${I}"/>`,

  uggla: `<rect width="120" height="100" fill="#1E3557"/>
    <circle cx="96" cy="22" r="11" fill="#F2B705"/>
    <path d="M12 84h96" stroke="#7A5230" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="60" cy="56" rx="24" ry="26" fill="#9E7144" stroke="${I}" stroke-width="3"/>
    <ellipse cx="60" cy="64" rx="14" ry="14" fill="#F5E6CC"/>
    <circle cx="50" cy="44" r="10" fill="#FFFDF7" stroke="${I}" stroke-width="2.6"/>
    <circle cx="70" cy="44" r="10" fill="#FFFDF7" stroke="${I}" stroke-width="2.6"/>
    <circle cx="50" cy="44" r="4" fill="${I}"/><circle cx="70" cy="44" r="4" fill="${I}"/>
    <path d="M56 52h8l-4 7z" fill="#F2B705" stroke="${I}" stroke-width="2"/>`,

  kanin: GRD("#EAF5FC", "#C9E4C0") + SH + `
    <ellipse cx="48" cy="24" rx="7" ry="18" fill="#FFFDF7" stroke="${I}" stroke-width="3"/><ellipse cx="48" cy="24" rx="3" ry="11" fill="#F4B6C2"/>
    <ellipse cx="72" cy="24" rx="7" ry="18" fill="#FFFDF7" stroke="${I}" stroke-width="3"/><ellipse cx="72" cy="24" rx="3" ry="11" fill="#F4B6C2"/>
    <ellipse cx="60" cy="70" rx="22" ry="16" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <circle cx="60" cy="48" r="19" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    ${EYES(52, 68, 45, 3)}
    <circle cx="60" cy="52" r="3" fill="#E07A84"/>`,

  pingvin: `<rect width="120" height="100" fill="#DDF0FA"/><rect y="74" width="120" height="26" fill="#F5FAFF"/>` + SH + `
    <ellipse cx="60" cy="56" rx="24" ry="30" fill="#233142" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="62" rx="15" ry="20" fill="#FFFDF7"/>
    ${EYES(52, 68, 42, 3)}
    <path d="M54 48h12l-6 9z" fill="#F29E2E" stroke="${I}" stroke-width="2.2"/>
    <ellipse cx="48" cy="85" rx="8" ry="4" fill="#F29E2E" stroke="${I}" stroke-width="2"/>
    <ellipse cx="72" cy="85" rx="8" ry="4" fill="#F29E2E" stroke="${I}" stroke-width="2"/>`,

  elefant: GRD("#EBF2FA", "#C8DFB9") + SH + `
    <ellipse cx="34" cy="48" rx="16" ry="22" fill="#8C9EAE" stroke="${I}" stroke-width="3"/>
    <ellipse cx="86" cy="48" rx="16" ry="22" fill="#8C9EAE" stroke="${I}" stroke-width="3"/>
    <circle cx="60" cy="50" r="24" fill="#9FB0BF" stroke="${I}" stroke-width="3.2"/>
    <path d="M60 56q0 24 16 20" fill="none" stroke="#9FB0BF" stroke-width="11" stroke-linecap="round"/>
    <path d="M60 56q0 24 16 20" fill="none" stroke="${I}" stroke-width="3" stroke-linecap="round"/>
    ${EYES(50, 70, 44, 3)}`,

  giraff: GRD("#FFF4D9", "#D7DFAA") + SH + `
    <rect x="52" y="34" width="16" height="48" rx="6" fill="#F2B705" stroke="${I}" stroke-width="3"/>
    <circle cx="58" cy="52" r="4" fill="#A65E2E"/><circle cx="63" cy="68" r="4.5" fill="#A65E2E"/>
    <path d="M52 22v-9M68 22v-9" stroke="${I}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="52" cy="12" r="3.5" fill="#A65E2E"/><circle cx="68" cy="12" r="3.5" fill="#A65E2E"/>
    <ellipse cx="60" cy="30" rx="16" ry="13" fill="#F2B705" stroke="${I}" stroke-width="3.2"/>
    ${EYES(53, 67, 28, 2.8)}`,

  delfin: SEA("#D4EEFA") + `
    <path d="M24 64q10-34 44-32q20 2 28 24l12-4l-6 14l-14-4q-12-12-28-8q-14 4-24 16l-10-4z" fill="#5D9AC8" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="78" cy="46" r="2.8" fill="${I}"/>`,

  krabba: SEA("#FDEEE2") + `
    <path d="M36 58q-14-12-10-24M84 58q14-12 10-24" fill="none" stroke="#D94B38" stroke-width="7" stroke-linecap="round"/>
    <circle cx="24" cy="32" r="9" fill="#D94B38" stroke="${I}" stroke-width="2.6"/>
    <circle cx="96" cy="32" r="9" fill="#D94B38" stroke="${I}" stroke-width="2.6"/>
    <ellipse cx="60" cy="62" rx="28" ry="18" fill="#D94B38" stroke="${I}" stroke-width="3.2"/>
    <circle cx="50" cy="42" r="6" fill="#FFF" stroke="${I}" stroke-width="2.4"/><circle cx="50" cy="42" r="2.5" fill="${I}"/>
    <circle cx="70" cy="42" r="6" fill="#FFF" stroke="${I}" stroke-width="2.4"/><circle cx="70" cy="42" r="2.5" fill="${I}"/>`,

  fjaril: `<rect width="120" height="100" fill="#F6EEFA"/>
    <ellipse cx="38" cy="42" rx="22" ry="18" fill="#D95D39" stroke="${I}" stroke-width="3"/>
    <ellipse cx="82" cy="42" rx="22" ry="18" fill="#D95D39" stroke="${I}" stroke-width="3"/>
    <ellipse cx="42" cy="64" rx="16" ry="14" fill="#F2B705" stroke="${I}" stroke-width="3"/>
    <ellipse cx="78" cy="64" rx="16" ry="14" fill="#F2B705" stroke="${I}" stroke-width="3"/>
    <circle cx="38" cy="42" r="6" fill="#F2B705"/><circle cx="82" cy="42" r="6" fill="#F2B705"/>
    <rect x="55" y="28" width="10" height="48" rx="5" fill="${I}"/>
    <path d="M57 28q-6-10-12-10M63 28q6-10 12-10" fill="none" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>`,

  myra: GRD("#FBF4E4", "#D9E5C5") + SH + `
    <circle cx="36" cy="56" r="11" fill="#7A3628" stroke="${I}" stroke-width="3"/>
    <circle cx="58" cy="58" r="9" fill="#7A3628" stroke="${I}" stroke-width="3"/>
    <ellipse cx="80" cy="56" rx="14" ry="11" fill="#7A3628" stroke="${I}" stroke-width="3"/>
    <path d="M48 64l-6 14M58 66v14M68 64l6 14M32 46l-8-10M38 45l-2-11" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="32" cy="54" r="2.2" fill="#FFF"/>`,

  svan: SEA("#DCEFFA") + `
    <path d="M44 62q-6-26 6-36q10-6 14 4" fill="none" stroke="#FFFDF7" stroke-width="11" stroke-linecap="round"/>
    <path d="M44 62q-6-26 6-36q10-6 14 4" fill="none" stroke="${I}" stroke-width="2.8" stroke-linecap="round"/>
    <ellipse cx="64" cy="64" rx="28" ry="15" fill="#FFFDF7" stroke="${I}" stroke-width="3"/>
    <path d="M62 28l10 3l-8 4z" fill="#E57A2E" stroke="${I}" stroke-width="2"/>`,

  panda: GRD("#EAF5EA", "#C2DFB7") + SH + `
    <circle cx="38" cy="28" r="10" fill="#233142"/><circle cx="82" cy="28" r="10" fill="#233142"/>
    <ellipse cx="60" cy="70" rx="24" ry="18" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <circle cx="60" cy="46" r="22" fill="#FFFDF7" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="50" cy="44" rx="7" ry="9" transform="rotate(-15 50 44)" fill="#233142"/>
    <ellipse cx="70" cy="44" rx="7" ry="9" transform="rotate(15 70 44)" fill="#233142"/>
    <circle cx="50" cy="43" r="2.2" fill="#FFF"/><circle cx="70" cy="43" r="2.2" fill="#FFF"/>
    <ellipse cx="60" cy="53" rx="4.5" ry="3" fill="#233142"/>`,

  tiger: GRD("#FFF2DD", "#D2E0B0") + SH + `
    <circle cx="38" cy="28" r="9" fill="#E57A25" stroke="${I}" stroke-width="3"/>
    <circle cx="82" cy="28" r="9" fill="#E57A25" stroke="${I}" stroke-width="3"/>
    <circle cx="60" cy="50" r="26" fill="#E57A25" stroke="${I}" stroke-width="3.2"/>
    <ellipse cx="60" cy="58" rx="14" ry="10" fill="#FFF7EB"/>
    <path d="M52 26l4 10M60 24v11M68 26l-4 10M35 48h10M75 48h10" stroke="${I}" stroke-width="3.2" stroke-linecap="round"/>
    ${EYES(50, 70, 46, 3)}
    <path d="M56 54h8l-4 5z" fill="#D95D39"/>`,

  igelkott: GRD("#F4EFE6", "#C8DDB8") + SH + `
    <path d="M22 66l6-16l10 6l8-18l10 8l10-16l10 10l12-10l6 18l8 18z" fill="#6E4C32" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M26 70q16-24 44-16q14 4 22 16z" fill="#E3C4A0" stroke="${I}" stroke-width="3"/>
    <circle cx="74" cy="60" r="3" fill="${I}"/><circle cx="91" cy="68" r="4" fill="${I}"/>`,

  snigel: GRD("#EBF5E6", "#C4DFB6") + SH + `
    <path d="M24 74h62q10 0 12-12q0-8-8-8q-6 0-8 8H24z" fill="#D9B382" stroke="${I}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="52" cy="54" r="20" fill="#C97040" stroke="${I}" stroke-width="3.2"/>
    <path d="M52 54m-10 0a10 10 0 1 1 18 4a6 6 0 1 1-10-4" fill="none" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M88 54l4-14M95 56l6-12" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="92" cy="39" r="3" fill="${I}"/><circle cx="101" cy="43" r="3" fill="${I}"/>`,

  nyckelpiga: GRD("#EAF6E6", "#BEE0B2") + SH + `
    <circle cx="60" cy="34" r="14" fill="#233142" stroke="${I}" stroke-width="3"/>
    <ellipse cx="60" cy="58" rx="26" ry="22" fill="#D93B3B" stroke="${I}" stroke-width="3.2"/>
    <path d="M60 36v44" stroke="${I}" stroke-width="3"/>
    <circle cx="46" cy="52" r="4" fill="#233142"/><circle cx="74" cy="52" r="4" fill="#233142"/>
    <circle cx="48" cy="68" r="3.5" fill="#233142"/><circle cx="72" cy="68" r="3.5" fill="#233142"/>`,

  /* ── NATUR ─────────────────────────────────────────────────────────── */
  sol: `<rect width="120" height="100" fill="#D9EFFC"/>
    <g stroke="#F29E05" stroke-width="5" stroke-linecap="round">
      <path d="M60 10v10M60 80v10M18 50h10M92 50h10M30 20l7 7M83 73l7 7M90 20l-7 7M37 73l-7 7"/>
    </g>
    <circle cx="60" cy="50" r="24" fill="#F2B705" stroke="${I}" stroke-width="3.2"/>
    <circle cx="52" cy="47" r="2.8" fill="${I}"/><circle cx="68" cy="47" r="2.8" fill="${I}"/>
    <path d="M52 56q8 6 16 0" fill="none" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>`,

  is: `<rect width="120" height="100" fill="#D8EEFA"/>
    <path d="M24 38l36-16l36 16v32L60 86L24 70z" fill="#BCE3F7" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M24 38l36 16l36-16M60 54v32" fill="none" stroke="${I}" stroke-width="2.6"/>
    <path d="M36 46l12 6M74 44l10-4" stroke="#FFF" stroke-width="3.5" stroke-linecap="round"/>`,

  o: SEA("#D8EFFA") + `
    <path d="M24 70q36-26 72 0z" fill="#E8C67D" stroke="${I}" stroke-width="3"/>
    <path d="M62 60q-6-22 4-36" fill="none" stroke="#8C5A35" stroke-width="6" stroke-linecap="round"/>
    <path d="M66 24q-18-6-26 8M66 24q18-6 26 8M66 24q-6-14 10-16" fill="none" stroke="#2D8A56" stroke-width="6" stroke-linecap="round"/>`,

  ros: `<rect width="120" height="100" fill="#FCEEF2"/>
    <path d="M60 48v40" stroke="#2D8A56" stroke-width="4.5" stroke-linecap="round"/>
    <ellipse cx="47" cy="70" rx="11" ry="6" transform="rotate(-24 47 70)" fill="#2D8A56" stroke="${I}" stroke-width="2.4"/>
    <ellipse cx="73" cy="66" rx="11" ry="6" transform="rotate(24 73 66)" fill="#2D8A56" stroke="${I}" stroke-width="2.4"/>
    <circle cx="60" cy="36" r="20" fill="#D93B54" stroke="${I}" stroke-width="3.2"/>
    <path d="M52 36q8-12 16 0q-6 10-14 4q4-6 10-2" fill="none" stroke="#FFFDF7" stroke-width="2.6" stroke-linecap="round"/>`,

  lov: `<rect width="120" height="100" fill="#FFF4E2"/>
    <path d="M60 16q28 22 24 48q-14 10-24 10q-10 0-24-10q-4-26 24-48z" fill="#D96B27" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M60 24v64M60 44l-14-8M60 56l14-8M60 62l-12-6" stroke="${I}" stroke-width="2.6" stroke-linecap="round"/>`,

  moln: `<rect width="120" height="100" fill="#CFE9FA"/>
    <path d="M26 70a16 16 0 0 1 4-31a22 22 0 0 1 42-4a16 16 0 0 1 6 35z" fill="#FFFDF7" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>`,

  regn: `<rect width="120" height="100" fill="#C7DFF0"/>
    <path d="M28 50a14 14 0 0 1 4-27a20 20 0 0 1 38-3a14 14 0 0 1 5 30z" fill="#8EA6BD" stroke="${I}" stroke-width="3"/>
    <path d="M40 60l-4 14M56 62l-4 16M72 60l-4 14M86 62l-4 14" stroke="#1B68B3" stroke-width="4" stroke-linecap="round"/>`,

  mane: `<rect width="120" height="100" fill="#182C4C"/>
    <circle cx="24" cy="24" r="2.2" fill="#FFF"/><circle cx="96" cy="26" r="2.5" fill="#FFF"/><circle cx="88" cy="76" r="2" fill="#FFF"/>
    <path d="M72 22a28 28 0 1 0 0 56a21 21 0 1 1 0-56z" fill="#F2C94C" stroke="#FFFDF7" stroke-width="2.2"/>`,

  skog: GRD("#DCEFFA", "#A8D19E") + `
    <g stroke="${I}" stroke-width="2.8" stroke-linejoin="round">
      <rect x="28" y="68" width="8" height="14" fill="#7A4F2B"/><path d="M32 22l18 26H14zM32 38l20 30H12z" fill="#2D8A56"/>
      <rect x="82" y="68" width="8" height="14" fill="#7A4F2B"/><path d="M86 24l18 26H68zM86 40l20 28H66z" fill="#2D8A56"/>
      <rect x="56" y="70" width="8" height="16" fill="#7A4F2B"/><path d="M60 16l20 28H40zM60 36l22 34H38z" fill="#3DA368"/>
    </g>`,

  park: GRD("#E2F2FC", "#B8DFAF") + `
    <rect x="30" y="54" width="10" height="24" fill="#7A4F2B" stroke="${I}" stroke-width="2.6"/>
    <circle cx="35" cy="40" r="20" fill="#3DA368" stroke="${I}" stroke-width="3"/>
    <rect x="58" y="62" width="44" height="8" rx="3" fill="#C97E42" stroke="${I}" stroke-width="2.6"/>
    <path d="M64 70v14M96 70v14" stroke="${I}" stroke-width="3.6" stroke-linecap="round"/>`,

  blomma: GRD("#FFF4EC", "#C8E2BA") + `
    <path d="M60 46v42" stroke="#2D8A56" stroke-width="4.5" stroke-linecap="round"/>
    <g stroke="${I}" stroke-width="2.8">
      <circle cx="60" cy="24" r="11" fill="#E87AA4"/><circle cx="76" cy="38" r="11" fill="#E87AA4"/>
      <circle cx="60" cy="52" r="11" fill="#E87AA4"/><circle cx="44" cy="38" r="11" fill="#E87AA4"/>
      <circle cx="60" cy="38" r="10" fill="#F2B705"/>
    </g>`,

  stjarna: `<rect width="120" height="100" fill="#182C4C"/>
    <path d="M60 12l11 24l26 3l-19 18l5 26l-23-13l-23 13l5-26l-19-18l26-3z" fill="#F2B705" stroke="#FFFDF7" stroke-width="3" stroke-linejoin="round"/>`,

  eld: `<rect width="120" height="100" fill="#232B3A"/>
    <path d="M28 84l64-10M28 74l64 10" stroke="#8C5A35" stroke-width="7" stroke-linecap="round"/>
    <path d="M60 14q24 22 20 46q-2 16-20 16q-18 0-20-16q-4-24 20-46z" fill="#E55B2B" stroke="#FFFDF7" stroke-width="2.4"/>
    <path d="M60 36q12 14 10 28q-2 10-10 10q-8 0-10-10q-2-14 10-28z" fill="#F2B705"/>`,

  sno: `<rect width="120" height="100" fill="#CFE7F7"/>
    <g stroke="#FFFDF7" stroke-width="5" stroke-linecap="round">
      <path d="M60 16v68M26 50h68M36 26l48 48M84 26L36 74"/>
    </g>
    <circle cx="60" cy="50" r="8" fill="#BCE3F7" stroke="${I}" stroke-width="2.6"/>`,

  sten: GRD("#EAF3F9", "#C9DFB8") + SH + `
    <path d="M22 76q2-28 24-38l28-6q22 8 24 44z" fill="#95A0AC" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M36 52l14-6M68 58l14 4" stroke="#C5CDD6" stroke-width="3.5" stroke-linecap="round"/>`,

  svamp: GRD("#EAF4E6", "#BDDCAD") + SH + `
    <rect x="49" y="52" width="22" height="30" rx="8" fill="#FBF2E1" stroke="${I}" stroke-width="3.2"/>
    <path d="M22 56q4-34 38-34q34 0 38 34z" fill="#D93B3B" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <circle cx="44" cy="40" r="5" fill="#FFFDF7"/><circle cx="66" cy="34" r="6" fill="#FFFDF7"/><circle cx="78" cy="46" r="4.5" fill="#FFFDF7"/>`,

  berg: `<rect width="120" height="100" fill="#D9EEFA"/>
    <path d="M8 86L46 24l36 62z" fill="#7D91A6" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M46 86L76 34l36 52z" fill="#64798F" stroke="${I}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M46 24l10 18l-10-4l-10 4zM76 34l9 15l-9-3l-9 3z" fill="#FFFDF7"/>`,

  regnbage: `<rect width="120" height="100" fill="#DDF0FA"/>
    <path d="M16 78a44 44 0 0 1 88 0" fill="none" stroke="#D93B3B" stroke-width="7"/>
    <path d="M23 78a37 37 0 0 1 74 0" fill="none" stroke="#F2B705" stroke-width="7"/>
    <path d="M30 78a30 30 0 0 1 60 0" fill="none" stroke="#2D8A56" stroke-width="7"/>
    <path d="M37 78a23 23 0 0 1 46 0" fill="none" stroke="#1B68B3" stroke-width="7"/>
    <circle cx="24" cy="78" r="12" fill="#FFFDF7" stroke="${I}" stroke-width="2.4"/>
    <circle cx="96" cy="78" r="12" fill="#FFFDF7" stroke="${I}" stroke-width="2.4"/>`,

  snogubbe: `<rect width="120" height="100" fill="#D5EAFA"/><rect y="78" width="120" height="22" fill="#FFFDF7"/>
    <circle cx="60" cy="68" r="18" fill="#FFFDF7" stroke="${I}" stroke-width="3"/>
    <circle cx="60" cy="40" r="13" fill="#FFFDF7" stroke="${I}" stroke-width="3"/>
    <rect x="46" y="24" width="28" height="5" rx="2" fill="#233142"/><rect x="50" y="12" width="20" height="13" rx="2" fill="#233142"/>
    <path d="M60 40l12 3l-12 3z" fill="#E57A25"/>
    <circle cx="55" cy="37" r="2" fill="${I}"/><circle cx="65" cy="37" r="2" fill="${I}"/>
    <rect x="46" y="50" width="28" height="6" rx="3" fill="#D95D39"/>`
};
