/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Svensk ordbank, bokstavsljud & läsnivåer
   Anpassad för femåringar som kan de flesta bokstäverna och övar
   på att ljuda ihop korta ord upp till längre ord och hållplatser.
   ═══════════════════════════════════════════════════════════════ */

export const ALFABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");

export const VOKALER = new Set(["A", "E", "I", "O", "U", "Y", "Å", "Ä", "Ö"]);

/* Bokstavsljud anpassade för mjuk uppläsning i svensk talsyntes utan klickljud */
export const BOKSTAVSLJUD = {
  A: "a", B: "b", C: "s", D: "d", E: "e", F: "ff", G: "g", H: "h",
  I: "i", J: "j", K: "k", L: "ll", M: "mm", N: "nn", O: "o", P: "p",
  Q: "k", R: "rr", S: "ss", T: "t", U: "u", V: "vv", W: "vv", X: "ks",
  Y: "y", Z: "ss", Å: "å", Ä: "ä", Ö: "ö"
};

/* Förväxlingsbara bokstäver — används som smarta felsvar i lucka och bygga ord */
export const BOKSTAVSGRANNAR = {
  A: ["Å", "Ä", "O", "E"],
  B: ["P", "D", "V", "R"],
  C: ["S", "K", "G", "O"],
  D: ["T", "B", "P", "G"],
  E: ["Ä", "I", "A", "Ö"],
  F: ["V", "P", "T", "S"],
  G: ["K", "J", "D", "B"],
  H: ["N", "K", "M", "R"],
  I: ["E", "Y", "J", "L"],
  J: ["G", "I", "L", "Y"],
  K: ["G", "T", "C", "P"],
  L: ["R", "N", "I", "T"],
  M: ["N", "H", "W", "V"],
  N: ["M", "L", "R", "H"],
  O: ["Å", "Ö", "U", "A"],
  P: ["B", "T", "D", "F"],
  Q: ["K", "G", "O", "C"],
  R: ["L", "N", "B", "P"],
  S: ["Z", "C", "F", "T"],
  T: ["D", "P", "K", "L"],
  U: ["Y", "O", "Å", "Ö"],
  V: ["F", "W", "B", "M"],
  W: ["V", "M", "N", "F"],
  X: ["S", "K", "Z", "C"],
  Y: ["I", "U", "J", "Ö"],
  Z: ["S", "X", "C", "T"],
  Å: ["A", "Ä", "O", "Ö"],
  Ä: ["A", "Å", "E", "Ö"],
  Ö: ["O", "Å", "Ä", "Y"]
};

export function formatOrd(text, stil = "versaler"){
  const s = String(text == null ? "" : text);
  if(stil === "gemener") return s.toLocaleLowerCase("sv");
  if(stil === "blandat") return s;
  return s.toLocaleUpperCase("sv");
}

export function renBokstav(ch){
  return String(ch || "").toLocaleUpperCase("sv").normalize("NFC");
}

export function bokstaverI(ord){
  return [...String(ord || "").toLocaleUpperCase("sv")].filter(c => ALFABET.includes(c));
}

export const NIVAAER = [
  { id: 1, namn: "Bokstavsljud",   farg: "#57C96B", kort: "Första ljudet & korta ord" },
  { id: 2, namn: "Korta ord",      farg: "#FFC42E", kort: "Ljuda 3 bokstäver: SOL, BIL, TÅG" },
  { id: 3, namn: "Lätta ord",      farg: "#62CDF2", kort: "4–5 bokstäver: KATT, BUSS, VAGN" },
  { id: 4, namn: "Spårvagnsord",   farg: "#FF8AD0", kort: "Längre ord & spårvagnstema" },
  { id: 5, namn: "Hållplatsjakt",  farg: "#F89728", kort: "Skyltar, linjer & vagnmodeller" },
  { id: 6, namn: "Mästarläsaren",  farg: "#9061F9", kort: "Hela Göteborgs nät & stavning" }
];

