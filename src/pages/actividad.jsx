import dynamic from 'next/dynamic'
import MainLayout from '../layouts/MainLayout'

// Carga condicional solo del lado del cliente
const PhaserGame = dynamic(() => import('../components/PhaserGame'), { ssr: false })

export default function ActividadPage() {
  return (
    <MainLayout>
      <div className="flex justify-center">
        <PhaserGame />
      </div>
    </MainLayout>
  )
}
