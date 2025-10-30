const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;
// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);

            })
    )

});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                // data is fetched means you are online and internet is working and if not able to fetch data then you are offline and show offline.html page
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )

});

// Activate the SW - in activation we remove all the previous caches and keep only the new ones
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames)=>Promise.all(
            cacheNames.map((cacheName)=>{
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});