/* ── Kurerad svensk ordbank ───────────────────────────────────────────────
   Varje ord är konkret, välkänt för en 5-åring, tydligt illustrerat och
   har genomtänkta förvillare (samma begynnelsebokstav eller liknande ljud). */
export const ORDBANK = [
  // ── Nivå 1: Miniord (2 bokstäver) & väldigt enkla ljudenliga ord ──
  { ord: "Is",    niva: 1, kat: "natur",  bild: "🧊", bg: "#DDF4FF", forvillare: ["In", "Bi", "Ko", "Ö"] },
  { ord: "Ko",    niva: 1, kat: "djur",   bild: "🐄", bg: "#E9F8E5", forvillare: ["Bo", "Ro", "Bi", "Sko"] },
  { ord: "Bi",    niva: 1, kat: "djur",   bild: "🐝", bg: "#FFF6CC", forvillare: ["Bil", "Is", "Ko", "Pi"] },
  { ord: "Ö",     niva: 1, kat: "natur",  bild: "🏝️", bg: "#DDF4FF", forvillare: ["Å", "Is", "Ko", "Sjö"] },
  { ord: "Tå",    niva: 1, kat: "kropp",  bild: "🦶", bg: "#FFEAD8", forvillare: ["Tåg", "Ko", "Så", "Få"] },
  { ord: "Ål",    niva: 1, kat: "djur",   bild: "🐍", bg: "#E2F7EE", forvillare: ["Is", "Öl", "Älg", "Orm"] },

  // ── Nivå 2: Korta ljudenliga ord (3 bokstäver) — Adams startnivå! ──
  { ord: "Sol",   niva: 2, kat: "natur",  bild: "☀️", bg: "#FFF3BF", forvillare: ["Sil", "Sal", "Bil", "Sko"] },
  { ord: "Bil",   niva: 2, kat: "fordon", bild: "🚗", bg: "#FFE1E1", forvillare: ["Pil", "Båt", "Boll", "Sil"] },
  { ord: "Tåg",   niva: 2, kat: "fordon", bild: "🚂", bg: "#E1EEFF", forvillare: ["Såg", "Tak", "Tå", "Båt"] },
  { ord: "Båt",   niva: 2, kat: "fordon", bild: "⛵", bg: "#DDF4FF", forvillare: ["Bil", "Bär", "Nöt", "Fåt"] },
  { ord: "Hus",   niva: 2, kat: "stad",   bild: "🏠", bg: "#FFE9D6", forvillare: ["Mus", "Buss", "Hund", "Ljus"] },
  { ord: "Bok",   niva: 2, kat: "hem",    bild: "📖", bg: "#EDE4FF", forvillare: ["Bil", "Båt", "Kopp", "Bak"] },
  { ord: "Apa",   niva: 2, kat: "djur",   bild: "🐒", bg: "#FFF0D6", forvillare: ["Anka", "Orm", "Arm", "Älg"] },
  { ord: "Orm",   niva: 2, kat: "djur",   bild: "🐍", bg: "#E2F8E4", forvillare: ["Arm", "Ost", "Öra", "Apa"] },
  { ord: "Mus",   niva: 2, kat: "djur",   bild: "🐭", bg: "#F1ECFA", forvillare: ["Hus", "Mun", "Mat", "Buss"] },
  { ord: "Säl",   niva: 2, kat: "djur",   bild: "🦭", bg: "#DDF4FF", forvillare: ["Sol", "Sko", "Såg", "Räv"] },
  { ord: "Räv",   niva: 2, kat: "djur",   bild: "🦊", bg: "#FFE4D1", forvillare: ["Ros", "Räls", "Säl", "Bär"] },
  { ord: "Älg",   niva: 2, kat: "djur",   bild: "🫎", bg: "#E9F5DF", forvillare: ["Ägg", "Öga", "Apa", "Orm"] },
  { ord: "Val",   niva: 2, kat: "djur",   bild: "🐳", bg: "#D8F0FF", forvillare: ["Väg", "Vagn", "Sol", "Räv"] },
  { ord: "Ros",   niva: 2, kat: "natur",  bild: "🌹", bg: "#FFE0EC", forvillare: ["Räv", "Nos", "Ost", "Löv"] },
  { ord: "Bär",   niva: 2, kat: "mat",    bild: "🍓", bg: "#FFE0E8", forvillare: ["Båt", "Bil", "Nöt", "Löv"] },
  { ord: "Nöt",   niva: 2, kat: "mat",    bild: "🥜", bg: "#F7E9D7", forvillare: ["Nål", "Nos", "Båt", "Löv"] },
  { ord: "Löv",   niva: 2, kat: "natur",  bild: "🍁", bg: "#FFEBD1", forvillare: ["Räv", "Nöt", "Sol", "Bär"] },
  { ord: "Bro",   niva: 2, kat: "stad",   bild: "svg:bro", bg: "#DDF4FF", forvillare: ["Bil", "Båt", "Bär", "Sko"] },
  { ord: "Såg",   niva: 2, kat: "hem",    bild: "🪚", bg: "#FFF1D6", forvillare: ["Tåg", "Sol", "Sko", "Säl"] },
  { ord: "Sko",   niva: 2, kat: "hem",    bild: "👟", bg: "#E2EEFF", forvillare: ["Sol", "Ko", "Skog", "Såg"] },
  { ord: "Öga",   niva: 2, kat: "kropp",  bild: "👁️", bg: "#EDE4FF", forvillare: ["Öra", "Ägg", "Älg", "Ål"] },
  { ord: "Öra",   niva: 2, kat: "kropp",  bild: "👂", bg: "#FFEAD8", forvillare: ["Öga", "Orm", "Älg", "Arm"] },
  { ord: "Fot",   niva: 2, kat: "kropp",  bild: "🦶", bg: "#FFEAD8", forvillare: ["Fisk", "Båt", "Mat", "Mun"] },
  { ord: "Mun",   niva: 2, kat: "kropp",  bild: "👄", bg: "#FFE0EC", forvillare: ["Mus", "Mat", "Nos", "Fot"] },
  { ord: "Ost",   niva: 2, kat: "mat",    bild: "🧀", bg: "#FFF4C2", forvillare: ["Orm", "Öra", "Ros", "Ägg"] },
  { ord: "Ägg",   niva: 2, kat: "mat",    bild: "🥚", bg: "#F7F3E3", forvillare: ["Älg", "Öga", "Ost", "Väg"] },
  { ord: "Kam",   niva: 2, kat: "hem",    bild: "🪮", bg: "#E6E4FF", forvillare: ["Katt", "Kopp", "Ko", "Mat"] },
  { ord: "Nål",   niva: 2, kat: "hem",    bild: "🪡", bg: "#EDE4FF", forvillare: ["Nöt", "Nos", "Båt", "Ål"] },
  { ord: "Pil",   niva: 2, kat: "hem",    bild: "🏹", bg: "#FFE9D6", forvillare: ["Bil", "Sil", "Sol", "Sko"] },
  { ord: "Väg",   niva: 2, kat: "stad",   bild: "🛣️", bg: "#E5ECFA", forvillare: ["Vagn", "Val", "Ägg", "Tåg"] },
  { ord: "Tak",   niva: 2, kat: "stad",   bild: "🏠", bg: "#FFE5D9", forvillare: ["Tåg", "Tå", "Torg", "Bak"] },

  // ── Nivå 3: Lätta ord (4–5 bokstäver, dubbelteckning, spårvagnstema) ──
  { ord: "Vagn",  niva: 3, kat: "fordon", bild: "svg:vagn", bg: "#DCEEFF", forvillare: ["Väg", "Val", "Buss", "Spår"] },
  { ord: "Spår",  niva: 3, kat: "fordon", bild: "svg:spar", bg: "#E8E4FF", forvillare: ["Stol", "Sko", "Räls", "Skog"] },
  { ord: "Räls",  niva: 3, kat: "fordon", bild: "svg:rals", bg: "#E3EEFF", forvillare: ["Räv", "Ring", "Spår", "Vagn"] },
  { ord: "Buss",  niva: 3, kat: "fordon", bild: "🚌", bg: "#FFF2C2", forvillare: ["Bil", "Boll", "Hus", "Båt"] },
  { ord: "Katt",  niva: 3, kat: "djur",   bild: "🐱", bg: "#FFE8D1", forvillare: ["Hatt", "Kam", "Kopp", "Hund"] },
  { ord: "Hund",  niva: 3, kat: "djur",   bild: "🐶", bg: "#F4E8DA", forvillare: ["Hus", "Häst", "Katt", "Hand"] },
  { ord: "Häst",  niva: 3, kat: "djur",   bild: "🐴", bg: "#F6E7D8", forvillare: ["Hund", "Hatt", "Hus", "Gris"] },
  { ord: "Gris",  niva: 3, kat: "djur",   bild: "🐷", bg: "#FFE2EE", forvillare: ["Groda", "Glass", "Gata", "Fisk"] },
  { ord: "Anka",  niva: 3, kat: "djur",   bild: "🦆", bg: "#E0F5EA", forvillare: ["Apa", "Äpple", "Fisk", "Groda"] },
  { ord: "Fisk",  niva: 3, kat: "djur",   bild: "🐟", bg: "#D8F1FF", forvillare: ["Fot", "Gris", "Fågel", "Båt"] },
  { ord: "Groda", niva: 3, kat: "djur",   bild: "🐸", bg: "#E0F8DF", forvillare: ["Gris", "Glass", "Gata", "Boll"] },
  { ord: "Lejon", niva: 3, kat: "djur",   bild: "🦁", bg: "#FFF0C7", forvillare: ["Löv", "Linje", "Björn", "Katt"] },
  { ord: "Björn", niva: 3, kat: "djur",   bild: "🐻", bg: "#EFE3D6", forvillare: ["Båt", "Boll", "Lejon", "Buss"] },
  { ord: "Uggla", niva: 3, kat: "djur",   bild: "🦉", bg: "#EDE4FF", forvillare: ["Anka", "Älg", "Orm", "Fågel"] },
  { ord: "Boll",  niva: 3, kat: "hem",    bild: "⚽", bg: "#E7F7E5", forvillare: ["Bil", "Bok", "Bord", "Buss"] },
  { ord: "Dörr",  niva: 3, kat: "hem",    bild: "🚪", bg: "#F5E4D0", forvillare: ["Bord", "Boll", "Stol", "Torg"] },
  { ord: "Bord",  niva: 3, kat: "hem",    bild: "🪑", bg: "#F4E5D2", forvillare: ["Boll", "Bok", "Dörr", "Båt"] },
  { ord: "Stol",  niva: 3, kat: "hem",    bild: "🪑", bg: "#EDE4FF", forvillare: ["Sol", "Spår", "Säng", "Sked"] },
  { ord: "Säng",  niva: 3, kat: "hem",    bild: "🛏️", bg: "#E3EEFF", forvillare: ["Såg", "Stol", "Sko", "Ring"] },
  { ord: "Kopp",  niva: 3, kat: "hem",    bild: "☕", bg: "#F7E8D8", forvillare: ["Katt", "Kaka", "Kam", "Stopp"] },
  { ord: "Sked",  niva: 3, kat: "hem",    bild: "🥄", bg: "#EBF0F8", forvillare: ["Sko", "Skog", "Stol", "Spår"] },
  { ord: "Hatt",  niva: 3, kat: "hem",    bild: "🎩", bg: "#EDE4FF", forvillare: ["Katt", "Hund", "Häst", "Hus"] },
  { ord: "Ring",  niva: 3, kat: "hem",    bild: "💍", bg: "#FFF4CC", forvillare: ["Regn", "Räls", "Ros", "Räv"] },
  { ord: "Kaka",  niva: 3, kat: "mat",    bild: "🍪", bg: "#F9E7D2", forvillare: ["Katt", "Kopp", "Banan", "Glass"] },
  { ord: "Glass", niva: 3, kat: "mat",    bild: "🍦", bg: "#FFE4F0", forvillare: ["Gris", "Groda", "Gata", "Kaka"] },
  { ord: "Äpple", niva: 3, kat: "mat",    bild: "🍎", bg: "#FFE0E0", forvillare: ["Ägg", "Älg", "Päron", "Banan"] },
  { ord: "Banan", niva: 3, kat: "mat",    bild: "🍌", bg: "#FFF5C0", forvillare: ["Båt", "Boll", "Kaka", "Päron"] },
  { ord: "Päron", niva: 3, kat: "mat",    bild: "🍐", bg: "#E5F8DC", forvillare: ["Park", "Äpple", "Banan", "Pil"] },
  { ord: "Bröd",  niva: 3, kat: "mat",    bild: "🍞", bg: "#F7E8D4", forvillare: ["Bro", "Bär", "Bord", "Ost"] },
  { ord: "Moln",  niva: 3, kat: "natur",  bild: "☁️", bg: "#E2F2FF", forvillare: ["Måne", "Mus", "Mun", "Sol"] },
  { ord: "Regn",  niva: 3, kat: "natur",  bild: "🌧️", bg: "#DCEEFF", forvillare: ["Ring", "Ros", "Räls", "Moln"] },
  { ord: "Måne",  niva: 3, kat: "natur",  bild: "🌙", bg: "#E5E2FF", forvillare: ["Moln", "Mus", "Sol", "Stjärna"] },
  { ord: "Gata",  niva: 3, kat: "stad",   bild: "svg:gata", bg: "#EAE4FF", forvillare: ["Glass", "Gris", "Torg", "Park"] },
  { ord: "Torg",  niva: 3, kat: "stad",   bild: "svg:torg", bg: "#FFF1D4", forvillare: ["Tåg", "Tak", "Gata", "Park"] },
  { ord: "Park",  niva: 3, kat: "stad",   bild: "🌳", bg: "#DEF6E0", forvillare: ["Pil", "Päron", "Skog", "Torg"] },
  { ord: "Skog",  niva: 3, kat: "natur",  bild: "🌲", bg: "#D9F2DD", forvillare: ["Sko", "Sked", "Spår", "Park"] },
  { ord: "Hamn",  niva: 3, kat: "stad",   bild: "⚓", bg: "#D8EEFF", forvillare: ["Hatt", "Hund", "Hus", "Hav"] },
  { ord: "Kung",  niva: 3, kat: "stad",   bild: "👑", bg: "#FFF2C2", forvillare: ["Katt", "Kopp", "Kaka", "Slott"] },
  { ord: "Cykel", niva: 3, kat: "fordon", bild: "🚲", bg: "#E2F4FF", forvillare: ["Buss", "Bil", "Vagn", "Tåg"] },
  { ord: "Kran",  niva: 3, kat: "fordon", bild: "🏗️", bg: "#FFF1CC", forvillare: ["Kung", "Katt", "Tåg", "Hamn"] },

  // ── Nivå 4: Spårvagnsord & längre vardagsord (5–9 bokstäver) ──
  { ord: "Spårvagn", niva: 4, kat: "fordon", bild: "svg:sparvagn", bg: "#D7ECFF", forvillare: ["Lastbil", "Flygplan", "Vagnhall", "Perrong"] },
  { ord: "Skylt",    niva: 4, kat: "stad",   bild: "svg:skylt",    bg: "#DCEEFF", forvillare: ["Skola", "Skog", "Stopp", "Spår"] },
  { ord: "Perrong",  niva: 4, kat: "stad",   bild: "svg:perrong",  bg: "#E6E4FF", forvillare: ["Park", "Polis", "Biljett", "Vagnhall"] },
  { ord: "Biljett",  niva: 4, kat: "stad",   bild: "svg:biljett",  bg: "#FFF3C6", forvillare: ["Bil", "Buss", "Perrong", "Klocka"] },
  { ord: "Vagnhall", niva: 4, kat: "stad",   bild: "svg:vagnhall", bg: "#EDE4FF", forvillare: ["Vagn", "Spårvagn", "Perrong", "Skola"] },
  { ord: "Förare",   niva: 4, kat: "stad",   bild: "svg:forare",   bg: "#DDEEFF", forvillare: ["Färja", "Fisk", "Polis", "Biljett"] },
  { ord: "Stopp",    niva: 4, kat: "stad",   bild: "🛑",           bg: "#FFE0E0", forvillare: ["Stol", "Spår", "Skylt", "Slott"] },
  { ord: "Klocka",   niva: 4, kat: "stad",   bild: "⏰",           bg: "#FFF0D0", forvillare: ["Kaka", "Kopp", "Kyrka", "Skylt"] },
  { ord: "Skola",    niva: 4, kat: "stad",   bild: "🏫",           bg: "#FFEED6", forvillare: ["Skylt", "Skog", "Slott", "Kyrka"] },
  { ord: "Kyrka",    niva: 4, kat: "stad",   bild: "⛪",           bg: "#EFE7FF", forvillare: ["Klocka", "Skola", "Slott", "Kran"] },
  { ord: "Slott",    niva: 4, kat: "stad",   bild: "🏰",           bg: "#EDE4FF", forvillare: ["Stopp", "Skola", "Kyrka", "Kung"] },
  { ord: "Blomma",   niva: 4, kat: "natur",  bild: "🌸",           bg: "#FFE3F2", forvillare: ["Boll", "Banan", "Ros", "Löv"] },
  { ord: "Stjärna",  niva: 4, kat: "natur",  bild: "⭐",           bg: "#FFF5C2", forvillare: ["Stol", "Stopp", "Måne", "Raket"] },
  { ord: "Raket",    niva: 4, kat: "fordon", bild: "🚀",           bg: "#E0E6FF", forvillare: ["Räls", "Regn", "Flygplan", "Spårvagn"] },
  { ord: "Flygplan", niva: 4, kat: "fordon", bild: "✈️",           bg: "#DDF2FF", forvillare: ["Lastbil", "Spårvagn", "Raket", "Färja"] },
  { ord: "Lastbil",  niva: 4, kat: "fordon", bild: "🚚",           bg: "#FFE8D4", forvillare: ["Flygplan", "Spårvagn", "Buss", "Polis"] },
  { ord: "Polis",    niva: 4, kat: "fordon", bild: "🚓",           bg: "#DCEBFF", forvillare: ["Park", "Perrong", "Brandbil", "Lastbil"] },
  { ord: "Brandbil", niva: 4, kat: "fordon", bild: "🚒",           bg: "#FFE0E0", forvillare: ["Lastbil", "Polis", "Buss", "Spårvagn"] },
  { ord: "Färja",    niva: 4, kat: "fordon", bild: "⛴️",           bg: "#D8F0FF", forvillare: ["Förare", "Båt", "Hamn", "Fisk"] },
  { ord: "Nyckel",   niva: 4, kat: "hem",    bild: "🔑",           bg: "#FFF3C6", forvillare: ["Nål", "Nöt", "Klocka", "Cykel"] },
  { ord: "Gitarr",   niva: 4, kat: "hem",    bild: "🎸",           bg: "#FFE7D4", forvillare: ["Gris", "Glass", "Trumma", "Gata"] },
  { ord: "Trumma",   niva: 4, kat: "hem",    bild: "🥁",           bg: "#FFE2E6", forvillare: ["Torg", "Tåg", "Gitarr", "Stjärna"] },
  { ord: "Pingvin",  niva: 4, kat: "djur",   bild: "🐧",           bg: "#E0F2FF", forvillare: ["Polis", "Päron", "Delfin", "Elefant"] },
  { ord: "Elefant",  niva: 4, kat: "djur",   bild: "🐘",           bg: "#EAE6FA", forvillare: ["Giraff", "Pingvin", "Lejon", "Björn"] },
  { ord: "Giraff",   niva: 4, kat: "djur",   bild: "🦒",           bg: "#FFF2C8", forvillare: ["Groda", "Gris", "Elefant", "Lejon"] },
  { ord: "Delfin",   niva: 4, kat: "djur",   bild: "🐬",           bg: "#D8F0FF", forvillare: ["Dörr", "Val", "Pingvin", "Fisk"] },
  { ord: "Krabba",   niva: 4, kat: "djur",   bild: "🦀",           bg: "#FFE2DD", forvillare: ["Kran", "Kaka", "Fisk", "Groda"] },
  { ord: "Fjäril",   niva: 4, kat: "djur",   bild: "🦋",           bg: "#EAE3FF", forvillare: ["Färja", "Fisk", "Blomma", "Bi"] },
  { ord: "Pizza",    niva: 4, kat: "mat",    bild: "🍕",           bg: "#FFE9D1", forvillare: ["Päron", "Park", "Kaka", "Ost"] },
  { ord: "Morot",    niva: 4, kat: "mat",    bild: "🥕",           bg: "#FFE7CE", forvillare: ["Moln", "Måne", "Päron", "Äpple"] }
];

