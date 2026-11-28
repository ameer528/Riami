import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { objective } = await req.json();

    if (!objective) {
      return NextResponse.json({ error: 'Objective is required' }, { status: 400 });
    }

    // Call the OpenAI model to simulate the Supervisor Agent planning
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Riami, an autonomous AI sales supervisor. Your job is to analyze the user's objective and break it down into 3 actionable steps for your workforce. Keep it brief, professional, and formatted as a numbered list."
        },
        {
          role: "user",
          content: objective
        }
      ],
      temperature: 0.7,
    });

    const result = response.choices[0].message.content;

    return NextResponse.json({ success: true, plan: result });
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}
