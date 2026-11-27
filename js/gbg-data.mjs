/* ═══════════════════════════════════════════════════════════════
   Göteborgs spårvagnsnät — linjer, hållplatser, vagnar & foton
   Källor: OpenStreetMap (ODbL), Västtrafiks spårvagnskarta 2026,
   Wikipedia och Wikimedia Commons (se licenser per bild).
   ═══════════════════════════════════════════════════════════════ */

export const VAGNAR = {
  "chalmers":           { nr:318, x:0.708, y:0.827, w:0.100, h:0.110 },
  "domkyrkan":          { nr:343, x:0.575, y:0.833, w:0.105, h:0.120 },
  "dr-sydows-gata":     { nr:807, x:0.436, y:0.883, w:0.105, h:0.120 },
  "hammarkullen":       { nr:354, x:0.214, y:0.767, w:0.090, h:0.100 },
  "komettorget":        { nr:717, x:0.347, y:0.810, w:0.095, h:0.105 },
  "marklandsgatan":     { nr:815, x:0.120, y:0.333, w:0.085, h:0.095 },
  "molndals-innerstad": { nr:446, x:0.698, y:0.783, w:0.085, h:0.095 },
  "nymanegatan":        { nr:454, x:0.317, y:0.817, w:0.085, h:0.095 },
  "onskevadersgatan":   { nr:705, x:0.488, y:0.757, w:0.085, h:0.095 },
  "ostra-sjukhuset":    { nr:440, x:0.261, y:0.843, w:0.085, h:0.095 },
  "tingvallsvagen":     { nr:434, x:0.497, y:0.893, w:0.100, h:0.110 },
  "valand":             { nr:349, x:0.531, y:0.917, w:0.100, h:0.110 },
  "varbergsgatan":      { nr:364, x:0.734, y:0.893, w:0.100, h:0.110 },
  "vagn-02":            { nr:435, x:0.239, y:0.777, w:0.090, h:0.100 },
  "vagn-03":            { nr:457, x:0.191, y:0.807, w:0.085, h:0.095 },
  "vagn-05":            { nr:425, x:0.428, y:0.893, w:0.100, h:0.110 },
  "vagn-11":            { nr:407, x:0.511, y:0.963, w:0.085, h:0.095 },
  "vagn-12":            { nr:415, x:0.672, y:0.777, w:0.085, h:0.095 },
  "vagn-13":            { nr:435, x:0.617, y:0.767, w:0.090, h:0.100 },
  "vagn-14":            { nr:406, x:0.430, y:0.957, w:0.085, h:0.095 }
};
/* ── Vagnkort ───────────────────────────────────────────────────────────
   Göteborgs vagnstyper med nummerserier och fakta ur Wikipedia, och namnen
   på vagnarna i fotona: Göteborgs vagnar bär namn efter kända göteborgare,
   och namnen har flyttats mellan vagnar när gamla skrotats, så det är
   Göteborgs Spårvägars egen lista som gäller. Läser barnet numret på ett
   foto får det vagnens kort. */
export const VAGNTYPER = [
  /* delar: delarnas längder i förhållande till varandra, fram till bak.
     boggier: hjulpar under varje del. band: fönsterbandets färg – vitt på de
     gamla, svart på de nya. saknas: nummer i serien som ingen vagn har.
     Ordningen avgör vilken typ ett nummer i ett foto hör till: M31 före M31B,
     som är samma vagnar ombyggda. */
  { typ:"M28", fran:701, till:770, smek:"Boggivagnen", byggd:"1965–1967", av:"ASEA och ASJ, Sverige", langd:15, platser:116, sitt:38,
    delar:[1], boggier:[2], band:"vit", museum:true,
    om:"Den gamla korta vagnen med runda hörn. Gick i trafik ända till 2021 – två av dem, 755 och 770, finns kvar som museivagnar hos Ringlinien i Gårda." },
  { typ:"M29", fran:801, till:860, smek:"Boggivagnen", byggd:"1969–1972", av:"Hägglunds, Örnsköldsvik", langd:15, platser:118, sitt:36,
    delar:[1], boggier:[2], band:"vit",
    om:"Nästan likadan som M28. Tjugo av dem rullar till 2027, oftast två ihopkopplade efter varandra – sedan skänks många av dem till Mykolajiv i Ukraina." },
  { typ:"M31", fran:300, till:380, smek:"Ledvagnen", byggd:"1984–1992, ombyggd 1998–2003", av:"ASEA, ny mittdel från MGB", langd:31, platser:202, sitt:83,
    delar:[11,7,11], boggier:[2,0,1], band:"vit", saknas:[306],
    om:"Tre delar med lågt golv i mitten, så barnvagnar rullar rakt in. Byggdes om från de gamla M21-vagnarna. Numren går från 300 till 380, men 306 finns inte." },
  { typ:"M31B", fran:300, till:380, smek:"Nya ledvagnen", byggd:"ombyggd 2025–2030", av:"Škoda, Tjeckien", langd:31, platser:202, sitt:83,
    delar:[11,7,11], boggier:[2,0,1], band:"svart", saknas:[306], ombyggd:true,
    om:"En M31 som fått nytt liv hos Škoda: nya säten, nya bromsar och dörrar, tystare, och ett svart band runt fönstren så den liknar M33 och M34. Den första gick i trafik i december 2025, och till 2030 ska alla 79 vara ombyggda." },
  { typ:"M32", fran:401, till:465, smek:"Sirio", byggd:"2004–2013", av:"AnsaldoBreda, Italien", langd:29, platser:191, sitt:87,
    delar:[8,3,7,3,8], boggier:[1,0,1,0,1], band:"vit",
    om:"Italienaren! Fem delar och lågt golv hela vägen. Vagnen heter Sirio, som stjärnan Sirius." },
  { typ:"M33", fran:490, till:530, smek:"Flexity", byggd:"2019–2023", av:"Bombardier och Alstom, Tyskland och Österrike", langd:33, platser:230, sitt:75,
    delar:[12,8,12], boggier:[1,1,1], band:"svart", saknas:[500],
    om:"Blå med ett svart band runt fönstren och stora rutor. Tio av dem, 490 till 499, har förarhytt i båda ändar och kan köra åt båda håll." },
  { typ:"M34", fran:601, till:660, smek:"Långa Flexity", byggd:"2024–2027", av:"Alstom, Tyskland och Österrike", langd:45, platser:305, sitt:113,
    delar:[13,4,11,4,13], boggier:[2,0,2,0,2], band:"svart",
    om:"Göteborgs längsta spårvagn: 45 meter, nästan lika lång som fyra bussar. Första turen gick 19 januari 2025 på linje 11 mot Bergsjön." }
];
export const VAGNNAMN = {
  318:["Bebben", "Bertil Johansson, fotbollsspelare i IFK Göteborg"],
  364:["Gunnar Gren", "fotbollsspelare från Göteborg"],
  405:["Gunnar Bergdahl", "fick Spårvägarnas kulturpris 1997"],
  406:["Claes Hylinger", "författare, kulturpriset 1998"],
  407:["Lena Brogren", "skådespelerska, kulturpriset 1999"],
  415:["Galenskaparna och After Shave", "humorgrupp från Göteborg"],
  425:["Per Andersson", "fick Spårvägarnas kulturpris 2017"],
  434:["Kapten Bölja", "smeknamn på Hans Hansson, som ledde stadens fullmäktige"],
  440:["Marianne Mörck", "skådespelerska och sångerska"],
  446:["Helge Härneman", "sportreporter"],
  454:["Ronny Jönsson", "rolig figur i lokalradion"],
  457:["Lasse Dahlquist", "vissångare som skrev sånger om Göteborg"],
  705:["Ester i Brunnsparken", "tidningsförsäljare som alla i stan kände"],
  717:["Ninnan Santesson", "konstnär"],
  807:["Hulda Sköldberg", "fiskhandlare"]
};

