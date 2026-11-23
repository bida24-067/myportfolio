'use client'

import { usePathname } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isOS = pathname.startsWith('/os')

  if (isOS) {
    return (
      <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#121212] select-none">
        {children}
      </main>
    )
  }

  return (
    <>
      <Nav />
      <main className="flex-1 flex flex-col pt-[72px]">{children}</main>
      <Footer />
    </>
  )
}
