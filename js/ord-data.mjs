/* ═══════════════════════════════════════════════════════════════
   Ordjakten — Stor svensk ordbank (116 illustrerade ord) & alfabet
   Varje ord har en egen nordisk bilderboks-illustration (inga emojis)
   och smarta förvillare.
   ═══════════════════════════════════════════════════════════════ */

export const ALFABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");

export const VOKALER = new Set(["A", "E", "I", "O", "U", "Y", "Å", "Ä", "Ö"]);

/* Rena svenska bokstäver för talsyntes — aldrig dubbelbokstäver som "ss"
   eller "ll" eftersom svensk talsyntes då bokstaverar dem som "ess ess"! */
export const BOKSTAVSLJUD = {
  A: "a", B: "b", C: "c", D: "d", E: "e", F: "f", G: "g", H: "h",
  I: "i", J: "j", K: "k", L: "l", M: "m", N: "n", O: "o", P: "p",
  Q: "q", R: "r", S: "s", T: "t", U: "u", V: "v", W: "w", X: "x",
  Y: "y", Z: "z", Å: "å", Ä: "ä", Ö: "ö"
};

/* Förväxlingsbara bokstäver — används som smarta felsvar i lucka och bygga ord */
export const BOKSTAVSGRANNAR = {
  A: ["Å", "Ä", "O", "E"], B: ["P", "D", "V", "R"], C: ["S", "K", "G", "O"],
  D: ["T", "B", "P", "G"], E: ["Ä", "I", "A", "Ö"], F: ["V", "P", "T", "S"],
  G: ["K", "J", "D", "B"], H: ["N", "K", "M", "R"], I: ["E", "Y", "J", "L"],
  J: ["G", "I", "L", "Y"], K: ["G", "T", "C", "P"], L: ["R", "N", "I", "T"],
  M: ["N", "H", "W", "V"], N: ["M", "L", "R", "H"], O: ["Å", "Ö", "U", "A"],
  P: ["B", "T", "D", "F"], Q: ["K", "G", "O", "C"], R: ["L", "N", "B", "P"],
  S: ["Z", "C", "F", "T"], T: ["D", "P", "K", "L"], U: ["Y", "O", "Å", "Ö"],
  V: ["F", "W", "B", "M"], W: ["V", "M", "N", "F"], X: ["S", "K", "Z", "C"],
  Y: ["I", "U", "J", "Ö"], Z: ["S", "X", "C", "T"], Å: ["A", "Ä", "O", "Ö"],
  Ä: ["A", "Å", "E", "Ö"], Ö: ["O", "Å", "Ä", "Y"]
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
  { id: 1, namn: "Bokstavsljud",   farg: "#2D8A56", kort: "Första ljudet & miniord" },
  { id: 2, namn: "Korta ord",      farg: "#F2B705", kort: "40+ korta ord: SOL, BIL, TÅG, RÄV" },
  { id: 3, namn: "Lätta ord",      farg: "#1B68B3", kort: "4–5 bokstäver: KATT, BUSS, VAGN" },
  { id: 4, namn: "Spårvagnsord",   farg: "#D95D39", kort: "Längre ord & spårvagnstema" },
  { id: 5, namn: "Hållplatsjakt",  farg: "#2A9D8F", kort: "Skyltar, linjer & vagnmodeller" },
  { id: 6, namn: "Mästarläsaren",  farg: "#6C4AB6", kort: "Hela Göteborgs nät & stavning" }
];