export const TRAM_LINES = [
  { ref:"1", col:"#FFFFFF", a:"Östra Sjukhuset", b:"Tynnered",
    stops:["Östra Sjukhuset","Tingvallsvägen","Kaggeledstorget","Munkebäckstorget","Härlanda","Stockholmsgatan","Redbergsplatsen","Olskrokstorget","Svingeln","Ullevi Norra","Drottningtorget","Brunnsparken","Stenpiren","Järntorget","Prinsgatan","Olivedalsgatan","Linnéplatsen","Botaniska Trädgården","Marklandsgatan","Axel Dahlströms Torg","Lantmilsgatan","Nymilsgatan","Musikvägen","Positivgatan","Frölunda Torg","Briljantgatan","Smaragdgatan","Opaltorget"] },
  { ref:"2", col:"#FFDD00", a:"Biskopsgården", b:"Högsbotorp",
    stops:["Väderilsgatan","Friskväderstorget","Önskevädersgatan","Mildvädersgatan","Vårväderstorget","Sälöfjordsgatan","Eketrägatan","Gropegårdsgatan","Rambergsvallen","Wieselgrensplatsen","Vågmästareplatsen","Hjalmar Brantingsplatsen","Frihamnen","Nils Ericsonsplatsen","Brunnsparken","Domkyrkan","Grönsakstorget","Vasaplatsen","Vasa Viktoriagatan","Handelshögskolan","Brunnsgatan","Seminariegatan","Olivedalsgatan","Linnéplatsen","Botaniska Trädgården","Marklandsgatan","Axel Dahlströms Torg"] },
  { ref:"3", col:"#0079C1", a:"Kålltorp", b:"Marklandsgatan",
    stops:["Virginsgatan","Solrosgatan","Härlanda","Stockholmsgatan","Redbergsplatsen","Olskrokstorget","Svingeln","Ullevi Norra","Drottningtorget","Brunnsparken","Kungsportsplatsen","Valand","Vasaplatsen","Vasa Viktoriagatan","Hagakyrkan","Järntorget","Masthuggstorget","Stigbergstorget","Kaptensgatan","Chapmans Torg","Jaegerdorffsplatsen","Vagnhallen Majorna","Ostindiegatan","Mariaplan","Godhemsgatan","Klintens Väg","Högsbogatan","Bokekullsgatan","Marklandsgatan"] },
  { ref:"4", col:"#00A261", a:"Mölndal", b:"Angered",
    stops:["Mölndals Innerstad","Mölndals sjukhus","Lackarebäck","Krokslätts Fabriker","Krokslätts torg","Lana","Varbergsgatan","Elisedal","Almedal","Liseberg Södra","Korsvägen","Berzeliigatan","Valand","Kungsportsplatsen","Brunnsparken","Drottningtorget","Gamlestads Torg","Hjällbo","Hammarkullen","Storås","Angered Centrum"] },
  { ref:"5", col:"#EF3D42", a:"Länsmansgården", b:"Östra Sjukhuset",
    stops:["Varmfrontsgatan","Temperaturgatan","Väderilsgatan","Friskväderstorget","Önskevädersgatan","Mildvädersgatan","Vårväderstorget","Sälöfjordsgatan","Eketrägatan","Gropegårdsgatan","Rambergsvallen","Wieselgrensplatsen","Vågmästareplatsen","Hjalmar Brantingsplatsen","Frihamnen","Lilla Bommen","Brunnsparken","Kungsportsplatsen","Valand","Berzeliigatan","Korsvägen","Liseberg Station","Sankt Sigfrids Plan","Ekmanska","Bögatan","Töpelsgatan","Welandergatan","Virginsgatan","Solrosgatan","Munkebäckstorget","Kaggeledstorget","Tingvallsvägen","Östra Sjukhuset"] },
  { ref:"6", col:"#F89728", a:"Länsmansgården", b:"Kortedala",
    stops:["Varmfrontsgatan","Temperaturgatan","Väderilsgatan","Friskväderstorget","Önskevädersgatan","Mildvädersgatan","Vårväderstorget","Sälöfjordsgatan","Eketrägatan","Gropegårdsgatan","Rambergsvallen","Wieselgrensplatsen","Vågmästareplatsen","Hjalmar Brantingsplatsen","Frihamnen","Nils Ericsonsplatsen","Brunnsparken","Domkyrkan","Grönsakstorget","Hagakyrkan","Järntorget","Prinsgatan","Olivedalsgatan","Linnéplatsen","Sahlgrenska Huvudentré","Medicinaregatan","Wavrinskys Plats","Chalmers","Korsvägen","Scandinavium","Ullevi Södra","Ullevi Norra","Svingeln","Olskrokstorget","Redbergsplatsen","Ejdergatan","Gamlestads Torg","SKF","Bellevue","Kviberg","Beväringsgatan","Nymånegatan","Runstavsgatan","Kortedala Torg","Allhelgonakyrkan","Aprilgatan"] },
  { ref:"7", col:"#9C5707", a:"Tynnered", b:"Bergsjön",
    stops:["Opaltorget","Smaragdgatan","Briljantgatan","Frölunda Torg","Positivgatan","Musikvägen","Nymilsgatan","Lantmilsgatan","Axel Dahlströms Torg","Marklandsgatan","Botaniska Trädgården","Sahlgrenska Huvudentré","Medicinaregatan","Wavrinskys Plats","Chalmers","Kapellplatsen","Vasaplatsen","Valand","Kungsportsplatsen","Brunnsparken","Drottningtorget","Gamlestads Torg","SKF","Bellevue","Kviberg","Beväringsgatan","Nymånegatan","Runstavsgatan","Kortedala Torg","Allhelgonakyrkan","Januarigatan","Galileis Gata","Teleskopgatan","Rymdtorget","Komettorget"] },
  { ref:"8", col:"#A54399", a:"Angered", b:"Frölunda",
    stops:["Angered Centrum","Storås","Hammarkullen","Hjällbo","Gamlestads Torg","Ejdergatan","Redbergsplatsen","Olskrokstorget","Svingeln","Ullevi Norra","Ullevi Södra","Scandinavium","Korsvägen","Chalmers","Wavrinskys Plats","Medicinaregatan","Sahlgrenska Huvudentré","Botaniska Trädgården","Marklandsgatan","Axel Dahlströms Torg","Lantmilsgatan","Nymilsgatan","Musikvägen","Positivgatan","Frölunda Torg"] },
  { ref:"9", col:"#B9E3F9", a:"Angered", b:"Kungssten",
    stops:["Angered Centrum","Storås","Hammarkullen","Hjällbo","Gamlestads Torg","Drottningtorget","Brunnsparken","Domkyrkan","Grönsakstorget","Hagakyrkan","Järntorget","Masthuggstorget","Stigbergstorget","Kaptensgatan","Chapmans Torg","Jaegerdorffsplatsen","Vagnhallen Majorna","Ostindiegatan","Sannaplan","Sandarna","Kungssten"] },
  { ref:"10", col:"#C8DF8E", a:"Lindholmen", b:"Guldheden",
    stops:["Lindholmen","Pumpgatan","Jubileumsparken","Lilla Bommen","Brunnsparken","Kungsportsplatsen","Valand","Vasaplatsen","Kapellplatsen","Chalmers","Wavrinskys Plats","Dr. Fries Torg","Dr. Sydows Gata"] },
  { ref:"11", col:"#231F20", a:"Saltholmen", b:"Bergsjön",
    stops:["Saltholmen","Långedrag","Hinsholmen","Käringberget","Tranered","Hagen","Nya Varvsallén","Kungssten","Sandarna","Sannaplan","Mariaplan","Godhemsgatan","Ekedal","Majvallen","Fjällgatan","Stigbergstorget","Masthuggstorget","Järntorget","Stenpiren","Brunnsparken","Drottningtorget","Gamlestads Torg","SKF","Bellevue","Kviberg","Beväringsgatan","Nymånegatan","Runstavsgatan","Kortedala Torg","Allhelgonakyrkan","Januarigatan","Galileis Gata","Teleskopgatan","Rymdtorget","Komettorget"] },
  { ref:"12", col:"#56C2B6", a:"Mölndal", b:"Lindholmen",
    stops:["Mölndals Innerstad","Mölndals sjukhus","Lackarebäck","Krokslätts Fabriker","Krokslätts torg","Lana","Varbergsgatan","Elisedal","Almedal","Liseberg Södra","Korsvägen","Scandinavium","Ullevi Södra","Drottningtorget","Nils Ericsonsplatsen","Jubileumsparken","Pumpgatan","Lindholmen"] }
];

