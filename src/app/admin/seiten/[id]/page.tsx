"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import AdminLayout from '@/components/admin/layout'
import PageBuilder from '@/components/admin/page-builder'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Block {
  id: string
  type: 'hero' | 'text' | 'image' | 'button' | 'product-grid' | 'spacer'
  content: Record<string, unknown>
}

interface Page {
  id: string
  title: string
  slug: string
  blocks: Block[]
  published: boolean
}

export default function EditPagePage() {
  const params = useParams()
  const [page, setPage] = useState<Page | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pageId, setPageId] = useState<string | null>(null)

  // Extract pageId from params
  useEffect(() => {
    if (params?.id) {
      setPageId(params.id as string)
    }
  }, [params])

  useEffect(() => {
    if (pageId) {
      loadPage(pageId)
    }
  }, [pageId])

  const loadPage = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/pages/${id}`)
      if (!response.ok) {
        throw new Error('Seite konnte nicht geladen werden')
      }
      const pageData = await response.json()
      
      // Convert content to blocks if needed
      const blocks = pageData.content?.blocks || []
      
      setPage({
        ...pageData,
        blocks
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (blocks: Block[]) => {
    if (!page) return

    try {
      setIsSaving(true)
      const response = await fetch(`/api/pages/${page.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: { blocks },
        }),
      })

      if (!response.ok) {
        throw new Error('Seite konnte nicht gespeichert werden')
      }

      const updatedPage = await response.json()
      setPage({
        ...updatedPage,
        blocks: updatedPage.content?.blocks || blocks
      })
      
      // Success message (you could use a toast library here)
      alert('Seite erfolgreich gespeichert!')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublishToggle = async () => {
    if (!page) return

    try {
      const response = await fetch(`/api/pages/${page.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !page.published,
        }),
      })

      if (!response.ok) {
        throw new Error('Status konnte nicht geändert werden')
      }

      const updatedPage = await response.json()
      setPage(updatedPage)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten')
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Seite wird geladen...</div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error || !page) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin/seiten">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
            </Link>
          </div>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error || 'Seite nicht gefunden'}
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/seiten">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Seite bearbeiten</h1>
              <p className="text-gray-600">{page.title}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant={page.published ? "default" : "outline"}
              onClick={handlePublishToggle}
            >
              {page.published ? "Veröffentlicht" : "Unveröffentlicht"}
            </Button>
            
            {page.published && (
              <Link href={`/${page.slug}`} target="_blank">
                <Button variant="outline">
                  Seite ansehen
                </Button>
              </Link>
            )}
          </div>
        </div>

        <PageBuilder
          blocks={page.blocks}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </div>
    </AdminLayout>
  )
}
