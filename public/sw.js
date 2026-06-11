const CACHE_NAME = 'vital-agro-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Only intercept HTTP/S requests, bypassing chrome extensions or dev sockets
  if (e.request.url.startsWith('http') && e.request.method === 'GET') {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request).then((networkResponse) => {
          // Do not cache API calls, hot module reloads, or DB requests
          if (
            networkResponse.status === 200 &&
            !e.request.url.includes('/firestore/') &&
            !e.request.url.includes('googleapis') &&
            !e.request.url.includes('hot-reload')
          ) {
            const cacheCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, cacheCopy);
            });
          }
          return networkResponse;
        });
      }).catch(() => {
        // Fallback for offline pages
        return caches.match('/');
      })
    );
  }
});
