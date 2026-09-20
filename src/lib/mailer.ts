import { sendEmail } from "@/server/email";

/**
 * Email delivery via the GoDaddy Node.js Hosting email gateway
 * (see src/server/email.ts). No SMTP config or third-party keys needed.
 *
 * The recipient for all site forms is read from CONTACT_FORM_RECIPIENT_EMAIL,
 * set in the Node.js Hosting environment-variables panel. The sender is left
 * to the gateway, which picks the app's canonical address.
 *
 * In development (NODE_ENV !== "production") the gateway doesn't exist, so
 * submissions are logged to the server console instead of sent.
 *
 * Every call site only depends on the `sendMail` function below.
 */

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type SendMailInput = {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

export async function sendMail(input: SendMailInput): Promise<void> {
  const to = process.env.CONTACT_FORM_RECIPIENT_EMAIL;

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[mailer] DEV MODE — email was not sent (the hosting email gateway is only available in production).",
    );
    console.info("[mailer] Would have sent:", {
      to,
      subject: input.subject,
      text: input.text,
      attachments: input.attachments?.map((a) => ({
        filename: a.filename,
        contentType: a.contentType,
        sizeBytes: a.content.length,
      })),
    });
    return;
  }

  if (!to) {
    // Fail closed — sending to nowhere would silently drop submissions.
    throw new Error("CONTACT_FORM_RECIPIENT_EMAIL is not set");
  }

  await sendEmail({
    to,
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
    attachments: input.attachments,
  });
}
