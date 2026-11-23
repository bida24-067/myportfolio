'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export interface WindowState {
  id: string
  title: string
  icon?: React.ReactNode
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export default function WindowFrame({
  id,
  title,
  zIndex,
  isMinimized,
  isMaximized,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 850, height: 560 },
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}: {
  id: string
  title: string
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  children: React.ReactNode
}) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const isDraggingRef = useRef(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return
    onFocus()
    isDraggingRef.current = true
    dragOffsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
  }, [isMaximized, onFocus, position.x, position.y])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      const newX = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - dragOffsetRef.current.x))
      const newY = Math.max(30, Math.min(window.innerHeight - 80, e.clientY - dragOffsetRef.current.y))
      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  if (isMinimized) return null

  return (
    <div
      style={{
        zIndex,
        ...(isMaximized
          ? { top: '28px', left: 0, right: 0, bottom: '68px', width: '100%', height: 'calc(100% - 96px)' }
          : {
              top: `${position.y}px`,
              left: `${position.x}px`,
              width: `${size.width}px`,
              height: `${size.height}px`,
            }),
      }}
      onClick={onFocus}
      className={`fixed flex flex-col rounded-xl overflow-hidden bg-[#18181a]/95 backdrop-blur-2xl border border-white/[0.14] shadow-2xl shadow-black/80 transition-shadow duration-150 ${
        isMaximized ? 'rounded-none border-x-0' : ''
      }`}
    >
      {/* Title Bar / Traffic Lights */}
      <div
        onMouseDown={handleMouseDown}
        className="h-10 bg-[#1e1e20]/90 border-b border-white/[0.08] flex items-center justify-between px-3.5 select-none shrink-0 cursor-default"
      >
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            title="Close"
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center text-[8px] text-black/60 group cursor-pointer"
          >
            <span className="opacity-0 group-hover:opacity-100">✕</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            title="Minimize"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center text-[8px] text-black/60 group cursor-pointer"
          >
            <span className="opacity-0 group-hover:opacity-100">−</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
            title={isMaximized ? 'Restore' : 'Maximize'}
            className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center text-[8px] text-black/60 group cursor-pointer"
          >
            <span className="opacity-0 group-hover:opacity-100">⤢</span>
          </button>
        </div>

        {/* Centered Title */}
        <div className="text-xs font-medium text-white/80 truncate max-w-[50%]">
          {title}
        </div>

        {/* Right dummy space to balance title */}
        <div className="w-14 flex justify-end text-[10px] text-white/30 font-mono">
          <span>{id}</span>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto relative text-white">
        {children}
      </div>
    </div>
  )
}
