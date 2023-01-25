'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"index.html": "fcfc7012ea595b5999e6aa0d71a5ee59",
"/": "fcfc7012ea595b5999e6aa0d71a5ee59",
"main.dart.js": "355f1c92800a26b85e65bd9b7c2f14cd",
"manifest.json": "6f6b435ba053ae87019068d1f223609a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/NOTICES": "465a7b6ebc7427954a16616c43f9e74c",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/news/concert.jpeg": "9835c73420b012928c9df7462cb42c06",
"assets/assets/images/news/concert_heart.jpg": "cd982ab501396249dcf152e0dafa0625",
"assets/assets/images/news/recording_studio.jpg": "bd9d567b08da6a755b99bf549c4e6176",
"assets/assets/images/record.jpeg": "556686c5027a6e9d77d2bfe7627067d7",
"assets/assets/images/artists/joe.jpg": "33f82d8797fac06e1b331ead0f3216f3",
"assets/assets/images/artists/woman.jpeg": "1e57bebd66657027a8c1daef46e390d3",
"assets/assets/images/playlists/austin.jpg": "0ff29c128e837735e4790f50b57e4eae",
"assets/assets/images/playlists/calm.jpg": "e5c9c5704ef271f693648847f9f393ac",
"assets/assets/images/playlists/studying.jpg": "d90bd4097a7ff363c12abbabe7d619fe",
"assets/assets/images/playlists/favorite.jpg": "ff6e391bb66c0bc48af9cd026a0ad30a",
"assets/assets/images/playlists/coffee.jpg": "51fa79f5cc3110e9e68dbe572741dc9b",
"assets/assets/images/playlists/workout.jpg": "a08b4c838dfc63890a848b38932aed0a",
"assets/assets/images/playlists/jazz.jpg": "75d85b15ac4d4e0f8852c7f1c366ce6a",
"assets/assets/images/playlists/piano.jpg": "833ab1aea554ded53fb95c26eafecba3",
"assets/assets/images/playlists/reading.jpg": "96f5204e07f7b1af3eba58732fccb338",
"assets/assets/images/albums/artist3-album1.jpg": "aa75283b933825fdd182324663d07199",
"assets/assets/images/albums/artist6-album2.jpg": "f0a90dc14f77f39827c0c96584e06a8e",
"assets/assets/images/albums/artist2-album2.jpg": "58f5ca0d0b3d55aa245398d42aa2a6a4",
"assets/assets/images/albums/artist1-album3.jpg": "1f9bba3eb6278d6e2124d39245197abd",
"assets/assets/images/albums/artist4-album2.jpg": "452591d89aab864cdcfe4046ab1f640a",
"assets/assets/images/albums/artist4-album3.jpg": "9ce4743258737789bb6b16d7700f364a",
"assets/assets/images/albums/artist4-album1.jpg": "892497aa9c5ff3b69704fb550cb55382",
"assets/assets/images/albums/artist6-album3.jpg": "48de276497ff499db33fe0cdff50546a",
"assets/assets/images/albums/artist6-album1.jpg": "facd77f516e55d7228b957b847a36183",
"assets/assets/images/albums/artist1-album2.jpg": "0c6ae0ed4da4322ccc70c28badad24ba",
"assets/assets/images/albums/artist5-album2.jpg": "8df8c3e53049b64fd5e102300115ae96",
"assets/assets/images/albums/artist1-album1.jpg": "e3c638f3224befe15ef586ac6e4eab62",
"assets/assets/images/albums/artist5-album1.jpg": "3481d728309cf6c2d12cb268d217acef",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/AssetManifest.json": "1ac72d734cbfb28975e2a8689b7b3922",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"version.json": "ef24e4c39a8c8bf5f538b73fbe16ff07"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
