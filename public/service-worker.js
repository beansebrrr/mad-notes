const CACHE_NAME = "notes";

const FILES = [
	"/",
	"/login",
	"/register",
	"/manifest.json",
	"/favicon.png",
	"/favicon.svg",
	"/styles.css",
	"/vendor/htmx/htmx.min.js",
];

self.addEventListener("install", (e) => {
	e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES)));
});

self.addEventListener("fetch", (e) => {
	if (e.request.method !== "GET") return;
	e.respondWith(caches.match(e.request).then(() => fetch(e.request)));
});
