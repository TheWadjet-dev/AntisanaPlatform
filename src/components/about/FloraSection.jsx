import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function FloraSection({ data }) {
  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader 
        title={data.title}
        subtitle={data.subtitle}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {data.plants.map((plant, index) => (
          <motion.div
            key={index}
            className="group bg-gradient-to-br from-pink-50 to-purple-100 rounded-2xl p-6 shadow-lg border-2 border-pink-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-5xl md:text-6xl mb-4 group-hover:animate-pulse">
                {plant.emoji}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-purple-800 mb-3">
                {plant.name}
              </h3>
              <p className="text-sm md:text-base text-purple-700 leading-relaxed mb-4">
                {plant.description}
              </p>
              <div className="bg-green-100 rounded-lg p-3 border-l-4 border-green-400">
                <p className="text-xs md:text-sm text-green-800 font-semibold">
                  🌱 <strong>Súper poder:</strong> {plant.funFact}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
