const CACHE_NAME='rt-lab-lis-v9';
self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  // Never cache HTML/JS blindly: stale application code was another source of
  // "old data coming back" after updates.
  const p=new URL(e.request.url).pathname||'';
  if(p.endsWith('.html')||p.endsWith('.js')||p.endsWith('/')||p.endsWith('sw.js')){
    e.respondWith(fetch(e.request,{cache:'no-store'}));
    return;
  }
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
