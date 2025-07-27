import dynamic from 'next/dynamic'
import MainLayout from '../layouts/MainLayout'

// Carga condicional solo del lado del cliente
const PhaserGame = dynamic(() => import('../components/PhaserGame'), { ssr: false })

export default function ActividadPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-4 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              🎮 Cóndor Guardián
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Ayuda al cóndor a proteger el ecosistema Antisana recolectando gotas de agua 
              y evitando las nubes contaminantes.
            </p>
          </div>
          <div className="flex justify-center">
            <PhaserGame />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
