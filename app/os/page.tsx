import { Suspense } from 'react'
import type { Metadata } from 'next'
import OSDesktop from '@/components/os/OSDesktop'

export const metadata: Metadata = {
  title: 'macOS Interactive Mode | Loago Montsho (Mov)',
  description:
    'Experience an interactive macOS desktop environment built with Blanc Society visual DNA. Features Finder, live Safari GitHub code viewer, Terminal CLI, and Notes.',
}

export default function OSPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-[#121212] flex items-center justify-center text-white/50 font-mono text-xs">
          Loading BlancOS...
        </div>
      }
    >
      <OSDesktop />
    </Suspense>
  )
}
