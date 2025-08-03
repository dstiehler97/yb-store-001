import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">YB Store</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/products" className="text-gray-600 hover:text-gray-900">
                Produkte
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                Kategorien
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                Über uns
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Kontakt
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline">Anmelden</Button>
              </Link>
              <Link href="/admin">
                <Button>Admin Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Willkommen bei <span className="text-blue-600">YB Store</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ihr modernes E-Commerce System mit integriertem Page Builder und Design Studio. 
            Erstellen Sie professionelle Online-Shops mit Drag & Drop Funktionalität.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                Shop erkunden
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Builder</h3>
            <p className="text-gray-600">
              Erstellen Sie Seiten mit unserem intuitiven Drag & Drop Page Builder. 
              Keine Programmierkenntnisse erforderlich.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Studio</h3>
            <p className="text-gray-600">
              Passen Sie Farben, Schriftarten und Layouts an. 
              Erstellen Sie einzigartige Designs für Ihren Shop.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vollständiges E-Commerce</h3>
            <p className="text-gray-600">
              Produktverwaltung, Bestellabwicklung, Kundenverwaltung - 
              alles was Sie für einen erfolgreichen Online-Shop brauchen.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bereit zum Starten?
          </h2>
          <p className="text-gray-600 mb-6">
            Loggen Sie sich in das Admin Dashboard ein und beginnen Sie mit dem Aufbau Ihres Shops.
          </p>
          <Link href="/admin">
            <Button size="lg">
              Zum Admin Dashboard
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">YB Store</h3>
              <p className="text-gray-400">
                Modernes E-Commerce System mit Page Builder und Design Studio.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Shop
              </h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-gray-400 hover:text-white">Produkte</Link></li>
                <li><Link href="/categories" className="text-gray-400 hover:text-white">Kategorien</Link></li>
                <li><Link href="/cart" className="text-gray-400 hover:text-white">Warenkorb</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Unternehmen
              </h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Über uns</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Kontakt</Link></li>
                <li><Link href="/imprint" className="text-gray-400 hover:text-white">Impressum</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Admin
              </h4>
              <ul className="space-y-2">
                <li><Link href="/admin" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                <li><Link href="/admin/page-builder" className="text-gray-400 hover:text-white">Page Builder</Link></li>
                <li><Link href="/admin/design" className="text-gray-400 hover:text-white">Design Studio</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 YB Store. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
