"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Save, 
  Eye, 
  ArrowLeft,
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  Settings,
  Plus,
  GripVertical,
  Trash2,
  Edit3
} from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Block {
  id: string
  type: 'hero' | 'text' | 'image' | 'button' | 'product-grid' | 'spacer'
  content: any
}

interface PageData {
  id: string
  title: string
  slug: string
  published: boolean
  content: {
    blocks: Block[]
  }
}

// Sortable Block Component
function SortableBlock({ block, onEdit, onDelete }: { 
  block: Block, 
  onEdit: (block: Block) => void,
  onDelete: (blockId: string) => void 
}) {
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

  const renderBlockPreview = () => {
    switch (block.type) {
      case 'hero':
        return (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg text-center">
            <h1 className="text-2xl font-bold mb-4">
              {block.content.title || 'Hero Titel'}
            </h1>
            <p className="text-lg mb-6">
              {block.content.subtitle || 'Hero Untertitel'}
            </p>
            <div className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
              {block.content.buttonText || 'Button Text'}
            </div>
          </div>
        )
      
      case 'text':
        return (
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="prose">
              <p className="text-gray-800">
                {block.content.text || 'Text Inhalt hier...'}
              </p>
            </div>
          </div>
        )
      
      case 'image':
        return (
          <div className="p-6 bg-gray-100 rounded-lg text-center">
            <div className="w-full h-32 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Bild: {block.content.alt || 'Bild'}</span>
            </div>
          </div>
        )
      
      case 'button':
        return (
          <div className="p-6 text-center">
            <button 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: block.content.color || '#3B82F6' }}
            >
              {block.content.text || 'Button Text'}
            </button>
          </div>
        )
      
      case 'product-grid':
        return (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              {block.content.title || 'Produkte'}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-4 rounded border">
                  <div className="w-full h-20 bg-gray-200 rounded mb-2"></div>
                  <p className="text-sm font-medium">Produkt {i}</p>
                  <p className="text-xs text-gray-600">€29.99</p>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'spacer':
        return (
          <div 
            className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
            style={{ height: `${block.content.height || 50}px` }}
          >
            <span className="text-gray-500 text-sm">
              Abstand: {block.content.height || 50}px
            </span>
          </div>
        )
      
      default:
        return (
          <div className="p-6 bg-gray-100 rounded-lg text-center">
            <span className="text-gray-600">Unbekannter Block-Typ</span>
          </div>
        )
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
    >
      {/* Block Controls */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg border p-1">
        <button
          className="p-1 text-gray-500 hover:text-blue-600 cursor-grab"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(block)}
          className="p-1 text-gray-500 hover:text-blue-600"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(block.id)}
          className="p-1 text-gray-500 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Block Type Badge */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Badge variant="secondary" className="text-xs">
          {block.type}
        </Badge>
      </div>

      {/* Block Content */}
      <div className="p-4">
        {renderBlockPreview()}
      </div>
    </div>
  )
}

