# Ordjakten — Göteborgs spårvagnar

Ett färgglatt läs- och bokstavsspel på svenska för barn runt fem år som älskar spårvagnar och håller på att lära sig läsa. Byggt med vanlig HTML, CSS och ES-moduler helt utan byggsteg — funkar på iPad, iPhone och dator, direkt via GitHub Pages eller en lokal webbserver (`python3 -m http.server 8770`).

## Så funkar spelet

Allt händer direkt i **Göteborgs riktiga spårvagnsnät** (12 linjer, 132 hållplatser, riktiga hållplatsfoton och alla 7 spårvagnsmodeller från M28 till den 45 meter långa M34).

Varje hållplatssträcka kostar **fem korta läs- och bokstavsuppgifter**. När de är klara rullar spårvagnen fram längs spåret på kartan och ropar ut nästa hållplats!

### Tre sorters läs- och bokstavsövningar
1. **Ljuda & läsa ord**
   - *Läs ordet → bild*: Varje bokstav går att trycka på för att höra bokstavsljudet, och knappen **Ljuda ordet** går igenom ljud för ljud (`S – O – L ... SOL!`).
   - *Bild → välj ord*: Med smarta förvillare (samma begynnelsebokstav eller rimord) så barnet tränar på att läsa hela ordet.
   - *Första bokstavsljudet* på de lägsta nivåerna.
2. **Stava & bygga ord**
   - *Vilken bokstav fattas?* (t.ex. `S ? L` → `O`).
   - *Bygg ordet*: Dra ihop bokstavsbrickor (som ljudar när man trycker på dem!) eller växla till **svenskt skärmtangentbord (`A–Ö`)**. Fysiskt tangentbord fungerar också.
3. **Göteborgs- & spårvagnsläsning**
   - *Destinationsskyltar*: Läs riktiga linjer och destinationer (*"Vilken vagn åker mot Bergsjön?"*).
   - *Hållplatsskyltar*: Lyssna på utropet (med Alva Premium-klipp!) och tryck på rätt blåvit hållplatsskylt.
   - *Bygg hållplatser & vagnord*: Stava korta hållplatser (`LANA`, `HAGEN`, `VALAND`, `STORÅS`, `CHALMERS`) och vagnnamn (`SIRIO`, `BEBBEN`, `FLEXITY`).
   - *Spårvagnsmodeller (M28–M34)*: Känn igen vagnarna på längd, delar och fönsterband — och lås upp **Vagnkort** med riktiga göteborgska vagnnamn!

### Anpassat för nybörjarläsare (5 år)
- **VERSALER som standard**, med enkel växling till **gemener** eller **Blandat** under kugghjulet ⚙️.
- **Adaptiv läsnivå (Stigande, 1–6)** som börjar på **Nivå 2: Korta ord** (`SOL`, `BIL`, `TÅG`, `BÅT`, `HUS`) och växer i barnets takt upp mot längre ord och hela Göteborgs nät — eller låses på valfri fast nivå under kugghjulet.
- **Mina ord**: En interaktiv bildordbok över alla ord barnet läst rätt. Tryck på ett ord för att höra det ljuda!
- **Kluringar**: Ord som behövde lite hjälp kommer tillbaka senare märkta *Kluring!* för extra mynt.
- **Min vagn, Resmål, Spårarbete & Skattkistan**: Bygg din egen M28–M34, ta frivilliga resmål med rutthjälp, handla hattar och takpynt för mynten, och skriv ut eller spara en **Väggkarta** som växer med resorna.
- **Föräldrasida (*Så går det*)**: Visar dagens minuter, träffsäkerhet per övningstyp och väntande kluringar. Allt sparas lokalt i webbläsaren (`localStorage`) med stöd för JSON-säkerhetskopia.

## Kör lokalt eller på GitHub Pages

```bash
python3 -m http.server 8770
```
Öppna `http://localhost:8770/` i webbläsaren.

**GitHub Pages:** Gå till *Settings → Pages → Source: Deploy from a branch* (`main`, mappen `/ (root)`).

**Hemskärmsapp på iPad/iPhone:** Öppna adressen i **Safari** → dela-ikonen → *Lägg till på hemskärmen*.

## Klippröst med Alva Premium (valfritt på Mac)

Spelet innehåller redan över 300 förinspelade **Alva Premium**-klipp för Göteborgs 132 hållplatser, alla 12 linjer och spårvagnsmodeller, och använder plattans svenska talsyntes för övriga ord. Vill du läsa in *alla* ord och fraser i Ordjakten med Alva Premium på en Mac:

```bash
node verktyg/rost-fraser.mjs
./verktyg/gor-rost.sh --namn Adam
```

## Tester

```bash
node --test test/*.test.mjs
```

## Källor & licenser

- Hållplatser, linjesträckningar och koordinater bygger på OpenStreetMap (© OpenStreetMap-bidragsgivare, ODbL) och är kontrollerade mot Västtrafiks spårvagnskarta (2026) och Wikipedia.
- Hållplats- och spårvagnsfoton i `bilder/` kommer från Wikimedia Commons under fria licenser (CC BY-SA, CC BY, CC0, Public domain). Komplett fotograf- och licenslista finns under *Inställningar → Fotografer* i spelet.
