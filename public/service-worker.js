const cacheName = "my-site-cache-v1"
const dataName = "data-cache-v1"

const cacheFiles = [
    '/',
    '/index.js',
    'db.js',
    '/manifest.webmanifest',
    '/styles.css',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png'
];
  
self.addEventListener("install", function(evt) {
    evt.waitUntil(
      caches.open(cacheName).then(cache => {
        console.log("cache successfull")
        return cache.addAll(cacheFiles)
      })
    )
})

self.addEventListener("fetch", function(evt) {
    if (evt.request.url.includes("/api/")) {
      evt.respondWith(
        caches.open(dataName).then(cache => {
          return fetch(evt.request)
            .then(response => {
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone())
              }
  
              return response;
            })
            .catch(err => {
              return cache.match(evt.request)
            });
        }).catch(err => console.log(err))
      )
  
      return;
    }
  
    evt.respondWith(
        fetch(evt.request).catch(function(){
            return caches.match(evt.request).then(function(response){
                if (response){
                    return response;
                }
                else if (evt.request.headers.get("accept").includes("text/html")){
                    return caches.match("/")
                }
            })
        })
    )
})