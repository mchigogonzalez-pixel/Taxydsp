const CACHE = 'taxidsp-v4';
const ARCHIVOS = [
  '/Taxydsp/',
  '/Taxydsp/index.html',
  '/Taxydsp/manifest.json',
  '/Taxydsp/icon-192.png',
  '/Taxydsp/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
