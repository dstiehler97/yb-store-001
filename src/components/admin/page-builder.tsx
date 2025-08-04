"use client"

import { useState } from 'react'
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import DraggableBlock from './draggable-block'
import BlockToolbox from './block-toolbox'
import BlockEditor from './block-editor'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

interface Block {
  id: string
  type: 'hero' | 'text' | 'image' | 'button' | 'product-grid' | 'spacer'
  content: Record<string, unknown>
}

interface PageBuilderProps {
  blocks: Block[]
  onSave: (blocks: Block[]) => Promise<void>
  isSaving?: boolean
}

export default function PageBuilder({ blocks: initialBlocks, onSave, isSaving = false }: PageBuilderProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setBlocks((blocks) => {
        const oldIndex = blocks.findIndex((block) => block.id === active.id)
        const newIndex = blocks.findIndex((block) => block.id === over.id)
        return arrayMove(blocks, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: getDefaultContent(type)
    }

    setBlocks(prev => [...prev, newBlock])
  }

  const updateBlock = (blockId: string, content: Record<string, unknown>) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, content } : block
    ))
  }

  const deleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId))
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null)
      setIsEditing(false)
    }
  }

  const handleBlockEdit = (block: Block) => {
    setSelectedBlock(block)
    setIsEditing(true)
  }

  const handleEditorSave = (updatedBlock: Block) => {
    if (selectedBlock) {
      setBlocks(prev => prev.map(block => 
        block.id === selectedBlock.id ? updatedBlock : block
      ))
      setIsEditing(false)
      setSelectedBlock(null)
    }
  }

  const handleEditorCancel = () => {
    setIsEditing(false)
    setSelectedBlock(null)
  }

  const handleSave = async () => {
    await onSave(blocks)
  }

  return (
    <div className="flex gap-6">
      {/* Block Toolbox */}
      <div className="w-64 flex-shrink-0">
        <BlockToolbox onAddBlock={addBlock} />
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <div className="bg-white border rounded-lg p-6 min-h-[600px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Page Builder</h2>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Speichert...' : 'Speichern'}
            </Button>
          </div>

          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {blocks.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>Ziehe Blöcke hierher, um deine Seite zu erstellen</p>
                  </div>
                ) : (
                  blocks.map((block) => (
                    <DraggableBlock
                      key={block.id}
                      block={block}
                      onEdit={handleBlockEdit}
                      onDelete={deleteBlock}
                      isActive={activeId === block.id}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Block Editor Panel */}
      {isEditing && selectedBlock && (
        <div className="w-80 flex-shrink-0">
          <BlockEditor
            block={selectedBlock}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
          />
        </div>
      )}
    </div>
  )
}

function getDefaultContent(type: Block['type']): Record<string, unknown> {
  switch (type) {
    case 'hero':
      return {
        title: 'Neuer Hero Titel',
        subtitle: 'Hero Untertitel',
        backgroundColor: '#3B82F6',
        textColor: '#FFFFFF',
        buttonText: '',
        buttonLink: ''
      }
    case 'text':
      return {
        text: 'Neuer Textblock',
        textColor: '#000000',
        fontSize: 'base',
        textAlign: 'left'
      }
    case 'image':
      return {
        imageUrl: '',
        alt: '',
        width: 'full',
        alignment: 'center'
      }
    case 'button':
      return {
        text: 'Button Text',
        link: '',
        size: 'default',
        style: 'primary',
        alignment: 'center',
        backgroundColor: '#3B82F6',
        textColor: '#FFFFFF'
      }
    case 'product-grid':
      return {
        columns: 3,
        showPrices: true,
        showDescriptions: true
      }
    case 'spacer':
      return {
        height: 50,
        backgroundColor: 'transparent'
      }
    default:
      return {}
  }
}
