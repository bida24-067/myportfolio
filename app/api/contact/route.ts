import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import {
  renderPortfolioInquiryNotificationHtml,
  renderPortfolioUserConfirmationHtml,
  ContactEmailData,
} from '@/lib/portfolio-email-templates'

// Lazy-init so build doesn't fail without env vars
function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(50).optional(),
  company: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  source: z.enum(['LinkedIn', 'Google', 'Event', 'Referral', 'Instagram', 'Other']).optional().default('Other'),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional().default(''),
})

// In-memory rate limiting: max 5 submissions per IP per 15 min
const rateMap = new Map<string, { count: number; reset: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const window = 15 * 60 * 1000
  const entry = rateMap.get(ip)
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + window })
    return false
  }
  if (entry.count >= 5) return true
  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 422 })
  }

  const emailData: ContactEmailData = result.data
  const toOwnerEmail = process.env.PORTFOLIO_CONTACT_EMAIL || process.env.CONTACT_EMAIL || 'hello@blancsociety.co.uk'
  const fromSender = process.env.RESEND_FROM_EMAIL || 'Loago Montsho <confirmations@mail.blancsociety.co.uk>'
  const ownerReplyTo = toOwnerEmail
  const resend = getResend()

  try {
    // 1. Send High-Priority Notification to Loago Kevin Montsho ("Mov")
    const notificationHtml = renderPortfolioInquiryNotificationHtml(emailData)
    const notificationPlainText = [
      `New Portfolio Inquiry from ${emailData.name} · Loago Montsho (Mov)`,
      '========================================',
      `Sender: ${emailData.name}`,
      `Email: ${emailData.email}`,
      emailData.phone ? `Phone / WhatsApp: ${emailData.phone}` : null,
      emailData.company ? `Organisation: ${emailData.company}` : null,
      `Inquiry Category: ${emailData.source}`,
      '----------------------------------------',
      'Message:',
      emailData.message,
      '========================================',
      'Dispatched via loagomov.blancsociety.co.uk',
    ]
      .filter(Boolean)
      .join('\n')

    const { data: teamRes, error: teamErr } = await resend.emails.send({
      from: fromSender,
      to: [toOwnerEmail],
      replyTo: emailData.email,       // Hitting reply goes directly to the sender!
      subject: `New Portfolio Inquiry from ${emailData.name} · Mov`,
      html: notificationHtml,
      text: notificationPlainText,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
      },
    })

    if (teamErr) {
      console.error('Failed to dispatch notification to Loago via Resend:', teamErr)
      return NextResponse.json({ error: teamErr.message }, { status: 500 })
    }

    // 2. Dispatch Personal Confirmation / Acknowledgment Email to the User
    let userConfirmationSent = false
    try {
      const confirmationHtml = renderPortfolioUserConfirmationHtml(emailData)
      const confirmationPlainText = [
        `Dumela ${emailData.name},`,
        '',
        'Thank you for reaching out via my portfolio (loagomov.blancsociety.co.uk). I have received your message and will review the details you provided.',
        '',
        'Attachment Focus: January – June 2027',
        'I am currently a third-year undergraduate in Business Intelligence & Data Analytics at BAC (University of Sunderland), actively securing a 6-month Data Analyst / Quantitative Analyst attachment.',
        '',
        'I review all inquiries personally and will respond within 1–2 business days.',
        '',
        'Summary of your note:',
        emailData.company ? `Organisation: ${emailData.company}` : null,
        'Submitted Scope:',
        emailData.message,
        '',
        'Explore my flagship data systems: https://loagomov.blancsociety.co.uk/#projects',
        'Launch interactive macOS desktop mode: https://loagomov.blancsociety.co.uk/os',
        '',
        'Warm regards,',
        'Loago Kevin Montsho ("Mov")',
        'Data Analytics Student · Full-Stack Developer · Founder',
        'Gaborone, Botswana · +267 7475 8325 · hello@blancsociety.co.uk',
      ]
        .filter(Boolean)
        .join('\n')

      const { error: userErr } = await resend.emails.send({
        from: fromSender,
        to: [emailData.email],
        replyTo: ownerReplyTo,        // Reply goes back to Loago
        subject: `Message Received · Loago Kevin Montsho ("Mov")`,
        html: confirmationHtml,
        text: confirmationPlainText,
        headers: {
          'List-Unsubscribe': `<mailto:hello@blancsociety.co.uk?subject=Unsubscribe>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      })

      if (userErr) {
        console.warn('Failed to dispatch user confirmation email:', userErr)
      } else {
        userConfirmationSent = true
      }
    } catch (confErr) {
      console.warn('Silent skip on user confirmation dispatch:', confErr)
    }

    return NextResponse.json(
      {
        success: true,
        notificationId: teamRes?.id,
        userConfirmationSent,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error'
    console.error('Unhandled Resend API error:', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
