"use client"

import { Button } from '@/components/ui/button'
import { 
  Layout, 
  Type, 
  Image, 
  MousePointer, 
  Grid3X3, 
  Minus 
} from 'lucide-react'

interface Block {
  type: 'hero' | 'text' | 'image' | 'button' | 'product-grid' | 'spacer'
}

interface BlockToolboxProps {
  onAddBlock: (type: Block['type']) => void
}

export default function BlockToolbox({ onAddBlock }: BlockToolboxProps) {
  const blockTypes = [
    {
      type: 'hero' as const,
      label: 'Hero',
      description: 'Großer Titel mit Hintergrundbild',
      icon: Layout
    },
    {
      type: 'text' as const,
      label: 'Text',
      description: 'Textblock mit Formatierung',
      icon: Type
    },
    {
      type: 'image' as const,
      label: 'Bild',
      description: 'Einzelnes Bild mit Ausrichtung',
      icon: Image
    },
    {
      type: 'button' as const,
      label: 'Button',
      description: 'Call-to-Action Button',
      icon: MousePointer
    },
    {
      type: 'product-grid' as const,
      label: 'Produkt-Grid',
      description: 'Raster mit Produkten',
      icon: Grid3X3
    },
    {
      type: 'spacer' as const,
      label: 'Abstand',
      description: 'Leerer Platz zwischen Blöcken',
      icon: Minus
    }
  ]

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Blöcke</h3>
      
      <div className="space-y-2">
        {blockTypes.map((blockType) => {
          const Icon = blockType.icon
          return (
            <Button
              key={blockType.type}
              variant="outline"
              className="w-full justify-start h-auto p-3 text-left"
              onClick={() => onAddBlock(blockType.type)}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-0.5 text-gray-600" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-900 text-sm">
                    {blockType.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {blockType.description}
                  </div>
                </div>
              </div>
            </Button>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Hinweise</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Ziehe Blöcke in den Canvas</li>
          <li>• Klicke auf Bearbeiten für Anpassungen</li>
          <li>• Nutze den Griff zum Verschieben</li>
        </ul>
      </div>
    </div>
  )
}
