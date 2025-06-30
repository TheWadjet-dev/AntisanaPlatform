import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function ConservationSection({ data }) {
  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader 
        title={data.title}
        subtitle={data.subtitle}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {data.reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-green-50 to-teal-100 rounded-2xl p-6 shadow-lg border-2 border-green-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">{reason.icon}</div>
              <h3 className="text-lg md:text-xl font-bold text-green-800 mb-3">
                {reason.title}
              </h3>
              <p className="text-sm md:text-base text-green-700 leading-relaxed">
                {reason.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
