/**
 * Portfolio Email Templates for Loago Kevin Montsho ("Mov")
 * Domain: loagomov.blancsociety.co.uk
 * 
 * Follows the exact dark, minimalist, high-craft design language of Blanc Society
 * (#0e0e0e background, #161616 cards, hairline borders, #9fa3fc accents, Outfit typography)
 */

export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  source: string
}

const STYLES = {
  bg: '#0e0e0e',
  card: '#161616',
  innerCard: '#1d1d1d',
  border: 'rgba(255, 255, 255, 0.08)',
  borderLight: 'rgba(255, 255, 255, 0.14)',
  textPrimary: '#ffffff',
  textSecondary: '#a5a5a5',
  textMuted: '#686868',
  accent: '#9fa3fc',
  accentBg: 'rgba(159, 163, 252, 0.12)',
  accentBorder: 'rgba(159, 163, 252, 0.3)',
  emerald: '#34d399',
  emeraldBg: 'rgba(52, 211, 153, 0.1)',
  emeraldBorder: 'rgba(52, 211, 153, 0.25)',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * 1. Internal Notification Template
 * Sent to: Loago Montsho (hello@blancsociety.co.uk / loagomontsho@icloud.com)
 * Purpose: Alerts Loago that a recruiter, institution, or collaborator has sent an inquiry.
 */
export function renderPortfolioInquiryNotificationHtml(data: ContactEmailData): string {
  const safeName = escapeHtml(data.name)
  const safeEmail = escapeHtml(data.email)
  const safePhone = data.phone ? escapeHtml(data.phone) : ''
  const safeCompany = data.company ? escapeHtml(data.company) : ''
  const safeSource = escapeHtml(data.source || 'General Inquiry')
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />')
  const dateStr = new Date().toLocaleString('en-GB', {
    timeZone: 'Africa/Gaborone',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Inquiry from ${safeName} · Mov</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${STYLES.bg}; font-family: ${STYLES.fontFamily}; -webkit-font-smoothing: antialiased; color: ${STYLES.textPrimary};">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${STYLES.bg}; padding: 36px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: ${STYLES.card}; border: 1px solid ${STYLES.border}; border-radius: 18px; overflow: hidden; box-shadow: 0 20px 48px rgba(0,0,0,0.6);">
          
          <!-- Top Brand & Header Bar -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid ${STYLES.border}; background-color: #121212;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td valign="middle">
                    <span style="font-size: 18px; font-weight: 700; letter-spacing: -0.4px; color: #ffffff;">Loago Montsho</span>
                    <span style="display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: ${STYLES.accent}; background-color: ${STYLES.accentBg}; border: 1px solid ${STYLES.accentBorder}; border-radius: 4px; padding: 2px 6px; margin-left: 8px;">MOV</span>
                    <span style="font-size: 11px; font-family: monospace; color: ${STYLES.textMuted}; margin-left: 8px;">loagomov.blancsociety.co.uk</span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 5px 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: ${STYLES.emerald}; background-color: ${STYLES.emeraldBg}; border: 1px solid ${STYLES.emeraldBorder}; border-radius: 999px;">
                      ● Portfolio Lead
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro Headline -->
          <tr>
            <td style="padding: 32px 32px 20px 32px;">
              <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: ${STYLES.accent}; margin-bottom: 8px; font-family: monospace;">
                ${safeSource}
              </span>
              <h1 style="margin: 0 0 10px 0; font-size: 22px; font-weight: 600; letter-spacing: -0.3px; color: ${STYLES.textPrimary};">
                New message from ${safeName}
              </h1>
              <p style="margin: 0; font-size: 13px; color: ${STYLES.textSecondary}; line-height: 1.5;">
                Logged on <span style="color: #ffffff; font-family: monospace;">${dateStr} CAT</span> via the portfolio contact form.
              </p>
            </td>
          </tr>

          <!-- Sender Details Grid -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${STYLES.innerCard}; border: 1px solid ${STYLES.border}; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid ${STYLES.border}; width: 140px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: ${STYLES.textMuted}; font-family: monospace;">
                    Sender Name
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 13px; font-weight: 600; color: #ffffff;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: ${STYLES.textMuted}; font-family: monospace;">
                    Email Address
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 13px; color: ${STYLES.accent};">
                    <a href="mailto:${safeEmail}" style="color: ${STYLES.accent}; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                ${
                  safeCompany
                    ? `
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: ${STYLES.textMuted}; font-family: monospace;">
                    Organisation / Bank
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 13px; color: #ffffff;">
                    ${safeCompany}
                  </td>
                </tr>
                `
                    : ''
                }
                ${
                  safePhone
                    ? `
                <tr>
                  <td style="padding: 14px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: ${STYLES.textMuted}; font-family: monospace;">
                    Phone / WhatsApp
                  </td>
                  <td style="padding: 14px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 13px; color: #ffffff;">
                    <a href="tel:${safePhone}" style="color: #ffffff; text-decoration: none;">${safePhone}</a>
                  </td>
                </tr>
                `
                    : ''
                }
                <tr>
                  <td style="padding: 14px 18px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: ${STYLES.textMuted}; font-family: monospace;">
                    Inquiry Intent
                  </td>
                  <td style="padding: 14px 18px; font-size: 13px; color: ${STYLES.emerald}; font-weight: 500;">
                    ${safeSource}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: ${STYLES.textMuted}; margin-bottom: 8px; font-family: monospace;">
                Inquiry Message
              </span>
              <div style="background-color: rgba(0, 0, 0, 0.45); border: 1px solid ${STYLES.border}; border-radius: 12px; padding: 20px; font-size: 13px; line-height: 1.65; color: #ffffff; font-family: ${STYLES.fontFamily};">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- Quick Action: Reply CTA -->
          <tr>
            <td style="padding: 0 32px 36px 32px;" align="left">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 999px; background-color: #ffffff;">
                    <a href="mailto:${safeEmail}?subject=Re:%20Attachment%20%26%20Portfolio%20Inquiry%20%7C%20Loago%20Montsho%20(Mov)&reply-to=${safeEmail}" style="display: inline-block; padding: 13px 26px; font-size: 13px; font-weight: 600; color: #000000; text-decoration: none; border-radius: 999px; letter-spacing: -0.2px;">
                      Reply to ${safeName} &rarr;
                    </a>
                  </td>
                  ${
                    safePhone
                      ? `
                  <td style="padding-left: 12px;">
                    <a href="tel:${safePhone}" style="display: inline-block; padding: 12px 20px; font-size: 13px; font-weight: 500; color: #ffffff; text-decoration: none; border-radius: 999px; border: 1px solid ${STYLES.borderLight}; background-color: rgba(255,255,255,0.04);">
                      Call (${safePhone})
                    </a>
                  </td>
                  `
                      : ''
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 32px; border-top: 1px solid ${STYLES.border}; background-color: #101010; font-size: 11px; color: ${STYLES.textMuted}; line-height: 1.5;">
              Loago Kevin Montsho ("Mov") · BSc (Hons) Business Intelligence &amp; Data Analytics<br />
              Dispatched via <a href="https://loagomov.blancsociety.co.uk" style="color: ${STYLES.textSecondary}; text-decoration: none;">loagomov.blancsociety.co.uk</a> on Cloudflare Edge.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

/**
 * 2. Automated Confirmation / Acknowledgment Template
 * Sent to: The visitor/recruiter/employer
 * Purpose: Acknowledges receipt of their note with Loago's personal voice, attachment context, and links.
 */
export function renderPortfolioUserConfirmationHtml(data: ContactEmailData): string {
  const safeName = escapeHtml(data.name)
  const safeCompany = data.company ? escapeHtml(data.company) : ''
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Received · Loago Kevin Montsho ("Mov")</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${STYLES.bg}; font-family: ${STYLES.fontFamily}; -webkit-font-smoothing: antialiased; color: ${STYLES.textPrimary};">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${STYLES.bg}; padding: 36px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: ${STYLES.card}; border: 1px solid ${STYLES.border}; border-radius: 18px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid ${STYLES.border}; background-color: #121212;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td valign="middle">
                    <span style="font-size: 18px; font-weight: 700; letter-spacing: -0.4px; color: #ffffff;">Loago Montsho</span>
                    <span style="display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: ${STYLES.accent}; background-color: ${STYLES.accentBg}; border: 1px solid ${STYLES.accentBorder}; border-radius: 4px; padding: 2px 6px; margin-left: 8px;">MOV</span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="font-size: 11px; font-family: monospace; color: ${STYLES.textMuted};">loagomov.blancsociety.co.uk</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin: 0 0 12px 0; font-size: 21px; font-weight: 600; letter-spacing: -0.3px; color: ${STYLES.textPrimary};">
                Thank you for reaching out, ${safeName}.
              </h1>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: ${STYLES.textSecondary};">
                Dumela! I have received your message regarding ${safeCompany ? `your team at <strong style="color: #ffffff;">${safeCompany}</strong>` : 'your inquiry'}. I review all inbound correspondence personally and will get back to you within <strong style="color: #ffffff;">1 to 2 business days</strong>.
              </p>

              <!-- Academic Attachment & Background Note -->
              <div style="background-color: ${STYLES.innerCard}; border: 1px solid ${STYLES.border}; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="32" valign="top">
                      <div style="width: 22px; height: 22px; border-radius: 50%; background-color: ${STYLES.emeraldBg}; border: 1px solid ${STYLES.emeraldBorder}; text-align: center; line-height: 22px; font-size: 11px; color: ${STYLES.emerald}; font-weight: 700;">
                        ✓
                      </div>
                    </td>
                    <td valign="top" style="padding-left: 8px;">
                      <span style="display: block; font-size: 13px; font-weight: 600; color: ${STYLES.textPrimary}; margin-bottom: 4px;">
                        Attachment Focus: January – June 2027
                      </span>
                      <span style="font-size: 12px; color: ${STYLES.textSecondary}; line-height: 1.5; display: block;">
                        I am currently in my third year of the BSc (Hons) Business Intelligence &amp; Data Analytics degree at Botswana Accountancy College (BAC / University of Sunderland), actively securing a 6-month Data Analyst / Quantitative Analyst attachment.
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Summary of Submitted Inquiry -->
              <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: ${STYLES.textMuted}; margin-bottom: 8px; font-family: monospace;">
                Summary of your message
              </span>
              <div style="background-color: rgba(0, 0, 0, 0.4); border: 1px solid ${STYLES.border}; border-radius: 12px; padding: 18px 20px; margin-bottom: 26px; font-size: 13px; line-height: 1.6; color: ${STYLES.textSecondary};">
                ${safeCompany ? `<div style="margin-bottom: 8px; color: #ffffff;"><strong>Organisation:</strong> ${safeCompany}</div>` : ''}
                <div style="color: ${STYLES.textMuted}; font-size: 11px; text-transform: uppercase; font-weight: 600; margin-bottom: 4px; font-family: monospace;">Submitted Scope:</div>
                <div style="color: #ffffff;">${safeMessage}</div>
              </div>

              <!-- Exploration CTAs -->
              <p style="margin: 0 0 16px 0; font-size: 13px; color: ${STYLES.textSecondary}; line-height: 1.5;">
                In the meantime, feel free to inspect my technical systems and interactive desktop environment:
              </p>

              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 26px;">
                <tr>
                  <td align="center" style="border-radius: 999px; background-color: #ffffff;">
                    <a href="https://loagomov.blancsociety.co.uk/#projects" style="display: inline-block; padding: 12px 24px; font-size: 13px; font-weight: 600; color: #000000; text-decoration: none; border-radius: 999px;">
                      Inspect Flagship Systems &rarr;
                    </a>
                  </td>
                  <td style="padding-left: 12px;">
                    <a href="https://loagomov.blancsociety.co.uk/os" style="display: inline-block; padding: 11px 20px; font-size: 13px; font-weight: 500; color: ${STYLES.accent}; text-decoration: none; border-radius: 999px; border: 1px solid ${STYLES.accentBorder}; background-color: ${STYLES.accentBg};">
                      Launch macOS Mode ⌘D
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="margin: 24px 0 0 0; font-size: 13px; color: ${STYLES.textSecondary}; line-height: 1.6;">
                Warm regards,<br />
                <strong style="color: ${STYLES.textPrimary}; font-size: 14px;">Loago Kevin Montsho (&ldquo;Mov&rdquo;)</strong><br />
                <span style="color: ${STYLES.textMuted}; font-size: 12px;">Data Analytics Student · Full-Stack Developer · Founder</span><br />
                <span style="color: ${STYLES.textMuted}; font-size: 11px; font-family: monospace;">Gaborone, Botswana · +267 7475 8325 · <a href="mailto:hello@blancsociety.co.uk" style="color: ${STYLES.accent}; text-decoration: none;">hello@blancsociety.co.uk</a></span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 32px; border-top: 1px solid ${STYLES.border}; background-color: #101010; font-size: 11px; color: ${STYLES.textMuted}; line-height: 1.5;">
              You received this confirmation because you submitted a note at <a href="https://loagomov.blancsociety.co.uk" style="color: ${STYLES.textSecondary}; text-decoration: underline;">loagomov.blancsociety.co.uk</a>.<br />
              All information is kept strictly confidential.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
