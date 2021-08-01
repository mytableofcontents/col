var CACHE_NAME = 'col-cache-202108011024';
var urlsToCache = [
    "/",
    "/index.html",
    "/favicon.ico",
    "/images/0.jpg",
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpg",
    "/images/8.jpg",
    "/images/9.jpg",
    "/images/10.jpg",
    "/images/11.jpg",
    "/images/12.jpg",
    "/images/13.jpg",
    "/images/14.jpg",
    "/images/15.jpg",
    "/images/cover.jpg",
    "/images/headerbg.jpg",
    "/content/Answers.json",
    "/content/Lesson00.html",
    "/content/Lesson01.html",
    "/content/Lesson02.html",
    "/content/Lesson03.html",
    "/content/Lesson04.html",
    "/content/Lesson05.html",
    "/content/Lesson06.html",
    "/content/Lesson07.html",
    "/content/Lesson08.html",
    "/content/Lesson09.html",
    "/content/Lesson10.html",
    "/content/Lesson11.html",
    "/content/Lesson12.html",
    "/content/Lesson13.html",
    "/content/Lesson14.html",
    "/content/Lesson15.html",
    "/content/References.json",
    "/scripts/col.css",
    "/scripts/col.js",
    "/scripts/index.css",
    "/scripts/Merriweather-Italic.ttf",
    "/scripts/Merriweather-Light.ttf",
    "/scripts/Merriweather-Regular.ttf"
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});
