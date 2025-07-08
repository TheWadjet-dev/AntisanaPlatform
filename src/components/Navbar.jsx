import Link from 'next/link'
import { useState } from 'react'
import { useInstallPWA } from '../utils/useInstallPWA'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isInstallable, installPWA } = useInstallPWA()
  
  const links = [
    { href: '/home', label: 'Inicio' },
    { href: '/about', label: 'Acerca del Sistema Antisana' },
    { href: '/flora-fauna', label: 'Flora y Fauna' },
    { href: '/interactive', label: 'Quizz' },
    { href: '/actividad', label: 'Cóndor Guardián' }
  ]

  const handleInstall = async () => {
    const success = await installPWA()
    if (success) {
      console.log('PWA instalada correctamente')
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/home" className="text-xl font-bold text-green-700">
              Antisana
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {isInstallable && (
                <button
                  onClick={handleInstall}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  📱 Instalar App
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isInstallable && (
              <button
                onClick={handleInstall}
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
              >
                📱
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isInstallable && (
              <button
                onClick={() => {
                  handleInstall()
                  setIsOpen(false)
                }}
                className="w-full text-left bg-green-600 hover:bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                📱 Instalar App
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}