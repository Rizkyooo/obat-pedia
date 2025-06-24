import { NextResponse } from 'next/server';
import { prisma } from '../../../utils/prisma';

export async function GET() {
  try {
    const apoteker = await prisma.apoteker.findMany();
    return NextResponse.json({ success: true, data: apoteker, error: null });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, data: null, error: 'Internal server error' }, { status: 500 });
  }
} 