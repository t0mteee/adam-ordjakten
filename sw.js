/* Ordjaktens servicearbetare — gör att spelet fungerar utan nätverk.
   Höj VERSION när spelet ändras, så hämtas det nya vid nästa start. */
const VERSION = "ordjakten-v1-r2";
const SKAL = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.webmanifest",
  "./apple-touch-icon.png",
  "./ikon-192.png",
  "./ikon-512.png",
  "./js/app.mjs",
  "./js/gbg-data.mjs",
  "./js/ord-data.mjs",
  "./js/konst.mjs",
  "./js/uppgifter.mjs",
  "./js/karta.mjs",
  "./js/ljud.mjs",
  "./js/lagring.mjs"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(SKAL.map(u => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  const typsnitt = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  const sida = req.mode === "navigate" || (url.origin === location.origin && /\.(html|mjs|css)$/.test(url.pathname));
  const klipplista = url.origin === location.origin && /\/ljud\/rost\/index\.json$/.test(url.pathname);

  if(sida || klipplista){
    e.respondWith(
      fetch(req.url, { cache: "no-cache", credentials: "same-origin" }).then(svar => {
        if(svar.ok){
          const kopia = svar.clone();
          caches.open(VERSION).then(c => c.put(req, kopia));
        }
        return svar;
      }).catch(() => caches.match(req).then(t => t || (req.mode === "navigate" ? caches.match("./index.html") : Response.error())))
    );
    return;
  }

  if(typsnitt || url.origin === location.origin){
    e.respondWith(
      caches.match(req).then(traff => traff || fetch(req).then(svar => {
        if(svar.ok || svar.type === "opaque"){
          const kopia = svar.clone();
          caches.open(VERSION).then(c => c.put(req, kopia));
        }
        return svar;
      }).catch(() => traff))
    );
  }
});
