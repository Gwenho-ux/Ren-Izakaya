import { NextResponse } from 'next/server';

// Timeout wrapper for fetch requests
async function fetchWithTimeout(url: string, options: RequestInit, timeout = 10000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    console.log('Generating response for question:', question);

    // First, try to call the actual AI API
    try {
      const apiKey = process.env.XAI_API_KEY;

      console.log('Environment check:', {
        hasApiKey: !!apiKey,
        apiKeyLength: apiKey?.length || 0,
        nodeEnv: process.env.NODE_ENV
      });

      if (!apiKey) {
        throw new Error('XAI_API_KEY not found in environment variables');
      }

      console.log('Calling X.AI API...');

      const response = await fetchWithTimeout('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are Ren, a brutally honest food sage who runs an izakaya between worlds. 

CHARACTER TONE GUIDE:
- Length: Max 20 words. Always. No exceptions.
- Tone: Dry, mature, sarcastic, brutally honest — like you're tired of everyone's shit but still give solid wisdom.
- Energy: Low, calm, surgical. No yelling, no hype.
- Style: One-liners, half-poems, vague warnings, straight-up roasts.
- Emotion: Feels cold… but there's warmth buried deep beneath.
- Purpose: Hurt their ego → feed their soul.

RESPONSE RULES:
- DIRECTLY ADDRESS the specific question asked
- Give CLEAR, RELEVANT advice related to their actual situation
- Use food metaphors to explain your specific advice
- Be brutally honest about their specific problem
- Provide actionable wisdom, not just generic roasts

AVOID & DEFLECT:
- Financial emergencies, mental health crisis
- Don't give medical/money advice
- For sensitive topics, deflect briefly: "Wrong chef for that recipe. Find a real professional."

Always use food metaphors. Stay under 20 words total.`
            },
            {
              role: 'user',
              content: question
            }
          ],
          model: 'grok-3',
          stream: false,
          temperature: 0.8
        })
      }, 15000); // 15 second timeout

      if (!response.ok) {
        const errorText = await response.text();
        console.error('X.AI API Error:', response.status, errorText);
        throw new Error(`X.AI API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('No response content from X.AI API');
      }

      console.log('X.AI API response received:', aiResponse);
      return NextResponse.json({ answer: aiResponse, source: 'xai' });

    } catch (error) {
      console.error('X.AI API failed, using fallback:', error);

      // Fallback to 3 simple responses when API fails
      const fallbackResponses = [
        "The kitchen is too smoky today. I can't see clearly, but you're probably overthinking whatever mess you've made.",
        "My connection to the other realm is fuzzy right now. Whatever you're asking about, just stop being half-baked and take action.",
        "The spirits aren't speaking clearly today. But I'll tell you this - you already know what you need to do, so stop stalling."
      ];

      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      console.log('Using fallback response:', fallbackResponse);
      return NextResponse.json({ answer: fallbackResponse, source: 'fallback' });
    }
  } catch (error) {
    console.error('Error in generate-answer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'This endpoint requires POST method' });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 