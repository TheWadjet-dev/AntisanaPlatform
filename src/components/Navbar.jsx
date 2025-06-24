import Link from 'next/link'

export default function Navbar() {
  const links = [
    { href: '/home', label: 'Inicio' },
    { href: '/about', label: 'Acerca del Sistema Antisana' },
    { href: '/data-visualization', label: 'Visualización de Datos' },
    { href: '/interactive', label: 'Exploración Interactiva' },
    { href: '/volcan', label: 'Volcán 3D' },
    { href: '/actividad', label: 'Cóndor Guardián' }
  ]

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <ul className="flex justify-center gap-8">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-blue-700 font-semibold hover:text-blue-900 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}