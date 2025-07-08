export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-5cef9f00ddd44884b956cc57ec2e5492', // Updated Deepseek API key
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request: messages missing or not an array' }, { status: 400 });
    }
    const completion = await openai.chat.completions.create({
      messages,
      model: 'deepseek-chat',
      max_tokens: 500,
    });
    return NextResponse.json({ result: completion.choices?.[0]?.message?.content || '' });
  } catch (e: any) {
    let errorMsg = 'Unknown error';
    if (e?.response && typeof e.response.json === 'function') {
      try {
        const errJson = await e.response.json();
        errorMsg = errJson.error?.message || JSON.stringify(errJson);
      } catch {
        errorMsg = e?.message || String(e);
      }
    } else {
      errorMsg = e?.message || String(e);
    }
    console.error('AI API error:', errorMsg);
    return NextResponse.json({ error: 'AI API error', details: errorMsg }, { status: 500 });
  }
} 