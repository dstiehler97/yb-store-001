"use client"

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, GripVertical } from 'lucide-react'
import BlockRenderer from '@/components/block-renderer'

interface Block {
  id: string
  type: 'hero' | 'text' | 'image' | 'button' | 'product-grid' | 'spacer'
  content: Record<string, unknown>
}

interface DraggableBlockProps {
  block: Block
  onEdit: (block: Block) => void
  onDelete: (blockId: string) => void
  isActive?: boolean
}

export default function DraggableBlock({ block, onEdit, onDelete, isActive }: DraggableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group border rounded-lg overflow-hidden bg-white
        ${isActive ? 'ring-2 ring-blue-500' : 'hover:border-gray-300'}
        ${isDragging ? 'shadow-lg' : 'shadow-sm'}
      `}
    >
      {/* Drag Handle */}
      <div 
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <div className="bg-gray-900 text-white p-1 rounded">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Block Controls */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <Button
          size="sm"
          variant="outline"
          className="bg-white"
          onClick={() => onEdit(block)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-white text-red-600 hover:text-red-700"
          onClick={() => onDelete(block.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Block Type Label */}
      <div className="absolute bottom-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded">
          {getBlockTypeLabel(block.type)}
        </span>
      </div>

      {/* Block Content */}
      <div className="pointer-events-none">
        <BlockRenderer block={block} />
      </div>

      {/* Overlay for interaction */}
      <div className="absolute inset-0 bg-transparent" />
    </div>
  )
}

function getBlockTypeLabel(type: string): string {
  switch (type) {
    case 'hero': return 'Hero'
    case 'text': return 'Text'
    case 'image': return 'Bild'
    case 'button': return 'Button'
    case 'product-grid': return 'Produkt-Grid'
    case 'spacer': return 'Abstand'
    default: return type
  }
}
