/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  "index.html",
  "./",
  "/",
  "/assets/styles/index.css",
  "/assets/styles/reset.css",
  "/assets/images/background/Beach-Summer.jpg",
  "/assets/images/background/Beach-Summer2.jpg",
  "/assets/images/background/City-Spring.jpg",
  "/assets/images/background/City-Winter.jpg",
  "/assets/images/background/Dessert-Summer.jpg",
  "/assets/images/background/Dessert-Winter.jpg",
  "/assets/images/background/Forrest-Summer.jpg",
  "/assets/images/background/Lake-Spring.jpg",
  "/assets/images/background/Lake-Spring2.jpg",
  "/assets/images/background/Lake-Summer.jpg",
  "/assets/images/background/Lake-Winter.jpg",
  "/assets/images/background/Lake-Winter2.jpg",
  "/assets/images/background/Lake-Winter3.jpg",
  "/assets/images/background/Mountain-Fall.jpg",
  "/assets/images/background/Mountain-Fall2.jpg",
  "/assets/images/background/Mountain-Spring.jpg",
  "/assets/images/background/Mountain-Summer.jpg",
  "/assets/images/background/Mountain-Summer2.jpg",
  "/assets/images/background/Mountain-Summer3.jpg",
  "/assets/images/background/Mountain-Winter.jpg",
  "/assets/images/background/Mountain-Winter2.jpg",
  "/assets/images/background/Mountain-Winter3.jpg",
  "/assets/images/background/Mountain-Winter4.jpg",
  "/assets/images/background/Mountain-Winter5.jpg",
  "/assets/images/background/Mountain-Winter6.jpg",
  "/assets/images/background/River-Fall.jpg",
  "/assets/images/background/Sea-Summer.jpg",
  "/assets/images/background/Sea-Summer2.jpg",
  "/assets/images/background/Sky-Winter.jpg",
  "/assets/music/cinematic-chillhop.mp3",
  "/assets/music/forest-lullaby.mp3",
  "/assets/music/in-the-forest-ambience.mp3",
  "/assets/music/just-relax.mp3",
  "/assets/music/lofi-chill.mp3",
  "/assets/music/onceagain.mp3",
  "/assets/music/rainbow-after-rain.mp3",
  "/assets/scripts/index.min.js",
  "/assets/scripts/libs.min.js",
  "/assets/favicon.ico"
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting()),
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName),
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then((cache) => {
          return fetch(event.request).then((response) => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      }),
    );
  }
});
