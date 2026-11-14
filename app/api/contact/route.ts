import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name too short")
    .max(80, "Name too long")
    .regex(/^[a-zA-Z\s'\-\.]+$/, "Name contains invalid characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().max(120, "Subject too long").optional(),
  message: z
    .string()
    .min(10, "Message too short")
    .max(2000, "Message too long"),
  turnstileToken: z.string().optional(),
});

// Simple in-memory rate limiter (resets on server restart; suitable for serverless edge)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Parse and validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Validation failed.",
      },
      { status: 422 }
    );
  }

  const verification = await verifyTurnstileToken(parsed.data.turnstileToken, ip);
  if (!verification.ok) {
    return NextResponse.json(
      { success: false, error: verification.error },
      { status: verification.status },
    );
  }

  const { turnstileToken: _turnstileToken, ...message } = parsed.data;
  const result = await sendContactEmail(message);

  if (!result.success) {
    // Surface unconfigured state honestly to the client
    const isUnconfigured =
      result.error?.includes("not configured") ?? false;

    if (isUnconfigured) {
      return NextResponse.json({ success: false, unconfigured: true }, { status: 200 });
    }

    return NextResponse.json(
      { success: false, error: result.error ?? "Failed to send message." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
