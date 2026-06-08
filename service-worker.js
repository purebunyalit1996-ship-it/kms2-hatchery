const CACHE_NAME = "kms2-dual-pwa-v32";

const FILES_TO_CACHE = [
  "./",
  "./login.html",
  "./index.html?v=32",
  "./employee.html?v=32",
  "./manifest.json",
  "./manifest-employee.json"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
