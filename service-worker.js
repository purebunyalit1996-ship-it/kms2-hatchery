const CACHE_NAME = "kms2-remove-substitute-badge-layer-v74";
self.addEventListener("install", event => { self.skipWaiting(); });
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request, { cache: "no-store" }).catch(() => fetch(event.request)));
});
