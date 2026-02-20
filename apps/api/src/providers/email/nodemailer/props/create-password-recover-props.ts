import { EmailProps } from "../../email-service";

export function CreatePasswordRecoverProps(code: string): EmailProps
{
    const subject = 'Password Recovery Code'
    const text = `
You requested to reset your password.

Your password recovery code is:

${code}

This code will expire in 10 minutes.

If you did not request a password reset, please ignore this email.
`

const html = `
<div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:40px 0;">
  <div style="max-width:480px; margin:0 auto; background:#ffffff; padding:32px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
    
    <h2 style="margin:0 0 16px; color:#111;">Password Recovery</h2>
    
    <p style="margin:0 0 16px; color:#444; font-size:14px;">
      We received a request to reset your password.
    </p>

    <p style="margin:0 0 8px; color:#444; font-size:14px;">
      Use the code below to continue:
    </p>

    <div style="text-align:center; margin:24px 0;">
      <span style="display:inline-block; font-size:28px; letter-spacing:6px; font-weight:bold; color:#111;">
        ${code}
      </span>
    </div>

    <p style="margin:0 0 16px; color:#666; font-size:12px;">
      This code expires in 10 minutes.
    </p>

    <hr style="border:none; border-top:1px solid #eee; margin:24px 0;" />

    <p style="margin:0; color:#888; font-size:12px;">
      If you did not request this, you can safely ignore this email.
    </p>

  </div>
</div>
`

    return {
        subject,
        text,
        html
    }
}