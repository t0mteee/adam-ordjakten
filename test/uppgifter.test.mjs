import test from "node:test";
import assert from "node:assert/strict";
import {
  ALFABET, BOKSTAVSLJUD, ORDBANK, BYGG_HALLPLATSER, formatOrd
} from "../js/ord-data.mjs";
import { harOrdBild } from "../js/ordbilder.mjs";
import {
  gorLasBild, gorBildOrd, gorForstaLjud, gorLucka, gorByggOrd,
  gorSkyltLas, gorHallplatsSkylt, gorByggHallplats, gorVagnModell,
  forklaraFel, byggRunda, uppdateraNiva, arrangeKinds
} from "../js/uppgifter.mjs";
import { linjeAv } from "../js/gbg-data.mjs";
import { nySpelare, laggKluring, kluringKlarad, kollaMarken, valideraKopia } from "../js/lagring.mjs";

test("svenska alfabetet har 29 bokstäver och rena enbokstavsljud för alla", () => {
  assert.equal(ALFABET.length, 29);
  for(const ch of ALFABET){
    assert.ok(BOKSTAVSLJUD[ch], `Saknar bokstavsljud för ${ch}`);
    assert.equal(BOKSTAVSLJUD[ch].length, 1, `Bokstavsljud får inte dubbelstavas: ${ch} -> ${BOKSTAVSLJUD[ch]}`);
  }
});

test("formatOrd hanterar VERSALER, gemener och blandat med å/ä/ö", () => {
  assert.equal(formatOrd("Korsvägen", "versaler"), "KORSVÄGEN");
  assert.equal(formatOrd("Korsvägen", "gemener"), "korsvägen");
  assert.equal(formatOrd("Korsvägen", "blandat"), "Korsvägen");
  assert.equal(formatOrd("Östra Sjukhuset", "versaler"), "ÖSTRA SJUKHUSET");
});

test("ordbanken har 140+ unika ord och egen bilderboks-SVG för vartenda ord", () => {
  assert.ok(ORDBANK.length >= 140, `Förväntade >=140 ord, fick ${ORDBANK.length}`);
  const sedda = new Set();
  for(const o of ORDBANK){
    const low = o.ord.toLowerCase();
    assert.ok(!sedda.has(low), `Dubblett i ORDBANK: ${o.ord}`);
    sedda.add(low);
    assert.ok(o.niva >= 1 && o.niva <= 4);
    assert.ok(o.bild.startsWith("svg:"), `Ord saknar SVG-bild: ${o.ord} (${o.bild})`);
    assert.ok(harOrdBild(o.bild.slice(4)), `Saknar SVG-ritning i ordbilder.mjs för: ${o.ord} (${o.bild})`);
  }
});

test("alla nio uppgiftstyper skapar giltiga frågor med rätt svar och unika alternativ", () => {
  const plats = { linje: linjeAv("11"), stopp: "Brunnsparken", nasta: "Stenpiren" };
  for(let niva = 1; niva <= 6; niva++){
    const flerval = [
      gorLasBild(niva),
      gorBildOrd(niva),
      gorForstaLjud(niva),
      gorLucka(niva),
      gorSkyltLas(niva, plats),
      gorHallplatsSkylt(niva, plats),
      gorVagnModell(niva)
    ];
    for(const q of flerval){
      const varden = q.alternativ.map(a => a.varde);
      assert.ok(varden.includes(q.svar), `Rätt svar saknas i ${q.typ}`);
      assert.equal(new Set(varden).size, varden.length, `Dubblettalternativ i ${q.typ}`);
      const felVal = varden.find(v => v !== q.svar);
      const hint = forklaraFel(q, felVal, "versaler");
      assert.ok(hint.text && hint.tal, `Saknar felsvarsförklaring för ${q.typ}`);
    }

    for(const q of [gorByggOrd(niva), gorByggHallplats(niva)]){
      const brickCh = q.brickor.map(b => b.ch);
      const pool = brickCh.slice();
      for(const ch of [...q.svar]){
        const idx = pool.indexOf(ch);
        assert.ok(idx >= 0, `Saknar bokstaven ${ch} bland brickorna för ${q.svar}`);
        pool.splice(idx, 1);
      }
      const hint = forklaraFel(q, "XXX", "versaler");
      assert.ok(hint.text && hint.tal);
    }
  }
});

test("byggRunda skapar 5 varierade frågor och respekterar strömbrytare", () => {
  const plats = { linje: linjeAv("3"), stopp: "Valand", nasta: "Vasaplatsen" };
  const runda = byggRunda(2, plats, { antal: 5 });
  assert.equal(runda.length, 5);
  const baraGbg = byggRunda(4, plats, { antal: 5, lasa: false, stava: false, gbg: true });
  assert.equal(baraGbg.length, 5);
  assert.ok(baraGbg.every(q => q.grupp === "gbg"));
});

test("arrangeKinds placerar inte tre likadana i rad när det finns variation", () => {
  const ordnad = arrangeKinds(["a", "a", "a", "b", "c", "d"]);
  for(let i = 2; i < ordnad.length; i++){
    assert.ok(!(ordnad[i] === ordnad[i - 1] && ordnad[i] === ordnad[i - 2]));
  }
});

test("adaptiv nivå och kluringar fungerar som väntat", () => {
  assert.ok(uppdateraNiva(2, "direkt") > 2);
  assert.ok(uppdateraNiva(2, "visad") < 2);
  assert.equal(uppdateraNiva(1, "visad", 1), 1);
  assert.equal(uppdateraNiva(6, "direkt", 1), 6);

  const p = nySpelare("Adam", "bloppy");
  assert.equal(p.settings.bokstavsStil, "versaler");
  assert.equal(p.settings.niva, 2.0);
  laggKluring(p, { typ: "bygg-ord", ord: "Sol" });
  assert.equal(p.kluringar.length, 1);
  kluringKlarad(p, { typ: "bygg-ord", ord: "Sol", kluring: true });
  assert.equal(p.kluringar.length, 0);
  assert.equal(p.klaradeKluringar, 1);

  p.visitedStops.push("Brunnsparken");
  const nya = kollaMarken(p);
  assert.ok(nya.includes("forsta-stopp"));

  assert.equal(valideraKopia({ app: "fel", players: [] }), null);
  const ok = valideraKopia({ app: "ordjakten", players: [p] });
  assert.equal(ok.length, 1);
  assert.equal(ok[0].name, "Adam");
});

test("BYGG_HALLPLATSER innehåller riktiga hållplatsnamn utan mellanslag", () => {
  for(const h of BYGG_HALLPLATSER){
    assert.ok(!/\s/.test(h.ord), `${h.ord} har mellanslag`);
  }
});
