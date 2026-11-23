'use client'

import { useState } from 'react'
import Image from 'next/image'

export interface DockAppItem {
  id: string
  title: string
  badge?: string
  icon: string
}

/* =====================================================================
   Official macOS System App Icons (Local high-res PNG assets)
   Extracted directly from macOS Application bundles
   ===================================================================== */

export const MACOS_ICONS = {
  finder:   '/icons/finder.png',
  safari:   '/icons/safari.png',
  about:    '/icons/about.png',
  notes:    '/icons/notes.png',
  mail:     '/icons/mail.png',
  terminal: '/icons/terminal.png',
  trash:    '/icons/trash.png',
} as const

/* =====================================================================
   Named icon components for compatibility with MobileOSView and other consumers
   ===================================================================== */

function makeMacOSIcon(src: string) {
  return function MacOSIcon({ className = 'w-12 h-12' }: { className?: string }) {
    const match = className.match(/w-(\d+)/)
    const size = match ? parseInt(match[1], 10) * 4 : 48
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        className={`${className} drop-shadow-lg object-contain select-none`}
        draggable={false}
        priority
      />
    )
  }
}

export const FinderIcon   = makeMacOSIcon(MACOS_ICONS.finder)
export const SafariIcon   = makeMacOSIcon(MACOS_ICONS.safari)
export const AboutIcon    = makeMacOSIcon(MACOS_ICONS.about)
export const NotesIcon    = makeMacOSIcon(MACOS_ICONS.notes)
export const MailIcon     = makeMacOSIcon(MACOS_ICONS.mail)
export const TerminalIcon = makeMacOSIcon(MACOS_ICONS.terminal)
export const TrashIcon    = makeMacOSIcon(MACOS_ICONS.trash)

/* =====================================================================
   Dock Component with Spring Physics Magnification
   ===================================================================== */

export default function Dock({
  activeApps,
  openApps,
  onAppClick,
}: {
  activeApps: string[]
  openApps: string[]
  onAppClick: (appId: string) => void
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const dockApps: DockAppItem[] = [
    { id: 'finder',   title: 'Finder',    icon: MACOS_ICONS.finder   },
    { id: 'safari',   title: 'Safari',    icon: MACOS_ICONS.safari   },
    { id: 'about',    title: 'About Mov', icon: MACOS_ICONS.about    },
    { id: 'notes',    title: 'Notes',     icon: MACOS_ICONS.notes    },
    { id: 'mail',     title: 'Mail',      icon: MACOS_ICONS.mail     },
    { id: 'terminal', title: 'Terminal',  icon: MACOS_ICONS.terminal },
    { id: 'trash',    title: 'Trash',     icon: MACOS_ICONS.trash    },
  ]

  // Spring physics magnification curve
  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(hoveredIndex - index)
    if (distance === 0) return 1.45
    if (distance === 1) return 1.2
    if (distance === 2) return 1.08
    return 1
  }

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center pointer-events-none select-none">
      <div
        className="pointer-events-auto flex items-end gap-3 px-4 py-2.5 rounded-2xl bg-[#1c1c1e]/65 backdrop-blur-2xl border border-white/[0.16] shadow-2xl shadow-black/80 transition-all duration-200"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {dockApps.map((app, index) => {
          const scale = getScale(index)
          const isOpen = openApps.includes(app.id)
          const isActive = activeApps[activeApps.length - 1] === app.id

          return (
            <div
              key={app.id}
              className="relative flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => onAppClick(app.id)}
            >
              {/* Tooltip on hover */}
              {hoveredIndex === index && (
                <div className="absolute -top-11 px-2.5 py-1 rounded-md bg-[#18181b]/95 border border-white/10 text-white text-[11px] font-medium shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 duration-100 pointer-events-none">
                  {app.title}
                </div>
              )}

              {/* Icon with spring scale — real macOS icon */}
              <div
                style={{
                  transform: `scale(${scale}) translateY(${scale > 1 ? -(scale - 1) * 16 : 0}px)`,
                  transition: 'transform 160ms cubic-bezier(0.2, 0, 0.2, 1)',
                }}
                className="w-12 h-12 flex items-center justify-center origin-bottom active:scale-95"
              >
                <Image
                  src={app.icon}
                  alt={app.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 drop-shadow-xl object-contain"
                  draggable={false}
                  priority
                />
              </div>

              {/* Running indicator dot */}
              <div className="h-1.5 flex items-center justify-center mt-1">
                {isOpen && (
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isActive ? 'bg-[#9fa3fc] shadow-[0_0_6px_#9fa3fc]' : 'bg-white/50'
                    }`}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
