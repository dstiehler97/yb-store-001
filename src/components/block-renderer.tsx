"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface Block {
  id: string
  type: 'hero' | 'text' | 'image' | 'button' | 'product-grid' | 'spacer'
  content: Record<string, unknown>
}

interface BlockRendererProps {
  block: Block
}

export default function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'hero':
      return (
        <section 
          className="relative py-20 px-6"
          style={{
            backgroundColor: (block.content.backgroundColor as string) || '#3B82F6',
            color: (block.content.textColor as string) || '#FFFFFF',
            backgroundImage: (block.content.backgroundImage as string) ? `url(${block.content.backgroundImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {(block.content.title as string) || 'Hero Titel'}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {(block.content.subtitle as string) || 'Hero Untertitel'}
            </p>
            {(block.content.buttonText as string) && (block.content.buttonLink as string) && (
              <Link href={block.content.buttonLink as string}>
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: (block.content.backgroundColor as string) || '#3B82F6'
                  }}
                >
                  {block.content.buttonText as string}
                </Button>
              </Link>
            )}
          </div>
        </section>
      )

    case 'text':
      return (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg max-w-none"
              style={{
                color: (block.content.textColor as string) || '#000000',
                textAlign: (block.content.textAlign as 'left' | 'center' | 'right' | 'justify') || 'left',
                fontSize: getFontSize(block.content.fontSize as string)
              }}
            >
              <p>{(block.content.text as string) || ''}</p>
            </div>
          </div>
        </section>
      )

    case 'image':
      return (
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div 
              className="flex justify-center"
              style={{
                justifyContent: getAlignment((block.content.alignment as string) || 'center')
              }}
            >
              {(block.content.imageUrl as string) ? (
                <div className={getImageWidth((block.content.width as string) || 'full')}>
                  <Image
                    src={block.content.imageUrl as string}
                    alt={(block.content.alt as string) || 'Bild'}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Bild wird geladen...</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )

    case 'button':
      return (
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div 
              className="flex"
              style={{
                justifyContent: getAlignment((block.content.alignment as string) || 'center')
              }}
            >
              {(block.content.link as string) ? (
                <Link href={block.content.link as string}>
                  <Button
                    size={getButtonSize(block.content.size as string)}
                    variant={getButtonVariant(block.content.style as string)}
                    style={{
                      backgroundColor: (block.content.backgroundColor as string) || undefined,
                      color: (block.content.textColor as string) || undefined
                    }}
                  >
                    {(block.content.text as string) || 'Button'}
                  </Button>
                </Link>
              ) : (
                <Button
                  size={getButtonSize(block.content.size as string)}
                  variant={getButtonVariant(block.content.style as string)}
                  style={{
                    backgroundColor: (block.content.backgroundColor as string) || undefined,
                    color: (block.content.textColor as string) || undefined
                  }}
                >
                  {(block.content.text as string) || 'Button'}
                </Button>
              )}
            </div>
          </div>
        </section>
      )

    case 'product-grid':
      return (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder für echte Produkte */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Beispiel Produkt {i}</h3>
                    <p className="text-gray-600 text-sm mb-3">Produktbeschreibung hier...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">€{(Math.random() * 100 + 20).toFixed(2)}</span>
                      <Button size="sm">In den Warenkorb</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'spacer':
      return (
        <div 
          style={{ 
            height: `${(block.content.height as number) || 50}px`,
            backgroundColor: (block.content.backgroundColor as string) || 'transparent'
          }} 
        />
      )

    default:
      return null
  }
}

// Helper functions
function getFontSize(size: string) {
  switch (size) {
    case 'sm': return '14px'
    case 'base': return '16px'
    case 'lg': return '18px'
    case 'xl': return '20px'
    case '2xl': return '24px'
    default: return '16px'
  }
}

function getAlignment(alignment: string) {
  switch (alignment) {
    case 'left': return 'flex-start'
    case 'center': return 'center'
    case 'right': return 'flex-end'
    default: return 'center'
  }
}

function getImageWidth(width: string) {
  switch (width) {
    case '1/3': return 'w-1/3'
    case '1/2': return 'w-1/2'
    case '2/3': return 'w-2/3'
    case 'full': return 'w-full'
    default: return 'w-full'
  }
}

function getButtonSize(size: string) {
  switch (size) {
    case 'sm': return 'sm' as const
    case 'default': return 'default' as const
    case 'lg': return 'lg' as const
    default: return 'default' as const
  }
}

function getButtonVariant(style: string) {
  switch (style) {
    case 'primary': return 'default' as const
    case 'secondary': return 'secondary' as const
    case 'outline': return 'outline' as const
    case 'ghost': return 'ghost' as const
    default: return 'default' as const
  }
}
