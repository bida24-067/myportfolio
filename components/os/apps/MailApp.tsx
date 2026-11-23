'use client'

import { useState } from 'react'
import { portfolioData } from '@/src/data/portfolio'
import { PushNotificationData } from '@/components/os/PushNotification'

export default function MailApp({
  onNotification,
}: {
  onNotification: (notif: PushNotificationData) => void
}) {
  const { personal } = portfolioData

  const [activeMailbox, setActiveMailbox] = useState<'compose' | 'inbox' | 'sent'>('compose')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Academic Attachment Inquiry (Jan – Jun 2027)',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sentCount, setSentCount] = useState(0)

  const handleSendMail = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Direct Contact via macOS Mail',
          message: `[Subject: ${formData.subject}]\n\n${formData.message}`,
          source: 'Other',
          consent: true,
          honeypot: '',
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to dispatch mail via Resend')
      }

      setSending(false)
      setSentCount((prev) => prev + 1)
      setActiveMailbox('sent')

      // Trigger macOS top-right push banner notification!
      onNotification({
        id: `mail-${Date.now()}`,
        title: 'Mail Dispatched Successfully',
        subtitle: `To: ${personal.name} <${personal.ventureEmail}>`,
        body: `Your message regarding "${formData.subject}" was delivered via Resend. A confirmation has been routed to ${formData.email}.`,
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: 'Academic Attachment Inquiry (Jan – Jun 2027)',
        message: '',
      })
    } catch {
      setSending(false)
      onNotification({
        id: `mail-err-${Date.now()}`,
        title: 'Mail Dispatch Error',
        subtitle: 'Connection / Validation issue',
        body: 'Please ensure your email address is valid and your message is at least 10 characters long.',
      })
    }
  }

  return (
    <div className="flex h-full bg-[#18181a] text-white select-none">
      {/* ── 1. Mailbox Sidebar ── */}
      <div className="w-48 bg-[#141416]/95 border-r border-white/[0.08] p-3 flex flex-col justify-between shrink-0 text-xs">
        <div className="space-y-4">
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-white/40 px-2 mb-2 font-semibold">
              Mailboxes
            </p>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveMailbox('compose')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeMailbox === 'compose'
                      ? 'bg-[#9fa3fc]/20 text-white font-medium'
                      : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>✏️</span>
                    <span>Compose</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveMailbox('inbox')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeMailbox === 'inbox'
                      ? 'bg-[#9fa3fc]/20 text-white font-medium'
                      : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>📥</span>
                    <span>Inbox</span>
                  </span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 font-mono px-1.5 py-0.5 rounded">
                    1
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveMailbox('sent')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    activeMailbox === 'sent'
                      ? 'bg-[#9fa3fc]/20 text-white font-medium'
                      : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>📤</span>
                    <span>Sent</span>
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">{sentCount}</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 text-[11px] text-white/50">
            <p className="font-semibold text-white/80">Active Route</p>
            <p className="text-[10px] text-[#9fa3fc] font-mono truncate">Resend SMTP Edge</p>
            <p className="text-[9px] text-white/40 truncate">replyTo: hello@blancsociety.co.uk</p>
          </div>
        </div>

        <div className="text-[10px] text-white/40 font-mono">
          loagomov.blancsociety.co.uk
        </div>
      </div>

      {/* ── 2. Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#18181b] overflow-y-auto">
        {activeMailbox === 'compose' ? (
          <form onSubmit={handleSendMail} className="p-6 max-w-2xl mx-auto w-full flex flex-col flex-1 space-y-4">
            <div className="pb-3 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-white">New Message</h3>
                <p className="text-xs text-white/50 font-mono">Dispatches directly to Loago Montsho via Resend</p>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="py-1.5 px-4 rounded-lg bg-[#9fa3fc] text-black font-semibold text-xs hover:bg-[#9fa3fc]/90 transition-all disabled:opacity-50 flex items-center gap-1.5 shadow"
              >
                {sending ? (
                  <>
                    <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span>↗</span>
                  </>
                )}
              </button>
            </div>

            {/* Email Meta Fields */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-3 py-1 border-b border-white/[0.06]">
                <span className="w-16 text-white/40 font-mono">To:</span>
                <span className="text-white/90 font-medium font-mono">
                  Loago Kevin Montsho &lt;{personal.ventureEmail}&gt;
                </span>
              </div>

              <div className="flex items-center gap-3 py-1 border-b border-white/[0.06]">
                <span className="w-16 text-white/40 font-mono">Your Name:</span>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Neo Segokgo"
                  className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 py-1 border-b border-white/[0.06]">
                <span className="w-16 text-white/40 font-mono">Your Email:</span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="neo@institution.co.bw"
                  className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 py-1 border-b border-white/[0.06]">
                <span className="w-16 text-white/40 font-mono">Company:</span>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Botswana Stock Exchange, Bank, Studio (optional)"
                  className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 py-1 border-b border-white/[0.06]">
                <span className="w-16 text-white/40 font-mono">Subject:</span>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none"
                />
              </div>
            </div>

            {/* Message Body */}
            <div className="flex-1 flex flex-col pt-2">
              <textarea
                required
                minLength={10}
                rows={8}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your note or attachment opportunity details here..."
                className="w-full flex-1 bg-transparent text-white text-xs sm:text-sm leading-relaxed placeholder-white/30 focus:outline-none resize-none font-sans"
              />
            </div>
          </form>
        ) : activeMailbox === 'inbox' ? (
          <div className="p-6 max-w-xl mx-auto space-y-4">
            <h3 className="text-base font-medium text-white">System Welcome Note</h3>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-3 text-xs leading-relaxed text-white/70">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-[11px]">
                <span className="text-white font-semibold">From: Loago Montsho (Mov)</span>
                <span className="text-white/40">Today</span>
              </div>
              <p>
                Dumela! Welcome to the macOS desktop view of my portfolio. This client is fully wired to
                Resend. You can use the Compose tab to send inquiries directly to my inbox with automated receipt
                confirmations.
              </p>
              <p>
                I am currently targeting a 6-month academic Data Analyst attachment (Jan–Jun 2027) with financial
                and capital market institutions in Botswana.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-xl mx-auto space-y-4">
            <h3 className="text-base font-medium text-white">Sent Messages ({sentCount})</h3>
            {sentCount === 0 ? (
              <p className="text-xs text-white/40">No messages sent in this session yet.</p>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-white/80 space-y-1">
                <p className="font-semibold text-emerald-400">✓ {sentCount} message dispatched via Resend</p>
                <p className="text-white/60">Delivered to hello@blancsociety.co.uk</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
