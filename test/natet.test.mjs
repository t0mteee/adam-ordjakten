import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  TRAM_LINES, ALLA_STOPP, STOP_XY, STOP_PHOTOS, TRAM_PHOTOS,
  VAGNTYPER, VAGNAR, ALLA_VAGNKORT_NR,
  kortasteVag, avstand, tipsForMal, valjResmal, valjSparr,
  linjeAv, stegaVagnNummer, vagnkortFor
} from "../js/gbg-data.mjs";
import { natkartaSVG } from "../js/karta.mjs";

test("Göteborgs spårvagnsnät har 12 linjer och 132 hållplatser med koordinater", () => {
  assert.equal(TRAM_LINES.length, 12);
  assert.equal(ALLA_STOPP.length, 132);
  for(const stopp of ALLA_STOPP){
    assert.ok(STOP_XY[stopp], `Saknar koordinater för ${stopp}`);
  }
});

test("hela spårvagnsnätet hänger ihop från Brunnsparken", () => {
  for(const stopp of ALLA_STOPP){
    const vag = kortasteVag("Brunnsparken", stopp);
    assert.ok(vag && vag[0] === "Brunnsparken" && vag[vag.length - 1] === stopp, `Ingen väg till ${stopp}`);
  }
});

test("resmål, tips och spårarbete tar alltid spelaren närmare målet", () => {
  const l = linjeAv("11");
  const mal = valjResmal("Brunnsparken", new Set(["Brunnsparken"]), 0);
  const tips = tipsForMal(l, l.stops.indexOf("Brunnsparken"), 1, mal);
  assert.ok(tips && tips.kvar > 0 && tips.text);

  const sparr = valjSparr("Brunnsparken", "Chalmers");
  if(sparr){
    const omvag = avstand("Brunnsparken", "Chalmers", sparr);
    assert.ok(Number.isFinite(omvag), "Omväg ska finnas vid spårarbete");
  }
});

test("alla 7 spårvagnsmodeller och vagnkort stämmer och foton finns på disk", () => {
  assert.equal(VAGNTYPER.length, 7);
  for(const t of VAGNTYPER){
    const nasta = stegaVagnNummer(t, t.fran, 1);
    assert.ok(nasta >= t.fran && nasta <= t.till);
  }
  for(const nr of ALLA_VAGNKORT_NR){
    const k = vagnkortFor(nr);
    assert.ok(k && k.typ, `Saknar typ för vagn ${nr}`);
  }
  for(const f of [...Object.values(STOP_PHOTOS), ...TRAM_PHOTOS]){
    const fil = path.join(process.cwd(), "bilder", `${f.f}.jpg`);
    assert.ok(fs.existsSync(fil), `Saknar bildfil: bilder/${f.f}.jpg`);
  }
  for(const key of Object.keys(VAGNAR)){
    const fil = path.join(process.cwd(), "bilder", `${key}.jpg`);
    assert.ok(fs.existsSync(fil), `Saknar vagnfoto: bilder/${key}.jpg`);
  }
});

test("natkartaSVG ritar giltig SVG för alla linjer", () => {
  for(const l of TRAM_LINES){
    const svg = natkartaSVG(l, 0, { rikt: 1, besokta: new Set([l.stops[0]]), bokstavsStil: "versaler" });
    assert.ok(svg.startsWith("<svg") && svg.endsWith("</svg>"));
  }
});
