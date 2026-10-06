import { NextRequest, NextResponse } from 'next/server';
import { analyzeTaskDifficulty } from '@/services/ai/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json({ error: 'Judul tugas wajib diisi' }, { status: 400 });
    }

    const result = await analyzeTaskDifficulty(title, description);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memproses AI' }, { status: 500 });
  }
}