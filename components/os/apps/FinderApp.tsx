'use client'

import { useState } from 'react'
import { portfolioData, Project } from '@/src/data/portfolio'

export default function FinderApp({
  onOpenInSafari,
}: {
  onOpenInSafari: (repoSlug: string) => void
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(portfolioData.projects[0])
  const [quickLookOpen, setQuickLookOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')

  const categories = [
    { id: 'All', label: 'All Projects', count: portfolioData.projects.length },
    { id: 'Data & ML', label: 'Data & ML Systems', count: portfolioData.projects.filter((p) => p.category === 'Data & ML').length },
    { id: 'Web & Product', label: 'Web & Products', count: portfolioData.projects.filter((p) => p.category === 'Web & Product').length },
    { id: 'Academic', label: 'Academic & Labs', count: portfolioData.projects.filter((p) => p.category === 'Academic').length },
  ]

  const popularTags = ['Databricks', 'PySpark', 'Delta Lake', 'Next.js', 'PyTorch', 'CRISP-DM', 'SQL Server']

  const filteredProjects = portfolioData.projects.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false
    if (selectedTag && !p.tags.includes(selectedTag)) return false
    return true
  })

  return (
    <div className="flex h-full bg-[#18181a] text-white select-none overflow-hidden">
      {/* ── 1. Finder Left Sidebar ── */}
      <div className="w-48 sm:w-52 bg-[#141416]/95 border-r border-white/[0.08] p-3 flex flex-col justify-between shrink-0 text-xs">
        <div className="space-y-4">
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-white/40 px-2 mb-1.5 font-semibold">
              Favorites
            </p>
            <ul className="space-y-0.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id)
                      setSelectedTag(null)
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                      selectedCategory === cat.id && !selectedTag
                        ? 'bg-[#9fa3fc]/20 text-white font-medium'
                        : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <span className="truncate">{cat.label}</span>
                    <span className="text-[10px] text-white/40 font-mono">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-white/40 px-2 mb-1.5 font-semibold">
              Tags &amp; Stack
            </p>
            <ul className="space-y-0.5">
              {popularTags.map((tag) => (
                <li key={tag}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTag(selectedTag === tag ? null : tag)
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                      selectedTag === tag
                        ? 'bg-[#9fa3fc]/20 text-white font-medium'
                        : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        tag.includes('Spark') || tag.includes('Delta')
                          ? 'bg-blue-400'
                          : tag.includes('Next')
                          ? 'bg-emerald-400'
                          : 'bg-purple-400'
                      }`}
                    />
                    <span className="truncate">{tag}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick specs pill */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] text-white/50">
          <p className="font-semibold text-white/80">Lakehouse Cluster</p>
          <p className="text-[10px] text-emerald-400 font-mono mt-0.5 truncate">● Connected · Gaborone</p>
        </div>
      </div>

      {/* ── 2. Main Files / Projects Area ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#161618] overflow-hidden">
        {/* Finder Toolbar */}
        <div className="h-10 border-b border-white/[0.06] flex items-center justify-between px-3.5 text-xs text-white/60 bg-[#171719] shrink-0 gap-2">
          {/* Item count & active filter */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-[11px] text-white/70">{filteredProjects.length} items</span>
            {selectedTag && (
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="px-2 py-0.5 rounded-full bg-[#9fa3fc]/20 text-[#9fa3fc] text-[10px] font-mono hover:bg-[#9fa3fc]/30 flex items-center gap-1 shrink-0"
              >
                <span>{selectedTag}</span>
                <span>✕</span>
              </button>
            )}
          </div>

          {/* View Mode Segmented Switcher & Quick Look Button */}
          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                title="Card View"
                className={`px-2 py-1 rounded text-[11px] transition-colors flex items-center gap-1 ${
                  viewMode === 'cards'
                    ? 'bg-white/15 text-white font-medium shadow-sm'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                <span className="hidden sm:inline">Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('list')}
                title="List View"
                className={`px-2 py-1 rounded text-[11px] transition-colors flex items-center gap-1 ${
                  viewMode === 'list'
                    ? 'bg-white/15 text-white font-medium shadow-sm'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <span className="hidden sm:inline">List</span>
              </button>
            </div>

            {/* Quick Look Toggle Button */}
            <button
              type="button"
              onClick={() => setQuickLookOpen(!quickLookOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border ${
                quickLookOpen
                  ? 'bg-[#9fa3fc]/20 border-[#9fa3fc]/40 text-[#9fa3fc]'
                  : 'bg-white/[0.05] border-white/[0.08] hover:bg-white/[0.1] text-white/80'
              }`}
            >
              <span>Quick Look</span>
              <kbd className="hidden sm:inline-block text-[9px] font-mono px-1 rounded bg-black/40 text-white/50">Space</kbd>
            </button>
          </div>
        </div>

        {/* ── Files Body (Cards or List View) ── */}
        <div className="flex-1 overflow-y-auto p-3.5">
          {viewMode === 'cards' ? (
            /* Card View: Dynamically 1-col when QuickLook is open, 2-col when closed */
            <div
              className={`grid gap-3.5 min-w-0 ${
                quickLookOpen
                  ? 'grid-cols-1'
                  : 'grid-cols-1 md:grid-cols-2'
              }`}
            >
              {filteredProjects.map((p) => {
                const isSelected = activeProject?.id === p.id
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setActiveProject(p)
                      setQuickLookOpen(true)
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between overflow-hidden min-w-0 ${
                      isSelected
                        ? 'bg-[#9fa3fc]/15 border-[#9fa3fc]/40 shadow-xl ring-1 ring-[#9fa3fc]/30'
                        : 'bg-[#1a1a1d] border-white/[0.06] hover:border-white/[0.14] hover:bg-[#1f1f23]'
                    }`}
                  >
                    {/* Top Row: Icon + Category Badge */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2 min-w-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polygon points="12 2 2 7 12 12 22 7 12 2" />
                              <polyline points="2 17 12 22 22 17" />
                              <polyline points="2 12 12 17 22 12" />
                            </svg>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.05] text-white/60 truncate">
                            {p.category}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded shrink-0">
                          {p.stage === 'Flagship & Production' ? 'Flagship' : p.stage === 'Active R&D' ? 'R&D' : 'Academic'}
                        </span>
                      </div>

                      {/* Clean 2-line Wrapping Title (never overflows!) */}
                      <h4 className="text-sm font-semibold text-white leading-snug line-clamp-2 break-words mb-1">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-[#9fa3fc] font-mono truncate mb-2.5">
                        {p.subtitle}
                      </p>

                      {/* 2-line Description */}
                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-3">
                        {p.description}
                      </p>

                      {/* Metrics Badges if present */}
                      {p.metrics && p.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-1.5 p-2 rounded-lg bg-black/40 border border-white/[0.04] mb-3 overflow-hidden">
                          {p.metrics.slice(0, 2).map((m) => (
                            <div key={m.label} className="min-w-0">
                              <div className="text-[9px] uppercase font-mono text-white/40 truncate">{m.label}</div>
                              <div className="text-xs font-semibold text-white truncate">{m.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer: Contained Stack Tags & Action */}
                    <div className="pt-2.5 border-t border-white/[0.05] flex items-center justify-between gap-2 text-[10px] min-w-0">
                      {/* Left tags with strict containment */}
                      <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                        {p.tags.slice(0, 2).map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded bg-white/[0.04] text-white/50 truncate font-mono">
                            {t}
                          </span>
                        ))}
                        {p.tags.length > 2 && (
                          <span className="text-[9px] text-white/40 font-mono shrink-0">
                            +{p.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Right action button */}
                      {p.repoSlug && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (p.repoSlug) onOpenInSafari(p.repoSlug)
                          }}
                          className="text-[#9fa3fc] hover:underline font-medium shrink-0 flex items-center gap-1"
                        >
                          <span>Safari</span>
                          <span>→</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* List View: Authentic macOS Finder Table (Compact & Clean) */
            <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#1a1a1d]">
              <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-white/[0.03] border-b border-white/[0.06] text-[10px] font-mono text-white/40 uppercase">
                <span className="col-span-6 sm:col-span-5">Name</span>
                <span className="col-span-3 sm:col-span-3">Domain</span>
                <span className="hidden sm:inline sm:col-span-2">Stack</span>
                <span className="col-span-3 sm:col-span-2 text-right">Action</span>
              </div>

              <div className="divide-y divide-white/[0.04] text-xs">
                {filteredProjects.map((p) => {
                  const isSelected = activeProject?.id === p.id
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setActiveProject(p)
                        setQuickLookOpen(true)
                      }}
                      className={`grid grid-cols-12 gap-2 px-3 py-2.5 items-center cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#9fa3fc]/15 text-white' : 'hover:bg-white/[0.03] text-white/80'
                      }`}
                    >
                      <div className="col-span-6 sm:col-span-5 flex items-center gap-2 min-w-0">
                        <span className="text-base shrink-0">📦</span>
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate text-xs">{p.title}</p>
                          <p className="text-[10px] text-white/40 font-mono truncate">{p.subtitle}</p>
                        </div>
                      </div>

                      <div className="col-span-3 sm:col-span-3 text-[11px] text-white/60 truncate">
                        {p.category}
                      </div>

                      <div className="hidden sm:inline sm:col-span-2 text-[10px] font-mono text-white/50 truncate">
                        {p.tags.slice(0, 2).join(', ')}
                      </div>

                      <div className="col-span-3 sm:col-span-2 text-right shrink-0">
                        {p.repoSlug ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (p.repoSlug) onOpenInSafari(p.repoSlug)
                            }}
                            className="text-[#9fa3fc] hover:underline font-mono text-[11px]"
                          >
                            Safari →
                          </button>
                        ) : (
                          <span className="text-white/30 text-[10px]">Internal</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 3. Quick Look Slide-in Preview Pane (Strictly Contained) ── */}
      {quickLookOpen && activeProject && (
        <div className="w-80 max-w-full bg-[#1a1a1c] border-l border-white/[0.08] p-5 flex flex-col justify-between shrink-0 overflow-y-auto animate-in slide-in-from-right duration-150">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase text-[#9fa3fc] font-semibold">
                Quick Look Preview
              </span>
              <button
                type="button"
                onClick={() => setQuickLookOpen(false)}
                className="text-white/40 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="text-base font-semibold text-white leading-snug break-words">
                {activeProject.title}
              </h3>
              <p className="text-xs text-[#9fa3fc] font-mono mt-0.5 break-words">
                {activeProject.subtitle}
              </p>
            </div>

            {/* Description Box */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-white/70 leading-relaxed break-words">
              {activeProject.description}
            </div>

            {/* Architecture Pipeline */}
            {activeProject.architecture && (
              <div>
                <p className="text-[10px] uppercase font-mono text-white/40 mb-1.5 font-semibold">
                  Architecture Pipeline
                </p>
                <div className="p-3 rounded-xl bg-[#121214] border border-white/[0.06] font-mono text-[11px] text-[#9fa3fc] leading-normal break-words">
                  {activeProject.architecture}
                </div>
              </div>
            )}

            {/* Performance Metrics */}
            {activeProject.metrics && activeProject.metrics.length > 0 && (
              <div>
                <p className="text-[10px] uppercase font-mono text-white/40 mb-1.5 font-semibold">
                  Performance Metrics
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {activeProject.metrics.map((m) => (
                    <div key={m.label} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] min-w-0">
                      <div className="text-[9px] uppercase font-mono text-white/40 truncate">{m.label}</div>
                      <div className="text-sm font-semibold text-white mt-0.5 truncate">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details Bullets */}
            <div>
              <p className="text-[10px] uppercase font-mono text-white/40 mb-1.5 font-semibold">
                Technical Highlights
              </p>
              <ul className="space-y-1.5">
                {activeProject.details.map((d, i) => (
                  <li key={i} className="text-xs text-white/65 flex items-start gap-2 break-words leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9fa3fc] mt-1.5 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 mt-6 border-t border-white/[0.08] space-y-2 shrink-0">
            {activeProject.repoSlug && (
              <button
                type="button"
                onClick={() => {
                  if (activeProject.repoSlug) onOpenInSafari(activeProject.repoSlug)
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#9fa3fc] text-black font-semibold text-xs hover:bg-[#9fa3fc]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Inspect in Safari Browser</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </button>
            )}

            {activeProject.liveUrl && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Launch External Demo ↗</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