/* ── 116 illustrerade svenska ord (varje ord har egen SVG i ordbilder.mjs) ─ */
export const ORDBANK = [
  // ── Nivå 1: Miniord (1–2 bokstäver) ──
  { ord: "Is",   niva: 1, kat: "natur", bild: "svg:is",  forvillare: ["Bi", "Ko", "Ö", "Ål"] },
  { ord: "Ko",   niva: 1, kat: "djur",  bild: "svg:ko",  forvillare: ["Bi", "Lo", "Sko", "Tå"] },
  { ord: "Bi",   niva: 1, kat: "djur",  bild: "svg:bi",  forvillare: ["Bil", "Is", "Ko", "Lo"] },
  { ord: "Ö",    niva: 1, kat: "natur", bild: "svg:o",   forvillare: ["Is", "Ko", "Ål", "Tå"] },
  { ord: "Tå",   niva: 1, kat: "kropp", bild: "svg:ta",  forvillare: ["Tåg", "Ko", "Lo", "Fot"] },
  { ord: "Ål",   niva: 1, kat: "djur",  bild: "svg:al",  forvillare: ["Is", "Älg", "Orm", "Ö"] },
  { ord: "Lo",   niva: 1, kat: "djur",  bild: "svg:lo",  forvillare: ["Ko", "Löv", "Lås", "Lök"] },

  // ── Nivå 2: 41 korta ljudenliga 3-bokstavsord — stor variation för 5-åringen! ──
  { ord: "Sol",  niva: 2, kat: "natur",  bild: "svg:sol",  forvillare: ["Säl", "Sko", "Såg", "Bil"] },
  { ord: "Bil",  niva: 2, kat: "fordon", bild: "svg:bil",  forvillare: ["Pil", "Båt", "Bok", "Bär"] },
  { ord: "Tåg",  niva: 2, kat: "fordon", bild: "svg:tag",  forvillare: ["Såg", "Tak", "Tå", "Båt"] },
  { ord: "Båt",  niva: 2, kat: "fordon", bild: "svg:bat",  forvillare: ["Bil", "Bär", "Nöt", "Bok"] },
  { ord: "Hus",  niva: 2, kat: "stad",   bild: "svg:hus",  forvillare: ["Mus", "Buss", "Hund", "Tak"] },
  { ord: "Bok",  niva: 2, kat: "hem",    bild: "svg:bok",  forvillare: ["Bil", "Båt", "Bär", "Kub"] },
  { ord: "Apa",  niva: 2, kat: "djur",   bild: "svg:apa",  forvillare: ["Anka", "Orm", "Arm", "Älg"] },
  { ord: "Orm",  niva: 2, kat: "djur",   bild: "svg:orm",  forvillare: ["Arm", "Ost", "Öra", "Apa"] },
  { ord: "Mus",  niva: 2, kat: "djur",   bild: "svg:mus",  forvillare: ["Hus", "Mun", "Buss", "Lås"] },
  { ord: "Säl",  niva: 2, kat: "djur",   bild: "svg:sal",  forvillare: ["Sol", "Sko", "Såg", "Snö"] },
  { ord: "Räv",  niva: 2, kat: "djur",   bild: "svg:rav",  forvillare: ["Ros", "Ren", "Rep", "Räls"] },
  { ord: "Älg",  niva: 2, kat: "djur",   bild: "svg:alg",  forvillare: ["Ägg", "Öga", "Apa", "Orm"] },
  { ord: "Val",  niva: 2, kat: "djur",   bild: "svg:val",  forvillare: ["Väg", "Vagn", "Haj", "Säl"] },
  { ord: "Haj",  niva: 2, kat: "djur",   bild: "svg:haj",  forvillare: ["Paj", "Val", "Hus", "Säl"] },
  { ord: "Får",  niva: 2, kat: "djur",   bild: "svg:far",  forvillare: ["Fyr", "Fot", "Get", "Räv"] },
  { ord: "Get",  niva: 2, kat: "djur",   bild: "svg:get",  forvillare: ["Får", "Ren", "Nöt", "Kex"] },
  { ord: "Ren",  niva: 2, kat: "djur",   bild: "svg:ren",  forvillare: ["Räv", "Rep", "Ros", "Älg"] },
  { ord: "Ros",  niva: 2, kat: "natur",  bild: "svg:ros",  forvillare: ["Räv", "Ren", "Ost", "Löv"] },
  { ord: "Bär",  niva: 2, kat: "mat",    bild: "svg:bar",  forvillare: ["Båt", "Bil", "Nöt", "Löv"] },
  { ord: "Nöt",  niva: 2, kat: "mat",    bild: "svg:not",  forvillare: ["Nål", "Båt", "Bär", "Lök"] },
  { ord: "Löv",  niva: 2, kat: "natur",  bild: "svg:lov",  forvillare: ["Lök", "Lås", "Räv", "Bär"] },
  { ord: "Lök",  niva: 2, kat: "mat",    bild: "svg:lok",  forvillare: ["Löv", "Lås", "Bok", "Nöt"] },
  { ord: "Paj",  niva: 2, kat: "mat",    bild: "svg:paj",  forvillare: ["Haj", "Pil", "Kex", "Ost"] },
  { ord: "Kex",  niva: 2, kat: "mat",    bild: "svg:kex",  forvillare: ["Kam", "Kub", "Ost", "Paj"] },
  { ord: "Ost",  niva: 2, kat: "mat",    bild: "svg:ost",  forvillare: ["Orm", "Öra", "Ros", "Ägg"] },
  { ord: "Ägg",  niva: 2, kat: "mat",    bild: "svg:agg",  forvillare: ["Älg", "Öga", "Ost", "Väg"] },
  { ord: "Bro",  niva: 2, kat: "stad",   bild: "svg:bro",  forvillare: ["Bil", "Båt", "Bröd", "Sko"] },
  { ord: "Fyr",  niva: 2, kat: "stad",   bild: "svg:fyr",  forvillare: ["Får", "Fot", "Bro", "Tak"] },
  { ord: "Tak",  niva: 2, kat: "stad",   bild: "svg:tak",  forvillare: ["Tåg", "Tå", "Hus", "Väg"] },
  { ord: "Väg",  niva: 2, kat: "stad",   bild: "svg:vag",  forvillare: ["Vagn", "Val", "Ägg", "Tåg"] },
  { ord: "Eld",  niva: 2, kat: "natur",  bild: "svg:eld",  forvillare: ["Älg", "Is", "Snö", "Sol"] },
  { ord: "Snö",  niva: 2, kat: "natur",  bild: "svg:sno",  forvillare: ["Sol", "Sko", "Säl", "Is"] },
  { ord: "Såg",  niva: 2, kat: "hem",    bild: "svg:sag",  forvillare: ["Tåg", "Sol", "Sko", "Säl"] },
  { ord: "Sko",  niva: 2, kat: "hem",    bild: "svg:sko",  forvillare: ["Sol", "Ko", "Skog", "Såg"] },
  { ord: "Kam",  niva: 2, kat: "hem",    bild: "svg:kam",  forvillare: ["Kex", "Kub", "Katt", "Kopp"] },
  { ord: "Nål",  niva: 2, kat: "hem",    bild: "svg:nal",  forvillare: ["Nöt", "Pil", "Lås", "Ål"] },
  { ord: "Pil",  niva: 2, kat: "hem",    bild: "svg:pil",  forvillare: ["Bil", "Paj", "Nål", "Sko"] },
  { ord: "Kub",  niva: 2, kat: "hem",    bild: "svg:kub",  forvillare: ["Kam", "Kex", "Bok", "Lås"] },
  { ord: "Lås",  niva: 2, kat: "hem",    bild: "svg:las",  forvillare: ["Lök", "Löv", "Nål", "Rep"] },
  { ord: "Rep",  niva: 2, kat: "hem",    bild: "svg:rep",  forvillare: ["Ren", "Räv", "Ros", "Lås"] },
  { ord: "Sax",  niva: 2, kat: "hem",    bild: "svg:sax",  forvillare: ["Såg", "Sol", "Sko", "Kex"] },
  { ord: "Öga",  niva: 2, kat: "kropp",  bild: "svg:oga",  forvillare: ["Öra", "Ägg", "Älg", "Ål"] },
  { ord: "Öra",  niva: 2, kat: "kropp",  bild: "svg:ora",  forvillare: ["Öga", "Orm", "Arm", "Älg"] },
  { ord: "Fot",  niva: 2, kat: "kropp",  bild: "svg:fot",  forvillare: ["Får", "Fyr", "Mun", "Båt"] },
  { ord: "Mun",  niva: 2, kat: "kropp",  bild: "svg:mun",  forvillare: ["Mus", "Fot", "Öga", "Arm"] },
  { ord: "Arm",  niva: 2, kat: "kropp",  bild: "svg:arm",  forvillare: ["Orm", "Apa", "Fot", "Öra"] },

  // ── Nivå 3: 44 lätta 4–5 bokstavsord ──
  { ord: "Vagn",  niva: 3, kat: "fordon", bild: "svg:vagn",  forvillare: ["Väg", "Val", "Buss", "Spår"] },
  { ord: "Spår",  niva: 3, kat: "fordon", bild: "svg:spar",  forvillare: ["Stol", "Sko", "Räls", "Skog"] },
  { ord: "Räls",  niva: 3, kat: "fordon", bild: "svg:rals",  forvillare: ["Räv", "Ring", "Spår", "Vagn"] },
  { ord: "Buss",  niva: 3, kat: "fordon", bild: "svg:buss",  forvillare: ["Bil", "Boll", "Hus", "Båt"] },
  { ord: "Cykel", niva: 3, kat: "fordon", bild: "svg:cykel", forvillare: ["Buss", "Bil", "Vagn", "Skepp"] },
  { ord: "Kran",  niva: 3, kat: "fordon", bild: "svg:kran",  forvillare: ["Kung", "Katt", "Tåg", "Hamn"] },
  { ord: "Hjul",  niva: 3, kat: "fordon", bild: "svg:hjul",  forvillare: ["Hus", "Hund", "Häst", "Hink"] },
  { ord: "Skepp", niva: 3, kat: "fordon", bild: "svg:skepp", forvillare: ["Skog", "Sked", "Spår", "Stopp"] },
  { ord: "Katt",  niva: 3, kat: "djur",   bild: "svg:katt",  forvillare: ["Hatt", "Kam", "Kopp", "Hund"] },
  { ord: "Hund",  niva: 3, kat: "djur",   bild: "svg:hund",  forvillare: ["Hand", "Häst", "Katt", "Hus"] },
  { ord: "Häst",  niva: 3, kat: "djur",   bild: "svg:hast",  forvillare: ["Hund", "Hatt", "Hink", "Gris"] },
  { ord: "Gris",  niva: 3, kat: "djur",   bild: "svg:gris",  forvillare: ["Groda", "Glass", "Gata", "Fisk"] },
  { ord: "Anka",  niva: 3, kat: "djur",   bild: "svg:anka",  forvillare: ["Apa", "Äpple", "Fisk", "Svan"] },
  { ord: "Fisk",  niva: 3, kat: "djur",   bild: "svg:fisk",  forvillare: ["Fot", "Gris", "Haj", "Svan"] },
  { ord: "Groda", niva: 3, kat: "djur",   bild: "svg:groda", forvillare: ["Gris", "Glass", "Gata", "Boll"] },
  { ord: "Lejon", niva: 3, kat: "djur",   bild: "svg:lejon", forvillare: ["Löv", "Tiger", "Björn", "Katt"] },
  { ord: "Björn", niva: 3, kat: "djur",   bild: "svg:bjorn", forvillare: ["Panda", "Lejon", "Buss", "Boll"] },
  { ord: "Uggla", niva: 3, kat: "djur",   bild: "svg:uggla", forvillare: ["Anka", "Älg", "Svan", "Myra"] },
  { ord: "Kanin", niva: 3, kat: "djur",   bild: "svg:kanin", forvillare: ["Katt", "Kaka", "Kopp", "Panda"] },
  { ord: "Myra",  niva: 3, kat: "djur",   bild: "svg:myra",  forvillare: ["Måne", "Moln", "Mus", "Mössa"] },
  { ord: "Svan",  niva: 3, kat: "djur",   bild: "svg:svan",  forvillare: ["Svamp", "Spår", "Anka", "Sten"] },
  { ord: "Panda", niva: 3, kat: "djur",   bild: "svg:panda", forvillare: ["Park", "Penna", "Björn", "Tiger"] },
  { ord: "Tiger", niva: 3, kat: "djur",   bild: "svg:tiger", forvillare: ["Torg", "Tält", "Lejon", "Panda"] },
  { ord: "Boll",  niva: 3, kat: "hem",    bild: "svg:boll",  forvillare: ["Bil", "Bok", "Bord", "Buss"] },
  { ord: "Dörr",  niva: 3, kat: "hem",    bild: "svg:dorr",  forvillare: ["Bord", "Boll", "Stol", "Torg"] },
  { ord: "Bord",  niva: 3, kat: "hem",    bild: "svg:bord",  forvillare: ["Boll", "Bok", "Dörr", "Bröd"] },
  { ord: "Stol",  niva: 3, kat: "hem",    bild: "svg:stol",  forvillare: ["Sol", "Spår", "Säng", "Sked"] },
  { ord: "Säng",  niva: 3, kat: "hem",    bild: "svg:sang",  forvillare: ["Såg", "Stol", "Sko", "Ring"] },
  { ord: "Kopp",  niva: 3, kat: "hem",    bild: "svg:kopp",  forvillare: ["Katt", "Kaka", "Korv", "Stopp"] },
  { ord: "Sked",  niva: 3, kat: "hem",    bild: "svg:sked",  forvillare: ["Sko", "Skog", "Stol", "Spår"] },
  { ord: "Hatt",  niva: 3, kat: "hem",    bild: "svg:hatt",  forvillare: ["Katt", "Hund", "Häst", "Hand"] },
  { ord: "Ring",  niva: 3, kat: "hem",    bild: "svg:ring",  forvillare: ["Regn", "Räls", "Ros", "Räv"] },
  { ord: "Hink",  niva: 3, kat: "hem",    bild: "svg:hink",  forvillare: ["Hatt", "Hand", "Hjul", "Spade"] },
  { ord: "Spade", niva: 3, kat: "hem",    bild: "svg:spade", forvillare: ["Spår", "Sked", "Hink", "Skepp"] },
  { ord: "Tält",  niva: 3, kat: "hem",    bild: "svg:talt",  forvillare: ["Tak", "Tåg", "Torg", "Tårta"] },
  { ord: "Lampa", niva: 3, kat: "hem",    bild: "svg:lampa", forvillare: ["Lejon", "Lås", "Penna", "Vante"] },
  { ord: "Penna", niva: 3, kat: "hem",    bild: "svg:penna", forvillare: ["Panda", "Park", "Päron", "Pizza"] },
  { ord: "Mössa", niva: 3, kat: "hem",    bild: "svg:mossa", forvillare: ["Måne", "Moln", "Myra", "Vante"] },
  { ord: "Vante", niva: 3, kat: "hem",    bild: "svg:vante", forvillare: ["Vagn", "Väg", "Mössa", "Hand"] },
  { ord: "Hand",  niva: 3, kat: "kropp",  bild: "svg:hand",  forvillare: ["Hund", "Hatt", "Hink", "Hamn"] },
  { ord: "Kaka",  niva: 3, kat: "mat",    bild: "svg:kaka",  forvillare: ["Katt", "Kopp", "Bulle", "Glass"] },
  { ord: "Bulle", niva: 3, kat: "mat",    bild: "svg:bulle", forvillare: ["Boll", "Buss", "Kaka", "Bröd"] },
  { ord: "Tårta", niva: 3, kat: "mat",    bild: "svg:tarta", forvillare: ["Tält", "Tomat", "Kaka", "Bulle"] },
  { ord: "Korv",  niva: 3, kat: "mat",    bild: "svg:korv",  forvillare: ["Kopp", "Kaka", "Kran", "Bröd"] },
  { ord: "Glass", niva: 3, kat: "mat",    bild: "svg:glass", forvillare: ["Gris", "Groda", "Gata", "Kaka"] },
  { ord: "Äpple", niva: 3, kat: "mat",    bild: "svg:apple", forvillare: ["Ägg", "Älg", "Päron", "Banan"] },
  { ord: "Banan", niva: 3, kat: "mat",    bild: "svg:banan", forvillare: ["Båt", "Boll", "Kaka", "Päron"] },
  { ord: "Päron", niva: 3, kat: "mat",    bild: "svg:paron", forvillare: ["Park", "Äpple", "Banan", "Melon"] },
  { ord: "Bröd",  niva: 3, kat: "mat",    bild: "svg:brod",  forvillare: ["Bro", "Bär", "Bord", "Bulle"] },
  { ord: "Majs",  niva: 3, kat: "mat",    bild: "svg:majs",  forvillare: ["Moln", "Måne", "Melon", "Morot"] },
  { ord: "Tomat", niva: 3, kat: "mat",    bild: "svg:tomat", forvillare: ["Tårta", "Tält", "Morot", "Melon"] },
  { ord: "Melon", niva: 3, kat: "mat",    bild: "svg:melon", forvillare: ["Moln", "Måne", "Majs", "Päron"] },
  { ord: "Moln",  niva: 3, kat: "natur",  bild: "svg:moln",  forvillare: ["Måne", "Melon", "Majs", "Sol"] },
  { ord: "Regn",  niva: 3, kat: "natur",  bild: "svg:regn",  forvillare: ["Ring", "Räls", "Ros", "Moln"] },
  { ord: "Måne",  niva: 3, kat: "natur",  bild: "svg:mane",  forvillare: ["Moln", "Myra", "Sol", "Stjärna"] },
  { ord: "Sten",  niva: 3, kat: "natur",  bild: "svg:sten",  forvillare: ["Stol", "Stopp", "Berg", "Svan"] },
  { ord: "Berg",  niva: 3, kat: "natur",  bild: "svg:berg",  forvillare: ["Bär", "Bro", "Sten", "Skog"] },
  { ord: "Svamp", niva: 3, kat: "natur",  bild: "svg:svamp", forvillare: ["Svan", "Skog", "Spår", "Sten"] },
  { ord: "Gata",  niva: 3, kat: "stad",   bild: "svg:gata",  forvillare: ["Glass", "Gris", "Torg", "Park"] },
  { ord: "Torg",  niva: 3, kat: "stad",   bild: "svg:torg",  forvillare: ["Tåg", "Tak", "Gata", "Park"] },
  { ord: "Park",  niva: 3, kat: "stad",   bild: "svg:park",  forvillare: ["Pil", "Päron", "Skog", "Torg"] },
  { ord: "Skog",  niva: 3, kat: "natur",  bild: "svg:skog",  forvillare: ["Sko", "Sked", "Spår", "Park"] },
  { ord: "Hamn",  niva: 3, kat: "stad",   bild: "svg:hamn",  forvillare: ["Hand", "Hatt", "Hund", "Hus"] },
  { ord: "Kung",  niva: 3, kat: "stad",   bild: "svg:kung",  forvillare: ["Katt", "Kopp", "Kran", "Slott"] },
  { ord: "Drake", niva: 3, kat: "hem",    bild: "svg:drake", forvillare: ["Dörr", "Raket", "Boll", "Fågel"] },

  // ── Nivå 4: 32 spårvagnsord & längre vardagsord ──
  { ord: "Spårvagn",   niva: 4, kat: "fordon", bild: "svg:sparvagn",   forvillare: ["Lastbil", "Flygplan", "Vagnhall", "Perrong"] },
  { ord: "Skylt",      niva: 4, kat: "stad",   bild: "svg:skylt",      forvillare: ["Skola", "Skog", "Stopp", "Spår"] },
  { ord: "Perrong",    niva: 4, kat: "stad",   bild: "svg:perrong",    forvillare: ["Park", "Polis", "Biljett", "Vagnhall"] },
  { ord: "Biljett",    niva: 4, kat: "stad",   bild: "svg:biljett",    forvillare: ["Bil", "Buss", "Perrong", "Klocka"] },
  { ord: "Vagnhall",   niva: 4, kat: "stad",   bild: "svg:vagnhall",   forvillare: ["Vagn", "Spårvagn", "Perrong", "Skola"] },
  { ord: "Förare",     niva: 4, kat: "stad",   bild: "svg:forare",     forvillare: ["Färja", "Fisk", "Polis", "Biljett"] },
  { ord: "Tunnel",     niva: 4, kat: "stad",   bild: "svg:tunnel",     forvillare: ["Trumma", "Traktor", "Torg", "Perrong"] },
  { ord: "Stopp",      niva: 4, kat: "stad",   bild: "svg:stopp",      forvillare: ["Stol", "Spår", "Skylt", "Slott"] },
  { ord: "Klocka",     niva: 4, kat: "stad",   bild: "svg:klocka",     forvillare: ["Kaka", "Kopp", "Kyrka", "Skylt"] },
  { ord: "Skola",      niva: 4, kat: "stad",   bild: "svg:skola",      forvillare: ["Skylt", "Skog", "Slott", "Kyrka"] },
  { ord: "Kyrka",      niva: 4, kat: "stad",   bild: "svg:kyrka",      forvillare: ["Klocka", "Skola", "Slott", "Kran"] },
  { ord: "Slott",      niva: 4, kat: "stad",   bild: "svg:slott",      forvillare: ["Stopp", "Skola", "Kyrka", "Kung"] },
  { ord: "Blomma",     niva: 4, kat: "natur",  bild: "svg:blomma",     forvillare: ["Boll", "Banan", "Ros", "Löv"] },
  { ord: "Stjärna",    niva: 4, kat: "natur",  bild: "svg:stjarna",    forvillare: ["Stol", "Stopp", "Måne", "Raket"] },
  { ord: "Regnbåge",   niva: 4, kat: "natur",  bild: "svg:regnbage",   forvillare: ["Regn", "Raket", "Snögubbe", "Stjärna"] },
  { ord: "Snögubbe",   niva: 4, kat: "natur",  bild: "svg:snogubbe",   forvillare: ["Snö", "Snigel", "Regnbåge", "Slott"] },
  { ord: "Raket",      niva: 4, kat: "fordon", bild: "svg:raket",      forvillare: ["Räls", "Regn", "Flygplan", "Spårvagn"] },
  { ord: "Flygplan",   niva: 4, kat: "fordon", bild: "svg:flygplan",   forvillare: ["Lastbil", "Spårvagn", "Helikopter", "Färja"] },
  { ord: "Helikopter", niva: 4, kat: "fordon", bild: "svg:helikopter", forvillare: ["Flygplan", "Traktor", "Brandbil", "Lastbil"] },
  { ord: "Traktor",    niva: 4, kat: "fordon", bild: "svg:traktor",    forvillare: ["Lastbil", "Brandbil", "Tunnel", "Trumma"] },
  { ord: "Lastbil",    niva: 4, kat: "fordon", bild: "svg:lastbil",    forvillare: ["Flygplan", "Spårvagn", "Traktor", "Brandbil"] },
  { ord: "Polis",      niva: 4, kat: "fordon", bild: "svg:polis",      forvillare: ["Park", "Perrong", "Brandbil", "Lastbil"] },
  { ord: "Brandbil",   niva: 4, kat: "fordon", bild: "svg:brandbil",   forvillare: ["Lastbil", "Polis", "Traktor", "Spårvagn"] },
  { ord: "Färja",      niva: 4, kat: "fordon", bild: "svg:farja",      forvillare: ["Förare", "Båt", "Skepp", "Hamn"] },
  { ord: "Nyckel",     niva: 4, kat: "hem",    bild: "svg:nyckel",     forvillare: ["Nål", "Nöt", "Klocka", "Nyckelpiga"] },
  { ord: "Paraply",    niva: 4, kat: "hem",    bild: "svg:paraply",    forvillare: ["Perrong", "Pingvin", "Regn", "Regnbåge"] },
  { ord: "Gitarr",     niva: 4, kat: "hem",    bild: "svg:gitarr",     forvillare: ["Gris", "Glass", "Trumma", "Giraff"] },
  { ord: "Trumma",     niva: 4, kat: "hem",    bild: "svg:trumma",     forvillare: ["Torg", "Traktor", "Gitarr", "Tunnel"] },
  { ord: "Pingvin",    niva: 4, kat: "djur",   bild: "svg:pingvin",    forvillare: ["Polis", "Paraply", "Delfin", "Elefant"] },
  { ord: "Elefant",    niva: 4, kat: "djur",   bild: "svg:elefant",    forvillare: ["Giraff", "Pingvin", "Lejon", "Björn"] },
  { ord: "Giraff",     niva: 4, kat: "djur",   bild: "svg:giraff",     forvillare: ["Gitarr", "Groda", "Elefant", "Lejon"] },
  { ord: "Delfin",     niva: 4, kat: "djur",   bild: "svg:delfin",     forvillare: ["Drake", "Val", "Pingvin", "Fisk"] },
  { ord: "Krabba",     niva: 4, kat: "djur",   bild: "svg:krabba",     forvillare: ["Kran", "Kaka", "Fisk", "Snigel"] },
  { ord: "Fjäril",     niva: 4, kat: "djur",   bild: "svg:fjaril",     forvillare: ["Färja", "Fisk", "Blomma", "Nyckelpiga"] },
  { ord: "Igelkott",   niva: 4, kat: "djur",   bild: "svg:igelkott",   forvillare: ["Snigel", "Kanin", "Elefant", "Björn"] },
  { ord: "Snigel",     niva: 4, kat: "djur",   bild: "svg:snigel",     forvillare: ["Snögubbe", "Krabba", "Igelkott", "Svamp"] },
  { ord: "Nyckelpiga", niva: 4, kat: "djur",   bild: "svg:nyckelpiga", forvillare: ["Nyckel", "Fjäril", "Blomma", "Myra"] },
  { ord: "Citron",     niva: 4, kat: "mat",    bild: "svg:citron",     forvillare: ["Cykel", "Melon", "Banan", "Päron"] },
  { ord: "Pizza",      niva: 4, kat: "mat",    bild: "svg:pizza",      forvillare: ["Päron", "Paraply", "Kaka", "Ost"] },
  { ord: "Morot",      niva: 4, kat: "mat",    bild: "svg:morot",      forvillare: ["Moln", "Melon", "Tomat", "Majs"] }
];

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
