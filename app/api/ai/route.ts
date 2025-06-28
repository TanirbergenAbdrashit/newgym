import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-564facd331e04fe2bf2bef53d555d104',
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;

  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: 'deepseek-chat',
      max_tokens: 500,
    });
    return NextResponse.json(completion);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
} 