/* Hållplatser vars namn förtjänar en egen bild. Övriga får sin bild
   av namnets ändelse: torg, plats, kyrka, sjukhus – annars en gata. */
export const STOP_ART = {
 "Allhelgonakyrkan":"kyrka",
 "Angered Centrum":"hoghus",
 "Aprilgatan":"hoghus",
 "Axel Dahlströms Torg":"affar",
 "Bellevue":"skog",
 "Berzeliigatan":"noje",
 "Beväringsgatan":"hoghus",
 "Botaniska Trädgården":"blomma",
 "Briljantgatan":"sten",
 "Brunnsparken":"fontan",
 "Bögatan":"skog",
 "Chalmers":"skola",
 "Dr. Fries Torg":"skola",
 "Dr. Sydows Gata":"skola",
 "Domkyrkan":"kyrka",
 "Drottningtorget":"station",
 "Ekmanska":"sjukhus",
 "Fjällgatan":"hav",
 "Frihamnen":"hamn",
 "Friskväderstorget":"vader",
 "Frölunda Torg":"affar",
 "Galileis Gata":"rymd",
 "Gamlestads Torg":"station",
 "Gropegårdsgatan":"fabrik",
 "Hagakyrkan":"kyrka",
 "Hagen":"skog",
 "Hammarkullen":"hoghus",
 "Handelshögskolan":"skola",
 "Hinsholmen":"hav",
 "Hjällbo":"hoghus",
 "Härlanda":"skog",
 "Januarigatan":"hoghus",
 "Jubileumsparken":"hamn",
 "Kapellplatsen":"skola",
 "Komettorget":"rymd",
 "Korsvägen":"noje",
 "Kortedala Torg":"hoghus",
 "Krokslätts Fabriker":"fabrik",
 "Kungsportsplatsen":"noje",
 "Kviberg":"arena",
 "Käringberget":"hav",
 "Lilla Bommen":"hamn",
 "Lindholmen":"hamn",
 "Linnéplatsen":"skog",
 "Liseberg Station":"station",
 "Liseberg Södra":"noje",
 "Långedrag":"hav",
 "Mariaplan":"affar",
 "Marklandsgatan":"affar",
 "Masthuggstorget":"hamn",
 "Medicinaregatan":"sjukhus",
 "Mildvädersgatan":"vader",
 "Musikvägen":"musik",
 "Mölndals Innerstad":"station",
 "Mölndals sjukhus":"sjukhus",
 "Nils Ericsonsplatsen":"station",
 "Nya Varvsallén":"hamn",
 "Nymånegatan":"hoghus",
 "Opaltorget":"sten",
 "Ostindiegatan":"hamn",
 "Positivgatan":"musik",
 "Pumpgatan":"hamn",
 "Rambergsvallen":"arena",
 "Runstavsgatan":"hoghus",
 "Rymdtorget":"rymd",
 "SKF":"fabrik",
 "Sahlgrenska Huvudentré":"sjukhus",
 "Saltholmen":"hav",
 "Scandinavium":"arena",
 "Seminariegatan":"skola",
 "Smaragdgatan":"sten",
 "Solrosgatan":"blomma",
 "Stenpiren":"hamn",
 "Storås":"hoghus",
 "Svingeln":"station",
 "Sälöfjordsgatan":"hav",
 "Teleskopgatan":"rymd",
 "Temperaturgatan":"vader",
 "Tranered":"skog",
 "Ullevi Norra":"arena",
 "Ullevi Södra":"arena",
 "Vagnhallen Majorna":"vagnhall",
 "Valand":"noje",
 "Varmfrontsgatan":"vader",
 "Vasa Viktoriagatan":"skola",
 "Väderilsgatan":"vader",
 "Vårväderstorget":"vader",
 "Wavrinskys Plats":"skola",
 "Önskevädersgatan":"vader",
 "Östra Sjukhuset":"sjukhus"
};

