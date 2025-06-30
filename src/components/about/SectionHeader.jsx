import { motion } from 'framer-motion'

export default function SectionHeader({ title, subtitle, className = "" }) {
  return (
    <motion.div 
      className={`text-center mb-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-green-800">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base lg:text-lg max-w-4xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
