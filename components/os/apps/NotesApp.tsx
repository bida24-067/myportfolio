'use client'

import { useState } from 'react'
import { portfolioData, NoteItem } from '@/src/data/portfolio'

export default function NotesApp({
  initialNoteId,
}: {
  initialNoteId?: string
}) {
  const [selectedFolder, setSelectedFolder] = useState<'all' | 'technical' | 'creative'>('all')
  const [activeNote, setActiveNote] = useState<NoteItem>(
    (initialNoteId ? portfolioData.notes.find((n) => n.id === initialNoteId) : null) || portfolioData.notes[0]
  )
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNotes = portfolioData.notes.filter((n) => {
    if (selectedFolder !== 'all' && n.folder !== selectedFolder) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="flex h-full bg-[#18181a] text-white select-none">
      {/* ── 1. Left Folders Sidebar ── */}
      <div className="w-48 bg-[#141416]/95 border-r border-white/[0.08] p-3 flex flex-col justify-between shrink-0 text-xs">
        <div>
          <p className="text-[10px] uppercase font-mono tracking-wider text-white/40 px-2 mb-2 font-semibold">
            Folders
          </p>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => setSelectedFolder('all')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                  selectedFolder === 'all'
                    ? 'bg-[#9fa3fc]/20 text-white font-medium'
                    : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <span>📂 All Notes</span>
                <span className="text-[10px] text-white/40 font-mono">{portfolioData.notes.length}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedFolder('technical')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                  selectedFolder === 'technical'
                    ? 'bg-[#9fa3fc]/20 text-white font-medium'
                    : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <span>💻 Technical &amp; Lakehouse</span>
                <span className="text-[10px] text-white/40 font-mono">
                  {portfolioData.notes.filter((n) => n.folder === 'technical').length}
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedFolder('creative')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                  selectedFolder === 'creative'
                    ? 'bg-[#9fa3fc]/20 text-white font-medium'
                    : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                <span>🖋️ Creative &amp; Poetry</span>
                <span className="text-[10px] text-white/40 font-mono">
                  {portfolioData.notes.filter((n) => n.folder === 'creative').length}
                </span>
              </button>
            </li>
          </ul>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[10px] text-white/40 font-mono">
          <span>Synced locally</span>
        </div>
      </div>

      {/* ── 2. Middle Notes List ── */}
      <div className="w-64 bg-[#161619] border-r border-white/[0.08] flex flex-col shrink-0">
        {/* Search */}
        <div className="p-2.5 border-b border-white/[0.06]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#9fa3fc]"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
          {filteredNotes.map((note) => {
            const isSelected = activeNote?.id === note.id
            return (
              <div
                key={note.id}
                onClick={() => setActiveNote(note)}
                className={`p-3.5 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#9fa3fc]/15 text-white' : 'hover:bg-white/[0.03] text-white/70'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-semibold text-white truncate">{note.title}</span>
                  <span className="text-[9px] text-white/40 font-mono shrink-0">{note.readTime}</span>
                </div>
                <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed mb-2">
                  {note.excerpt}
                </p>
                <div className="flex items-center justify-between text-[10px] text-white/40">
                  <span>{note.date}</span>
                  <span className="font-mono text-[9px] text-[#9fa3fc]">{note.tags[0]}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 3. Reader Pane ── */}
      <div className="flex-1 overflow-y-auto bg-[#18181b] p-8 text-white">
        {activeNote ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.06] text-[#9fa3fc]">
                  {activeNote.folder === 'technical' ? 'Technical Research' : 'Creative Writing'}
                </span>
                <span className="text-xs text-white/40 font-mono">• {activeNote.readTime}</span>
                <span className="text-xs text-white/40 font-mono">• {activeNote.date}</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {activeNote.title}
              </h1>
            </div>

            {/* Note Content */}
            <div className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap font-sans space-y-4">
              {activeNote.content}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              {activeNote.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-white/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-white/40">
            Select a note to read
          </div>
        )}
      </div>
    </div>
  )
}
