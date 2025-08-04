import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Einzelne Seite
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const page = await prisma.page.findUnique({
      where: { id }
    })

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

// PUT - Update Seite
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, slug, published, content } = body

    console.log('Updating page with content:', JSON.stringify(content, null, 2))

    // Check if slug already exists (but not for this page)
    if (slug) {
      const existingPage = await prisma.page.findFirst({
        where: {
          slug,
          NOT: { id }
        }
      })

      if (existingPage) {
        return NextResponse.json({ error: 'Slug bereits vorhanden' }, { status: 400 })
      }
    }

    const updateData: any = {}
    if (title) updateData.title = title
    if (slug) updateData.slug = slug
    if (published !== undefined) updateData.published = published
    if (content) updateData.content = content

    console.log('Update data:', JSON.stringify(updateData, null, 2))

    const page = await prisma.page.update({
      where: { id },
      data: updateData
    })

    console.log('Updated page content:', JSON.stringify(page.content, null, 2))

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

// DELETE - Lösche Seite
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.page.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}
