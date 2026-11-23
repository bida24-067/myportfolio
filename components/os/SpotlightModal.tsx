'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { portfolioData } from '@/src/data/portfolio'

export interface SpotlightItem {
  id: string
  title: string
  subtitle: string
  category: 'App' | 'Project' | 'Venture' | 'Note' | 'Action'
  action: () => void
}

export default function SpotlightModal({
  isOpen,
  onClose,
  onOpenApp,
  onOpenSafariRepo,
  onSelectProject,
  onSelectNote,
  onExitToStandard,
}: {
  isOpen: boolean
  onClose: () => void
  onOpenApp: (appId: string) => void
  onOpenSafariRepo: (repoSlug: string) => void
  onSelectProject: (projectId: string) => void
  onSelectNote: (noteId: string) => void
  onExitToStandard: () => void
}) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Build searchable index from portfolioData
  const allItems: SpotlightItem[] = useMemo(() => {
    const list: SpotlightItem[] = [
      // Applications
      {
        id: 'app-finder',
        title: 'Finder',
        subtitle: 'Browse all Projects, Lakehouses, and Ventures',
        category: 'App',
        action: () => {
          onOpenApp('finder')
          onClose()
        },
      },
      {
        id: 'app-safari',
        title: 'Safari',
        subtitle: 'In-OS Browser & GitHub Repository Code Viewer',
        category: 'App',
        action: () => {
          onOpenApp('safari')
          onClose()
        },
      },
      {
        id: 'app-about',
        title: 'About Mov',
        subtitle: 'System specifications, BAC degree, and Lean Six Sigma credentials',
        category: 'App',
        action: () => {
          onOpenApp('about')
          onClose()
        },
      },
      {
        id: 'app-notes',
        title: 'Notes',
        subtitle: 'Technical research, architecture notes & creative poetry',
        category: 'App',
        action: () => {
          onOpenApp('notes')
          onClose()
        },
      },
      {
        id: 'app-mail',
        title: 'Mail',
        subtitle: 'Compose message to Loago Montsho via Resend',
        category: 'App',
        action: () => {
          onOpenApp('mail')
          onClose()
        },
      },
      {
        id: 'app-terminal',
        title: 'Terminal',
        subtitle: 'Interactive zsh CLI shell (whoami, skills, ls projects)',
        category: 'App',
        action: () => {
          onOpenApp('terminal')
          onClose()
        },
      },
      {
        id: 'app-trash',
        title: 'Trash',
        subtitle: 'Archived drafts and humorous easter eggs',
        category: 'App',
        action: () => {
          onOpenApp('trash')
          onClose()
        },
      },
      // Actions
      {
        id: 'act-exit',
        title: 'Exit to Standard View',
        subtitle: 'Return to editorial portfolio view (⌘D)',
        category: 'Action',
        action: () => {
          onExitToStandard()
          onClose()
        },
      },
    ]

    // Projects
    portfolioData.projects.forEach((p) => {
      list.push({
        id: `p-${p.id}`,
        title: p.title,
        subtitle: `${p.category} · ${p.tags.slice(0, 3).join(', ')}`,
        category: 'Project',
        action: () => {
          if (p.repoSlug) {
            onOpenSafariRepo(p.repoSlug)
          } else {
            onSelectProject(p.id)
          }
          onClose()
        },
      })
    })

    // Ventures
    portfolioData.ventures.forEach((v) => {
      list.push({
        id: `v-${v.id}`,
        title: v.title,
        subtitle: `${v.role} · ${v.category}`,
        category: 'Venture',
        action: () => {
          onSelectProject(v.id)
          onClose()
        },
      })
    })

    // Notes
    portfolioData.notes.forEach((n) => {
      list.push({
        id: `n-${n.id}`,
        title: n.title,
        subtitle: `${n.folder === 'technical' ? 'Technical Note' : 'Creative Writing'} · ${n.readTime}`,
        category: 'Note',
        action: () => {
          onSelectNote(n.id)
          onClose()
        },
      })
    })

    return list
  }, [onOpenApp, onOpenSafariRepo, onSelectProject, onSelectNote, onExitToStandard, onClose])

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8)
    const q = query.toLowerCase()
    return allItems
      .filter((item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q))
      .slice(0, 10)
  }, [allItems, query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action()
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl mx-4 rounded-2xl bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/[0.18] shadow-2xl shadow-black/80 overflow-hidden text-white animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <svg className="w-5 h-5 text-white/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Spotlight Search (projects, skills, notes, repos, commands)..."
            className="w-full bg-transparent text-base text-white placeholder-white/40 focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-white/40 rounded bg-white/5 border border-white/10">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-white/40">No matching items found</div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-4 py-2.5 mx-2 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#9fa3fc]/20 text-white' : 'text-white/80 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                        item.category === 'App'
                          ? 'bg-blue-500/20 text-blue-400'
                          : item.category === 'Project'
                          ? 'bg-purple-500/20 text-purple-400'
                          : item.category === 'Note'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {item.category}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{item.title}</div>
                      <div className="text-xs text-white/40 truncate">{item.subtitle}</div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono text-[#9fa3fc] shrink-0">⏎ open</span>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 text-[10px] text-white/40 font-mono bg-white/[0.02]">
          <span>Use ↑↓ to navigate</span>
          <span>Press ⏎ to select</span>
        </div>
      </div>
    </div>
  )
}
