import dynamic from 'next/dynamic'
import MainLayout from '../layouts/MainLayout'

const Volcano3D = dynamic(() => import('../components/Volcano3D'), {
  ssr: false
})

export default function Volcan() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-blue-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-blue-800 mb-4">
            Volcán Antisana 3D
          </h1>
          <p className="text-center text-gray-700 mb-6 max-w-2xl mx-auto text-sm md:text-base">
            Explora una representación animada del volcán y su entorno en 3D. 
            Usa tu mouse o tus dedos para rotar y hacer zoom.
          </p>
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <Volcano3D />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}