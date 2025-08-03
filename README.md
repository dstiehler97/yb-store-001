# YB Store - E-Commerce Platform

Ein vollständiges E-Commerce System mit Admin Dashboard und integriertem Page Builder, ähnlich Shopify.

## 🚀 Features

### ⚡ Core Funktionen
- **Admin Dashboard** - Vollständige Verwaltung des Shops
- **Page Builder** - Drag & Drop Editor für alle Seiten
- **Design Studio** - Anpassung von Farben, Schriftarten und Layout
- **Produkt Management** - Kategorien, Varianten, Inventory
- **Bestell Management** - Vollständiger Checkout-Prozess
- **Benutzer Verwaltung** - Kunden und Admin Accounts

### 🎨 Design Studio
- **Farben anpassen** - Primär-, Sekundär- und Akzentfarben
- **Typografie** - Schriftarten für Überschriften und Text
- **Layout-Einstellungen** - Container-Breite, Border-Radius, Spacing
- **Button-Styles** - Verschiedene Button-Designs und Größen
- **Live-Vorschau** - Sofortige Darstellung der Änderungen

### 📄 Page Builder
- **Drag & Drop Interface** - Intuitive Bedienung
- **Vorgefertigte Blöcke**:
  - Header/Navigation
  - Hero Sections
  - Text Blöcke
  - Bild Galerien
  - Produkt Grids
  - Feature Listen
  - Footer

### 🛍️ E-Commerce Funktionen
- **Produktkatalog** - Unbegrenzte Produkte und Kategorien
- **Varianten** - Größen, Farben, etc.
- **Inventory Management** - Lagerbestand Tracking
- **Checkout Process** - Vollständiger Kaufprozess
- **Bestellverwaltung** - Status Tracking und Updates

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js 14 (App Router)
- **Database**: PostgreSQL mit Prisma ORM
- **Authentifizierung**: NextAuth.js
- **UI Framework**: Tailwind CSS + Radix UI
- **Page Builder**: @dnd-kit für Drag & Drop
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod Validation
- **Deployment**: Railway optimiert

## 📦 Installation

### Voraussetzungen
- Node.js 18+ 
- PostgreSQL Database
- npm oder yarn

### Lokale Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/ihr-username/yb-store.git
   cd yb-store
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Environment Variables konfigurieren**
   ```bash
   cp .env.example .env
   ```
   
   Füllen Sie die .env Datei mit Ihren Werten:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/yb_store"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here"
   ```

4. **Database Setup**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Development Server starten**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Railway Deployment (Empfohlen)

Detaillierte Anleitung siehe [ANLEITUNG.md](./ANLEITUNG.md)

**Schnellstart:**
1. Repository zu GitHub pushen
2. Railway Account erstellen
3. PostgreSQL Service hinzufügen
4. Environment Variables setzen
5. Automatisches Deployment abwarten

## 📁 Projekt Struktur

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin Dashboard Seiten
│   │   ├── dashboard/     # Haupt-Dashboard
│   │   ├── design/        # Design Studio
│   │   ├── page-builder/  # Page Builder Interface
│   │   ├── products/      # Produkt Verwaltung
│   │   └── orders/        # Bestell Verwaltung
│   ├── api/               # API Routes
│   └── (storefront)/      # Öffentlicher Shop
├── components/            # Reusable Components
│   ├── admin/            # Admin-spezifische Komponenten
│   ├── builder/          # Page Builder Komponenten
│   └── ui/               # Basis UI Komponenten
├── lib/                  # Utilities & Konfiguration
│   ├── prisma.ts         # Database Client
│   ├── auth.ts           # NextAuth Konfiguration
│   └── utils.ts          # Helper Funktionen
├── types/                # TypeScript Definitionen
└── hooks/                # Custom React Hooks
```

## 🎯 Admin Dashboard

Zugriff über `/admin` mit Admin-Berechtigung:

### Dashboard Bereiche:
- **Übersicht** - Statistiken und KPIs
- **Produkte** - Produkt- und Kategorie-Verwaltung
- **Bestellungen** - Bestellstatus und Fulfillment
- **Kunden** - Kundenverwaltung
- **Seiten** - CMS und Page Builder
- **Design Studio** - Theme-Anpassungen
- **Einstellungen** - Shop-Konfiguration

## 🎨 Design System

Das Design Studio ermöglicht vollständige Anpassung:

### Anpassbare Elemente:
- **Farben**: Primär, Sekundär, Akzent, Hintergrund
- **Typografie**: Überschrift- und Text-Schriftarten
- **Layout**: Container-Breite, Abstände, Border-Radius
- **Komponenten**: Button-Styles, Form-Elemente

### Live-Vorschau:
Alle Änderungen werden sofort in einer Live-Vorschau angezeigt.

## 📄 Page Builder

### Verfügbare Blöcke:
- **Header** - Navigation mit Logo und Menü
- **Hero Section** - Call-to-Action Bereiche
- **Text Block** - Formatierter Text-Content
- **Bild** - Einzelne Bilder mit Beschriftung
- **Galerie** - Multi-Bild Darstellungen
- **Produkt Grid** - Automatische Produktlisten
- **Feature List** - Highlight-Bereiche
- **Footer** - Seitenfuß mit Links

### Page Builder Features:
- **Drag & Drop** - Intuitive Bedienung
- **Live-Editing** - Sofortige Bearbeitung
- **Responsive** - Mobile-optimierte Darstellung
- **SEO-optimiert** - Meta-Tags und strukturierte Daten

## 📊 Performance

### Optimierungen:
- **Server-Side Rendering** - Schnelle Ladezeiten
- **Image Optimization** - Automatische Bildkomprimierung
- **Code Splitting** - Lazy Loading von Komponenten
- **CDN Ready** - Optimiert für CDN-Deployment

### Metriken:
- **Lighthouse Score**: 95+ Performance
- **Core Web Vitals**: Alle grüne Werte
- **Mobile Optimiert**: Responsive Design

## 🔒 Sicherheit

### Implementierte Features:
- **Authentication** - Sichere Benutzeranmeldung
- **Role-based Access** - Admin/Staff/Customer Rollen
- **CSRF Protection** - Cross-Site Request Forgery Schutz
- **Input Validation** - Zod Schema Validation
- **SQL Injection Prevention** - Prisma ORM Protection

## 📈 Skalierung

### Optimiert für Wachstum:
- **Database Indexing** - Optimierte Datenbankabfragen
- **Caching Strategy** - Redis-ready für Caching
- **Horizontal Scaling** - Multi-Instance Support
- **CDN Integration** - Globale Content Delivery

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Commit Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to Branch (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

- **Documentation**: Siehe [ANLEITUNG.md](./ANLEITUNG.md)
- **Issues**: GitHub Issues für Bugs und Feature Requests
- **Community**: Diskussionen im Repository

---

**YB Store - Ihr professionelles E-Commerce System! 🛍️**