export const STOP_PHOTOS = {
  "Allhelgonakyrkan": { f:"allhelgonakyrkan", by:"Bulver", lic:"CC BY-SA 4.0" },
  "Almedal": { f:"almedal", by:"okänd", lic:"CC0" },
  "Angered Centrum": { f:"angered-centrum", by:"Albin Olsson", lic:"CC BY-SA 3.0" },
  "Axel Dahlströms Torg": { f:"axel-dahlstroms-torg", by:"Bo Randstedt", lic:"CC BY-SA 3.0" },
  "Bellevue": { f:"bellevue", by:"Bulver", lic:"CC BY-SA 4.0" },
  "Berzeliigatan": { f:"berzeliigatan", by:"Mattias Blomgren", lic:"CC BY-SA 3.0" },
  "Botaniska Trädgården": { f:"botaniska-tradgarden", by:"Björn Reilund", lic:"CC BY-SA 4.0" },
  "Brunnsgatan": { f:"brunnsgatan", by:"BoneheadElsewhere", lic:"CC BY-SA 4.0" },
  "Bögatan": { f:"bogatan", by:"Mattias Blomgren", lic:"CC BY-SA 4.0" },
  "Chalmers": { f:"chalmers", by:"Leif Jørgensen", lic:"CC BY-SA 4.0" },
  "Chapmans Torg": { f:"chapmans-torg", by:"Fluff", lic:"CC BY-SA 3.0" },
  "Domkyrkan": { f:"domkyrkan", by:"AleWi", lic:"CC BY-SA 4.0" },
  "Drottningtorget": { f:"drottningtorget", by:"Björn Reilund", lic:"CC BY-SA 4.0" },
  "Dr. Fries Torg": { f:"dr-fries-torg", by:"Björn Reilund", lic:"CC BY-SA 4.0" },
  "Dr. Sydows Gata": { f:"dr-sydows-gata", by:"Mangan2002", lic:"CC BY 3.0" },
  "Ejdergatan": { f:"ejdergatan", by:"Bo Randstedt", lic:"CC BY-SA 3.0" },
  "Eketrägatan": { f:"eketragatan", by:"Bo Randstedt", lic:"CC BY-SA 3.0" },
  "Ekmanska": { f:"ekmanska", by:"Mattias Blomgren", lic:"CC BY-SA 4.0" },
  "Elisedal": { f:"elisedal", by:"Vogler", lic:"CC BY-SA 4.0" },
  "Fjällgatan": { f:"fjallgatan", by:"Alexmar983", lic:"CC BY-SA 4.0" },
  "Frihamnen": { f:"frihamnen", by:"ArildV", lic:"CC BY-SA 4.0" },
  "Friskväderstorget": { f:"friskvaderstorget", by:"Alicia Fagerving", lic:"CC BY-SA 3.0" },
  "Frölunda Torg": { f:"frolunda-torg", by:"Albin Olsson", lic:"CC BY-SA 3.0" },
  "Galileis Gata": { f:"galileis-gata", by:"Bulver", lic:"CC BY-SA 4.0" },
  "Gamlestads Torg": { f:"gamlestads-torg", by:"AleWi", lic:"CC BY-SA 4.0" },
  "Gropegårdsgatan": { f:"gropegardsgatan", by:"Alicia Fagerving", lic:"CC BY-SA 3.0" },
  "Grönsakstorget": { f:"gronsakstorget", by:"Liberaler Humanist", lic:"CC BY-SA 3.0" },
  "Hagakyrkan": { f:"hagakyrkan", by:"Subbass1", lic:"CC BY-SA 4.0" },
  "Hagen": { f:"hagen", by:"Mattias Blomgren", lic:"CC BY-SA 4.0" },
  "Hammarkullen": { f:"hammarkullen", by:"Kaakkuri86", lic:"CC BY-SA 4.0" },
  "Handelshögskolan": { f:"handelshogskolan", by:"Albin Olsson", lic:"CC BY-SA 3.0" },
  "Hjällbo": { f:"hjallbo", by:"Bulver", lic:"CC BY-SA 4.0" },
  "Härlanda": { f:"harlanda", by:"Lars Mongs, Arxfoto", lic:"CC BY 4.0" },
  "Högsbogatan": { f:"hogsbogatan", by:"Roy Olsen", lic:"CC BY-SA 4.0" },
  "Jaegerdorffsplatsen": { f:"jaegerdorffsplatsen", by:"Paracel63", lic:"CC BY-SA 3.0" },
  "Jubileumsparken": { f:"jubileumsparken", by:"Phyrexian", lic:"CC BY-SA 4.0" },
  "Järntorget": { f:"jarntorget", by:"Florent Pécassou", lic:"CC BY-SA 4.0" },
  "Kaggeledstorget": { f:"kaggeledstorget", by:"Mattias Blomgren", lic:"CC BY-SA 4.0" },
  "Kapellplatsen": { f:"kapellplatsen", by:"Harri Blomberg", lic:"CC BY-SA 3.0" },
  "Kaptensgatan": { f:"kaptensgatan", by:"Wikigabriel11", lic:"CC BY-SA 3.0" },
  "Klintens Väg": { f:"klintens-vag", by:"Historiker", lic:"CC BY-SA 3.0" },
  "Komettorget": { f:"komettorget", by:"Kaakkuri86", lic:"CC BY-SA 4.0" },
  "Korsvägen": { f:"korsvagen", by:"AleWi", lic:"CC BY-SA 4.0" },
  "Kortedala Torg": { f:"kortedala-torg", by:"Alicia Fagerving", lic:"CC BY-SA 3.0" },
  "Krokslätts Fabriker": { f:"krokslatts-fabriker", by:"DavidIvar", lic:"CC BY-SA 4.0" },
  "Krokslätts torg": { f:"krokslatts-torg", by:"DavidIvar", lic:"CC BY-SA 4.0" },
  "Kungssten": { f:"kungssten", by:"Bo Randstedt", lic:"CC BY-SA 3.0" },
  "Kviberg": { f:"kviberg", by:"Joshua06", lic:"CC BY-SA 4.0" },
  "Käringberget": { f:"karingberget", by:"Göta lejon", lic:"CC BY-SA 3.0" },
  "Lilla Bommen": { f:"lilla-bommen", by:"AleWi", lic:"CC BY-SA 4.0" },
  "Lindholmen": { f:"lindholmen", by:"Johan Jönsson (Julle)", lic:"CC BY-SA 4.0" },
  "Linnéplatsen": { f:"linneplatsen", by:"Liberaler Humanist", lic:"CC BY-SA 3.0" },
  "Liseberg Station": { f:"liseberg-station", by:"AleWi", lic:"CC BY-SA 4.0" },
  "Liseberg Södra": { f:"liseberg-sodra", by:"Albin Olsson", lic:"CC BY-SA 3.0" },
  "Majvallen": { f:"majvallen", by:"Leif Skoog", lic:"CC BY-SA 4.0" },
  "Mariaplan": { f:"mariaplan", by:"Per A J Andersson", lic:"CC BY-SA 3.0" },
  "Marklandsgatan": { f:"marklandsgatan", by:"Albin Olsson", lic:"CC BY-SA 3.0" },
  "Masthuggstorget": { f:"masthuggstorget", by:"Fluff", lic:"CC BY-SA 3.0" },
  "Medicinaregatan": { f:"medicinaregatan", by:"Mattias Blomgren", lic:"CC BY-SA 3.0" },
  "Mildvädersgatan": { f:"mildvadersgatan", by:"Bo Randstedt", lic:"CC BY-SA 3.0" },
  "Munkebäckstorget": { f:"munkebackstorget", by:"Raphael Saulus", lic:"Public domain" },
  "Musikvägen": { f:"musikvagen", by:"BoneheadElsewhere", lic:"CC BY-SA 4.0" },
  "Mölndals Innerstad": { f:"molndals-innerstad", by:"AleWi", lic:"CC BY-SA 4.0" },
  "Mölndals sjukhus": { f:"molndals-sjukhus", by:"AleWi", lic:"CC BY-SA 4.0" },
  "Nymånegatan": { f:"nymanegatan", by:"ilex se", lic:"CC BY-SA 4.0" },
  "Olivedalsgatan": { f:"olivedalsgatan", by:"Vogler", lic:"CC BY-SA 4.0" },
  "Olskrokstorget": { f:"olskrokstorget", by:"Raphael Saulus", lic:"Public domain" },
  "Opaltorget": { f:"opaltorget", by:"Eva Ekeblad", lic:"CC BY-SA 3.0" },
  "Ostindiegatan": { f:"ostindiegatan", by:"Andersreilund", lic:"CC BY-SA 4.0" },
  "Positivgatan": { f:"positivgatan", by:"Albin Olsson", lic:"CC BY-SA 3.0" },
  "Prinsgatan": { f:"prinsgatan", by:"BoneheadElsewhere", lic:"CC BY-SA 4.0" },
  "Rambergsvallen": { f:"rambergsvallen", by:"Bo Randstedt", lic:"CC BY-SA 4.0" },
  "Redbergsplatsen": { f:"redbergsplatsen", by:"Liberaler Humanist", lic:"CC BY-SA 3.0" },
  "Runstavsgatan": { f:"runstavsgatan", by:"Harri Blomberg", lic:"CC BY-SA 3.0" },
  "Rymdtorget": { f:"rymdtorget", by:"Harri Blomberg", lic:"CC BY-SA 3.0" },
  "Sahlgrenska Huvudentré": { f:"sahlgrenska-huvudentre", by:"Liv Lovisa", lic:"CC BY 4.0" },
  "Saltholmen": { f:"saltholmen", by:"murizvo57", lic:"CC BY 3.0" },
  "Sandarna": { f:"sandarna", by:"DavidIvar", lic:"CC BY-SA 4.0" },
  "Sankt Sigfrids Plan": { f:"sankt-sigfrids-plan", by:"Historiker", lic:"CC BY-SA 3.0" },
  "Sannaplan": { f:"sannaplan", by:"Bo Randstedt", lic:"CC BY-SA 4.0" },
  "Scandinavium": { f:"scandinavium", by:"AleWi", lic:"CC BY-SA 4.0" },
  "Seminariegatan": { f:"seminariegatan", by:"Leo Bonsdorff, 1878 - 1937", lic:"Public domain" },
  "SKF": { f:"skf", by:"Harri Blomberg", lic:"CC BY-SA 3.0" },
  "Stenpiren": { f:"stenpiren", by:"AleWi", lic:"CC BY-SA 4.0" },
  "Stigbergstorget": { f:"stigbergstorget", by:"Wikigabriel11", lic:"CC BY-SA 3.0" },
  "Stockholmsgatan": { f:"stockholmsgatan", by:"Roy Olsen", lic:"CC BY-SA 4.0" },
  "Storås": { f:"storas", by:"elysia", lic:"CC BY 4.0" },
  "Svingeln": { f:"svingeln", by:"Paxxen", lic:"CC BY-SA 4.0" },
  "Sälöfjordsgatan": { f:"salofjordsgatan", by:"Bo Randstedt", lic:"CC BY-SA 4.0" },
  "Teleskopgatan": { f:"teleskopgatan", by:"Alicia Fagerving", lic:"CC BY-SA 3.0" },
  "Temperaturgatan": { f:"temperaturgatan", by:"Photo by Harri Blomberg.", lic:"CC BY-SA 3.0" },
  "Tingvallsvägen": { f:"tingvallsvagen", by:"Bo Randstedt", lic:"CC BY-SA 4.0" },
  "Vagnhallen Majorna": { f:"vagnhallen-majorna", by:"Albin Olsson", lic:"CC BY-SA 3.0" },
  "Valand": { f:"valand", by:"Bahnfrend", lic:"CC BY-SA 4.0" },
  "Varbergsgatan": { f:"varbergsgatan", by:"Bo Randstedt", lic:"CC BY-SA 3.0" },
  "Varmfrontsgatan": { f:"varmfrontsgatan", by:"Bo Randstedt", lic:"CC BY-SA 3.0" },
  "Vasaplatsen": { f:"vasaplatsen", by:"Henrik Sendelbach", lic:"CC BY-SA 3.0" },
  "Vasa Viktoriagatan": { f:"vasa-viktoriagatan", by:"Bo Randstedt", lic:"CC BY-SA 3.0" },
  "Vågmästareplatsen": { f:"vagmastareplatsen", by:"Bo Randstedt", lic:"CC BY-SA 3.0" },
  "Vårväderstorget": { f:"varvaderstorget", by:"Bo Randstedt", lic:"CC BY-SA 4.0" },
  "Väderilsgatan": { f:"vaderilsgatan", by:"Averater", lic:"CC BY-SA 3.0" },
  "Wavrinskys Plats": { f:"wavrinskys-plats", by:"Fluff", lic:"CC BY-SA 3.0" },
  "Wieselgrensplatsen": { f:"wieselgrensplatsen", by:"Vogler", lic:"CC BY-SA 4.0" },
  "Önskevädersgatan": { f:"onskevadersgatan", by:"Bo Randstedt", lic:"CC BY-SA 4.0" },
  "Östra Sjukhuset": { f:"ostra-sjukhuset", by:"Leif Jørgensen", lic:"CC BY-SA 4.0" }
};

