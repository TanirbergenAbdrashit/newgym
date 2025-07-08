export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-5cef9f00ddd44884b956cc57ec2e5492',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;
    const completion = await openai.chat.completions.create({
      messages,
      model: 'deepseek-chat',
      max_tokens: 500,
    });
    return NextResponse.json({ result: completion.choices?.[0]?.message?.content || '' });
  } catch (e: any) {
    console.error('AI API error:', e);
    return NextResponse.json({ error: 'AI API error', details: e?.message || String(e) }, { status: 500 });
  }
} 