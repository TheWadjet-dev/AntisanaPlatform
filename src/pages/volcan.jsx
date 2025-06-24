import dynamic from 'next/dynamic'
import MainLayout from '../layouts/MainLayout'

const Volcano3D = dynamic(() => import('../components/Volcano3D'), {
  ssr: false
})

export default function Volcan() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-blue-50 p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">Volcán Antisana 3D</h1>
        <p className="text-center text-gray-700 mb-6">Explora una representación animada del volcán y su entorno en 3D</p>
        <Volcano3D />
      </div>
    </MainLayout>
  )
}