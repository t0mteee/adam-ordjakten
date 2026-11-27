#!/usr/bin/env node
/* Skapar verktyg/rost-fraser.txt med alla fraser, ord, hållplatser och
   spårvagnsmodeller som Ordjakten kan läsa upp med Alva Premium på Mac. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TRAM_LINES, ALLA_STOPP, VAGNTYPER, VAGNNAMN } from "../js/gbg-data.mjs";
import { ORDBANK, BYGG_HALLPLATSER, VAGN_NAMN_ORD } from "../js/ord-data.mjs";
import { klippId } from "../js/ljud.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const utFil = path.join(__dirname, "rost-fraser.txt");

const poster = new Map();
const lagg = (text) => {
  const t = String(text || "").trim();
  if(!t) return;
  const id = klippId(t);
  if(id && !poster.has(id)) poster.set(id, t);
};

/* Grundfraser & beröm */
[
  "Hej", "Välkommen till Ordjakten!", "Toppen!", "Snyggt läst!", "Heja!", "Helt rätt!", "Suveränt!",
  "Läs ordet! Vilken bild är det?", "Vilket ord är", "Vilken bokstav börjar", "på?",
  "Vilken bokstav fattas i", "Bygg ordet", "Bygg hållplatsen", "Vilken vagn åker mot",
  "Hitta skylten:", "Nästa hållplats:", "Ändstation!", "Ta dig till", "Rätt svar är",
  "Prova igen!", "Försök igen!", "Tut tut! Här kommer spårvagnen!", "mot", "Vagn"
].forEach(lagg);

/* Alla ord i ordbanken */
for(const o of ORDBANK){
  lagg(o.ord);
  lagg(`Bygg ordet ${o.ord}!`);
  lagg(`Vilket ord är ${o.ord}?`);
}

/* Hållplatser, linjer & spårvagnsmodeller */
for(const s of ALLA_STOPP){
  lagg(s);
  lagg(`Nästa hållplats: ${s}`);
  lagg(`Hitta skylten: ${s}`);
}
for(const h of BYGG_HALLPLATSER) lagg(`Bygg hållplatsen ${h.ord}!`);
for(const v of VAGN_NAMN_ORD) lagg(v.ord);
for(const l of TRAM_LINES){
  lagg(`Linje ${l.ref}`);
  lagg(l.a);
  lagg(l.b);
}
for(const t of VAGNTYPER){
  lagg(t.typ);
  lagg(t.smek);
}
for(const [, [namn]] of Object.entries(VAGNNAMN)) lagg(namn);

const rader = [
  "# Ordjaktens klippröst: fraser att läsa in med ./verktyg/gor-rost.sh",
  "# filnamn<tabb>text",
  ...[...poster.entries()].map(([id, text]) => `${id}\t${text}`)
];
fs.writeFileSync(utFil, rader.join("\n") + "\n", "utf8");
console.log(`Skrev ${poster.size} fraser till verktyg/rost-fraser.txt`);
