"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"

export default function NewPagePage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    published: false
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[ä]/g, 'ae')
      .replace(/[ö]/g, 'oe')
      .replace(/[ü]/g, 'ue')
      .replace(/[ß]/g, 'ss')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }))
  }

  const handleCreatePage = async () => {
    if (!formData.title || !formData.slug) {
      alert('Titel und Slug sind erforderlich')
      return
    }

    setIsCreating(true)
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          published: formData.published,
          content: { blocks: [] }
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create page')
      }

      const newPage = await response.json()
      router.push(`/admin/seiten/${newPage.id}/bearbeiten`)
    } catch (error) {
      console.error('Error creating page:', error)
      alert(error instanceof Error ? error.message : 'Fehler beim Erstellen der Seite')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Neue Seite erstellen</h1>
              <p className="text-gray-800">Erstellen Sie eine neue Seite für Ihren Shop</p>
            </div>
          </div>
          
          <Button 
            onClick={handleCreatePage}
            disabled={isCreating || !formData.title || !formData.slug}
          >
            <Save className="w-4 h-4 mr-2" />
            {isCreating ? 'Wird erstellt...' : 'Erstellen & Bearbeiten'}
          </Button>
        </div>

        {/* Form */}
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Seiten Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Seiten Titel"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-800 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                    /
                  </span>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="seiten-url"
                    className="rounded-l-none"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Die URL unter der die Seite erreichbar ist. Nur Kleinbuchstaben, Zahlen und Bindestriche.
                </p>
              </div>

              <div>
                <Label htmlFor="description">Beschreibung (optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Kurze Beschreibung der Seite..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="published">Seite direkt veröffentlichen</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
