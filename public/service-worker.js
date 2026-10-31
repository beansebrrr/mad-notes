const CACHE_NAME = "taskulater-v1";
 
const FILES = [
  "/",
  "/login",
  "/register",
  "/manifest.json",
  "/favicon.png",
  "/favicon.svg",
  "/styles.css",
  "/vendor/htmx/htmx.min.js"
];


self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
  )
});
