// Cache-first offline shell. Bump CACHE when files change.
const CACHE = "gym-v3";
const IMG_FILES = ['calf', 'chest', 'crunch', 'csrow', 'dips', 'hcore', 'hipthrust', 'incline', 'kneeraise', 'lateral', 'legcurl', 'legext', 'legpress', 'lunge', 'pilates', 'plank', 'pulldown', 'rdl', 'row', 'shoulder', 'sideplank', 'situp', 'smith', 'stepup'].flatMap((l) => [`img/${l}-0.jpg`, `img/${l}-1.jpg`]);
const FILES = ["./", "index.html", "style.css", "data.js", "app.js", "manifest.webmanifest", "icon.svg"].concat(IMG_FILES);

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
