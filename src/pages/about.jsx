import MainLayout from '../layouts/MainLayout'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-6 text-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-green-800">
            ¿Qué es el Sistema Antisana?
          </h2>
          <p className="text-sm md:text-base lg:text-lg max-w-4xl mx-auto leading-relaxed">
            El ecosistema Antisana es una región de gran altitud en Ecuador, conocida por su biodiversidad,
            glaciares e importancia como fuente de agua. Está compuesta por páramos, bosques andinos y el volcán Antisana.
          </p>
        </div>

        {/* Carrusel animado responsive */}
        <div className="overflow-hidden w-full rounded-lg mb-8 md:mb-12 shadow-lg">
          <motion.div
            className="flex gap-4"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{ width: '300%' }}
          >
            {[...Array(2)].map((_, setIndex) => (
              ['antisana1.webp', 'antisana2.webp', 'antisana3.webp'].map((img, i) => (
                <div key={`${setIndex}-${i}`} className="flex-shrink-0" style={{ width: '33.333%' }}>
                  <Image
                    src={`/assets/images/${img}`}
                    alt={`Reserva Antisana ${i + 1}`}
                    width={1200}
                    height={600}
                    className="rounded-md object-cover w-full h-48 md:h-64 lg:h-80"
                  />
                </div>
              ))
            ))}
          </motion.div>
        </div>

        {/* Información adicional */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-800">
              Reserva Ecológica Antisana
            </h2>
            <p className="text-gray-700 mb-6 text-sm md:text-base leading-relaxed">
              La Reserva Ecológica Antisana es un área protegida ubicada en los Andes del Ecuador. Alberga el volcán Antisana (5,758 msnm),
              extensos páramos, humedales, lagunas y bosques nublados. Es vital para la conservación del agua potable de Quito.
            </p>
            <p className="text-gray-700 mb-6 text-sm md:text-base leading-relaxed">
              Resguarda especies emblemáticas como el cóndor andino, el oso de anteojos, venados, y una gran diversidad de aves y flora andina.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-md p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-800">Datos Clave</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">🏔️</span>
                <span className="text-sm md:text-base"><strong>Área:</strong> 120,000 hectáreas aproximadamente</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">🌡️</span>
                <span className="text-sm md:text-base"><strong>Clima:</strong> Frío andino, con precipitaciones y niebla frecuentes</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">💧</span>
                <span className="text-sm md:text-base"><strong>Hidrografía:</strong> Origen de ríos clave como el Papallacta y el Tambo</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">🌿</span>
                <span className="text-sm md:text-base"><strong>Importancia:</strong> Fuente de agua, biodiversidad y captura de carbono</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
