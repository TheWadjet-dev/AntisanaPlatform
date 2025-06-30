import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function HowToHelpSection({ data }) {
  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader 
        title={data.title}
        subtitle={data.subtitle}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {data.actions.map((action, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">{action.icon}</div>
              <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-3">
                {action.title}
              </h3>
              <p className="text-sm md:text-base text-blue-700 leading-relaxed">
                {action.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Mensaje motivacional final */}
      <motion.div
        className="mt-12 text-center bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 shadow-lg border-2 border-green-200"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-4xl mb-4">🌟</div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          ¡Juntos podemos proteger el Antisana!
        </h3>
        <p className="text-lg text-green-700 max-w-2xl mx-auto">
          Cada pequeña acción cuenta. Cuando cuidamos el Antisana, cuidamos nuestro futuro y el de todos los seres vivos que dependen de este ecosistema único.
        </p>
      </motion.div>
    </section>
  )
}
