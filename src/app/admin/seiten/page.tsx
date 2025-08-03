"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Copy,
  Search,
  Globe,
  FileText,
  Calendar
} from "lucide-react"

interface Page {
  id: string
  title: string
  slug: string
  published: boolean
  content: Record<string, unknown>
  createdAt: string
  updatedAt: string
  views?: number
}

export default function PagesPage() {
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all")
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - später durch API ersetzen
  useEffect(() => {
    const mockPages: Page[] = [
      {
        id: "1",
        title: "Startseite",
        slug: "home",
        published: true,
        content: { blocks: [] },
        createdAt: "2025-01-15",
        updatedAt: "2025-01-20",
        views: 1250
      },
      {
        id: "2", 
        title: "Über uns",
        slug: "about",
        published: true,
        content: { blocks: [] },
        createdAt: "2025-01-10",
        updatedAt: "2025-01-18",
        views: 890
      },
      {
        id: "3",
        title: "Kontakt",
        slug: "contact", 
        published: false,
        content: { blocks: [] },
        createdAt: "2025-01-22",
        updatedAt: "2025-01-22",
        views: 0
      }
    ]
    
    setTimeout(() => {
      setPages(mockPages)
      setIsLoading(false)
    }, 500)
  }, [])

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "published" && page.published) ||
                         (filterStatus === "draft" && !page.published)
    
    return matchesSearch && matchesFilter
  })

  const handleCreatePage = () => {
    router.push("/admin/seiten/neu")
  }

  const handleEditPage = (pageId: string) => {
    router.push(`/admin/seiten/${pageId}/bearbeiten`)
  }

  const handleViewPage = (slug: string) => {
    window.open(`/${slug}`, "_blank")
  }

  const handleDuplicatePage = (pageId: string) => {
    // Page duplizieren
    console.log("Duplicate page:", pageId)
  }

  const handleDeletePage = (pageId: string) => {
    // Page löschen mit Bestätigung
    if (confirm("Sind Sie sicher, dass Sie diese Seite löschen möchten?")) {
      setPages(pages.filter(p => p.id !== pageId))
    }
  }

  const togglePublishStatus = (pageId: string) => {
    setPages(pages.map(page => 
      page.id === pageId 
        ? { ...page, published: !page.published }
        : page
    ))
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Seiten</h1>
            <p className="text-gray-600">Verwalten Sie Ihre Website-Seiten mit dem Page Builder</p>
          </div>
          
          <Button onClick={handleCreatePage} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Neue Seite erstellen
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Gesamt</p>
                  <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Veröffentlicht</p>
                  <p className="text-2xl font-bold text-green-600">
                    {pages.filter(p => p.published).length}
                  </p>
                </div>
                <Globe className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Entwürfe</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {pages.filter(p => !p.published).length}
                  </p>
                </div>
                <Edit className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aufrufe heute</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {pages.reduce((sum, p) => sum + (p.views || 0), 0)}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Seiten durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  Alle
                </Button>
                <Button
                  variant={filterStatus === "published" ? "default" : "outline"}
                  onClick={() => setFilterStatus("published")}
                  size="sm"
                >
                  Veröffentlicht
                </Button>
                <Button
                  variant={filterStatus === "draft" ? "default" : "outline"}
                  onClick={() => setFilterStatus("draft")}
                  size="sm"
                >
                  Entwürfe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pages List */}
        <div className="grid gap-4">
          {filteredPages.map((page) => (
            <Card key={page.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {page.title}
                      </h3>
                      <Badge variant={page.published ? "default" : "secondary"}>
                        {page.published ? "Veröffentlicht" : "Entwurf"}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                        /{page.slug}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Aktualisiert: {new Date(page.updatedAt).toLocaleDateString('de-DE')}
                      </span>
                      {page.views !== undefined && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {page.views} Aufrufe
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewPage(page.slug)}
                      disabled={!page.published}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ansehen
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPage(page.id)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Bearbeiten
                    </Button>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDuplicatePage(page.id)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublishStatus(page.id)}
                      >
                        <Globe className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePage(page.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredPages.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Keine Seiten gefunden
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterStatus !== "all" 
                    ? "Versuchen Sie es mit anderen Suchbegriffen oder Filtern."
                    : "Erstellen Sie Ihre erste Seite mit dem Page Builder."
                  }
                </p>
                {!searchTerm && filterStatus === "all" && (
                  <Button onClick={handleCreatePage}>
                    <Plus className="w-4 h-4 mr-2" />
                    Erste Seite erstellen
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
