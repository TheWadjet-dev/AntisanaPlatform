import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useServiceWorkerUpdates } from '../utils/useServiceWorkerUpdates'

export default function Footer() {
  const { newVersionAvailable, updateServiceWorker } = useServiceWorkerUpdates()
  const [appVersion, setAppVersion] = useState('v9')

  // Efecto para mostrar la versión desde el Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        // Intentar obtener la versión del SW
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'SW_UPDATED' && event.data.version) {
            setAppVersion(`v${event.data.version}`)
          }
        })
      }).catch(err => console.error('Error accediendo a serviceWorker:', err))
    }
  }, [])
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información del Antisana */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">🏔️ Sistema Antisana</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Plataforma educativa sobre el ecosistema Antisana y su importancia para el suministro de agua de Quito.
            </p>
            <div className="mt-4 text-xs text-gray-400">
              <p>💧 Laguna de La Mica - Fuente de vida</p>
            </div>
          </div>
          
          {/* Enlaces útiles */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">🔗 Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/home" className="text-gray-300 hover:text-white transition-colors">
                  🏠 Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  📖 Sobre el Antisana
                </Link>
              </li>
              <li>
                <Link href="/flora-fauna" className="text-gray-300 hover:text-white transition-colors">
                  🦅 Flora y Fauna
                </Link>
              </li>
              <li>
                <Link href="/interactive" className="text-gray-300 hover:text-white transition-colors">
                  🎯 Quizz Interactivo
                </Link>
              </li>
              <li>
                <Link href="/actividad" className="text-gray-300 hover:text-white transition-colors">
                  🎮 Cóndor Guardián
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Información de conservación */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-purple-400">🌱 Conservación</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>🦅 21 especies de fauna catalogadas</p>
              <p>💧 Laguna de La Mica protegida</p>
              <p>🔬 Investigación científica activa</p>
              <p>🌿 Ecosistema de páramo único</p>
              <p>🏔️ 120,581 hectáreas conservadas</p>
            </div>
          </div>
        </div>
        
        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>© 2025 Sistema Antisana. Todos los derechos reservados.</p>
              <p className="text-xs mt-1">Plataforma educativa - Sistema Antisana</p>
            </div>
            <div className="text-sm text-gray-400">
              <p>🇪🇨 Hecho con ❤️ en Ecuador</p>
              <p className="text-xs mt-1">Para la conservación del Antisana</p>
            </div>
          </div>
          
          {/* Información de versión y actualización */}
          <div className="mt-4 pt-3 border-t border-gray-700 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {appVersion}
            </div>
            
            {newVersionAvailable && (
              <button 
                onClick={updateServiceWorker}
                className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700 transition-colors flex items-center"
              >
                <span className="mr-1">🔄</span> Nueva versión disponible - Actualizar
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
