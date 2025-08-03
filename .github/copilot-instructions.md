# Copilot Instructions für YB Store

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Projekt Übersicht
Dies ist ein Next.js 14 E-Commerce System mit Admin Dashboard und integriertem Page Builder, ähnlich Shopify.

## Tech Stack
- **Frontend**: Next.js 14 mit App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL mit Prisma ORM
- **Authentifizierung**: NextAuth.js
- **UI Components**: Radix UI, Lucide React Icons
- **Page Builder**: Custom Drag & Drop mit @dnd-kit
- **State Management**: Zustand
- **Forms**: React Hook Form mit Zod Validation

## Architektur Prinzipien
1. **Modularity**: Jede Komponente sollte wiederverwendbar und isoliert sein
2. **Type Safety**: Vollständige TypeScript Abdeckung
3. **Performance**: Server-Side Rendering wo möglich
4. **Accessibility**: WCAG 2.1 AA Standards einhalten
5. **Mobile First**: Responsive Design priorisieren

## Ordnerstruktur
```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin Dashboard
│   ├── api/               # API Routes
│   └── (storefront)/      # Öffentlicher Shop
├── components/            # Reusable Components
│   ├── admin/            # Admin-spezifische Komponenten
│   ├── builder/          # Page Builder Komponenten
│   └── ui/               # Basis UI Komponenten
├── lib/                  # Utilities & Konfiguration
├── hooks/                # Custom React Hooks
├── store/                # Zustand Store
└── types/                # TypeScript Definitionen
```

## Coding Standards
- Verwende funktionale Komponenten mit TypeScript
- Folge dem compound component pattern für komplexe UI
- Implementiere proper error boundaries
- Nutze Server Components wo möglich
- Verwende beschreibende Commit Messages

## Design System
- Nutze Tailwind CSS mit custom design tokens
- Implementiere consistent spacing (4px grid)
- Verwende semantic color palette
- Folge Material Design Prinzipien für Interaktionen

## Database Schema Conventions
- Verwende camelCase für Felder
- Implementiere proper relations mit Prisma
- Nutze UUID für primäre Schlüssel
- Implementiere soft deletes für wichtige Entitäten

## Page Builder Spezifikationen
- Jeder Block muss ein `BlockComponent` Interface implementieren
- Nutze das factory pattern für Block-Erstellung
- Implementiere undo/redo Funktionalität
- Verwende optimistische Updates für bessere UX
