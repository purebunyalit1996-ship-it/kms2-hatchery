const CACHE_NAME = "kms2-v36-stable-hotfix";

const FILES_TO_CACHE = [
  "./login.html",
  "./index.html?v=36",
  "./employee.html?v=36",
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
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.mode === "navigate" || req.url.includes("script.google.com")) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});
