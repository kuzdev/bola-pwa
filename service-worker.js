const CACHE_NAME = 'firstpwa-v2';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/teamdetail.html',
	'/pages/home.html',
	'/pages/favorite.html',
	'/pages/contact.html',
	'/css/materialize.min.css',
	'/css/style.css',
	'/js/materialize.min.js',
	'/js/nav.js',
	'/js/api.js',
	'/js/idb.js',
	'/js/database.js',
	'/js/notif.js',
	'/manifest.json',
	'/images/icon-512x512.png',
	'/images/icon-192x192.png',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function (cache) {
				return cache.addAll(urlsToCache);
			})
	);
})

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys()
			.then(function (cacheNames) {
				return Promise.all(
					cacheNames.map(function (cacheName) {
						if (cacheName != CACHE_NAME) {
							console.log("ServiceWorker: cache " + cacheName + " dihapus");
							return caches.delete(cacheName);
						}
					})
				);
			})
	);
})

self.addEventListener("fetch", function (event) {
	if (event.request.url.includes("football-data.org")) {
		event.respondWith(async function () {
			const cache = await caches.open(CACHE_NAME);
			const cachedResponse = await cache.match(event.request);
			if (cachedResponse) return cachedResponse;
			const networkResponse = await fetch(event.request);
			event.waitUntil(
				cache.put(event.request, networkResponse.clone())
			);
			return networkResponse;
		}());
	} else {
		event.respondWith(
			caches.match(event.request).then(function (response) {
				return response || fetch(event.request);
			})
		)
	}
});

self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('push', event => {
	var body;

	console.log(event);

	if (event.data) {
		body = event.data.text()
	} else {
		body = "This is push message"
	}

	var options = {
		body: body,
		icon: '/images/icon-512x512.png',
		vibrate: [500, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	}

	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});