/* Hållplatser utan eget foto får en spårvagn i stället för ingenting alls.
   Vilken vagn avgörs av hållplatsens namn, så det blir samma varje gång –
   ett foto man känner igen, inte en ny bild vid varje besök. */
export const TRAM_PHOTOS = [
  { f:"vagn-01", by:"AleWi", lic:"CC BY-SA 4.0" },
  { f:"vagn-02", by:"AleWi", lic:"CC BY-SA 4.0" },
  { f:"vagn-03", by:"AleWi", lic:"CC BY-SA 4.0" },
  { f:"vagn-04", by:"Spoorjan", lic:"CC BY-SA 3.0" },
  { f:"vagn-05", by:"AleWi", lic:"CC BY-SA 4.0" },
  { f:"vagn-06", by:"Albin Olsson", lic:"CC BY-SA 3.0" },
  { f:"vagn-07", by:"Albin Olsson", lic:"CC BY-SA 3.0" },
  { f:"vagn-08", by:"Harri Blomberg", lic:"CC BY-SA 3.0" },
  { f:"vagn-09", by:"AleWi", lic:"CC BY-SA 4.0" },
  { f:"vagn-10", by:"AleWi", lic:"CC BY-SA 4.0" },
  { f:"vagn-11", by:"Danica", lic:"Public domain" },
  { f:"vagn-12", by:"Danica", lic:"Public domain" },
  { f:"vagn-13", by:"Danica", lic:"Public domain" },
  { f:"vagn-14", by:"AleWi", lic:"CC BY-SA 4.0" },
  { f:"vagn-15", by:"AleWi", lic:"CC BY-SA 4.0" },
  { f:"vagn-16", by:"Smiley.toerist", lic:"CC BY-SA 4.0" }
];

