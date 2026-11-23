'use client'

import { useState, useEffect } from 'react'
import { portfolioData, GitHubRepoData, RepoTreeItem } from '@/src/data/portfolio'

export interface SafariTab {
  id: string
  title: string
  url: string
  repoSlug?: string
  isExternal?: boolean
}

export default function SafariApp({
  initialRepoSlug,
}: {
  initialRepoSlug?: string
}) {
  const defaultTab: SafariTab = {
    id: 'tab-knee',
    title: 'knee-osteoarthritis-classifier',
    url: 'github.com/bida24-067/knee-osteoarthritis-classifier',
    repoSlug: initialRepoSlug || 'knee-osteoarthritis-classifier',
  }

  const [tabs, setTabs] = useState<SafariTab[]>([defaultTab])
  const [activeTabId, setActiveTabId] = useState<string>(defaultTab.id)
  const [repoData, setRepoData] = useState<Record<string, GitHubRepoData>>({})
  const [loading, setLoading] = useState(false)
  const [activeFile, setActiveFile] = useState<RepoTreeItem | null>(null)
  const [activeView, setActiveView] = useState<'readme' | 'code'>('readme')

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0]

  // When initialRepoSlug changes from outside, open or switch to it
  useEffect(() => {
    if (initialRepoSlug) {
      setTabs((prev) => {
        const existing = prev.find((t) => t.repoSlug === initialRepoSlug)
        if (existing) {
          setActiveTabId(existing.id)
          return prev
        }
        const newTab: SafariTab = {
          id: `tab-${Date.now()}`,
          title: initialRepoSlug,
          url: `github.com/bida24-067/${initialRepoSlug}`,
          repoSlug: initialRepoSlug,
        }
        setActiveTabId(newTab.id)
        return [...prev, newTab]
      })
    }
  }, [initialRepoSlug])

  // Fetch repository data (via edge /api/github route with fallback)
  useEffect(() => {
    const slug = activeTab.repoSlug
    if (!slug) return

    if (repoData[slug]) {
      // Already cached
      return
    }

    setLoading(true)
    fetch(`/api/github?repo=${slug}`)
      .then((res) => res.json())
      .then((data: GitHubRepoData) => {
        setRepoData((prev) => ({ ...prev, [slug]: data }))
        setLoading(false)
      })
      .catch((err) => {
        console.warn('Failed to fetch github data, using curated local data', err)
        const local = portfolioData.repos[slug]
        if (local) {
          setRepoData((prev) => ({ ...prev, [slug]: local }))
        }
        setLoading(false)
      })
  }, [activeTab.repoSlug, repoData])

  const currentRepo = activeTab.repoSlug ? repoData[activeTab.repoSlug] || portfolioData.repos[activeTab.repoSlug] : null

  // Switch tabs
  const handleSelectTab = (tabId: string) => {
    setActiveTabId(tabId)
    setActiveFile(null)
    setActiveView('readme')
  }

  // Close tab
  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation()
    if (tabs.length === 1) return // keep at least 1 tab
    const nextTabs = tabs.filter((t) => t.id !== tabId)
    setTabs(nextTabs)
    if (activeTabId === tabId) {
      setActiveTabId(nextTabs[0].id)
    }
  }

  // Open new tab with available repos
  const handleNewTab = () => {
    const availableSlugs = Object.keys(portfolioData.repos)
    const nextSlug = availableSlugs.find((s) => !tabs.some((t) => t.repoSlug === s)) || 'xauusd-tradeprediction'
    const newTab: SafariTab = {
      id: `tab-${Date.now()}`,
      title: nextSlug,
      url: `github.com/bida24-067/${nextSlug}`,
      repoSlug: nextSlug,
    }
    setTabs((prev) => [...prev, newTab])
    setActiveTabId(newTab.id)
    setActiveFile(null)
    setActiveView('readme')
  }

  return (
    <div className="flex flex-col h-full bg-[#18181a] text-white select-none">
      {/* ── 1. Tab Bar ── */}
      <div className="h-9 bg-[#141416] border-b border-white/[0.08] flex items-center px-2 gap-1 overflow-x-auto shrink-0 text-xs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId
          return (
            <div
              key={tab.id}
              onClick={() => handleSelectTab(tab.id)}
              className={`flex items-center gap-2 max-w-[200px] h-7 px-3 rounded-t-lg cursor-pointer transition-colors border-t border-x ${
                isActive
                  ? 'bg-[#1e1e22] text-white border-white/[0.12] font-medium'
                  : 'bg-transparent text-white/50 border-transparent hover:text-white/80'
              }`}
            >
              <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              <span className="truncate text-[11px]">{tab.title}</span>
              {tabs.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => handleCloseTab(e, tab.id)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 ml-auto shrink-0 text-[10px]"
                >
                  ✕
                </button>
              )}
            </div>
          )
        })}

        <button
          type="button"
          onClick={handleNewTab}
          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10 text-white/60 hover:text-white ml-1 text-sm font-light shrink-0"
          title="Open new repo tab"
        >
          +
        </button>
      </div>

      {/* ── 2. Browser Navigation Bar ── */}
      <div className="h-11 bg-[#1a1a1d] border-b border-white/[0.08] flex items-center justify-between px-3 gap-3 shrink-0">
        <div className="flex items-center gap-1.5 text-white/50">
          <button type="button" className="p-1 hover:bg-white/10 hover:text-white rounded" title="Back">
            ‹
          </button>
          <button type="button" className="p-1 hover:bg-white/10 hover:text-white rounded" title="Forward">
            ›
          </button>
          <button
            type="button"
            onClick={() => {
              if (activeTab.repoSlug) {
                setLoading(true)
                setTimeout(() => setLoading(false), 300)
              }
            }}
            className="p-1 hover:bg-white/10 hover:text-white rounded text-xs"
            title="Reload"
          >
            ↻
          </button>
        </div>

        {/* URL Address Bar */}
        <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-3 py-1 rounded-lg bg-[#141416] border border-white/[0.1] text-xs text-white/80">
          <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="truncate font-mono text-[11px]">{activeTab.url}</span>
          <span className="ml-auto text-[10px] text-white/40 uppercase font-mono">Edge Cache</span>
        </div>

        {/* External Link Button */}
        <div>
          <a
            href={`https://${activeTab.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs text-white/80 hover:text-white transition-colors"
          >
            <span>Open on GitHub</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </div>

      {/* ── 3. GitHub In-Browser Workspace ── */}
      <div className="flex-1 overflow-y-auto bg-[#0d1117] text-[#c9d1d9] p-6 font-sans">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3 text-white/50">
            <div className="w-6 h-6 border-2 border-[#9fa3fc] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono">Connecting to GitHub REST API / Edge Cache...</p>
          </div>
        ) : currentRepo ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Repo Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#30363d]">
              <div>
                <div className="flex items-center gap-2 text-sm text-blue-400 font-semibold mb-1">
                  <span>bida24-067</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white font-bold text-lg">{currentRepo.name}</span>
                  <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full border border-[#30363d] text-white/60">
                    Public
                  </span>
                </div>
                <p className="text-xs text-white/70 max-w-xl leading-relaxed">
                  {currentRepo.description}
                </p>
              </div>

              {/* Repo Stats */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center px-2.5 py-1 rounded-md border border-[#30363d] bg-[#161b22] text-xs font-medium">
                  <span className="mr-1.5">★</span>
                  <span>{currentRepo.stars}</span>
                </div>
                <div className="flex items-center px-2.5 py-1 rounded-md border border-[#30363d] bg-[#161b22] text-xs font-medium">
                  <span className="mr-1.5">⑂</span>
                  <span>{currentRepo.forks}</span>
                </div>
              </div>
            </div>

            {/* Language Breakdown Bar */}
            <div>
              <div className="flex h-2 rounded-full overflow-hidden bg-[#21262d] mb-2">
                {Object.entries(currentRepo.languages || {}).map(([lang, pct], idx) => (
                  <div
                    key={lang}
                    style={{ width: `${pct}%` }}
                    className={`${
                      idx === 0
                        ? 'bg-[#3572A5]'
                        : idx === 1
                        ? 'bg-[#f1e05a]'
                        : 'bg-[#DA5B0B]'
                    }`}
                    title={`${lang}: ${pct}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
                {Object.entries(currentRepo.languages || {}).map(([lang, pct]) => (
                  <div key={lang} className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#3572A5]" />
                    <span className="text-white/80 font-medium">{lang}</span>
                    <span className="text-white/40">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs (Code vs README) */}
            <div className="flex items-center gap-2 border-b border-[#30363d] pb-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveView('readme')
                  setActiveFile(null)
                }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeView === 'readme' && !activeFile
                    ? 'bg-[#21262d] text-white border border-[#30363d]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                📖 README.md
              </button>
              <button
                type="button"
                onClick={() => setActiveView('code')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeView === 'code' || activeFile
                    ? 'bg-[#21262d] text-white border border-[#30363d]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                💻 Code Tree & Files
              </button>
            </div>

            {/* File Tree Explorer */}
            {activeView === 'code' || activeFile ? (
              <div className="space-y-4">
                <div className="border border-[#30363d] rounded-lg overflow-hidden bg-[#161b22]">
                  <div className="px-4 py-2 bg-[#21262d]/60 border-b border-[#30363d] text-xs font-mono text-white/60 flex items-center justify-between">
                    <span>branch: {currentRepo.defaultBranch}</span>
                    <span>{currentRepo.tree?.length || 0} files</span>
                  </div>

                  <ul className="divide-y divide-[#30363d]/50 text-xs font-mono">
                    {currentRepo.tree?.map((item) => (
                      <li
                        key={item.path}
                        onClick={() => {
                          if (item.type === 'file') {
                            setActiveFile(item)
                          }
                        }}
                        className={`px-4 py-2 flex items-center justify-between cursor-pointer transition-colors ${
                          activeFile?.path === item.path
                            ? 'bg-[#1f6feb]/20 text-white'
                            : 'hover:bg-[#21262d]/40 text-white/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span>{item.type === 'dir' ? '📁' : '📄'}</span>
                          <span className={item.type === 'file' ? 'text-blue-400 font-medium' : 'text-white'}>
                            {item.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-white/40">{item.size || ''}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inspect clicked file */}
                {activeFile && (
                  <div className="border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117]">
                    <div className="px-4 py-2 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs font-mono text-white/70">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{activeFile.name}</span>
                        <span>•</span>
                        <span className="text-white/40">{activeFile.size}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveFile(null)}
                        className="text-white/40 hover:text-white"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-emerald-300/90 bg-[#090d13]">
                      <code>{activeFile.content || `# ${activeFile.name}\n// File content indexed on edge`}</code>
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              /* Rendered README View */
              <div className="border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117] p-6 space-y-4">
                <div className="border-b border-[#30363d] pb-2 text-xs font-mono text-white/40">
                  README.md
                </div>
                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#c9d1d9] leading-relaxed whitespace-pre-wrap font-sans">
                  {currentRepo.readmeMarkdown}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 text-white/40 text-sm">
            Select a project or repository to inspect in Safari.
          </div>
        )}
      </div>
    </div>
  )
}
