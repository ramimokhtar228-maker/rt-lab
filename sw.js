const CACHE_NAME = 'rt-lab-v8-lock2';
const ASSETS = ['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => Promise.all(ASSETS.map(u => c.add(u).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message', e => { if(e.data && e.data.type==='SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const p = new URL(e.request.url).pathname || '';
  if (p.endsWith('.html') || p.endsWith('/') || p.endsWith('sw.js')) {
    e.respondWith(fetch(e.request, { cache: 'no-store' }));
    return;
  }
  e.respondWith(fetch(e.request).then(res => { try { const c=res.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(e.request,c)).catch(()=>{}); } catch(err){} return res; }).catch(()=>caches.match(e.request)));
});
