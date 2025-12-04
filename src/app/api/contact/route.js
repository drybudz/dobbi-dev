import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import clientConfig from '../../../../sanity/config/client-config';

// In-memory rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();

// Rate limiting: 3 submissions per hour per IP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const RATE_LIMIT_MAX = 3;

function getRateLimitKey(ip) {
  return `contact_${ip}`;
}

function checkRateLimit(ip) {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (now > record.resetTime) {
    // Reset window
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);

function getClientIP(request) {
  // Try various headers (for different hosting providers)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return 'unknown';
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, interestedIn, honeypot } = body;

    // Bot detection: if honeypot field is filled, it's a bot
    if (honeypot) {
      // Silently reject bot submissions but still log them
      if (process.env.SANITY_API_WRITE_TOKEN) {
        const client = createClient({
          projectId: clientConfig.projectId,
          dataset: clientConfig.dataset,
          apiVersion: clientConfig.apiVersion,
          useCdn: false,
          token: process.env.SANITY_API_WRITE_TOKEN,
        });
        
        const ip = getClientIP(request);
        
        try {
          await client.create({
            _type: 'contactSubmission',
            name: name || 'Bot',
            email: email || 'bot@example.com',
            company: company || 'Bot',
            interestedIn: interestedIn || 'Bot submission',
            submittedAt: new Date().toISOString(),
            ipAddress: ip,
            botDetected: true,
          });
        } catch (error) {
          console.error('Error saving bot submission:', error);
        }
      }
      
      // Return success to bot (don't reveal detection)
      return NextResponse.json({ success: true }, { status: 200 });

      const ip = getClientIP(request);
      
      try {
        await client.create({
          _type: 'contactSubmission',
          name: name || 'Bot',
          email: email || 'bot@example.com',
          company: company || 'Bot',
          interestedIn: interestedIn || 'Bot submission',
          submittedAt: new Date().toISOString(),
          ipAddress: ip,
          botDetected: true,
        });
      } catch (error) {
        console.error('Error saving bot submission:', error);
      }

      // Return success to bot (don't reveal detection)
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate required fields
    if (!name || !email || !company || !interestedIn) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (company.trim().length < 2) {
      return NextResponse.json(
        { error: 'Company must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Validate interested in has at least 3 words
    const wordCount = interestedIn.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 3) {
      return NextResponse.json(
        { error: 'Interested in must contain at least 3 words' },
        { status: 400 }
      );
    }

    // Rate limiting
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit(ip);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Save to Sanity
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.error('SANITY_API_WRITE_TOKEN is not set. Please add it to your .env file.');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const client = createClient({
      projectId: clientConfig.projectId,
      dataset: clientConfig.dataset,
      apiVersion: clientConfig.apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_WRITE_TOKEN,
    });

    await client.create({
      _type: 'contactSubmission',
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      interestedIn: interestedIn.trim(),
      submittedAt: new Date().toISOString(),
      ipAddress: ip,
      botDetected: false,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

