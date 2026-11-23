'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ModeSwitchToast() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Show after a brief 1.2s delay for a subtle, high-craft entrance
    const timer = setTimeout(() => {
      const hasDismissed = sessionStorage.getItem('mov_dismiss_os_toast')
      if (!hasDismissed) {
        setVisible(true)
      }
    }, 1200)

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault()
        router.push('/os')
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [router])

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem('mov_dismiss_os_toast', 'true')
  }

  const handleLaunch = () => {
    router.push('/os')
  }

  if (!visible || dismissed) return null

  return (
    <div
      role="region"
      aria-label="macOS Mode Invitation"
      className="fixed bottom-6 right-6 z-40 max-w-sm sm:max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div
        onClick={handleLaunch}
        className="group relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#181818]/90 backdrop-blur-xl border border-white/[0.12] hover:border-[#9fa3fc]/40 shadow-2xl shadow-black/60 cursor-pointer transition-all hover:scale-[1.01]"
      >
        {/* macOS desktop mini icon */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9fa3fc]/20 via-[#6d7cff]/20 to-[#6541dc]/30 border border-[#9fa3fc]/30 flex items-center justify-center shrink-0 text-[#9fa3fc] group-hover:scale-105 transition-transform">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#9fa3fc]">
              Interactive Mode
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-white/95 leading-tight truncate">
            Want a closer look? Launch Desktop View
          </p>
          <p className="text-[11px] text-white/50 mt-0.5">
            Experience Mov&apos;s Finder, live Terminal, and Safari GitHub viewer
          </p>
        </div>

        {/* Action badge & close */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-white/[0.08] border border-white/[0.1] text-[10px] font-mono text-white/80 group-hover:bg-[#9fa3fc]/20 group-hover:text-white transition-colors">
            ⌘D
          </span>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss toast"
            className="w-6 h-6 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
