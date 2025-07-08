import MainLayout from '../layouts/MainLayout'
import { useState } from 'react'
import animalDataJson from '../data/animalData.json'

// Obtener los datos de animales desde el archivo JSON
const animalData = animalDataJson.animals

export default function FloraFauna() {
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [activeTab, setActiveTab] = useState('gallery')

  return (
    <MainLayout>
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              🦅 Fauna del Antisana 🐻
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Descubre la increíble diversidad de animales que habitan en la Reserva Ecológica Antisana y la Laguna de La Mica.
              Cada especie es única y juega un papel importante en nuestro ecosistema.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-md p-1 flex">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-green-600 hover:bg-green-50'
                }`}
              >
                📸 Galería de Imágenes
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'videos'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-green-600 hover:bg-green-50'
                }`}
              >
                🎥 Videos
              </button>
            </div>
          </div>

          {/* Galería de Imágenes */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {animalData.map((animal) => (
                <div
                  key={animal.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => setSelectedAnimal(animal)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={animal.image}
                      alt={animal.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {animal.habitat}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{animal.name}</h3>
                    <p className="text-sm text-gray-500 italic mb-2">{animal.scientificName}</p>
                    <p className="text-gray-600 text-sm line-clamp-3">{animal.description}</p>
                    <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                      Ver más ➡️
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Placeholder para más animales */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center min-h-[300px] border-2 border-dashed border-green-300">
                <div className="text-4xl mb-4">🔜</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Más Animales Próximamente</h3>
                <p className="text-gray-500 text-sm">
                  Estamos agregando más especies fascinantes del ecosistema Antisana
                </p>
              </div>
            </div>
          )}

          {/* Sección de Videos */}
          {activeTab === 'videos' && (
            <div className="text-center py-16">
              <div className="max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🎬</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Videos Próximamente</h2>
                <p className="text-gray-600 mb-8">
                  Estamos preparando una colección increíble de videos de la fauna del Antisana.
                  Podrás ver a estos majestuosos animales en su hábitat natural.
                </p>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl">
                  <p className="font-semibold">
                    🎥 Videos documentales de alta calidad
                    <br />
                    📹 Grabaciones en tiempo real
                    <br />
                    🌿 Comportamiento natural de los animales
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalles del Animal */}
      {selectedAnimal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedAnimal.image}
                alt={selectedAnimal.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedAnimal(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedAnimal.name}</h2>
              <p className="text-gray-500 italic mb-4">{selectedAnimal.scientificName}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                <p className="text-gray-600">{selectedAnimal.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">🏠 Hábitat</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedAnimal.habitat}
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🧠 Datos Curiosos</h3>
                <ul className="space-y-2">
                  {selectedAnimal.facts.map((fact, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-600">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => setSelectedAnimal(null)}
                className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}
