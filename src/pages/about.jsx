import MainLayout from '../layouts/MainLayout'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6 text-gray-800">
        <h2 className="text-3xl font-bold mb-4">¿Qué es el Sistema Antisana?</h2>
        <p className="mb-6">
          El ecosistema Antisana es una región de gran altitud en Ecuador, conocida por su biodiversidad,
          glaciares e importancia como fuente de agua. Está compuesta por páramos, bosques andinos y el volcán Antisana.
        </p>

        {/* Carrusel animado infinitamente sin set() */}
        <div className="overflow-hidden w-full rounded-lg mb-10">
          <motion.div
            className="flex w-[50%] gap-4"
            animate={{
              x: ['0%', '-100%'],
            }}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {['antisana1.webp', 'antisana2.webp', 'antisana3.webp'].map((img, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <Image
                  src={`/assets/images/${img}`}
                  alt={`Reserva Antisana ${i + 1}`}
                  width={1200}
                  height={600}
                  className="rounded-md object-cover w-full h-96"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Información adicional */}
        <section className="px-4 py-4">
          <h2 className="text-3xl font-bold mb-4">Reserva Ecológica Antisana</h2>
          <p className="text-gray-700 mb-4">
            La Reserva Ecológica Antisana es un área protegida ubicada en los Andes del Ecuador. Alberga el volcán Antisana (5,758 msnm),
            extensos páramos, humedales, lagunas y bosques nublados. Es vital para la conservación del agua potable de Quito, y resguarda especies emblemáticas
            como el cóndor andino, el oso de anteojos, venados, y una gran diversidad de aves y flora andina.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Área aproximada: 120,000 hectáreas</li>
            <li>Clima: frío andino, con precipitaciones y niebla frecuentes</li>
            <li>Hidrografía: origen de ríos clave como el Papallacta y el Tambo</li>
            <li>Importancia: fuente de agua, biodiversidad y carbono</li>
          </ul>
        </section>
      </div>
    </MainLayout>
  )
}
