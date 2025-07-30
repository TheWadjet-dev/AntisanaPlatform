import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import Link from 'next/link'

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
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/flora-fauna" legacyBehavior>
              <a className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors text-lg">
                Flora y Fauna
              </a>
            </Link>
            <Link href="/interactive" legacyBehavior>
              <a className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-lg">
                Quizz
              </a>
            </Link>
          </div>

      </motion.div>
    </section>
  )
}