export const STOP_XY = {
  "Allhelgonakyrkan":[744,210],
  "Almedal":[631,792],
  "Angered Centrum":[740,30],
  "Aprilgatan":[753,193],
  "Axel Dahlströms Torg":[281,884],
  "Bellevue":[735,358],
  "Berzeliigatan":[573,705],
  "Beväringsgatan":[738,309],
  "Bokekullsgatan":[295,857],
  "Botaniska Trädgården":[349,840],
  "Briljantgatan":[222,1002],
  "Brunnsgatan":[407,756],
  "Brunnsparken":[472,583],
  "Bögatan":[734,645],
  "Chalmers":[499,789],
  "Chapmans Torg":[212,708],
  "Domkyrkan":[415,642],
  "Drottningtorget":[533,567],
  "Dr. Fries Torg":[496,829],
  "Dr. Sydows Gata":[509,852],
  "Ejdergatan":[683,435],
  "Ekedal":[260,783],
  "Eketrägatan":[175,492],
  "Ekmanska":[707,663],
  "Elisedal":[639,814],
  "Fjällgatan":[279,724],
  "Frihamnen":[412,409],
  "Friskväderstorget":[129,443],
  "Frölunda Torg":[245,986],
  "Galileis Gata":[787,202],
  "Gamlestads Torg":[666,376],
  "Godhemsgatan":[253,794],
  "Gropegårdsgatan":[208,471],
  "Grönsakstorget":[427,670],
  "Hagakyrkan":[421,703],
  "Hagen":[121,833],
  "Hammarkullen":[715,95],
  "Handelshögskolan":[425,735],
  "Hinsholmen":[62,862],
  "Hjalmar Brantingsplatsen":[366,414],
  "Hjällbo":[677,137],
  "Härlanda":[741,473],
  "Högsbogatan":[279,834],
  "Jaegerdorffsplatsen":[200,730],
  "Januarigatan":[753,196],
  "Jubileumsparken":[421,429],
  "Järntorget":[351,683],
  "Kaggeledstorget":[780,442],
  "Kapellplatsen":[505,765],
  "Kaptensgatan":[237,689],
  "Klintens Väg":[266,816],
  "Komettorget":[859,270],
  "Korsvägen":[598,715],
  "Kortedala Torg":[735,232],
  "Krokslätts Fabriker":[663,886],
  "Krokslätts torg":[659,867],
  "Kungsportsplatsen":[484,653],
  "Kungssten":[170,807],
  "Kviberg":[736,330],
  "Käringberget":[91,859],
  "Lackarebäck":[661,923],
  "Lana":[648,851],
  "Lantmilsgatan":[277,915],
  "Lilla Bommen":[445,528],
  "Lindholmen":[270,570],
  "Linnéplatsen":[368,780],
  "Liseberg Station":[639,700],
  "Liseberg Södra":[615,758],
  "Långedrag":[41,854],
  "Majvallen":[282,754],
  "Mariaplan":[228,776],
  "Marklandsgatan":[313,878],
  "Masthuggstorget":[300,679],
  "Medicinaregatan":[446,823],
  "Mildvädersgatan":[115,509],
  "Munkebäckstorget":[763,475],
  "Musikvägen":[271,958],
  "Mölndals Innerstad":[670,972],
  "Mölndals sjukhus":[663,946],
  "Nils Ericsonsplatsen":[504,530],
  "Nya Varvsallén":[150,820],
  "Nymilsgatan":[284,941],
  "Nymånegatan":[739,292],
  "Olivedalsgatan":[370,764],
  "Olskrokstorget":[665,492],
  "Opaltorget":[218,1030],
  "Ostindiegatan":[207,762],
  "Positivgatan":[262,969],
  "Prinsgatan":[350,719],
  "Pumpgatan":[303,518],
  "Rambergsvallen":[241,453],
  "Redbergsplatsen":[687,479],
  "Runstavsgatan":[732,259],
  "Rymdtorget":[841,240],
  "Sahlgrenska Huvudentré":[429,833],
  "Saltholmen":[30,895],
  "Sandarna":[194,796],
  "Sankt Sigfrids Plan":[665,682],
  "Sannaplan":[217,791],
  "Scandinavium":[602,676],
  "Seminariegatan":[396,767],
  "SKF":[699,373],
  "Smaragdgatan":[211,1016],
  "Solrosgatan":[761,493],
  "Stenpiren":[366,605],
  "Stigbergstorget":[264,677],
  "Stockholmsgatan":[721,479],
  "Storås":[741,76],
  "Svingeln":[633,501],
  "Sälöfjordsgatan":[148,523],
  "Teleskopgatan":[815,215],
  "Temperaturgatan":[147,371],
  "Tingvallsvägen":[806,432],
  "Tranered":[110,845],
  "Töpelsgatan":[756,629],
  "Ullevi Norra":[614,567],
  "Ullevi Södra":[606,624],
  "Vagnhallen Majorna":[195,749],
  "Valand":[524,694],
  "Varbergsgatan":[645,839],
  "Varmfrontsgatan":[157,341],
  "Vasaplatsen":[482,711],
  "Vasa Viktoriagatan":[455,720],
  "Virginsgatan":[760,547],
  "Vågmästareplatsen":[324,424],
  "Vårväderstorget":[120,531],
  "Väderilsgatan":[133,418],
  "Wavrinskys Plats":[470,798],
  "Welandergatan":[763,594],
  "Wieselgrensplatsen":[278,434],
  "Önskevädersgatan":[125,470],
  "Östra Sjukhuset":[826,453]
};

