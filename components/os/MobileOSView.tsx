'use client'

import { useState } from 'react'
import FinderApp from './apps/FinderApp'
import SafariApp from './apps/SafariApp'
import AboutApp from './apps/AboutApp'
import NotesApp from './apps/NotesApp'
import MailApp from './apps/MailApp'
import TerminalApp from './apps/TerminalApp'
import TrashApp from './apps/TrashApp'
import { PushNotificationData } from './PushNotification'
import {
  FinderIcon,
  SafariIcon,
  AboutIcon,
  NotesIcon,
  MailIcon,
  TerminalIcon,
  TrashIcon,
} from './Dock'

export default function MobileOSView({
  activeAppId,
  onSelectApp,
  onExitToStandard,
  onNotification,
}: {
  activeAppId: string | null
  onSelectApp: (appId: string | null) => void
  onExitToStandard: () => void
  onNotification: (n: PushNotificationData) => void
}) {
  const [safariRepo, setSafariRepo] = useState<string>('knee-osteoarthritis-classifier')

  const apps = [
    { id: 'finder', title: 'Finder', subtitle: 'Lakehouses & Projects', Icon: FinderIcon },
    { id: 'safari', title: 'Safari', subtitle: 'GitHub Code Viewer', Icon: SafariIcon },
    { id: 'about', title: 'About Mov', subtitle: 'BSc & System Specs', Icon: AboutIcon },
    { id: 'notes', title: 'Notes', subtitle: 'Research & Poetry', Icon: NotesIcon },
    { id: 'mail', title: 'Mail', subtitle: 'Resend Contact Dispatch', Icon: MailIcon },
    { id: 'terminal', title: 'Terminal', subtitle: 'Interactive zsh Shell', Icon: TerminalIcon },
    { id: 'trash', title: 'Trash', subtitle: 'Archived Drafts', Icon: TrashIcon },
  ]

  const handleOpenSafariRepo = (repo: string) => {
    setSafariRepo(repo)
    onSelectApp('safari')
  }

  return (
    <div className="flex flex-col h-full bg-[#121214] text-white overflow-hidden">
      {/* Top Mobile Bar */}
      <div className="h-12 bg-[#18181b]/90 border-b border-white/[0.08] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">Loago Montsho</span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#9fa3fc]/20 text-[#9fa3fc]">
            MovOS
          </span>
        </div>

        <button
          type="button"
          onClick={onExitToStandard}
          className="text-xs px-2.5 py-1 rounded-full bg-white/[0.08] text-white/80 hover:text-white"
        >
          Exit to Standard View ↗
        </button>
      </div>

      {/* Main Container */}
      {activeAppId ? (
        /* Render Active App in Full Mobile Sheet */
        <div className="flex-1 flex flex-col min-h-0 bg-[#18181a] relative">
          {/* Header to close/switch app */}
          <div className="h-10 bg-[#1e1e22] border-b border-white/[0.08] flex items-center justify-between px-4 shrink-0">
            <button
              type="button"
              onClick={() => onSelectApp(null)}
              className="text-xs text-[#9fa3fc] font-medium flex items-center gap-1"
            >
              <span>‹ All Apps</span>
            </button>
            <span className="text-xs font-semibold capitalize">{activeAppId}</span>
            <button
              type="button"
              onClick={() => onSelectApp(null)}
              className="text-white/40 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            {activeAppId === 'finder' && (
              <FinderApp onOpenInSafari={handleOpenSafariRepo} />
            )}
            {activeAppId === 'safari' && (
              <SafariApp initialRepoSlug={safariRepo} />
            )}
            {activeAppId === 'about' && (
              <AboutApp
                onOpenFinder={() => onSelectApp('finder')}
                onOpenMail={() => onSelectApp('mail')}
              />
            )}
            {activeAppId === 'notes' && <NotesApp />}
            {activeAppId === 'mail' && <MailApp onNotification={onNotification} />}
            {activeAppId === 'terminal' && (
              <TerminalApp
                onOpenApp={(id) => onSelectApp(id)}
                onOpenSafariRepo={handleOpenSafariRepo}
                onToggleTheme={() => {}}
                onExitToStandard={onExitToStandard}
              />
            )}
            {activeAppId === 'trash' && <TrashApp />}
          </div>
        </div>
      ) : (
        /* Mobile App Grid */
        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Stage Manager</h2>
              <p className="text-xs text-white/50 mt-1">Tap an application to launch on mobile</p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {apps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => onSelectApp(app.id)}
                  className="p-4 rounded-2xl bg-[#1a1a1d] border border-white/[0.08] active:scale-95 transition-all flex flex-col items-start text-left hover:border-white/[0.18]"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-3">
                    <app.Icon className="w-12 h-12" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{app.title}</h4>
                  <p className="text-[11px] text-white/40 mt-0.5">{app.subtitle}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.08] text-center">
            <button
              type="button"
              onClick={onExitToStandard}
              className="w-full py-3 rounded-xl bg-[#9fa3fc] text-black font-semibold text-xs"
            >
              Return to Standard View
            </button>
            <p className="text-[10px] text-white/30 font-mono mt-2">
              For full multi-window desktop experience, open on tablet or desktop
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
