import { NextResponse } from 'next/server';
import { prisma } from '../../../utils/prisma';

function replacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
}

export async function GET() {
  try {
    const articles = await prisma.artikel.findMany({
      include: {
        apoteker: true,
        kategori: true,
      },
    });
    return new NextResponse(
      JSON.stringify({ success: true, data: articles, error: null }, replacer),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: null, error: 'Internal server error' }, { status: 500 });
  }
} 