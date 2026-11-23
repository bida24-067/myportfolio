'use client'

import { useState } from 'react'
import { portfolioData, TrashItem } from '@/src/data/portfolio'

export default function TrashApp() {
  const [selectedItem, setSelectedItem] = useState<TrashItem | null>(portfolioData.trashItems[0])

  return (
    <div className="flex h-full bg-[#18181a] text-white select-none">
      {/* Items list */}
      <div className="w-64 bg-[#141416]/95 border-r border-white/[0.08] p-3 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-white/[0.06] text-xs">
            <span className="font-semibold text-white/80">Trash Can</span>
            <span className="text-[10px] text-white/40 font-mono">
              {portfolioData.trashItems.length} items
            </span>
          </div>

          <ul className="space-y-1">
            {portfolioData.trashItems.map((item) => {
              const isSelected = selectedItem?.id === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className={`w-full p-2.5 rounded-lg text-left transition-colors flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-[#9fa3fc]/20 text-white'
                        : 'text-white/70 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    <span className="text-base shrink-0">🗑️</span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{item.filename}</p>
                      <p className="text-[10px] text-white/40 font-mono">{item.size} • {item.kind}</p>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[10px] text-white/40 font-mono">
          <span>Items deleted during late-night debugging.</span>
        </div>
      </div>

      {/* Item Inspector */}
      <div className="flex-1 overflow-y-auto bg-[#18181b] p-6 text-white">
        {selectedItem ? (
          <div className="max-w-xl mx-auto space-y-5">
            <div className="pb-4 border-b border-white/[0.08] flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">{selectedItem.filename}</h3>
                <p className="text-xs text-white/50 font-mono mt-0.5">
                  {selectedItem.kind} • {selectedItem.size} • Deleted: {selectedItem.dateDeleted}
                </p>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                Archived Draft
              </span>
            </div>

            <div>
              <p className="text-xs uppercase font-mono text-white/40 mb-1.5 font-semibold">
                Contents Preview:
              </p>
              <pre className="p-3.5 rounded-xl bg-[#101012] border border-white/[0.08] font-mono text-xs text-amber-300/90 whitespace-pre-wrap leading-relaxed">
                {selectedItem.snippet}
              </pre>
            </div>

            <div>
              <p className="text-xs uppercase font-mono text-white/40 mb-1.5 font-semibold">
                Reason for Disposal:
              </p>
              <p className="text-xs text-white/70 leading-relaxed p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                {selectedItem.jokeReason}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] text-white/40 font-mono">
                Status: Safe from git push
              </span>
              <button
                type="button"
                onClick={() => alert(`Nice try! "${selectedItem.filename}" is safely sealed in the archives forever.`)}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-white/80 transition-colors"
              >
                Put Back
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-white/40">
            Select an item from the trash
          </div>
        )}
      </div>
    </div>
  )
}
