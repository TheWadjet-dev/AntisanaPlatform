import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

export default function GuardiansSection({ data }) {
  return (
    <section className="mb-12 md:mb-16">
      <SectionHeader 
        title={data.title}
        subtitle={data.subtitle}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {data.roles.map((role, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-6 shadow-lg border-2 border-indigo-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">{role.emoji}</div>
              <h3 className="text-lg md:text-xl font-bold text-indigo-800 mb-3">
                {role.title}
              </h3>
              <p className="text-sm md:text-base text-indigo-700 leading-relaxed mb-4">
                {role.description}
              </p>
              <div className="text-left bg-white rounded-lg p-3 border border-indigo-200">
                <p className="text-xs font-semibold text-indigo-600 mb-2">Sus tareas:</p>
                <ul className="text-xs text-indigo-700 space-y-1">
                  {role.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
