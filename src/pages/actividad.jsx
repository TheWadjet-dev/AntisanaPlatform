import dynamic from 'next/dynamic'
import MainLayout from '../layouts/MainLayout'

const PhaserGame = dynamic(() => import('../components/PhaserGame'), {
  ssr: false
})

export default function Actividad() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-green-50 p-4">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-4">Cóndor Guardián</h1>
        <p className="text-center text-gray-700 mb-6">Ayuda al cóndor a recolectar gotas de agua 💧 y esquivar la contaminación ☁️</p>
        <PhaserGame />
      </div>
    </MainLayout>
  )
}