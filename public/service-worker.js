try {
  const PRECACHE = "precache-v2";
  const RUNTIME = "runtime";

  // Se ejecuta cuando el navegador encuentra por primera vez el Service Worker
  self.addEventListener("install", (event) => {
    console.log(event);
    // Espera a que se ejecute la función
    // event.waitUntil(
    //   caches
    //   // Abre el caché "precache-v2"
    //     .open(PRECACHE)
    //     //
    //     .then((cache) => cache.addAll(PRECACHE_URLS))
    //     .then(self.skipWaiting())
    // );
  });

  // The activate handler takes care of cleaning up old caches.
  self.addEventListener("activate", (event) => {
    const currentCaches = [PRECACHE, RUNTIME];
    console.log("activate cache", event);
    event.waitUntil(
      caches
        .keys()
        .then((cacheNames) => {
          return cacheNames.filter(
            (cacheName) => !currentCaches.includes(cacheName)
          );
        })
        .then((cachesToDelete) => {
          console.log("cache is deleting", cachesToDelete);
          return Promise.all(
            cachesToDelete.map((cacheToDelete) => {
              return caches.delete(cacheToDelete);
            })
          );
        })
        .then(() => self.clients.claim())
    );
  });

  // The fetch handler serves responses for same-      	origin resources from a cache.
  // If no response is found, it populates the runtime cache with the response
  // from the network before returning it to the page.
  self.addEventListener("fetch", (event) => {
    const url = event.request.url
    // Skip cross-origin requests, like those for Google Analytics.
    if (url.startsWith(`${self.location.origin}/_next/`) || url.startsWith(`${self.location.origin}/documents`) || url.endsWith("manifest.json") || "") {
      console.log(event);
      event.respondWith(
        caches.open(RUNTIME).then((cache) => {
          return fetch(event.request)
          .then((response) => {
            // Si el fetch fue exitoso, actualiza o agrega la respuesta al caché
            console.log(response)
              cache.put(event.request, response.clone());
              return response;
            })
            .catch(() => {
              // En caso de error en el fetch, intenta responder con el caché
              return caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || new Response(null, { status: 404 });
              });
            });
        })
      );
      
    } else {
      console.log("not cached", url, event);
    }
  });
} catch (e) {
  console.log(e);
}
