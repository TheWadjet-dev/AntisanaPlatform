import MainLayout from '../layouts/MainLayout'
import Trivia from '../interactive/Trivia'

export default function Interactive() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header mejorado */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
              🧠 Trivia Interactiva del Antisana 🏔️
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ¡Pon a prueba tus conocimientos sobre el ecosistema Antisana! 
              Aprende datos fascinantes mientras juegas.
            </p>
          </div>
          
          {/* Información previa */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-blue-500">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-800">
              🎯 ¿Qué vas a aprender?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">🏔️</div>
                <h3 className="font-semibold text-blue-800">Geografía</h3>
                <p className="text-sm text-gray-600">Ubicación y características del Antisana</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">💧</div>
                <h3 className="font-semibold text-green-800">Sistema de Agua</h3>
                <p className="text-sm text-gray-600">Cómo llega el agua a tu casa</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-2">🦅</div>
                <h3 className="font-semibold text-purple-800">Biodiversidad</h3>
                <p className="text-sm text-gray-600">Animales y plantas del páramo</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl mb-2">🔬</div>
                <h3 className="font-semibold text-orange-800">Ciencia</h3>
                <p className="text-sm text-gray-600">Investigación y tecnología</p>
              </div>
            </div>
          </div>
          
          {/* Componente de Trivia */}
          <Trivia />
          
          {/* Información adicional */}
          <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              🌟 ¿Quieres aprender más sobre el Antisana?
            </h3>
            <p className="text-gray-700 mb-4">
              Explora nuestra sección educativa con información detallada, fotos y datos curiosos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/about" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                📚 Información Completa
              </a>
              <a 
                href="/actividad" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                🎮 Jugar Cóndor Guardián
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
