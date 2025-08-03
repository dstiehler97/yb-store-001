"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { 
  Type, 
  Image as ImageIcon, 
  Square, 
  Grid, 
  Package, 
  Star,
  Save,
  Eye,
  Trash2,
  GripVertical
} from "lucide-react"
import { BlockComponent, BlockType } from "@/types/page-builder"

const BLOCK_TYPES = [
  { type: "header" as BlockType, label: "Header", icon: Type },
  { type: "hero" as BlockType, label: "Hero Section", icon: Square },
  { type: "text" as BlockType, label: "Text Block", icon: Type },
  { type: "image" as BlockType, label: "Bild", icon: ImageIcon },
  { type: "gallery" as BlockType, label: "Galerie", icon: Grid },
  { type: "product-grid" as BlockType, label: "Produkt Grid", icon: Package },
  { type: "feature-list" as BlockType, label: "Features", icon: Star },
]

const createDefaultBlock = (type: BlockType): BlockComponent => {
  const baseBlock = {
    id: Math.random().toString(36),
    type,
    style: {},
    children: [],
  }

  switch (type) {
    case "header":
      return {
        ...baseBlock,
        content: {
          logo: "YB Store",
          navigation: ["Home", "Produkte", "Kontakt"],
          showSearch: true,
        },
      }
    case "hero":
      return {
        ...baseBlock,
        content: {
          title: "Willkommen bei YB Store",
          subtitle: "Entdecken Sie unsere neuesten Produkte",
          buttonText: "Jetzt shoppen",
          buttonLink: "/products",
          backgroundImage: "",
        },
      }
    case "text":
      return {
        ...baseBlock,
        content: {
          text: "Hier ist Ihr Text...",
          alignment: "left",
          size: "medium",
        },
      }
    case "image":
      return {
        ...baseBlock,
        content: {
          src: "",
          alt: "Bild Beschreibung",
          caption: "",
        },
      }
    case "product-grid":
      return {
        ...baseBlock,
        content: {
          title: "Unsere Produkte",
          columns: 3,
          showPrices: true,
          category: "",
        },
      }
    default:
      return {
        ...baseBlock,
        content: {},
      }
  }
}

function SortableBlock({ block, onUpdate, onDelete }: {
  block: BlockComponent
  onUpdate: (block: BlockComponent) => void
  onDelete: (id: string) => void
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border rounded-lg p-4 mb-2"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>
          <span className="font-medium">{block.type}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(block.id)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Block-specific content editor */}
      <BlockEditor block={block} onUpdate={onUpdate} />
    </div>
  )
}

function BlockEditor({ block, onUpdate }: {
  block: BlockComponent
  onUpdate: (block: BlockComponent) => void
}) {
  const updateContent = (key: string, value: string | number | boolean) => {
    onUpdate({
      ...block,
      content: {
        ...block.content,
        [key]: value,
      },
    })
  }

  const getContentValue = (key: string, defaultValue: string | number = ""): string | number => {
    const value = block.content[key]
    return value != null ? value as string | number : defaultValue
  }

  switch (block.type) {
    case "hero":
      return (
        <div className="space-y-3">
          <Input
            placeholder="Titel"
            value={getContentValue("title", "") as string}
            onChange={(e) => updateContent("title", e.target.value)}
          />
          <Input
            placeholder="Untertitel"
            value={getContentValue("subtitle", "") as string}
            onChange={(e) => updateContent("subtitle", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Button Text"
              value={getContentValue("buttonText", "") as string}
              onChange={(e) => updateContent("buttonText", e.target.value)}
            />
            <Input
              placeholder="Button Link"
              value={getContentValue("buttonLink", "") as string}
              onChange={(e) => updateContent("buttonLink", e.target.value)}
            />
          </div>
        </div>
      )
    case "text":
      return (
        <div className="space-y-3">
          <textarea
            className="w-full p-2 border rounded-md"
            rows={3}
            placeholder="Ihr Text..."
            value={getContentValue("text", "") as string}
            onChange={(e) => updateContent("text", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              className="p-2 border rounded-md"
              value={getContentValue("alignment", "left") as string}
              onChange={(e) => updateContent("alignment", e.target.value)}
            >
              <option value="left">Links</option>
              <option value="center">Mitte</option>
              <option value="right">Rechts</option>
            </select>
            <select
              className="p-2 border rounded-md"
              value={getContentValue("size", "medium") as string}
              onChange={(e) => updateContent("size", e.target.value)}
            >
              <option value="small">Klein</option>
              <option value="medium">Mittel</option>
              <option value="large">Groß</option>
            </select>
          </div>
        </div>
      )
    case "product-grid":
      return (
        <div className="space-y-3">
          <Input
            placeholder="Titel"
            value={getContentValue("title", "") as string}
            onChange={(e) => updateContent("title", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Spalten"
              value={getContentValue("columns", 3) as number}
              onChange={(e) => updateContent("columns", parseInt(e.target.value))}
            />
            <select
              className="p-2 border rounded-md"
              value={getContentValue("category", "") as string}
              onChange={(e) => updateContent("category", e.target.value)}
            >
              <option value="">Alle Kategorien</option>
              <option value="clothing">Kleidung</option>
              <option value="accessories">Accessoires</option>
            </select>
          </div>
        </div>
      )
    default:
      return (
        <div className="text-gray-500 text-sm">
          Keine besonderen Einstellungen verfügbar
        </div>
      )
  }
}

export default function PageBuilderPage() {
  const [blocks, setBlocks] = useState<BlockComponent[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [pageName, setPageName] = useState("Neue Seite")

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const addBlock = (type: BlockType) => {
    const newBlock = createDefaultBlock(type)
    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (updatedBlock: BlockComponent) => {
    setBlocks(blocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    ))
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id))
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over?.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  const savePage = () => {
    console.log("Saving page:", { name: pageName, blocks })
    alert("Seite gespeichert!")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Input
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              className="text-2xl font-bold border-none p-0 focus:ring-0"
              placeholder="Seitenname"
            />
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Vorschau
            </Button>
            <Button onClick={savePage}>
              <Save className="h-4 w-4 mr-2" />
              Speichern
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Block Library */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Blöcke</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {BLOCK_TYPES.map((blockType) => (
                    <Button
                      key={blockType.type}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => addBlock(blockType.type)}
                    >
                      <blockType.icon className="h-4 w-4 mr-2" />
                      {blockType.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Page Builder */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Page Builder</CardTitle>
              </CardHeader>
              <CardContent>
                {blocks.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Square className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Noch keine Blöcke vorhanden</p>
                    <p className="text-sm">Klicken Sie auf einen Block links, um zu beginnen</p>
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={blocks.map(block => block.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {blocks.map((block) => (
                        <SortableBlock
                          key={block.id}
                          block={block}
                          onUpdate={updateBlock}
                          onDelete={deleteBlock}
                        />
                      ))}
                    </SortableContext>
                    <DragOverlay>
                      {activeId ? (
                        <div className="bg-white border rounded-lg p-4 shadow-lg">
                          <span className="font-medium">
                            {blocks.find(b => b.id === activeId)?.type}
                          </span>
                        </div>
                      ) : null}
                    </DragOverlay>
                  </DndContext>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
