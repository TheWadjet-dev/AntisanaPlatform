import MainLayout from '../layouts/MainLayout'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-6 text-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-green-800">
            🏔️ ¿Qué es el Sistema Antisana? 🏔️
          </h2>
          <p className="text-sm md:text-base lg:text-lg max-w-4xl mx-auto leading-relaxed">
            El ecosistema Antisana es como una <strong>fábrica mágica de agua</strong> en las montañas de Ecuador. 
            ¡Es donde nace el agua que llega a tu casa en Quito!
          </p>
        </div>

        {/* Carrusel animado responsive mejorado */}
        <div className="overflow-hidden w-full rounded-lg mb-8 md:mb-12 shadow-lg bg-gradient-to-r from-gray-200 to-gray-300">
          <motion.div
            className="flex"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{ width: '200%' }}
          >
            {/* Primera serie de imágenes */}
            {['antisana1.webp', 'antisana2.webp', 'antisana3.webp'].map((img, i) => (
              <div key={`first-${i}`} className="flex-shrink-0 relative overflow-hidden" style={{ width: '33.333%' }}>
                <div className="relative w-full aspect-[16/9] md:aspect-[16/10] lg:aspect-[16/9]">
                  <Image
                    src={`/assets/images/${img}`}
                    alt={`Reserva Ecológica Antisana - Vista ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={i === 0}
                    quality={95}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2gWVFEmeQb9k+Ey8M5Xb+o"
                  />
                  {/* Overlay con información */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium drop-shadow-lg">Vista {i + 1}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Segunda serie para efecto continuo */}
            {['antisana1.webp', 'antisana2.webp', 'antisana3.webp'].map((img, i) => (
              <div key={`second-${i}`} className="flex-shrink-0 relative overflow-hidden" style={{ width: '33.333%' }}>
                <div className="relative w-full aspect-[16/9] md:aspect-[16/10] lg:aspect-[16/9]">
                  <Image
                    src={`/assets/images/${img}`}
                    alt={`Reserva Ecológica Antisana - Vista ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={95}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2gWVFEmeQb9k+Ey8M5Xb+o"
                  />
                  {/* Overlay con información */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium drop-shadow-lg">Vista {i + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Galería de imágenes estática adicional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {['antisana1.webp', 'antisana2.webp', 'antisana3.webp'].map((img, i) => (
            <div key={`gallery-${i}`} className="relative group overflow-hidden rounded-lg shadow-lg bg-gray-200">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={`/assets/images/${img}`}
                  alt={`Ecosistema Antisana - Fotografía ${i + 1}`}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={95}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">
                    {i === 0 && "Volcán Antisana y páramos"}
                    {i === 1 && "Laguna y biodiversidad"}
                    {i === 2 && "Paisaje andino"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* La Historia del Agua para Niños */}
        <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-800">
            🌧️ ¿Cómo nace el Agua en el Antisana? 🌧️
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <div className="text-4xl mb-3">☁️</div>
              <h3 className="font-bold text-blue-700 mb-2">1. Las Nubes Llegan</h3>
              <p className="text-sm">Las nubes del cielo traen lluvia y nieve a las montañas altas del Antisana</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <div className="text-4xl mb-3">🧽</div>
              <h3 className="font-bold text-green-700 mb-2">2. El Páramo es una Esponja</h3>
              <p className="text-sm">El páramo actúa como una esponja gigante que absorbe y guarda toda esa agua</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <div className="text-4xl mb-3">🏞️</div>
              <h3 className="font-bold text-purple-700 mb-2">3. Se Forma en Lagunas</h3>
              <p className="text-sm">El agua se junta en hermosas lagunas como la Laguna de La Mica, donde se mantiene muy limpia</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <div className="text-4xl mb-3">🚰</div>
              <h3 className="font-bold text-orange-700 mb-2">4. Llega a Tu Casa</h3>
              <p className="text-sm">A través de tuberías especiales, el agua viaja hasta llegar limpia a tu hogar</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold mb-4 text-center text-green-800">
              🌟 ¡La Laguna de La Mica! 🌟
            </h3>
            <p className="text-center text-gray-700 leading-relaxed mb-4">
              En el corazón del Antisana está la <strong>Laguna de La Mica</strong>, una laguna mágica que es como 
              un tesoro de agua limpia. Esta laguna especial da <strong>650 litros de agua por segundo</strong> 
              - ¡eso es como llenar 13 bañeras cada segundo!
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">🏞️ Los Hermanos de la Laguna de La Mica:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="text-center">
                  <strong>Río Antisana</strong><br/>
                  <span className="text-blue-600">430 litros/segundo</span>
                </div>
                <div className="text-center">
                  <strong>Río Jatunhuayco</strong><br/>
                  <span className="text-green-600">200 litros/segundo</span>
                </div>
                <div className="text-center">
                  <strong>Río Diguchi</strong><br/>
                  <span className="text-purple-600">20 litros/segundo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Información adicional */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-800">
              🦅 El Hogar del Cóndor 🦅
            </h2>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              El Antisana es el hogar del <strong>cóndor andino</strong>, el ave más grande de América. 
              También viven allí osos de anteojos, venados, conejos y muchas aves coloridas.
            </p>
            <p className="text-gray-700 mb-6 text-sm md:text-base leading-relaxed">
              Es como un gran parque natural donde los animales pueden vivir felices y seguros, 
              mientras ayudan a cuidar el agua que necesitamos todos los días.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-blue-800 mb-2">🎯 ¿Sabías que?</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• El volcán Antisana mide <strong>5,758 metros</strong> de altura</li>
                <li>• Tiene nieve todo el año porque hace mucho frío</li>
                <li>• Es más alto que 15 Torres Eiffel apiladas</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-md p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-800">💧 El Viaje del Agua hasta Tu Casa</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🏔️</span>
                <div>
                  <strong className="text-green-700">Paso 1:</strong> 
                  <span className="text-sm md:text-base"> El agua se forma en las montañas del Antisana</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-2xl mr-3">�</span>
                <div>
                  <strong className="text-blue-700">Paso 2:</strong> 
                  <span className="text-sm md:text-base"> Va a plantas especiales como El Troje y Bellavista para limpiarse</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-2xl mr-3">🗂️</span>
                <div>
                  <strong className="text-purple-700">Paso 3:</strong> 
                  <span className="text-sm md:text-base"> Se guarda en más de 350 tanques gigantes por toda la ciudad</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-2xl mr-3">🏠</span>
                <div>
                  <strong className="text-orange-700">Paso 4:</strong> 
                  <span className="text-sm md:text-base"> Viaja por 7,600 km de tuberías hasta llegar a tu casa</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-50 rounded-lg p-4">
              <p className="text-center text-sm font-medium text-yellow-800">
                ¡Todo este proceso funciona las 24 horas del día para que siempre tengas agua limpia! 🌟
              </p>
            </div>
          </div>
        </section>

        {/* Datos curiosos para niños */}
        <section className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-purple-800">
            🤔 Datos Súper Curiosos 🤔
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl mb-2">🌊</div>
              <h3 className="font-bold text-blue-700 mb-2">Agua por Segundo</h3>
              <p className="text-sm">La Laguna de La Mica produce 
                <strong> 650 litros por segundo</strong> - ¡como llenar 13 bañeras cada segundo!</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl mb-2">🏊‍♂️</div>
              <h3 className="font-bold text-green-700 mb-2">Embalse Gigante</h3>
              <p className="text-sm">El embalse puede guardar 
                <strong> 24 millones de m³</strong> de agua - ¡como 10 millones de bañeras!</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl mb-2">�</div>
              <h3 className="font-bold text-red-700 mb-2">Ciencia Genial</h3>
              <p className="text-sm">Desde 2019 hay torres científicas a 
                <strong> 4,250 metros</strong> de altura estudiando el agua</p>
            </div>
          </div>
        </section>

        {/* Sistema de la Laguna de La Mica - Información Técnica para Niños */}
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-800">
            🏊‍♂️ El Sistema de la Laguna de La Mica - ¡La Fábrica de Agua del Antisana! 🏊‍♂️
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-blue-700 mb-3">🌊 Los Ríos Trabajadores</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
                  <span><strong>Laguna de La Mica</strong></span>
                  <span className="text-blue-600 font-bold">650 L/s</span>
                </div>
                <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                  <span><strong>Río Antisana</strong></span>
                  <span className="text-green-600 font-bold">430 L/s</span>
                </div>
                <div className="flex justify-between items-center bg-purple-50 p-2 rounded">
                  <span><strong>Río Jatunhuayco</strong></span>
                  <span className="text-purple-600 font-bold">200 L/s</span>
                </div>
                <div className="flex justify-between items-center bg-orange-50 p-2 rounded">
                  <span><strong>Río Diguchi</strong></span>
                  <span className="text-orange-600 font-bold">20 L/s</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                L/s = Litros por segundo. ¡Juntos dan más de 1,300 litros cada segundo!
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-green-700 mb-3">🏭 ¿A Dónde Va el Agua?</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🏗️</span>
                  <div>
                    <strong>Planta El Troje:</strong> <span className="text-blue-600">800 L/s</span>
                    <p className="text-xs text-gray-600">La planta más grande que limpia el agua</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🏢</span>
                  <div>
                    <strong>Otras Plantas:</strong> <span className="text-green-600">500 L/s</span>
                    <p className="text-xs text-gray-600">Conocoto, Puengasí y El Placer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-bold text-yellow-800 mb-2">🏊‍♂️ El Embalse: La Piscina Más Grande del Mundo</h3>
            <p className="text-sm text-gray-700 mb-2">
              Imagínate una piscina tan grande que podría contener <strong>24 millones de metros cúbicos</strong> de agua. 
              ¡Eso es como si tuvieras 24 millones de cubos de agua de 1 metro cada uno!
            </p>
            <div className="bg-white rounded p-3 text-center">
              <p className="text-lg font-bold text-blue-700">
                🏗️ Construido en el año 2000 (¡hace 25 años!)
              </p>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-green-800 mb-2">🔬 Los Científicos del Agua</h3>
            <p className="text-sm text-gray-700 mb-2">
              En el Antisana hay científicos muy inteligentes que cuidan el agua usando:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-2 rounded text-center">
                <div className="text-2xl mb-1">🌡️</div>
                <strong>Estaciones del Clima</strong>
                <p>Miden la temperatura y lluvia</p>
              </div>
              <div className="bg-white p-2 rounded text-center">
                <div className="text-2xl mb-1">🏗️</div>
                <strong>Torres Especiales</strong>
                <p>A 4,250 metros de altura</p>
              </div>
              <div className="bg-white p-2 rounded text-center">
                <div className="text-2xl mb-1">🧪</div>
                <strong>Laboratorios</strong>
                <p>Estudian la calidad del agua</p>
              </div>
            </div>
          </div>
        </section>

        {/* Historia del Parque Nacional Antisana */}
        <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-amber-800">
            📜 La Historia del Parque Nacional Antisana 📜
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-amber-700 mb-3">📅 Línea de Tiempo</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center bg-amber-50 p-2 rounded">
                  <span className="text-2xl mr-3">🎂</span>
                  <div>
                    <strong>1993:</strong> Se crea la Reserva Ecológica Antisana
                  </div>
                </div>
                <div className="flex items-center bg-blue-50 p-2 rounded">
                  <span className="text-2xl mr-3">🏊‍♂️</span>
                  <div>
                    <strong>2000:</strong> Se construye el embalse gigante
                  </div>
                </div>
                <div className="flex items-center bg-purple-50 p-2 rounded">
                  <span className="text-2xl mr-3">🔬</span>
                  <div>
                    <strong>2019:</strong> Se instalan torres científicas modernas
                  </div>
                </div>
                <div className="flex items-center bg-green-50 p-2 rounded">
                  <span className="text-2xl mr-3">🏞️</span>
                  <div>
                    <strong>2021:</strong> Se convierte en Parque Nacional
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-green-700 mb-3">📏 ¡Qué Grande es!</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">120,581 hectáreas</div>
                    <p className="text-sm text-gray-600">¡Como 169,000 campos de fútbol!</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">2 provincias</div>
                    <p className="text-sm text-gray-600">Napo y Pichincha</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-700">30+ años</div>
                    <p className="text-sm text-gray-600">Protegiendo la naturaleza</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Los 9 Ecosistemas del Antisana */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-800">
            🌍 Los 9 Mundos Naturales del Antisana 🌍
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl mb-2">🌳</div>
              <h3 className="font-bold text-green-700 mb-2">Bosques de Neblina</h3>
              <p className="text-sm">Entre 2,000-2,900 metros. Siempre cubiertos de nubes misteriosas</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl mb-2">🌿</div>
              <h3 className="font-bold text-emerald-700 mb-2">Páramos</h3>
              <p className="text-sm">Hasta 4,500 metros. ¡Las esponjas gigantes que guardan el agua!</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl mb-2">❄️</div>
              <h3 className="font-bold text-blue-700 mb-2">Zona de Hielo</h3>
              <p className="text-sm">Arriba de 4,500 metros. Solo líquenes y musgo súper resistentes</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-bold text-center text-gray-800 mb-3">
              🤔 ¿Sabías que hay 6 más?
            </h3>
            <p className="text-center text-sm text-gray-700">
              El Antisana protege <strong>9 ecosistemas diferentes</strong> en total. 
              Cada uno tiene plantas y animales únicos adaptados a diferentes alturas y climas. 
              ¡Es como tener 9 planetas diferentes en un solo lugar!
            </p>
          </div>
        </section>

        {/* Los Animales Increíbles del Antisana */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-800">
            🦅 Los Animales Increíbles del Antisana 🦅
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-4xl mb-2">🦅</div>
              <h3 className="font-bold text-blue-700 mb-2">Cóndor Andino</h3>
              <p className="text-xs">El ave más grande de América. ¡Puede vivir más de 100 años!</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-4xl mb-2">🐻</div>
              <h3 className="font-bold text-brown-700 mb-2">Oso de Anteojos</h3>
              <p className="text-xs">El único oso de América del Sur. ¡Parece que usa lentes!</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-4xl mb-2">🐾</div>
              <h3 className="font-bold text-orange-700 mb-2">Puma</h3>
              <p className="text-xs">Puede saltar 5 metros de altura. ¡Un súper atleta!</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center shadow-md">
              <div className="text-4xl mb-2">🦌</div>
              <h3 className="font-bold text-green-700 mb-2">Tapir Andino</h3>
              <p className="text-xs">Como un cerdito gigante. ¡Pariente de los rinocerontes!</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-bold text-yellow-800 mb-2">🐾 Mamíferos</h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-700">73 especies</div>
                <p className="text-xs">¡Más que países en Europa!</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-2">🦅 Aves</h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">50+ especies</div>
                <p className="text-xs">Solo en la Laguna de La Mica</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-green-800 mb-2">🐸 Especies Únicas</h3>
              <div className="text-center">
                <div className="text-sm font-bold text-green-700">Osornosapo de Antisana</div>
                <p className="text-xs">¡Solo existe aquí!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Las Plantas Súper Resistentes */}
        <section className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-pink-800">
            🌺 Las Plantas Súper Resistentes 🌺
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-pink-700 mb-3">🌿 En los Páramos</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">•</span>
                  <strong>Hojas vellosas y gruesas</strong> - ¡Como abrigos peludos!
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">•</span>
                  <strong>6 especies únicas</strong> - ¡Solo existen aquí!
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-2">•</span>
                  <strong>Súper resistentes</strong> - Aguantan frío extremo
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-green-700 mb-3">🌳 En los Bosques</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <span className="text-brown-600 mr-2">•</span>
                  <strong>Cedro</strong> - Para muebles finos
                </li>
                <li className="flex items-center">
                  <span className="text-amber-600 mr-2">•</span>
                  <strong>Nogal</strong> - Produce nueces deliciosas
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">•</span>
                  <strong>Laurel de cera</strong> - Muy aromático
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-bold text-center text-purple-800 mb-2">
              ❄️ Las Plantas del Hielo
            </h3>
            <p className="text-center text-sm text-gray-700">
              Arriba de los 4,500 metros, donde hace súper frío, solo pueden vivir 
              <strong> líquenes y musgo</strong>. ¡Se llaman "plantas del hielo" porque son las más resistentes del mundo!
            </p>
          </div>
        </section>

        {/* Los Científicos y Guardianes del Antisana */}
        <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-purple-800">
            🔬 Los Científicos y Guardianes del Antisana 🔬
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-purple-700 mb-3">🏗️ Torres Científicas</h3>
              <div className="bg-purple-50 p-3 rounded mb-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-700">4,250 metros</div>
                  <p className="text-sm text-gray-600">de altura desde 2019</p>
                </div>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">🌡️</span>
                  <span>Miden temperatura y humedad</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">🌬️</span>
                  <span>Estudian cómo se mueve el aire</span>
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-2">🌱</span>
                  <span>Observan cómo "respiran" las plantas</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold text-green-700 mb-3">🏢 Los Guardianes</h3>
              <div className="space-y-3">
                <div className="flex items-center bg-blue-50 p-2 rounded">
                  <span className="text-2xl mr-3">💧</span>
                  <div>
                    <strong>EPMAPS:</strong> Cuida el agua de Quito
                  </div>
                </div>
                <div className="flex items-center bg-green-50 p-2 rounded">
                  <span className="text-2xl mr-3">🌳</span>
                  <div>
                    <strong>FONAG:</strong> Protege los bosques y páramos
                  </div>
                </div>
                <div className="flex items-center bg-yellow-50 p-2 rounded">
                  <span className="text-2xl mr-3">🦅</span>
                  <div>
                    <strong>Fundación Antisana:</strong> Conserva los animales
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-bold text-center text-indigo-800 mb-3">
              ✨ ¿Qué Hacen los Guardianes?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-green-50 p-3 rounded text-center">
                <div className="text-2xl mb-1">🌱</div>
                <strong>Plantan árboles nativos</strong>
              </div>
              <div className="bg-blue-50 p-3 rounded text-center">
                <div className="text-2xl mb-1">🚫</div>
                <strong>Retiran ganado que daña el páramo</strong>
              </div>
              <div className="bg-purple-50 p-3 rounded text-center">
                <div className="text-2xl mb-1">🏗️</div>
                <strong>Construyen diques para humedales</strong>
              </div>
              <div className="bg-yellow-50 p-3 rounded text-center">
                <div className="text-2xl mb-1">👨‍🌾</div>
                <strong>Ayudan a las comunidades locales</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
