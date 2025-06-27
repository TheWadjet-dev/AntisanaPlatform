const CACHE_NAME = 'antisana-platform-v2'
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
  '/sounds/game_over.wav',
  '/manifest.json'
]

// Instalar SW
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache abierto')
        // Cachear recursos esenciales primero
        const essentialResources = [
          '/',
          '/home',
          '/about',
          '/manifest.json'
        ]
        
        const otherResources = urlsToCache.filter(url => !essentialResources.includes(url))
        
        // Cachear recursos esenciales primero
        return cache.addAll(essentialResources)
          .then(() => {
            // Luego intentar cachear el resto, pero sin fallar si alguno falla
            return Promise.allSettled(
              otherResources.map(url => 
                cache.add(url).catch(err => {
                  console.warn('Service Worker: Error cacheando', url, err)
                  return Promise.resolve()
                })
              )
            )
          })
      })
      .then(() => {
        console.log('Service Worker: Instalación completada')
        // En iOS, skipWaiting puede causar problemas, así que lo hacemos opcional
        if ('skipWaiting' in self) {
          return self.skipWaiting()
        }
      })
      .catch(err => {
        console.error('Service Worker: Error durante instalación:', err)
      })
  )
})

// Interceptar solicitudes con estrategia cache-first mejorada para iOS
self.addEventListener('fetch', (event) => {
  // Solo interceptar requests HTTP/HTTPS
  if (!event.request.url.startsWith('http')) return
  
  // Estrategia cache-first con fallback
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        
        // Clonar request para fetch
        const fetchRequest = event.request.clone()
        
        return fetch(fetchRequest)
          .then((response) => {
            // Verificar si es una respuesta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }
            
            // Clonar response para cache
            const responseToCache = response.clone()
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })
              .catch(err => console.warn('Error guardando en cache:', err))
            
            return response
          })
          .catch((error) => {
            console.warn('Fetch failed:', error)
            // Retornar una respuesta offline si existe
            if (event.request.destination === 'document') {
              return caches.match('/')
            }
            throw error
          })
      })
  )
})

// Actualizar SW
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activando...')
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Eliminando cache viejo:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('Service Worker: Activado')
      // Tomar control inmediatamente
      return self.clients.claim()
    })
  )
})
