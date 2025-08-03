"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Palette, 
  Save,
  Eye,
  RotateCcw
} from "lucide-react"

interface ThemeSettings {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  typography: {
    headingFont: string
    bodyFont: string
    fontSize: {
      base: string
      heading: string
    }
  }
  layout: {
    containerWidth: string
    borderRadius: string
    spacing: string
  }
  buttons: {
    style: string
    size: string
    animation: boolean
  }
}

const defaultSettings: ThemeSettings = {
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    accent: "#f59e0b",
    background: "#ffffff",
    text: "#1f2937"
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
    fontSize: {
      base: "16px",
      heading: "32px"
    }
  },
  layout: {
    containerWidth: "1200px",
    borderRadius: "8px",
    spacing: "16px"
  },
  buttons: {
    style: "rounded",
    size: "medium",
    animation: true
  }
}

export default function DesignStudioPage() {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState("colors")

    const updateSettings = (section: keyof ThemeSettings, key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const resetToDefault = () => {
    setSettings(defaultSettings)
  }

  const saveSettings = () => {
    // In real app, this would save to database
    console.log("Saving settings:", settings)
    alert("Design-Einstellungen gespeichert!")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Design Studio</h1>
            <p className="text-gray-800">Passen Sie das Aussehen Ihres Shops an</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={resetToDefault}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Zurücksetzen
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Vorschau
            </Button>
            <Button onClick={saveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Speichern
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Design-Einstellungen
                </CardTitle>
                <CardDescription>
                  Anpassung von Farben, Schriftarten und Layout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="colors">Farben</TabsTrigger>
                    <TabsTrigger value="typography">Typografie</TabsTrigger>
                    <TabsTrigger value="layout">Layout</TabsTrigger>
                    <TabsTrigger value="buttons">Buttons</TabsTrigger>
                  </TabsList>

                  <TabsContent value="colors" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Primärfarbe</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={settings.colors.primary}
                            onChange={(e) => updateSettings("colors", "primary", e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={settings.colors.primary}
                            onChange={(e) => updateSettings("colors", "primary", e.target.value)}
                            placeholder="#3b82f6"
                            className="font-mono text-gray-800"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Sekundärfarbe</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={settings.colors.secondary}
                            onChange={(e) => updateSettings("colors", "secondary", e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={settings.colors.secondary}
                            onChange={(e) => updateSettings("colors", "secondary", e.target.value)}
                            placeholder="#64748b"
                            className="font-mono text-gray-800"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Akzentfarbe</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={settings.colors.accent}
                            onChange={(e) => updateSettings("colors", "accent", e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={settings.colors.accent}
                            onChange={(e) => updateSettings("colors", "accent", e.target.value)}
                            placeholder="#f59e0b"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Hintergrund</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="color"
                            value={settings.colors.background}
                            onChange={(e) => updateSettings("colors", "background", e.target.value)}
                            className="w-16 h-10 p-1"
                          />
                          <Input
                            value={settings.colors.background}
                            onChange={(e) => updateSettings("colors", "background", e.target.value)}
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="typography" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Überschrift Font</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={settings.typography.headingFont}
                          onChange={(e) => updateSettings("typography", "headingFont", e.target.value)}
                        >
                          <option value="Inter">Inter</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Montserrat">Montserrat</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Text Font</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={settings.typography.bodyFont}
                          onChange={(e) => updateSettings("typography", "bodyFont", e.target.value)}
                        >
                          <option value="Inter">Inter</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Source Sans Pro">Source Sans Pro</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="layout" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Container Breite</label>
                        <Input
                          value={settings.layout.containerWidth}
                          onChange={(e) => updateSettings("layout", "containerWidth", e.target.value)}
                          placeholder="1200px"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Border Radius</label>
                        <Input
                          value={settings.layout.borderRadius}
                          onChange={(e) => updateSettings("layout", "borderRadius", e.target.value)}
                          placeholder="8px"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="buttons" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Button Style</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={settings.buttons.style}
                          onChange={(e) => updateSettings("buttons", "style", e.target.value)}
                        >
                          <option value="rounded">Rounded</option>
                          <option value="square">Square</option>
                          <option value="pill">Pill</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Button Size</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={settings.buttons.size}
                          onChange={(e) => updateSettings("buttons", "size", e.target.value)}
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Live Vorschau
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-4 border rounded-lg"
                  style={{
                    backgroundColor: settings.colors.background,
                    color: settings.colors.text,
                    fontFamily: settings.typography.bodyFont
                  }}
                >
                  <h3 
                    className="text-lg font-bold mb-2"
                    style={{
                      color: settings.colors.primary,
                      fontFamily: settings.typography.headingFont
                    }}
                  >
                    Beispiel Überschrift
                  </h3>
                  <p className="mb-4">
                    Dies ist ein Beispieltext, um die Schriftart und Farben zu zeigen.
                  </p>
                  <button
                    className="px-4 py-2 font-medium transition-colors"
                    style={{
                      backgroundColor: settings.colors.primary,
                      color: settings.colors.background,
                      borderRadius: settings.layout.borderRadius,
                    }}
                  >
                    Beispiel Button
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
