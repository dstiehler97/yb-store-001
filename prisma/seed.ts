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
      name: 'YB Store Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  console.log('✅ Admin user created:', adminUser.email)

  // Create categories
  const electronicsCategory = await prisma.category.upsert({
    where: { slug: 'elektronik' },
    update: {},
    create: {
      name: 'Elektronik',
      slug: 'elektronik',
      description: 'Elektronische Geräte und Zubehör'
    }
  })

  const fashionCategory = await prisma.category.upsert({
    where: { slug: 'mode' },
    update: {},
    create: {
      name: 'Mode',
      slug: 'mode',
      description: 'Bekleidung und Accessoires'
    }
  })

  const accessoriesCategory = await prisma.category.upsert({
    where: { slug: 'accessoires' },
    update: {},
    create: {
      name: 'Accessoires',
      slug: 'accessoires',
      description: 'Accessoires und Extras'
    }
  })

  console.log('✅ Categories created')

  // Create sample products with upsert to avoid duplicate SKU errors
  const products = [
    {
      sku: 'WH-001',
      title: 'Wireless Kopfhörer',
      description: 'Premium Bluetooth Kopfhörer mit Noise Cancelling',
      price: 199.99,
      inventory: 25,
      status: 'ACTIVE' as const,
      slug: 'wireless-kopfhoerer',
      categoryId: electronicsCategory.id,
      images: ['/images/headphones-1.jpg'],
      tags: ['bluetooth', 'kopfhörer', 'wireless']
    },
    {
      sku: 'CASE-001',
      title: 'Smartphone Hülle',
      description: 'Robuste Schutzhülle für Smartphones',
      price: 29.99,
      comparePrice: 39.99,
      inventory: 50,
      status: 'ACTIVE' as const,
      slug: 'smartphone-huelle',
      categoryId: electronicsCategory.id,
      images: ['/images/case-1.jpg'],
      tags: ['smartphone', 'schutz', 'hülle']
    },
    {
      sku: 'TSHIRT-001',
      title: 'Designer T-Shirt',
      description: 'Hochwertiges T-Shirt aus Bio-Baumwolle',
      price: 49.99,
      inventory: 30,
      status: 'ACTIVE' as const,
      slug: 'designer-t-shirt',
      categoryId: fashionCategory.id,
      images: ['/images/tshirt-1.jpg'],
      tags: ['t-shirt', 'bio', 'designer']
    },
    {
      sku: 'BAG-001',
      title: 'Leder Handtasche',
      description: 'Elegante Handtasche aus echtem Leder',
      price: 149.99,
      inventory: 15,
      status: 'ACTIVE' as const,
      slug: 'leder-handtasche',
      categoryId: accessoriesCategory.id,
      images: ['/images/bag-1.jpg'],
      tags: ['leder', 'handtasche', 'elegant']
    }
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        title: product.title,
        description: product.description,
        price: product.price,
        inventory: product.inventory,
        status: product.status,
        images: product.images,
        tags: product.tags
      },
      create: product
    })
  }

  console.log('✅ Sample products created')

  // Create basic store settings
  const storeSettings = [
    { key: 'store_name', value: 'YB Store', group: 'general' },
    { key: 'store_description', value: 'Ihr zuverlässiger Online Shop', group: 'general' },
    { key: 'store_currency', value: 'EUR', group: 'general' },
    { key: 'store_timezone', value: 'Europe/Berlin', group: 'general' },
    { key: 'tax_rate', value: '19', group: 'tax' },
    { key: 'shipping_cost', value: '4.99', group: 'shipping' },
    { key: 'free_shipping_threshold', value: '50.00', group: 'shipping' }
  ]

  for (const setting of storeSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    })
  }

  console.log('✅ Store settings created')

  // Create default theme
  const existingTheme = await prisma.theme.findFirst({
    where: { name: 'Default Theme' }
  })

  if (!existingTheme) {
    const defaultTheme = await prisma.theme.create({
      data: {
        name: 'Default Theme',
        isActive: true,
        settings: {
          colors: {
            primary: '#3B82F6',
            secondary: '#64748B',
            accent: '#F59E0B',
            background: '#FFFFFF',
            text: '#1F2937'
          },
          fonts: {
            heading: 'Inter',
            body: 'Inter'
          },
          layout: {
            containerWidth: '1200px',
            borderRadius: '8px',
            spacing: '16px'
          }
        }
      }
    })
    console.log('✅ Default theme created')
  } else {
    console.log('✅ Default theme already exists')
  }

  // Create main navigation
  const mainNavigation = await prisma.navigation.upsert({
    where: { handle: 'main-navigation' },
    update: {},
    create: {
      name: 'Hauptnavigation',
      handle: 'main-navigation',
      items: [
        {
          label: 'Home',
          href: '/',
          order: 1
        },
        {
          label: 'Produkte',
          href: '/products',
          order: 2
        },
        {
          label: 'Kategorien',
          href: '/categories',
          order: 3,
          children: [
            {
              label: 'Elektronik',
              href: '/categories/elektronik',
              order: 1
            },
            {
              label: 'Mode',
              href: '/categories/mode',
              order: 2
            },
            {
              label: 'Accessoires',
              href: '/categories/accessoires',
              order: 3
            }
          ]
        },
        {
          label: 'Über uns',
          href: '/about',
          order: 4
        },
        {
          label: 'Kontakt',
          href: '/contact',
          order: 5
        }
      ]
    }
  })

  console.log('✅ Navigation created')

  // Create a sample page
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      title: 'Startseite',
      slug: 'home',
      published: true,
      content: {
        blocks: [
          {
            id: '1',
            type: 'hero',
            content: {
              title: 'Willkommen bei YB Store',
              subtitle: 'Ihr moderner Online Shop',
              buttonText: 'Jetzt einkaufen',
              buttonLink: '/products',
              backgroundImage: '/images/hero-bg.jpg'
            }
          },
          {
            id: '2',
            type: 'text',
            content: {
              text: 'Entdecken Sie unsere große Auswahl an hochwertigen Produkten.'
            }
          }
        ]
      }
    }
  })

  console.log('✅ Sample page created')

  console.log('🎉 Database seeded successfully!')
  console.log(`
📧 Admin Login:
   Email: admin@ybstore.com
   Password: admin123
   
🌐 Access your store at: http://localhost:3003
🔧 Admin Dashboard: http://localhost:3003/admin
  `)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
