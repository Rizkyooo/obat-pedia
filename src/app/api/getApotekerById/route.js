import { NextResponse } from 'next/server';
import { prisma } from '../../../utils/prisma';
import { z } from 'zod';

const querySchema = z.object({
  id: z.string().uuid(),
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const parseResult = querySchema.safeParse({ id: searchParams.get('id') });

  if (!parseResult.success) {
    return NextResponse.json(
      { success: false, data: null, error: 'Invalid or missing id parameter' },
      { status: 400 }
    );
  }

  const { id } = parseResult.data;
  try {
    const apoteker = await prisma.apoteker.findUnique({
      where: { id },
    });
    if (!apoteker) {
      return NextResponse.json(
        { success: false, data: null, error: 'Apoteker not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: apoteker, error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: null, error: 'Internal server error' }, { status: 500 });
  }
} 