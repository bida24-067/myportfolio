'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import TopMenuBar from './TopMenuBar'
import Dock from './Dock'
import WindowFrame from './WindowFrame'
import SpotlightModal from './SpotlightModal'
import PushNotification, { PushNotificationData } from './PushNotification'
import MobileOSView from './MobileOSView'

// Apps
import FinderApp from './apps/FinderApp'
import SafariApp from './apps/SafariApp'
import AboutApp from './apps/AboutApp'
import NotesApp from './apps/NotesApp'
import MailApp from './apps/MailApp'
import TerminalApp from './apps/TerminalApp'
import TrashApp from './apps/TrashApp'

interface WindowItem {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export default function OSDesktop() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isMobile, setIsMobile] = useState(false)
  const [mobileActiveApp, setMobileActiveApp] = useState<string | null>(null)

  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [spotlightOpen, setSpotlightOpen] = useState(false)
  const [notification, setNotification] = useState<PushNotificationData | null>(null)
  const [safariRepo, setSafariRepo] = useState<string>('knee-osteoarthritis-classifier')
  const [notesTargetId, setNotesTargetId] = useState<string | undefined>(undefined)

  const [highestZ, setHighestZ] = useState(10)
  const [windows, setWindows] = useState<Record<string, WindowItem>>({
    finder: {
      id: 'finder',
      title: 'Finder — Projects & Lakehouses',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2,
      position: { x: 120, y: 70 },
      size: { width: 880, height: 560 },
    },
    safari: {
      id: 'safari',
      title: 'Safari — GitHub Repository Viewer',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 3,
      position: { x: 160, y: 80 },
      size: { width: 920, height: 580 },
    },
    about: {
      id: 'about',
      title: 'About Mov — MovBook Pro Specs',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 300, y: 110 },
      size: { width: 660, height: 420 },
    },
    notes: {
      id: 'notes',
      title: 'Notes — Research & Creative Writing',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 4,
      position: { x: 200, y: 90 },
      size: { width: 840, height: 540 },
    },
    mail: {
      id: 'mail',
      title: 'Mail — Resend Inquiry Dispatch',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      position: { x: 220, y: 100 },
      size: { width: 780, height: 520 },
    },
    terminal: {
      id: 'terminal',
      title: 'Terminal — loago@mov-macbook ~ zsh',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 6,
      position: { x: 240, y: 120 },
      size: { width: 720, height: 440 },
    },
    trash: {
      id: 'trash',
      title: 'Trash — Archived Drafts',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 7,
      position: { x: 260, y: 130 },
      size: { width: 700, height: 460 },
    },
  })

  // Detect query params on load (e.g. /os?app=safari&repo=xauusd-tradeprediction)
  useEffect(() => {
    const app = searchParams.get('app')
    const repo = searchParams.get('repo')
    if (repo) {
      setSafariRepo(repo)
    }
    if (app && windows[app]) {
      openApp(app)
    }
  }, [searchParams])

  // Detect viewport size for mobile layout
  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  // Listen for ⌘D / ⌘K global shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault()
        router.push('/')
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        setSpotlightOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [router])

  // Focus Window
  const focusWindow = useCallback((appId: string) => {
    setHighestZ((prevZ) => {
      const nextZ = prevZ + 1
      setWindows((prev) => ({
        ...prev,
        [appId]: {
          ...prev[appId],
          zIndex: nextZ,
          isMinimized: false,
        },
      }))
      return nextZ
    })
  }, [])

  // Open App
  const openApp = useCallback((appId: string) => {
    if (isMobile) {
      setMobileActiveApp(appId)
      return
    }

    setHighestZ((prevZ) => {
      const nextZ = prevZ + 1
      setWindows((prev) => ({
        ...prev,
        [appId]: {
          ...prev[appId],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      }))
      return nextZ
    })
  }, [isMobile])

  // Open Safari on a specific repo
  const handleOpenSafariRepo = useCallback((repoSlug: string) => {
    setSafariRepo(repoSlug)
    openApp('safari')
  }, [openApp])

  // Select note in notes app
  const handleSelectNote = useCallback((noteId: string) => {
    setNotesTargetId(noteId)
    openApp('notes')
  }, [openApp])

  // Close Window
  const closeWindow = useCallback((appId: string) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isOpen: false,
        isMinimized: false,
      },
    }))
  }, [])

  // Minimize Window
  const minimizeWindow = useCallback((appId: string) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMinimized: true,
      },
    }))
  }, [])

  // Maximize Window
  const toggleMaximize = useCallback((appId: string) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMaximized: !prev[appId].isMaximized,
      },
    }))
  }, [])

  // Active top window title
  const activeWindow = Object.values(windows)
    .filter((w) => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]

  const activeAppTitle = activeWindow ? activeWindow.id.toUpperCase() : 'FINDER'
  const openAppIds = Object.values(windows).filter((w) => w.isOpen).map((w) => w.id)
  const activeAppIds = activeWindow ? [activeWindow.id] : []

  // Mobile Render Fallback
  if (isMobile) {
    return (
      <MobileOSView
        activeAppId={mobileActiveApp}
        onSelectApp={(id) => setMobileActiveApp(id)}
        onExitToStandard={() => router.push('/')}
        onNotification={(n) => setNotification(n)}
      />
    )
  }

  return (
    <div
      className={`fixed inset-0 w-screen h-screen overflow-hidden select-none transition-colors duration-300 ${
        isDarkTheme ? 'bg-[#121212]' : 'bg-[#e2e8f0]'
      }`}
    >
      {/* ── Custom Blanc Society Wallpaper ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle authentic atmospheric background from Blanc assets */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkTheme ? 'opacity-20' : 'opacity-10'}`}>
          <Image
            src="/about-bg.webp"
            alt=""
            fill
            quality={80}
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className={`absolute inset-0 ${isDarkTheme ? 'bg-gradient-to-b from-[#121212]/80 via-[#121212]/50 to-[#121212]' : 'bg-gradient-to-b from-[#f1f5f9]/80 via-[#f1f5f9]/50 to-[#f1f5f9]'}`} />
        </div>
        {/* Ambient radial orbs matching Blanc Society tokens */}
        <div
          className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500 ${
            isDarkTheme ? 'bg-[#6d7cff]/15 opacity-80' : 'bg-[#9fa3fc]/25 opacity-70'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none transition-opacity duration-500 ${
            isDarkTheme ? 'bg-[#9fa3fc]/12 opacity-80' : 'bg-[#6d7cff]/20 opacity-60'
          }`}
        />
        <div
          className={`absolute -bottom-32 left-1/3 w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-500 ${
            isDarkTheme ? 'bg-[#6541dc]/10 opacity-70' : 'bg-[#9fa3fc]/15 opacity-50'
          }`}
        />
        {/* Subtle grid mesh */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ── Top Menu Bar ── */}
      <TopMenuBar
        activeAppTitle={activeAppTitle}
        onOpenApp={openApp}
        onOpenSpotlight={() => setSpotlightOpen(true)}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        isDarkTheme={isDarkTheme}
        onExitToStandard={() => router.push('/')}
      />

      {/* ── Push Notification Banner ── */}
      <PushNotification notification={notification} onDismiss={() => setNotification(null)} />

      {/* ── Spotlight Search Modal (⌘K) ── */}
      <SpotlightModal
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onOpenApp={openApp}
        onOpenSafariRepo={handleOpenSafariRepo}
        onSelectProject={(id) => {
          openApp('finder')
        }}
        onSelectNote={handleSelectNote}
        onExitToStandard={() => router.push('/')}
      />

      {/* ── Window Management Layer ── */}
      <div className="relative w-full h-full pt-7 pb-20 overflow-hidden pointer-events-none">
        {/* 1. Finder */}
        {windows.finder.isOpen && (
          <div className="pointer-events-auto">
            <WindowFrame
              id="finder"
              title={windows.finder.title}
              zIndex={windows.finder.zIndex}
              isMinimized={windows.finder.isMinimized}
              isMaximized={windows.finder.isMaximized}
              initialPosition={windows.finder.position}
              initialSize={windows.finder.size}
              onClose={() => closeWindow('finder')}
              onMinimize={() => minimizeWindow('finder')}
              onMaximize={() => toggleMaximize('finder')}
              onFocus={() => focusWindow('finder')}
            >
              <FinderApp onOpenInSafari={handleOpenSafariRepo} />
            </WindowFrame>
          </div>
        )}

        {/* 2. Safari */}
        {windows.safari.isOpen && (
          <div className="pointer-events-auto">
            <WindowFrame
              id="safari"
              title={windows.safari.title}
              zIndex={windows.safari.zIndex}
              isMinimized={windows.safari.isMinimized}
              isMaximized={windows.safari.isMaximized}
              initialPosition={windows.safari.position}
              initialSize={windows.safari.size}
              onClose={() => closeWindow('safari')}
              onMinimize={() => minimizeWindow('safari')}
              onMaximize={() => toggleMaximize('safari')}
              onFocus={() => focusWindow('safari')}
            >
              <SafariApp initialRepoSlug={safariRepo} />
            </WindowFrame>
          </div>
        )}

        {/* 3. About Mov */}
        {windows.about.isOpen && (
          <div className="pointer-events-auto">
            <WindowFrame
              id="about"
              title={windows.about.title}
              zIndex={windows.about.zIndex}
              isMinimized={windows.about.isMinimized}
              isMaximized={windows.about.isMaximized}
              initialPosition={windows.about.position}
              initialSize={windows.about.size}
              onClose={() => closeWindow('about')}
              onMinimize={() => minimizeWindow('about')}
              onMaximize={() => toggleMaximize('about')}
              onFocus={() => focusWindow('about')}
            >
              <AboutApp
                onOpenFinder={() => openApp('finder')}
                onOpenMail={() => openApp('mail')}
              />
            </WindowFrame>
          </div>
        )}

        {/* 4. Notes */}
        {windows.notes.isOpen && (
          <div className="pointer-events-auto">
            <WindowFrame
              id="notes"
              title={windows.notes.title}
              zIndex={windows.notes.zIndex}
              isMinimized={windows.notes.isMinimized}
              isMaximized={windows.notes.isMaximized}
              initialPosition={windows.notes.position}
              initialSize={windows.notes.size}
              onClose={() => closeWindow('notes')}
              onMinimize={() => minimizeWindow('notes')}
              onMaximize={() => toggleMaximize('notes')}
              onFocus={() => focusWindow('notes')}
            >
              <NotesApp initialNoteId={notesTargetId} />
            </WindowFrame>
          </div>
        )}

        {/* 5. Mail */}
        {windows.mail.isOpen && (
          <div className="pointer-events-auto">
            <WindowFrame
              id="mail"
              title={windows.mail.title}
              zIndex={windows.mail.zIndex}
              isMinimized={windows.mail.isMinimized}
              isMaximized={windows.mail.isMaximized}
              initialPosition={windows.mail.position}
              initialSize={windows.mail.size}
              onClose={() => closeWindow('mail')}
              onMinimize={() => minimizeWindow('mail')}
              onMaximize={() => toggleMaximize('mail')}
              onFocus={() => focusWindow('mail')}
            >
              <MailApp onNotification={(notif) => setNotification(notif)} />
            </WindowFrame>
          </div>
        )}

        {/* 6. Terminal */}
        {windows.terminal.isOpen && (
          <div className="pointer-events-auto">
            <WindowFrame
              id="terminal"
              title={windows.terminal.title}
              zIndex={windows.terminal.zIndex}
              isMinimized={windows.terminal.isMinimized}
              isMaximized={windows.terminal.isMaximized}
              initialPosition={windows.terminal.position}
              initialSize={windows.terminal.size}
              onClose={() => closeWindow('terminal')}
              onMinimize={() => minimizeWindow('terminal')}
              onMaximize={() => toggleMaximize('terminal')}
              onFocus={() => focusWindow('terminal')}
            >
              <TerminalApp
                onOpenApp={openApp}
                onOpenSafariRepo={handleOpenSafariRepo}
                onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
                onExitToStandard={() => router.push('/')}
              />
            </WindowFrame>
          </div>
        )}

        {/* 7. Trash */}
        {windows.trash.isOpen && (
          <div className="pointer-events-auto">
            <WindowFrame
              id="trash"
              title={windows.trash.title}
              zIndex={windows.trash.zIndex}
              isMinimized={windows.trash.isMinimized}
              isMaximized={windows.trash.isMaximized}
              initialPosition={windows.trash.position}
              initialSize={windows.trash.size}
              onClose={() => closeWindow('trash')}
              onMinimize={() => minimizeWindow('trash')}
              onMaximize={() => toggleMaximize('trash')}
              onFocus={() => focusWindow('trash')}
            >
              <TrashApp />
            </WindowFrame>
          </div>
        )}
      </div>

      {/* ── Bottom Dock ── */}
      <Dock
        activeApps={activeAppIds}
        openApps={openAppIds}
        onAppClick={(appId) => {
          if (windows[appId]?.isOpen && !windows[appId]?.isMinimized) {
            focusWindow(appId)
          } else {
            openApp(appId)
          }
        }}
      />
    </div>
  )
}
