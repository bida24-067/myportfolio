/**
 * Email templates for Blanc Data
 * Designed to match the dark, minimalist aesthetic of the Blanc Data website
 */

export interface ContactEmailData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  source: string
}

// ── Shared Styling Constants ──────────────────────────────
const STYLES = {
  bg: '#0e0e0e',
  card: '#161616',
  innerCard: '#1d1d1d',
  accentWell: '#181a24',
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
 * 1. Internal Service Request Notification Template
 * Sent to: hello@blancsociety.co.uk
 * Purpose: Notifies Blanc Data founders/team that a client has requested services on the contact form.
 */
export function renderNotificationEmailHtml(data: ContactEmailData): string {
  const safeName = escapeHtml(data.name)
  const safeEmail = escapeHtml(data.email)
  const safePhone = data.phone ? escapeHtml(data.phone) : ''
  const safeCompany = data.company ? escapeHtml(data.company) : ''
  const safeSource = escapeHtml(data.source)
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />')
  const dateStr = new Date().toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Service Request from ${safeName} · Blanc Data</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${STYLES.bg}; font-family: ${STYLES.fontFamily}; -webkit-font-smoothing: antialiased; color: ${STYLES.textPrimary};">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${STYLES.bg}; padding: 36px 16px;">
    <tr>
      <td align="center">
        <!-- Main Wrapper Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: ${STYLES.card}; border: 1px solid ${STYLES.border}; border-radius: 18px; overflow: hidden; box-shadow: 0 20px 48px rgba(0,0,0,0.6);">
          
          <!-- Top Brand & Status Bar -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid ${STYLES.border}; background-color: #121212;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td valign="middle">
                    <span style="font-size: 21px; font-weight: 700; letter-spacing: -0.6px; color: #ffffff;">blanc.</span>
                    <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.8px; color: ${STYLES.accent}; border-left: 1px solid ${STYLES.border}; margin-left: 9px; padding-left: 9px;">DATA</span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 5px 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: ${STYLES.emerald}; background-color: ${STYLES.emeraldBg}; border: 1px solid ${STYLES.emeraldBorder}; border-radius: 999px;">
                      ● Service Request
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Header Intro -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              <span style="display: inline-block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: ${STYLES.accent}; margin-bottom: 6px;">
                Incoming Client Request
              </span>
              <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 600; letter-spacing: -0.4px; color: ${STYLES.textPrimary}; line-height: 1.25;">
                ${safeName} requested project services
              </h1>
              <p style="margin: 0; font-size: 13px; color: ${STYLES.textSecondary}; line-height: 1.5;">
                Submitted via the Blanc Data contact form on <strong style="color: #ffffff;">${dateStr}</strong>.
              </p>
            </td>
          </tr>

          <!-- Summary Badges Grid -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="padding-right: 6px;">
                    <div style="background-color: ${STYLES.innerCard}; border: 1px solid ${STYLES.border}; border-radius: 12px; padding: 14px 16px;">
                      <span style="display: block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: ${STYLES.textMuted}; margin-bottom: 4px;">
                        Organisation / Client
                      </span>
                      <span style="display: block; font-size: 13px; font-weight: 600; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${safeCompany ? safeCompany : 'Private / SME Client'}
                      </span>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 6px;">
                    <div style="background-color: ${STYLES.innerCard}; border: 1px solid ${STYLES.border}; border-radius: 12px; padding: 14px 16px;">
                      <span style="display: block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: ${STYLES.textMuted}; margin-bottom: 4px;">
                        Acquisition Channel
                      </span>
                      <span style="display: block; font-size: 13px; font-weight: 600; color: ${STYLES.accent};">
                        ${safeSource}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: ${STYLES.textMuted}; margin-bottom: 8px;">
                Client Contact Profile
              </span>
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${STYLES.innerCard}; border: 1px solid ${STYLES.border}; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid ${STYLES.border}; width: 130px; font-size: 12px; font-weight: 600; color: ${STYLES.textMuted};">
                    Full Name
                  </td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 13px; font-weight: 600; color: ${STYLES.textPrimary};">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 12px; font-weight: 600; color: ${STYLES.textMuted};">
                    Email Address
                  </td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 13px; font-weight: 500; color: ${STYLES.accent};">
                    <a href="mailto:${safeEmail}" style="color: ${STYLES.accent}; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 12px; font-weight: 600; color: ${STYLES.textMuted};">
                    Phone Number
                  </td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid ${STYLES.border}; font-size: 13px; color: ${safePhone ? STYLES.textPrimary : STYLES.textMuted};">
                    ${safePhone ? `<a href="tel:${safePhone}" style="color: #ffffff; text-decoration: none;">${safePhone}</a>` : 'Not provided'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; font-size: 12px; font-weight: 600; color: ${STYLES.textMuted};">
                    Organisation
                  </td>
                  <td style="padding: 13px 18px; font-size: 13px; color: ${safeCompany ? STYLES.textPrimary : STYLES.textMuted};">
                    ${safeCompany ? safeCompany : 'Not specified'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Project Description / Scope Box -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: ${STYLES.textMuted}; margin-bottom: 8px;">
                Requested Project Scope & Goals
              </span>
              <div style="background-color: ${STYLES.accentWell}; border: 1px solid ${STYLES.accentBorder}; border-left: 4px solid ${STYLES.accent}; border-radius: 12px; padding: 20px 22px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.65; color: #ffffff;">
                  ${safeMessage}
                </p>
              </div>
            </td>
          </tr>

          <!-- Operational Checklist Callout -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <div style="background-color: #121212; border: 1px dashed ${STYLES.borderLight}; border-radius: 12px; padding: 18px 20px;">
                <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: ${STYLES.accent}; margin-bottom: 8px;">
                  Recommended Triage Next Steps
                </span>
                <ul style="margin: 0; padding: 0 0 0 16px; font-size: 12px; color: ${STYLES.textSecondary}; line-height: 1.6;">
                  <li>Assess whether the project fits (Analytical Pipelines, Predictive Modeling, or Dashboards).</li>
                  <li>Verify available data sources (e.g. CSVs, database tables, Excel sheets, or APIs).</li>
                  <li>Reply within <strong style="color: #ffffff;">3 business days</strong> to schedule an initial 30-minute scoping call.</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Direct Reply Call to Action -->
          <tr>
            <td style="padding: 0 32px 36px 32px;" align="left">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 999px; background-color: #ffffff;">
                    <a href="mailto:${safeEmail}?subject=Re:%20Blanc%20Data%20Services%20Inquiry%20%7C%20${safeName}" style="display: inline-block; padding: 13px 26px; font-size: 13px; font-weight: 600; color: #000000; text-decoration: none; border-radius: 999px; letter-spacing: -0.2px;">
                      Reply Directly to ${safeName} &rarr;
                    </a>
                  </td>
                  ${
                    safePhone
                      ? `
                  <td style="padding-left: 12px;">
                    <a href="tel:${safePhone}" style="display: inline-block; padding: 12px 20px; font-size: 13px; font-weight: 500; color: #ffffff; text-decoration: none; border-radius: 999px; border: 1px solid ${STYLES.borderLight}; background-color: rgba(255,255,255,0.04);">
                      Call Client (${safePhone})
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
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    Blanc Data · Enterprise Analytics & Machine Learning · Gaborone, Botswana<br />
                    Confidential client communication received via <a href="https://blancsociety.co.uk" style="color: ${STYLES.textSecondary}; text-decoration: none;">blancsociety.co.uk</a>.
                  </td>
                </tr>
              </table>
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
 * Sent to: The client/user's input email
 */
export function renderConfirmationEmailHtml(data: ContactEmailData): string {
  const safeName = escapeHtml(data.name)
  const safeCompany = data.company ? escapeHtml(data.company) : ''
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We've received your request · Blanc Data</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${STYLES.bg}; font-family: ${STYLES.fontFamily}; -webkit-font-smoothing: antialiased; color: ${STYLES.textPrimary};">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${STYLES.bg}; padding: 36px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: ${STYLES.card}; border: 1px solid ${STYLES.border}; border-radius: 18px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 26px 32px; border-bottom: 1px solid ${STYLES.border}; background-color: #121212;">
              <span style="font-size: 21px; font-weight: 700; letter-spacing: -0.6px; color: #ffffff;">blanc.</span>
              <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.8px; color: ${STYLES.accent}; border-left: 1px solid ${STYLES.border}; margin-left: 9px; padding-left: 9px;">DATA</span>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 600; letter-spacing: -0.3px; color: ${STYLES.textPrimary};">
                We've received your project inquiry, ${safeName}.
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: ${STYLES.textSecondary};">
                Thank you for contacting Blanc Data. Our analytics team in Gaborone has logged your request and will review the requirements you outlined.
              </p>

              <!-- Process Step Callout -->
              <div style="background-color: ${STYLES.innerCard}; border: 1px solid ${STYLES.border}; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="36" valign="top">
                      <div style="width: 24px; height: 24px; border-radius: 50%; background-color: rgba(159, 163, 252, 0.15); border: 1px solid rgba(159, 163, 252, 0.4); text-align: center; line-height: 24px; font-size: 12px; color: ${STYLES.accent}; font-weight: 700;">
                        ✓
                      </div>
                    </td>
                    <td valign="top" style="padding-left: 8px;">
                      <span style="display: block; font-size: 13px; font-weight: 600; color: ${STYLES.textPrimary}; margin-bottom: 4px;">
                        Next step: Scoping review
                      </span>
                      <span style="font-size: 13px; color: ${STYLES.textSecondary}; line-height: 1.5;">
                        We will get back to you within <strong style="color: #ffffff;">3 business days</strong> to clarify source data details and outline next steps.
                      </span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Summary of Submitted Scope -->
              <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: ${STYLES.textMuted}; margin-bottom: 8px;">
                Summary of your inquiry
              </span>
              <div style="background-color: rgba(0, 0, 0, 0.35); border: 1px solid ${STYLES.border}; border-radius: 12px; padding: 18px 20px; margin-bottom: 28px; font-size: 13px; line-height: 1.6; color: ${STYLES.textSecondary};">
                ${safeCompany ? `<div style="margin-bottom: 8px; color: #ffffff;"><strong>Organisation:</strong> ${safeCompany}</div>` : ''}
                <div style="color: ${STYLES.textMuted}; font-size: 11px; text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Submitted Scope:</div>
                <div style="color: #ffffff;">${safeMessage}</div>
              </div>

              <!-- Prototypes link -->
              <p style="margin: 0 0 16px 0; font-size: 13px; color: ${STYLES.textSecondary}; line-height: 1.5;">
                While we prepare your response, you are welcome to inspect our verified project prototypes:
              </p>

              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center" style="border-radius: 999px; background-color: #ffffff;">
                    <a href="https://blancsociety.co.uk/projects" style="display: inline-block; padding: 12px 24px; font-size: 13px; font-weight: 600; color: #000000; text-decoration: none; border-radius: 999px;">
                      Explore Technical Prototypes &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Closing -->
              <p style="margin: 24px 0 0 0; font-size: 13px; color: ${STYLES.textSecondary}; line-height: 1.6;">
                Warm regards,<br />
                <strong style="color: ${STYLES.textPrimary};">The Blanc Data Team</strong><br />
                <span style="color: ${STYLES.textMuted};">Gaborone, Botswana · <a href="mailto:hello@blancsociety.co.uk" style="color: ${STYLES.accent}; text-decoration: none;">hello@blancsociety.co.uk</a></span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 32px; border-top: 1px solid ${STYLES.border}; background-color: #101010; font-size: 11px; color: ${STYLES.textMuted}; line-height: 1.5;">
              You received this confirmation because you submitted an inquiry at <a href="https://blancsociety.co.uk" style="color: ${STYLES.textSecondary}; text-decoration: underline;">blancsociety.co.uk</a>.<br />
              All data is handled confidentially and never shared.
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
