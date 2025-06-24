import { NextResponse } from 'next/server';
import { prisma } from '../../../utils/prisma';
import { z } from 'zod';

const querySchema = z.object({
  slug: z.string().min(1),
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const parseResult = querySchema.safeParse({ slug: searchParams.get('slug') });

  if (!parseResult.success) {
    return NextResponse.json(
      { success: false, data: null, error: 'Invalid or missing slug parameter' },
      { status: 400 }
    );
  }

  const { slug } = parseResult.data;
  try {
    const article = await prisma.artikel.findUnique({
      where: { slug },
      include: { apoteker: true },
    });
    if (!article) {
      return NextResponse.json(
        { success: false, data: null, error: 'Article not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: article, error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: null, error: 'Internal server error' }, { status: 500 });
  }
} 