export const ALLA_STOPP = [...new Set(TRAM_LINES.flatMap(l => l.stops))].sort((a, b) => a.localeCompare(b, "sv"));

export const STARTPLATSER = [
  { namn: "Brunnsparken", ref: "3", rikt: 1, beskrivning: "Mitt i stan" },
  { namn: "Korsvägen", ref: "4", rikt: 1, beskrivning: "Vid Liseberg" },
  { namn: "Järntorget", ref: "11", rikt: -1, beskrivning: "Mot havet" }
];

export function namnFro(namn){
  let n = 0;
  for(let i = 0; i < namn.length; i++) n = (n * 31 + namn.charCodeAt(i)) % 100003;
  return n;
}

export const vagnFoto = (namn) => TRAM_PHOTOS[namnFro(namn) % TRAM_PHOTOS.length];
export const linjeAv = (ref) => TRAM_LINES.find(l => l.ref === String(ref)) || TRAM_LINES[0];
export const vagntypFor = (nr) => VAGNTYPER.find(t => nr >= t.fran && nr <= t.till) || null;
export const vagnTypAv = (namn) => VAGNTYPER.find(t => t.typ === namn) || null;
export const vagnNummerFinns = (typ, nr) => Number.isInteger(nr) && nr >= typ.fran && nr <= typ.till && !(typ.saknas || []).includes(nr);

export function stegaVagnNummer(typ, nr, steg){
  const antal = typ.till - typ.fran + 1;
  let n = nr + steg;
  const rikt = steg < 0 ? -1 : 1;
  for(let i = 0; i < antal; i++){
    if(n > typ.till) n = typ.fran + (n - typ.fran) % antal;
    if(n < typ.fran) n = typ.till - (typ.fran - n - 1) % antal;
    if(vagnNummerFinns(typ, n)) return n;
    n += rikt;
  }
  return typ.fran;
}

