import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Liste alle Seiten
export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: 'desc' }
    })
    
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

// POST - Erstelle neue Seite
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, published, content } = body

    // Check if slug already exists
    const existingPage = await prisma.page.findUnique({
      where: { slug }
    })

    if (existingPage) {
      return NextResponse.json({ error: 'Slug bereits vorhanden' }, { status: 400 })
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        published: published || false,
        content: content || { blocks: [] }
      }
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}
