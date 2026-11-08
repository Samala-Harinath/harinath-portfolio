/**
 * Email delivery integration.
 *
 * To activate: add RESEND_API_KEY and CONTACT_EMAIL_TO to your .env.local
 * and un-comment the Resend import and sendEmail body below.
 *
 * While unconfigured, the contact route returns a placeholder response so
 * the UI shows an honest state.
 */

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail(
  payload: ContactPayload
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !toEmail) {
    // Not configured — log to console for local dev, return honest state
    console.info("[Contact] Email not configured. Payload:", payload);
    return {
      success: false,
      error:
        "Email delivery is not configured. Set RESEND_API_KEY and CONTACT_EMAIL_TO in your environment.",
    };
  }

  // Resend integration (activate when API key is set):
  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Harinath Samala Portfolio <onboarding@resend.dev>",
    to: toEmail,
    replyTo: payload.email,
    subject: payload.subject
      ? `Portfolio enquiry: ${payload.subject}`
      : `Portfolio enquiry from ${payload.name}`,
    text: [
      `New message from your portfolio contact form.`,
      ``,
      `Name:    ${payload.name}`,
      `Email:   ${payload.email}`,
      `Subject: ${payload.subject ?? "(none)"}`,
      ``,
      `Message:`,
      payload.message,
    ].join("\n"),
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
