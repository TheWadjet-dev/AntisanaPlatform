import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function WaterCycleSection({ data }) {
  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader 
        title={data.title}
        subtitle={data.subtitle}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {data.steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 text-center shadow-lg border-2 border-blue-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl md:text-5xl mb-4">{step.icon}</div>
            <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-3">
              {step.title}
            </h3>
            <p className="text-sm md:text-base text-blue-700 leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
