import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ybstore.com' },
    update: {},
    create: {
      email: 'admin@ybstore.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', adminUser.email)

  // Create default theme
  const defaultTheme = await prisma.theme.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      name: 'Default Theme',
      isActive: true,
      settings: {
        colors: {
          primary: '#3b82f6',
          secondary: '#64748b',
          accent: '#f59e0b',
          background: '#ffffff',
          text: '#1f2937'
        },
        typography: {
          headingFont: 'Inter',
          bodyFont: 'Inter',
          fontSize: {
            base: '16px',
            heading: '32px'
          }
        },
        layout: {
          containerWidth: '1200px',
          borderRadius: '8px',
          spacing: '16px'
        },
        buttons: {
          style: 'rounded',
          size: 'medium',
          animation: true
        }
      }
    },
  })

  console.log('✅ Default theme created')

  // Create main navigation
  const mainNavigation = await prisma.navigation.upsert({
    where: { handle: 'main' },
    update: {},
    create: {
      name: 'Hauptnavigation',
      handle: 'main',
      items: [
        { label: 'Home', url: '/', type: 'page' },
        { label: 'Produkte', url: '/products', type: 'collection' },
        { label: 'Über uns', url: '/about', type: 'page' },
        { label: 'Kontakt', url: '/contact', type: 'page' }
      ]
    },
  })

  console.log('✅ Main navigation created')

  // Create homepage
  const homepage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      title: 'Startseite',
      slug: 'home',
      published: true,
      seoTitle: 'YB Store - Ihr Online Shop',
      seoDescription: 'Willkommen bei YB Store - Ihrem zuverlässigen Online Shop für hochwertige Produkte.',
      content: [
        {
          id: 'hero-1',
          type: 'hero',
          content: {
            title: 'Willkommen bei YB Store',
            subtitle: 'Entdecken Sie unsere neuesten Produkte und Angebote',
            buttonText: 'Jetzt shoppen',
            buttonLink: '/products',
            backgroundImage: ''
          }
        },
        {
          id: 'features-1',
          type: 'feature-list',
          content: {
            title: 'Warum YB Store?',
            features: [
              {
                icon: 'shield',
                title: 'Sicher einkaufen',
                description: 'Ihre Daten sind bei uns sicher'
              },
              {
                icon: 'truck',
                title: 'Schneller Versand',
                description: 'Lieferung innerhalb von 24h'
              },
              {
                icon: 'heart',
                title: 'Kundenservice',
                description: '24/7 Support für Sie da'
              }
            ]
          }
        }
      ]
    },
  })

  console.log('✅ Homepage created')

  // Create sample categories
  const clothingCategory = await prisma.category.create({
    data: {
      name: 'Kleidung',
      slug: 'kleidung',
      description: 'Hochwertige Kleidung für jeden Anlass'
    }
  })

  const accessoriesCategory = await prisma.category.create({
    data: {
      name: 'Accessoires',
      slug: 'accessoires',
      description: 'Stilvolle Accessoires als perfekte Ergänzung'
    }
  })

  console.log('✅ Sample categories created')

  // Create sample products
  const products = [
    {
      title: 'Premium T-Shirt',
      description: 'Hochwertiges T-Shirt aus 100% Bio-Baumwolle',
      price: 29.99,
      sku: 'TSHIRT-001',
      inventory: 50,
      status: 'ACTIVE',
      slug: 'premium-t-shirt',
      categoryId: clothingCategory.id,
      images: ['/images/tshirt-1.jpg'],
      tags: ['bio', 'baumwolle', 'basic']
    },
    {
      title: 'Designer Jeans',
      description: 'Stylische Jeans in perfekter Passform',
      price: 89.99,
      comparePrice: 120.00,
      sku: 'JEANS-001',
      inventory: 30,
      status: 'ACTIVE',
      slug: 'designer-jeans',
      categoryId: clothingCategory.id,
      images: ['/images/jeans-1.jpg'],
      tags: ['denim', 'designer', 'casual']
    },
    {
      title: 'Leder Handtasche',
      description: 'Elegante Handtasche aus echtem Leder',
      price: 149.99,
      sku: 'BAG-001',
      inventory: 15,
      status: 'ACTIVE',
      slug: 'leder-handtasche',
      categoryId: accessoriesCategory.id,
      images: ['/images/bag-1.jpg'],
      tags: ['leder', 'handtasche', 'elegant']
    }
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log('✅ Sample products created')

  // Create basic store settings
  const storeSettings = [
    { key: 'store_name', value: 'YB Store', group: 'general' },
    { key: 'store_description', value: 'Ihr zuverlässiger Online Shop', group: 'general' },
    { key: 'store_currency', value: 'EUR', group: 'general' },
    { key: 'store_timezone', value: 'Europe/Berlin', group: 'general' },
    { key: 'tax_rate', value: 19, group: 'tax' },
    { key: 'shipping_cost', value: 4.99, group: 'shipping' },
    { key: 'free_shipping_threshold', value: 50.00, group: 'shipping' }
  ]

  for (const setting of storeSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    })
  }

  console.log('✅ Store settings created')

  console.log('🎉 Database seeding completed!')
  console.log('')
  console.log('Admin Login:')
  console.log('Email: admin@ybstore.com')
  console.log('Password: admin123')
  console.log('')
  console.log('You can now access the admin dashboard at: http://localhost:3003/admin')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
