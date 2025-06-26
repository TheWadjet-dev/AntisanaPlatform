import dynamic from 'next/dynamic'
import MainLayout from '../layouts/MainLayout'

// Carga condicional solo del lado del cliente
const PhaserGame = dynamic(() => import('../components/PhaserGame'), { ssr: false })

export default function ActividadPage() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-center my-8">Juego: Cóndor Guardián</h1>
      <div className="flex justify-center">
        <PhaserGame />
      </div>
    </MainLayout>
  )
}
