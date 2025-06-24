import { NextResponse } from 'next/server';
import { prisma } from '../../../utils/prisma';

export async function GET() {
  try {
    const obats = await prisma.obats.findMany();
    return NextResponse.json({ success: true, data: obats, error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: null, error: 'Internal server error' }, { status: 500 });
  }
} 