type TurnstileResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

export async function verifyTurnstileToken(
  token: string | undefined,
  ip: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, error: "Verification is not configured.", status: 503 };
    }
    return { ok: true };
  }

  if (!token) {
    return { ok: false, error: "Please complete the verification check.", status: 400 };
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: ip,
      }),
    });

    const data = (await response.json()) as { success?: boolean };
    if (!data.success) {
      return { ok: false, error: "Verification failed. Please try again.", status: 403 };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Could not verify the request. Please try again.", status: 502 };
  }
}