export function slumpaVagnNummer(typ){
  const mojliga = [];
  for(let n = typ.fran; n <= typ.till; n++) if(vagnNummerFinns(typ, n)) mojliga.push(n);
  return mojliga[Math.floor(Math.random() * mojliga.length)];
}

export function vagnkortFor(nr){
  const t = vagntypFor(nr);
  if(!t) return null;
  const namnPost = VAGNNAMN[nr];
  const fotoEntry = Object.entries(VAGNAR).find(([, v]) => v.nr === nr);
  return {
    nr,
    typ: t,
    namn: namnPost ? namnPost[0] : null,
    namnOm: namnPost ? namnPost[1] : null,
    foto: fotoEntry ? fotoEntry[0] : null
  };
}

export const ALLA_VAGNKORT_NR = [...new Set(Object.values(VAGNAR).map(v => v.nr))].sort((a, b) => a - b);

export function stopKind(namn){
  if(STOP_ART[namn]) return STOP_ART[namn];
  if(/(torg|torget)$/i.test(namn)) return "torg";
  if(/(platsen|plats|plan|vallen)$/i.test(namn)) return "torg";
  if(/kyrka/i.test(namn)) return "kyrka";
  if(/sjukhus/i.test(namn)) return "sjukhus";
  return "gata";
}

export const segNyckel = (a, b) => a < b ? a + "|" + b : b + "|" + a;

export const NAT_SEGMENT = (() => {
  const m = {};
  TRAM_LINES.forEach(l => {
    for(let i = 0; i + 1 < l.stops.length; i++){
      const k = segNyckel(l.stops[i], l.stops[i + 1]);
      (m[k] = m[k] || []).push(l.ref);
    }
  });
  Object.values(m).forEach(refs => refs.sort((a, b) => Number(a) - Number(b)));
  return m;
})();

export function avgangarFran(stopp){
  const ut = [];
  for(const l of TRAM_LINES){
    const idx = l.stops.indexOf(stopp);
    if(idx < 0) continue;
    if(idx + 1 < l.stops.length){
      ut.push({ ref: l.ref, col: l.col, rikt: 1, mot: l.b, nasta: l.stops[idx + 1], at: idx, linje: l });
    }
    if(idx - 1 >= 0){
      ut.push({ ref: l.ref, col: l.col, rikt: -1, mot: l.a, nasta: l.stops[idx - 1], at: idx, linje: l });
    }
  }
  return ut;
}

export function arSparrad(a, b, sparr){
  if(!sparr || sparr.length !== 2) return false;
  return segNyckel(a, b) === segNyckel(sparr[0], sparr[1]);
}

/* Kortaste väg i antal hållplatser (BFS) över hela spårvagnsnätet */
export function kortasteVag(fran, till, sparr){
  if(fran === till) return [fran];
  const bes = new Set([fran]);
  const ko = [[fran]];
  while(ko.length){
    const vag = ko.shift();
    const nu = vag[vag.length - 1];
    for(const avg of avgangarFran(nu)){
      if(arSparrad(nu, avg.nasta, sparr)) continue;
      if(bes.has(avg.nasta)) continue;
      const ny = [...vag, avg.nasta];
      if(avg.nasta === till) return ny;
      bes.add(avg.nasta);
      ko.push(ny);
    }
  }
  return null;
}

export function avstand(fran, till, sparr){
  const v = kortasteVag(fran, till, sparr);
  return v ? v.length - 1 : Infinity;
}

export function tipsForMal(linje, at, rikt, mal, sparr){
  const nu = linje.stops[at];
  if(!mal || nu === mal) return { kvar: 0, text: "Framme!", typ: "framme" };
  const vag = kortasteVag(nu, mal, sparr);
  if(!vag) return null;
  const kvar = vag.length - 1;
  const steg = vag[1];
  const nastaFram = linje.stops[at + rikt];
  const nastaBak = linje.stops[at - rikt];
  if(nastaFram === steg && !arSparrad(nu, nastaFram, sparr)){
    return { kvar, text: "Sitt kvar!", typ: "sitt", nasta: steg };
  }
  if(nastaBak === steg && !arSparrad(nu, nastaBak, sparr)){
    return { kvar, text: "Vänd!", typ: "vand", nasta: steg };
  }
  const byten = avgangarFran(nu).filter(a => a.nasta === steg && !arSparrad(nu, a.nasta, sparr));
  const bast = byten[0];
  if(bast){
    return { kvar, text: `Byt till linje ${bast.ref} mot ${bast.mot}`, typ: "byt", ref: bast.ref, mot: bast.mot, nasta: steg };
  }
  return { kvar, text: `Åk mot ${steg}`, typ: "byt", nasta: steg };
}

export function valjResmal(fran, besoktaSet, klarade = 0){
  const minD = Math.min(3 + Math.floor(klarade / 3), 5);
  const maxD = Math.min(minD + 3, 9);
  const kandidater = [];
  for(const s of ALLA_STOPP){
    if(s === fran) continue;
    const d = avstand(fran, s);
    if(d >= minD && d <= maxD){
      kandidater.push({
        namn: s,
        d,
        ny: !besoktaSet || !besoktaSet.has(s),
        harFoto: !!STOP_PHOTOS[s]
      });
    }
  }
  if(!kandidater.length) return ALLA_STOPP.find(s => s !== fran) || "Chalmers";
  const fina = kandidater.filter(k => k.ny && k.harFoto);
  const pool = fina.length ? fina : kandidater.filter(k => k.harFoto);
  const lista = pool.length ? pool : kandidater;
  return lista[Math.floor(Math.random() * lista.length)].namn;
}

export function valjSparr(fran, mal){
  const vag = kortasteVag(fran, mal);
  if(!vag || vag.length < 3) return null;
  const orig = vag.length - 1;
  const mojliga = [];
  for(let i = 0; i + 1 < vag.length; i++){
    const sp = [vag[i], vag[i + 1]];
    const alt = avstand(fran, mal, sp);
    if(alt > orig && alt <= orig + 5) mojliga.push(sp);
  }
  if(!mojliga.length) return null;
  return mojliga[Math.floor(Math.random() * mojliga.length)];
}
