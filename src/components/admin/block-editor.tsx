"use client"

import { useState, ChangeEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Upload } from "lucide-react"

interface Block {
  id: string
  type: 'hero' | 'text' | 'image' | 'button' | 'product-grid' | 'spacer'
  content: Record<string, unknown>
}

interface BlockEditorProps {
  block: Block
  onSave: (block: Block) => void
  onClose: () => void
}

export default function BlockEditor({ block, onSave, onClose }: BlockEditorProps) {
  const [editedBlock, setEditedBlock] = useState<Block>(block)

  const updateContent = (key: string, value: string | number) => {
    setEditedBlock(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value
      }
    }))
  }

  const handleSave = () => {
    onSave(editedBlock)
    onClose()
  }

  const renderEditor = () => {
    switch (block.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                value={(editedBlock.content.title as string) || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('title', e.target.value)}
                placeholder="Hero Titel"
              />
            </div>
            
            <div>
              <Label htmlFor="subtitle">Untertitel</Label>
              <Input
                id="subtitle"
                value={(editedBlock.content.subtitle as string) || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('subtitle', e.target.value)}
                placeholder="Hero Untertitel"
              />
            </div>

            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={(editedBlock.content.buttonText as string) || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('buttonText', e.target.value)}
                placeholder="Button Text"
              />
            </div>

            <div>
              <Label htmlFor="buttonLink">Button Link</Label>
              <Input
                id="buttonLink"
                value={(editedBlock.content.buttonLink as string) || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('buttonLink', e.target.value)}
                placeholder="/products"
              />
            </div>

            <div>
              <Label htmlFor="backgroundColor">Hintergrundfarbe</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={(editedBlock.content.backgroundColor as string) || '#ffffff'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('backgroundColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={(editedBlock.content.backgroundColor as string) || '#ffffff'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('backgroundColor', e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="textColor">Textfarbe</Label>
              <div className="flex gap-2">
                <Input
                  id="textColor"
                  type="color"
                  value={(editedBlock.content.textColor as string) || '#000000'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('textColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={(editedBlock.content.textColor as string) || '#000000'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('textColor', e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="backgroundImage">Hintergrundbild URL</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundImage"
                  value={(editedBlock.content.backgroundImage as string) || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('backgroundImage', e.target.value)}
                  placeholder="/images/hero-bg.jpg"
                />
                <Button variant="outline" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text</Label>
              <Textarea
                id="text"
                value={(editedBlock.content.text as string) || ''}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateContent('text', e.target.value)}
                placeholder="Ihr Text hier..."
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="textColor">Textfarbe</Label>
              <div className="flex gap-2">
                <Input
                  id="textColor"
                  type="color"
                  value={(editedBlock.content.textColor as string) || '#000000'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('textColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={(editedBlock.content.textColor as string) || '#000000'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('textColor', e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageUrl">Bild URL</Label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  value={(editedBlock.content.imageUrl as string) || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('imageUrl', e.target.value)}
                  placeholder="/images/example.jpg"
                />
                <Button variant="outline" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={(editedBlock.content.alt as string) || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('alt', e.target.value)}
                placeholder="Bildbeschreibung"
              />
            </div>
          </div>
        )

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Button Text</Label>
              <Input
                id="text"
                value={(editedBlock.content.text as string) || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('text', e.target.value)}
                placeholder="Klick mich"
              />
            </div>

            <div>
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                value={(editedBlock.content.link as string) || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('link', e.target.value)}
                placeholder="/products"
              />
            </div>

            <div>
              <Label htmlFor="backgroundColor">Button Farbe</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={(editedBlock.content.backgroundColor as string) || '#3B82F6'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('backgroundColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={(editedBlock.content.backgroundColor as string) || '#3B82F6'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('backgroundColor', e.target.value)}
                  placeholder="#3B82F6"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="textColor">Text Farbe</Label>
              <div className="flex gap-2">
                <Input
                  id="textColor"
                  type="color"
                  value={(editedBlock.content.textColor as string) || '#FFFFFF'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('textColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={(editedBlock.content.textColor as string) || '#FFFFFF'}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('textColor', e.target.value)}
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
          </div>
        )

      case 'spacer':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="height">Höhe (px)</Label>
              <Input
                id="height"
                type="number"
                value={(editedBlock.content.height as number) || 50}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateContent('height', parseInt(e.target.value))}
                placeholder="50"
                min="10"
                max="500"
              />
            </div>
          </div>
        )

      default:
        return <div>Unbekannter Block-Typ</div>
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Block bearbeiten</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-800">Block-Typ: {block.type}</Label>
        </div>
        
        {renderEditor()}

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} className="flex-1">
            Speichern
          </Button>
          <Button variant="outline" onClick={onClose}>
            Abbrechen
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
