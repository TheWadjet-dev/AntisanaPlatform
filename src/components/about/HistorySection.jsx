import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function HistorySection({ data }) {
  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader 
        title={data.title}
        subtitle={data.subtitle}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Línea de tiempo vertical */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-400 to-green-400"></div>
          
          {data.timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex items-center mb-8 md:mb-12"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Círculo en la línea de tiempo */}
              <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
              
              {/* Contenido */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'} pl-16 md:pl-0`}>
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">{item.icon}</span>
                    <span className="text-lg font-bold text-blue-600">{item.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.event}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
