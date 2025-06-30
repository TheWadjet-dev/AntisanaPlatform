import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function LaMicaSystemSection({ data }) {
  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader 
        title={data.title}
        subtitle={data.subtitle}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {data.facts.map((fact, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-6 text-center shadow-lg border-2 border-orange-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl md:text-5xl mb-4">{fact.icon}</div>
            <h3 className="text-lg md:text-xl font-bold text-red-800 mb-3">
              {fact.title}
            </h3>
            <p className="text-sm md:text-base text-red-700 leading-relaxed">
              {fact.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
