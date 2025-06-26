import Image from 'next/image'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-4">What is the Antisana System?</h2>
      <p className="mb-4">
        The Antisana ecosystem is a high-altitude region in Ecuador known for its biodiversity,
        glaciers, and importance as a water source.
      </p>
      <Image src="/assets/images/antisana1.webp" alt="Antisana" width={800} height={450} />
    </div>
  )
}
