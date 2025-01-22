import { json } from "@sveltejs/kit";
import sgMail from "@sendgrid/mail";
import { SENDGRID_API_KEY } from "$env/static/private";

sgMail.setApiKey(SENDGRID_API_KEY);

const PDF_GUIDE_URL = "https://narrify-public.s3.eu-central-1.amazonaws.com/sample.pdf";

export async function POST({ request }) {
  const body = await request.json();

  const response = await fetch(PDF_GUIDE_URL);
  const pdfBuffer = await response.arrayBuffer();
  const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

  const customerEmail = body.data.object.customer_details.email;
  const customerName = body.data.object.customer_details.name;

  const message = {
    to: customerEmail,
    from: "ranogordo@proton.me",
    subject: "Your purchase confirmation - Complete Spain Relocation Guide",
    html: `
      <p>Hi ${customerName},</p>
      <p>Thank you for purchasing the Complete Spain Relocation Guide!</p>
      <p>You can download your copy <a href="https://example.com/your-download-link">here</a>.</p>
      <p>Enjoy your new life in Spain!</p>
    `,
    attachments: [
      {
        content: pdfBase64,
        filename: "Complete Spain Relocation Guide.pdf",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  await sgMail.send(message);

  return json({ response: "Email sent" });
}
