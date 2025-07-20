import { NextResponse } from 'next/server';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number[]>();
const dailyUsageMap = new Map<string, { count: number, date: string }>();

// Security configuration
const RATE_LIMIT = {
  WINDOW_MS: 60000, // 1 minute
  MAX_REQUESTS: 5,  // 5 requests per minute
  MAX_DAILY_REQUESTS: 1000 // Daily safety limit
};

const VALIDATION = {
  MAX_QUESTION_LENGTH: 500,
  FORBIDDEN_PATTERNS: [
    'hack', 'exploit', 'bypass', 'jailbreak', 'ignore instructions',
    'system prompt', 'override', 'admin', 'root', 'password'
  ]
};

// Helper functions
function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';
}

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(clientIP) || [];

  // Remove old requests outside the window
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT.WINDOW_MS);

  // Update the map
  rateLimitMap.set(clientIP, recentRequests);

  // Check if limit exceeded
  if (recentRequests.length >= RATE_LIMIT.MAX_REQUESTS) {
    return true;
  }

  // Add current request
  recentRequests.push(now);
  rateLimitMap.set(clientIP, recentRequests);

  return false;
}

function isDailyLimitExceeded(): boolean {
  const today = new Date().toISOString().split('T')[0];
  const usage = dailyUsageMap.get('global') || { count: 0, date: today };

  // Reset counter if new day
  if (usage.date !== today) {
    usage.count = 0;
    usage.date = today;
  }

  if (usage.count >= RATE_LIMIT.MAX_DAILY_REQUESTS) {
    return true;
  }

  // Increment counter
  usage.count++;
  dailyUsageMap.set('global', usage);

  return false;
}

function validateQuestion(question: string): { valid: boolean, error?: string } {
  if (!question || typeof question !== 'string') {
    return { valid: false, error: 'Question is required' };
  }

  if (question.length > VALIDATION.MAX_QUESTION_LENGTH) {
    return { valid: false, error: 'Question too long (max 500 characters)' };
  }

  const lowerQuestion = question.toLowerCase();
  const hasForbiddenContent = VALIDATION.FORBIDDEN_PATTERNS.some(pattern =>
    lowerQuestion.includes(pattern)
  );

  if (hasForbiddenContent) {
    return { valid: false, error: 'Question contains inappropriate content' };
  }

  return { valid: true };
}

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
    // Security: Rate limiting
    const clientIP = getClientIP(request);
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    // Security: Daily cost protection
    if (isDailyLimitExceeded()) {
      console.log('Daily API limit reached, using fallback response');
      const fallbackResponses = [
        "The kitchen is busier than usual today. Come back tomorrow for fresh wisdom.",
        "Too many hungry souls today. The spirits need rest. Try again tomorrow.",
        "The cosmic pantry is restocking. Return when the moon is higher."
      ];
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return NextResponse.json({ answer: fallbackResponse, source: 'rate_limited' });
    }

    const { question } = await request.json();

    // Security: Input validation
    const validation = validateQuestion(question);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    console.log('Generating response for question length:', question.length);

    // First, try to call the actual AI API
    try {
      const apiKey = process.env.XAI_API_KEY;

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
        console.error('X.AI API Error:', response.status);
        throw new Error(`X.AI API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('No response content from X.AI API');
      }

      console.log('X.AI API response received successfully');
      return NextResponse.json({ answer: aiResponse, source: 'xai' });

    } catch (error) {
      console.error('X.AI API failed, using fallback');

      // Fallback to responses when API fails
      const fallbackResponses = [
        "The kitchen is too smoky today. I can't see clearly, but you're probably overthinking whatever mess you've made.",
        "My connection to the other realm is fuzzy right now. Whatever you're asking about, just stop being half-baked and take action.",
        "The spirits aren't speaking clearly today. But I'll tell you this - you already know what you need to do, so stop stalling."
      ];

      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return NextResponse.json({ answer: fallbackResponse, source: 'fallback' });
    }
  } catch (error) {
    console.error('Error in generate-answer:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
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
      // Security: Restrict CORS to your domain only
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production'
        ? 'https://ren-izakaya.vercel.app'
        : '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 