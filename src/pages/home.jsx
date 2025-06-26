import MainLayout from '../layouts/MainLayout'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <MainLayout>
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 md:px-6 py-16"
        style={{ backgroundImage: "url('/assets/images/antisana1.webp')" }}
      >
        {/* Capa oscura sobre la imagen */}
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10 text-white max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Bienvenido al Sistema Antisana
          </h1>

          <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-8 drop-shadow-md leading-relaxed">
            Explora datos climáticos, geográficos e interactivos de la Reserva Ecológica Antisana. 
            Aprende, analiza y conéctate con este ecosistema único del Ecuador.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/about" legacyBehavior>
              <a className="inline-block bg-green-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg hover:bg-green-700 transition-colors text-base md:text-lg font-semibold">
                Comenzar a explorar
              </a>
            </Link>
            <Link href="/interactive" legacyBehavior>
              <a className="inline-block bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-base md:text-lg font-semibold">
                Trivia Interactiva
              </a>
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}