export default function PageEditPage() {
  const router = useRouter()
  const params = useParams()
  const isEditing = params.id !== "neu"
  
  const [pageData, setPageData] = useState<PageData>({
    id: '',
    title: '',
    slug: '',
    published: false,
    content: { blocks: [] }
  })
  
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isSaving, setIsSaving] = useState(false)
  const [editingBlock, setEditingBlock] = useState<Block | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Load page data
  useEffect(() => {
    if (isEditing) {
      // Mock data loading
      setPageData({
        id: '1',
        title: 'Beispiel Seite',
        slug: 'beispiel-seite',
        published: false,
        content: {
          blocks: [
            {
              id: '1',
              type: 'hero',
              content: {
                title: 'Willkommen bei YB Store',
                subtitle: 'Ihr moderner Online Shop',
                buttonText: 'Jetzt einkaufen',
                buttonLink: '/products'
              }
            }
          ]
        }
      })
    }
  }, [isEditing])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const blocks = pageData.content.blocks
      const oldIndex = blocks.findIndex(block => block.id === active.id)
      const newIndex = blocks.findIndex(block => block.id === over?.id)

      const newBlocks = arrayMove(blocks, oldIndex, newIndex)
      setPageData({
        ...pageData,
        content: { blocks: newBlocks }
      })
    }
  }

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: getDefaultBlockContent(type)
    }

    setPageData({
      ...pageData,
      content: {
        blocks: [...pageData.content.blocks, newBlock]
      }
    })
  }

  const getDefaultBlockContent = (type: Block['type']) => {
    switch (type) {
      case 'hero':
        return {
          title: 'Neuer Hero Titel',
          subtitle: 'Hero Untertitel',
          buttonText: 'Button',
          buttonLink: '#'
        }
      case 'text':
        return { text: 'Neuer Text Inhalt...' }
      case 'image':
        return { src: '', alt: 'Bild' }
      case 'button':
        return { text: 'Button', link: '#', color: '#3B82F6' }
      case 'product-grid':
        return { title: 'Produkte', count: 6 }
      case 'spacer':
        return { height: 50 }
      default:
        return {}
    }
  }

  const deleteBlock = (blockId: string) => {
    setPageData({
      ...pageData,
      content: {
        blocks: pageData.content.blocks.filter(block => block.id !== blockId)
      }
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    // API call hier
    setTimeout(() => {
      setIsSaving(false)
      // Erfolg anzeigen
    }, 1000)
  }

  const handlePublish = () => {
    setPageData({ ...pageData, published: !pageData.published })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[äöü]/g, char => ({ 'ä': 'ae', 'ö': 'oe', 'ü': 'ue' }[char] || char))
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Seite bearbeiten' : 'Neue Seite erstellen'}
              </h1>
              <p className="text-gray-600">
                Verwenden Sie den Page Builder um Ihre Seite zu gestalten
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handlePublish}
            >
              <Globe className="w-4 h-4 mr-2" />
              {pageData.published ? 'Verstecken' : 'Veröffentlichen'}
            </Button>

            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Speichern...' : 'Speichern'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Page Settings */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seiten-Einstellungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Titel
                  </label>
                  <Input
                    value={pageData.title}
                    onChange={(e) => {
                      const title = e.target.value
                      setPageData({
                        ...pageData,
                        title,
                        slug: pageData.slug || generateSlug(title)
                      })
                    }}
                    placeholder="Seiten-Titel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    URL-Slug
                  </label>
                  <Input
                    value={pageData.slug}
                    onChange={(e) => setPageData({
                      ...pageData,
                      slug: e.target.value
                    })}
                    placeholder="url-slug"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    /{pageData.slug}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <Badge variant={pageData.published ? "default" : "secondary"}>
                    {pageData.published ? "Veröffentlicht" : "Entwurf"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Block Library */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Block-Bibliothek</CardTitle>
                <CardDescription>
                  Ziehen Sie Blöcke in Ihre Seite
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock('hero')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Hero Bereich
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock('text')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Text Block
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock('image')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Bild
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock('button')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Button
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock('product-grid')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Produkt-Grid
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addBlock('spacer')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Abstand
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Page Builder */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Page Builder</CardTitle>
                  
                  {/* Device Preview Buttons */}
                  <div className="flex items-center gap-1 border rounded-lg p-1">
                    <Button
                      variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setPreviewMode('tablet')}
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div 
                  className={`mx-auto transition-all duration-300 ${
                    previewMode === 'mobile' ? 'max-w-sm' :
                    previewMode === 'tablet' ? 'max-w-2xl' :
                    'max-w-full'
                  }`}
                >
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={pageData.content.blocks.map(block => block.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4 min-h-96">
                        {pageData.content.blocks.length === 0 ? (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              Keine Blöcke vorhanden
                            </h3>
                            <p className="text-gray-600">
                              Fügen Sie Blöcke aus der Bibliothek hinzu um zu beginnen.
                            </p>
                          </div>
                        ) : (
                          pageData.content.blocks.map((block) => (
                            <SortableBlock
                              key={block.id}
                              block={block}
                              onEdit={setEditingBlock}
                              onDelete={deleteBlock}
                            />
                          ))
                        )}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
