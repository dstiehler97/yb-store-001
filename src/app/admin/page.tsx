import AdminLayout from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ShoppingCart, 
  Package, 
  Users, 
  Euro,
  TrendingUp,
  TrendingDown
} from "lucide-react"

// Mock data - in real app this would come from API
const stats = [
  {
    title: "Bestellungen heute",
    value: "56",
    change: "+8%",
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Produkte",
    value: "1,234",
    change: "+12%",
    trend: "up" as const,
    icon: Package,
  },
  {
    title: "Kunden",
    value: "2,845",
    change: "+15%",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Umsatz",
    value: "€2,845",
    change: "-2%",
    trend: "down" as const,
    icon: Euro,
  },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Willkommen im YB Store Admin Dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs flex items-center ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change} seit gestern
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Letzte Bestellungen</CardTitle>
              <CardDescription>
                Übersicht der neuesten Bestellungen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Bestellung #{1000 + i}</p>
                      <p className="text-sm text-gray-800">Max Mustermann</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{(Math.random() * 100 + 50).toFixed(2)}</p>
                      <p className="text-sm text-gray-800">Vor {i} Stunden</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Beliebte Produkte</CardTitle>
              <CardDescription>
                Top verkaufte Produkte diese Woche
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["T-Shirt Basic", "Jeans Classic", "Hoodie Premium"].map((product, i) => (
                  <div key={product} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{product}</p>
                      <p className="text-sm text-gray-800">{20 - i * 3} verkauft</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{(Math.random() * 50 + 25).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
