const CACHE_NAME = 'antisana-platform-v1'
const urlsToCache = [
  '/',
  '/home',
  '/about',
  '/data-visualization',
  '/interactive',
  '/volcan',
  '/actividad',
  '/assets/images/antisana1.webp',
  '/assets/images/antisana2.webp',
  '/assets/images/antisana3.webp',
  '/sprites/bird_condor.png',
  '/sprites/water_drop.png',
  '/sprites/smoke_loop.png',
  '/sounds/collect.wav',
  '/sounds/hit.mp3',
  '/sounds/game_over.wav'
]

// Instalar SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto')
        return cache.addAll(urlsToCache)
      })
  )
})

// Interceptar solicitudes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devolver desde cache si existe, sino hacer fetch
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

// Actualizar SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
