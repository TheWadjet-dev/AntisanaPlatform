import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ImageCarousel({ images, captions }) {
  return (
    <div className="overflow-hidden w-full rounded-lg mb-8 md:mb-12 shadow-lg bg-gradient-to-r from-gray-200 to-gray-300">
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-100%'],
        }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{ width: '200%' }}
      >
        {/* Primera serie de imágenes */}
        {images.map((img, i) => (
          <div key={`first-${i}`} className="flex-shrink-0 relative overflow-hidden" style={{ width: '33.333%' }}>
            <div className="relative w-full aspect-[16/9] md:aspect-[16/10] lg:aspect-[16/9]">
              <Image
                src={`/assets/images/${img}`}
                alt={captions[i] || `Reserva Ecológica Antisana - Vista ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={i === 0}
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2gWVFEmeQb9k+Ey8M5Xb+o"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xs md:text-sm font-semibold mb-1">
                  {captions[i] || `Vista ${i + 1}`}
                </h3>
              </div>
            </div>
          </div>
        ))}
        
        {/* Segunda serie de imágenes (duplicada para efecto continuo) */}
        {images.map((img, i) => (
          <div key={`second-${i}`} className="flex-shrink-0 relative overflow-hidden" style={{ width: '33.333%' }}>
            <div className="relative w-full aspect-[16/9] md:aspect-[16/10] lg:aspect-[16/9]">
              <Image
                src={`/assets/images/${img}`}
                alt={captions[i] || `Reserva Ecológica Antisana - Vista ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli2gWVFEmeQb9k+Ey8M5Xb+o"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xs md:text-sm font-semibold mb-1">
                  {captions[i] || `Vista ${i + 1}`}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
