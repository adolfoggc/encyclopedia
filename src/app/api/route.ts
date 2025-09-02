import { NextResponse } from 'next/server';
import { knowledges } from './knowledges';

export async function GET() {
  return NextResponse.json( knowledges );
}

export async function POST() {
  return NextResponse.json( { message: 'POST request received' } );
}