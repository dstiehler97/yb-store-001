import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import BlockRenderer from '@/components/block-renderer'

interface Block {
  id: string
  type: 'hero' | 'text' | 'image' | 'button' | 'product-grid' | 'spacer'
  content: Record<string, unknown>
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPage(slug: string) {
  try {
    const page = await prisma.page.findUnique({
      where: { 
        slug,
        published: true 
      },
    })

    return page
  } catch (error) {
    console.error("Database connection failed:", error)
    return null
  }
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  
  // Verhindere, dass root "/" von dieser Route verarbeitet wird
  if (!slug || slug === '') {
    notFound()
  }
  
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  const content = page.content as unknown
  const blocks = (content && typeof content === 'object' && 'blocks' in content) 
    ? (content as { blocks: Block[] }).blocks 
    : []

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <head>
        <title>{page.title} | YB Store</title>
        <meta name="description" content={`${page.title} - YB Store`} />
      </head>

      {/* Render Blocks */}
      <div className="space-y-0">
        {blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const pages = await prisma.page.findMany({
      where: { published: true },
      select: { slug: true }
    })

    return pages.map((page: { slug: string }) => ({
      slug: page.slug,
    }))
  } catch {
    console.warn("⚠️ Database not reachable during build (Railway). Using fallback.")
    console.warn("This is normal on Railway - pages will be generated dynamically on first request.")
    return []
  }
}
