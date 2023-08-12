self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('offline-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',  // This assumes your main app HTML file
          '/offline.html'
          // Add other resources like JS, CSS, images, etc. that you want to cache
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      })
    );
  });