'use client'

import { useEffect, useState } from 'react'

export interface PushNotificationData {
  id: string
  title: string
  subtitle?: string
  body: string
  timestamp?: string
}

export default function PushNotification({
  notification,
  onDismiss,
}: {
  notification: PushNotificationData | null
  onDismiss: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (notification) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onDismiss, 300)
      }, 5500)
      return () => clearTimeout(timer)
    }
  }, [notification, onDismiss])

  if (!notification || !visible) return null

  return (
    <div className="fixed top-9 right-4 z-[9999] max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/[0.16] shadow-2xl shadow-black/80 text-white">
        {/* Mail Icon */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-white/90 uppercase tracking-wide">
              {notification.title}
            </span>
            <span className="text-[10px] text-white/40 font-mono">
              {notification.timestamp || 'now'}
            </span>
          </div>
          {notification.subtitle && (
            <p className="text-xs font-medium text-white mt-0.5">{notification.subtitle}</p>
          )}
          <p className="text-xs text-white/70 mt-0.5 leading-relaxed">{notification.body}</p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            setVisible(false)
            setTimeout(onDismiss, 300)
          }}
          className="text-white/40 hover:text-white text-xs p-1 rounded-full hover:bg-white/10"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
