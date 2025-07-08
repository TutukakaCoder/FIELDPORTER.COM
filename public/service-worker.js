// Minimal service worker to prevent 404 errors
// FIELDPORTER Website - Service Worker

self.addEventListener('install', function(event) {
  console.log('FIELDPORTER Service Worker: Install event');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('FIELDPORTER Service Worker: Activate event');
  event.waitUntil(self.clients.claim());
});

// Minimal fetch handler - no caching for now
self.addEventListener('fetch', function(event) {
  // Let the browser handle all fetch requests normally
  return;
}); 