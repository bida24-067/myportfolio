'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Overview', href: '/#overview' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Ventures', href: '/#ventures' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Attachment', href: '/#attachment' },
  { label: 'Contact', href: '/#contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll detection for navbar blur / border styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    const id = setTimeout(() => setMobileOpen(false), 0)
    return () => clearTimeout(id)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close on Escape key & listen for ⌘D shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault()
        router.push('/os')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen, router])

  // Hide public navbar inside admin dashboard or macOS view
  if (pathname.startsWith('/admin') || pathname.startsWith('/os')) {
    return null
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        mobileOpen
          ? 'h-screen bg-[#121212] flex flex-col'
          : scrolled
          ? 'h-[72px] bg-[#121212]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20'
          : 'h-[72px] bg-[#121212]/60 backdrop-blur-sm border-b border-white/[0.04]'
      }`}
    >
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full h-[72px] px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0">
        {/* Brand / Personal Name (reduced blanc footprint) */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 group py-2"
          aria-label="Loago Montsho Home"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-white group-hover:text-white/90">
              Loago Montsho
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#9fa3fc]/15 text-[#9fa3fc] border border-[#9fa3fc]/30 font-semibold">
              Mov
            </span>
          </div>
          <div className="flex items-center gap-1 border-l border-white/10 pl-2 text-[10px] font-mono text-white/30 group-hover:text-white/50 transition-colors">
            <span>blanc.</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs px-3.5 py-1.5 rounded-full transition-all duration-150 text-white/65 hover:text-white hover:bg-white/[0.06]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action: Launch macOS Mode */}
        <div className="flex items-center gap-3">
          <Link
            href="/os"
            className="inline-flex items-center gap-2 bg-[#9fa3fc]/15 hover:bg-[#9fa3fc]/25 text-[#9fa3fc] hover:text-white border border-[#9fa3fc]/30 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm active:scale-95"
            title="Launch macOS Desktop Experience (⌘D)"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span className="font-medium">macOS Mode</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/10 text-white/80 border border-white/10">
              ⌘D
            </kbd>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden flex-1 flex flex-col justify-between px-6 py-8 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-white/40 font-mono">Navigation</p>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/os"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#9fa3fc]/20 border border-[#9fa3fc]/40 text-[#9fa3fc] font-medium text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Launch macOS Desktop Mode</span>
            </Link>
            <div className="text-xs text-white/40 text-center font-mono">
              loagomov.blancsociety.co.uk · Gaborone, BW
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
