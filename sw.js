const CACHE_NAME = 'rt-lab-v4-20260913';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS.map((url) => cache.add(url).catch(() => {}))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // لا تكاش CDN (tailwind etc)
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req).then((networkRes) => {
        try {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
        } catch (e) {}
        return networkRes;
      }).catch(() => cached);
      // network first for index.html to get updates
      if (req.mode === 'navigate' || url.pathname.endsWith('index.html') || url.pathname.endsWith('/')) {
        return fetchPromise.then((r) => r || cached);
      }
      return cached || fetchPromise;
    })
  );
});