/* Korta och kända göteborgska hållplatser & vagnord som passar att bygga med brickor */
export const BYGG_HALLPLATSER = [
  { ord: "Lana",       niva: 3, typ: "hallplats" },
  { ord: "SKF",        niva: 3, typ: "hallplats" },
  { ord: "Hagen",      niva: 4, typ: "hallplats" },
  { ord: "Valand",     niva: 4, typ: "hallplats" },
  { ord: "Ekedal",     niva: 4, typ: "hallplats" },
  { ord: "Storås",     niva: 4, typ: "hallplats" },
  { ord: "Kviberg",    niva: 5, typ: "hallplats" },
  { ord: "Almedal",    niva: 5, typ: "hallplats" },
  { ord: "Hjällbo",    niva: 5, typ: "hallplats" },
  { ord: "Bellevue",   niva: 5, typ: "hallplats" },
  { ord: "Chalmers",   niva: 5, typ: "hallplats" },
  { ord: "Svingeln",   niva: 5, typ: "hallplats" },
  { ord: "Sandarna",   niva: 5, typ: "hallplats" },
  { ord: "Härlanda",   niva: 5, typ: "hallplats" },
  { ord: "Tranered",   niva: 5, typ: "hallplats" },
  { ord: "Elisedal",   niva: 5, typ: "hallplats" },
  { ord: "Majvallen",  niva: 6, typ: "hallplats" },
  { ord: "Mariaplan",  niva: 6, typ: "hallplats" },
  { ord: "Domkyrkan",  niva: 6, typ: "hallplats" },
  { ord: "Stenpiren",  niva: 6, typ: "hallplats" },
  { ord: "Korsvägen",  niva: 6, typ: "hallplats" },
  { ord: "Kungssten",  niva: 6, typ: "hallplats" },
  { ord: "Långedrag",  niva: 6, typ: "hallplats" }
];

export const VAGN_NAMN_ORD = [
  { ord: "Sirio",   ledtrad: "Smeknamnet på spårvagn M32", typ: "M32", niva: 4 },
  { ord: "Bebben",  ledtrad: "Vad heter spårvagn 318?",    typ: "M31", niva: 4 },
  { ord: "Flexity", ledtrad: "Smeknamnet på M33 och M34",  typ: "M33", niva: 5 },
  { ord: "Boggi",   ledtrad: "Hjulparet på M28 och M29",   typ: "M29", niva: 4 }
];

export function ordForNiva(niva){
  const n = Math.max(1, Math.min(4, Math.round(niva)));
  return ORDBANK.filter(o => o.niva <= n);
}

export function hittaOrd(namn){
  const low = String(namn || "").toLocaleLowerCase("sv");
  return ORDBANK.find(o => o.ord.toLocaleLowerCase("sv") === low) || null;
}
