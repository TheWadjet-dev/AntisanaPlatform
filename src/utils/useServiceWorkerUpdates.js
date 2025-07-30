import { useState, useEffect } from 'react';

export const useServiceWorkerUpdates = () => {
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    // Escuchar mensajes del Service Worker
    const handleServiceWorkerMessage = (event) => {
      if (event.data && event.data.type === 'SW_UPDATED') {
        console.log('Nueva versión del Service Worker disponible');
        setNewVersionAvailable(true);
      }
    };

    // Registrar un listener para mensajes del service worker
    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

    // Verificar si hay una actualización disponible
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        // Verificar cada 60 minutos
        const checkInterval = 60 * 60 * 1000;
        
        const periodicCheck = setInterval(() => {
          registration.update().catch(err => {
            console.error('Error al verificar actualizaciones del SW:', err);
          });
        }, checkInterval);

        // Guardar el worker para utilizarlo más tarde
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setNewVersionAvailable(true);
        }

        // Escuchar por nuevas actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker);
              setNewVersionAvailable(true);
            }
          });
        });

        return () => {
          clearInterval(periodicCheck);
          navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
        };
      });
    }

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
    };
  }, []);

  // Función para actualizar la aplicación
  const updateServiceWorker = () => {
    if (!waitingWorker) {
      // Si no hay worker en espera, simplemente recargamos la página
      window.location.reload();
      return;
    }

    // Informar al SW que debe activarse
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    
    // Recargar la página para cargar la nueva versión
    window.location.reload();
  };

  return { newVersionAvailable, updateServiceWorker };
};
