const CACHE_NAME = 'antisana-platform-v8'
const urlsToCache = [
  '/',
  '/home',
  '/about',
  '/flora-fauna',
  '/interactive',
  '/actividad',
  '/assets/images/antisana1.webp',
  '/assets/images/antisana2.webp',
  '/assets/images/antisana3.webp',
  '/assets/images/iconfinal.png',
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
  console.log('Service Worker: Instalando v8...')
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
        console.log('Service Worker: Instalación completada v8')
        // Forzar activación inmediata para limpiar cache viejo
        return self.skipWaiting()
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
  console.log('Service Worker: Activando v8...')
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
      console.log('Service Worker: Activado v8')
      // Tomar control inmediatamente y recargar todas las páginas
      return self.clients.claim().then(() => {
        // Notificar a todas las páginas abiertas para que se recarguen
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({type: 'SW_UPDATED'})
          })
        })
      })
    })
  )
})
