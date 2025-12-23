// Healthezy Service Worker - Enhanced for Play Console
const CACHE_NAME = 'healthezy-v2';
const DYNAMIC_CACHE = 'healthezy-dynamic-v2';
const IMAGE_CACHE = 'healthezy-images-v2';

const STATIC_ASSETS = [
    '/',
    '/logo.png',
    '/web-app-manifest-192x192.png',
    '/web-app-manifest-512x512.png',
    '/doctors',
    '/labs',
    '/pharmacy',
    '/e-commerce',
    '/offline'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch((error) => {
                console.error('Failed to cache static assets:', error);
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME &&
                        cacheName !== DYNAMIC_CACHE &&
                        cacheName !== IMAGE_CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - implement network-first strategy with fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests except for images
    if (!url.origin.includes(self.location.origin) && !request.destination === 'image') {
        return;
    }

    // Image caching strategy - cache first
    if (request.destination === 'image') {
        event.respondWith(
            caches.open(IMAGE_CACHE).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    return cachedResponse || fetch(request).then((networkResponse) => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    }).catch(() => {
                        // Return a placeholder image if offline
                        return cache.match('/logo.png');
                    });
                });
            })
        );
        return;
    }

    // API requests - network first with cache fallback
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const responseToCache = response.clone();
                    caches.open(DYNAMIC_CACHE).then((cache) => {
                        cache.put(request, responseToCache);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then((cachedResponse) => {
                        return cachedResponse || new Response(
                            JSON.stringify({ error: 'Offline', message: 'You are currently offline' }),
                            { headers: { 'Content-Type': 'application/json' } }
                        );
                    });
                })
        );
        return;
    }

    // Navigation requests - network first with offline fallback
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const responseToCache = response.clone();
                    caches.open(DYNAMIC_CACHE).then((cache) => {
                        cache.put(request, responseToCache);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then((cachedResponse) => {
                        return cachedResponse || caches.match('/offline');
                    });
                })
        );
        return;
    }

    // Other requests - cache first with network fallback
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            return cachedResponse || fetch(request).then((response) => {
                const responseToCache = response.clone();
                caches.open(DYNAMIC_CACHE).then((cache) => {
                    cache.put(request, responseToCache);
                });
                return response;
            });
        })
    );
});

// Push notification event
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update from Healthezy',
        icon: '/web-app-manifest-192x192.png',
        badge: '/logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'view',
                title: 'View',
                icon: '/web-app-manifest-192x192.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/web-app-manifest-192x192.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Healthezy', options)
    );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Background sync event - for offline bookings
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-bookings') {
        event.waitUntil(syncBookings());
    }
});

async function syncBookings() {
    try {
        // Retrieve pending bookings from IndexedDB or cache
        // Send them to the server when back online
        const cache = await caches.open(DYNAMIC_CACHE);
        const requests = await cache.keys();

        const pendingBookings = requests.filter(req =>
            req.url.includes('/api/bookings') && req.method === 'POST'
        );

        for (const request of pendingBookings) {
            await fetch(request);
            await cache.delete(request);
        }
    } catch (error) {
        console.error('Failed to sync bookings:', error);
    }
}

// Periodic background sync - for health data updates (requires permission)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'update-health-data') {
        event.waitUntil(updateHealthData());
    }
});

async function updateHealthData() {
    try {
        // Fetch latest health data updates
        const response = await fetch('/api/health-updates');
        const data = await response.json();

        // Store in cache for offline access
        const cache = await caches.open(DYNAMIC_CACHE);
        await cache.put('/api/health-updates', new Response(JSON.stringify(data)));
    } catch (error) {
        console.error('Failed to update health data:', error);
    }
}

// Message event - for communication with the client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(DYNAMIC_CACHE).then((cache) => {
                return cache.addAll(event.data.payload);
            })
        );
    }
});
