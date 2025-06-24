import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-200 to-blue-300 text-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <h1 className="text-5xl font-bold mb-6">Welcome to the Antisana Platform</h1>
      <p className="text-xl text-gray-700 max-w-xl">
        Discover the ecosystem of Antisana through data, animations, and fun interactive content.
      </p>
    </motion.div>
  )
}
