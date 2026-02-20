import { env } from '@saas/env';
import { createTransport, Transporter } from 'nodemailer'
import { EmailProps, EmailService } from '../email-service';

export class NodemailerEmailService implements EmailService {
  private transporter: Transporter

  constructor(
    user: string = env.GMAIL_APP_USER,
    pass: string = env.GMAIL_APP_PASS
  ) {
    this.transporter = createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    })
  }

  async send(to: string, { subject, text, html }: EmailProps) {
    await this.transporter.sendMail({
      from: `"Next SaaS" <${env.GMAIL_APP_USER}>`,
      to,
      subject,
      text,
      html,
    });
  }

}