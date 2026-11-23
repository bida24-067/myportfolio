'use client'

import { useState, useEffect } from 'react'

export default function TopMenuBar({
  activeAppTitle,
  onOpenApp,
  onOpenSpotlight,
  onToggleTheme,
  isDarkTheme,
  onExitToStandard,
}: {
  activeAppTitle: string
  onOpenApp: (appId: string) => void
  onOpenSpotlight: () => void
  onToggleTheme: () => void
  isDarkTheme: boolean
  onExitToStandard: () => void
}) {
  const [appleMenuOpen, setAppleMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [catTime, setCatTime] = useState('')

  // Live CAT (Gaborone) Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Format in Central Africa Time (CAT - Gaborone UTC+2)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Gaborone',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }
      setCatTime(now.toLocaleString('en-GB', options).replace(',', ''))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Close menus on outside click
  useEffect(() => {
    const onWindowClick = () => {
      setAppleMenuOpen(false)
      setActiveDropdown(null)
    }
    window.addEventListener('click', onWindowClick)
    return () => window.removeEventListener('click', onWindowClick)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 h-7 z-50 bg-[#121212]/80 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between px-3 text-xs select-none font-sans text-white/90 shadow-sm">
      {/* Left side: Brand mark, Active App, Menus */}
      <div className="flex items-center gap-4">
        {/* Apple/Mov Brand Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setAppleMenuOpen(!appleMenuOpen)
              setActiveDropdown(null)
            }}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 font-semibold text-white tracking-wide transition-colors"
          >
            <span className="text-white font-bold tracking-tight">Mov</span>
            <span className="text-[9px] uppercase font-mono px-1 py-0.5 rounded bg-[#9fa3fc]/15 text-[#9fa3fc] font-medium">
              OS
            </span>
          </button>

          {appleMenuOpen && (
            <div
              className="absolute top-7 left-0 w-56 rounded-xl bg-[#1c1c1e]/95 backdrop-blur-2xl border border-white/[0.16] shadow-2xl py-1.5 z-50 text-white/90 text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  onOpenApp('about')
                  setAppleMenuOpen(false)
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20 hover:text-white flex items-center justify-between"
              >
                <span>About Mov</span>
                <span className="text-[10px] text-white/40">Hardware Specs</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onOpenApp('finder')
                  setAppleMenuOpen(false)
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20 hover:text-white"
              >
                Open Finder (Projects)
              </button>

              <div className="my-1 border-t border-white/10" />

              <button
                type="button"
                onClick={() => {
                  onOpenSpotlight()
                  setAppleMenuOpen(false)
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20 hover:text-white flex items-center justify-between"
              >
                <span>Spotlight Search</span>
                <span className="text-[10px] font-mono text-white/40">⌘K</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onToggleTheme()
                  setAppleMenuOpen(false)
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20 hover:text-white flex items-center justify-between"
              >
                <span>Toggle Desktop Theme</span>
                <span className="text-[10px] font-mono text-white/40">{isDarkTheme ? 'Dark' : 'Light'}</span>
              </button>

              <div className="my-1 border-t border-white/10" />

              <button
                type="button"
                onClick={() => {
                  setAppleMenuOpen(false)
                  onExitToStandard()
                }}
                className="w-full text-left px-3 py-1.5 text-amber-300 hover:bg-amber-500/20 flex items-center justify-between font-medium"
              >
                <span>Return to Standard View</span>
                <span className="text-[10px] font-mono">⌘D</span>
              </button>
            </div>
          )}
        </div>

        {/* Active App Title */}
        <span className="font-semibold text-white tracking-tight">{activeAppTitle}</span>

        {/* Standard App Menus */}
        <div className="hidden md:flex items-center gap-1 text-white/70">
          {['File', 'Edit', 'View', 'Window', 'Help'].map((menu) => (
            <div key={menu} className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveDropdown(activeDropdown === menu ? null : menu)
                  setAppleMenuOpen(false)
                }}
                className="px-2 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors"
              >
                {menu}
              </button>

              {activeDropdown === menu && (
                <div
                  className="absolute top-7 left-0 w-48 rounded-xl bg-[#1c1c1e]/95 backdrop-blur-2xl border border-white/[0.16] shadow-2xl py-1.5 z-50 text-white/90 text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  {menu === 'File' && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onOpenApp('finder')
                          setActiveDropdown(null)
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20"
                      >
                        New Finder Window
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onOpenApp('terminal')
                          setActiveDropdown(null)
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20"
                      >
                        New Terminal Shell
                      </button>
                      <div className="my-1 border-t border-white/10" />
                      <button
                        type="button"
                        onClick={() => {
                          setActiveDropdown(null)
                          onExitToStandard()
                        }}
                        className="w-full text-left px-3 py-1.5 text-amber-300 hover:bg-amber-500/20"
                      >
                        Exit OS (⌘D)
                      </button>
                    </>
                  )}
                  {menu === 'Edit' && (
                    <>
                      <div className="px-3 py-1 text-[10px] uppercase font-mono text-white/40">Clipboard</div>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20 text-white/70">Undo ⌘Z</button>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20 text-white/70">Redo ⇧⌘Z</button>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20 text-white/70">Copy ⌘C</button>
                    </>
                  )}
                  {menu === 'View' && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onToggleTheme()
                          setActiveDropdown(null)
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20"
                      >
                        Switch Wallpaper ({isDarkTheme ? 'Dark Mode' : 'Light Mode'})
                      </button>
                    </>
                  )}
                  {menu === 'Window' && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onOpenApp('finder')
                          setActiveDropdown(null)
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#9fa3fc]/20"
                      >
                        Bring Projects to Front
                      </button>
                    </>
                  )}
                  {menu === 'Help' && (
                    <div className="px-3 py-2 space-y-1 text-[11px] text-white/70">
                      <p><strong className="text-white">⌘D:</strong> Toggle Standard View</p>
                      <p><strong className="text-white">⌘K:</strong> Spotlight Search</p>
                      <p><strong className="text-white">Space:</strong> Finder Quick Look</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Theme, Spotlight, Clock, Exit */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title={`Switch to ${isDarkTheme ? 'Light' : 'Dark'} wallpaper theme`}
        >
          {isDarkTheme ? (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Spotlight Trigger */}
        <button
          type="button"
          onClick={onOpenSpotlight}
          className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title="Spotlight Search (⌘K)"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Local Clock (CAT - Gaborone) */}
        <div className="flex items-center gap-1.5 px-1 font-mono text-[11px] text-white/80">
          <span>{catTime || 'CAT'}</span>
          <span className="text-[9px] uppercase px-1 rounded bg-white/10 text-white/60">CAT</span>
        </div>

        {/* Exit to Standard View Button */}
        <button
          type="button"
          onClick={onExitToStandard}
          className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/90 text-[11px] font-medium transition-all"
        >
          <span>Standard View</span>
          <kbd className="text-[9px] font-mono text-white/50">⌘D</kbd>
        </button>
      </div>
    </header>
  )
}
