'use client'

import { portfolioData } from '@/src/data/portfolio'

export default function AboutApp({
  onOpenFinder,
  onOpenMail,
}: {
  onOpenFinder: () => void
  onOpenMail: () => void
}) {
  const { systemSpecs, personal } = portfolioData

  return (
    <div className="flex flex-col items-center justify-between p-8 h-full bg-[#1e1e20] text-white select-none overflow-y-auto">
      <div className="flex flex-col sm:flex-row items-center gap-8 max-w-xl w-full my-auto">
        {/* Hardware Icon */}
        <div className="relative shrink-0">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#27272a] via-[#18181b] to-[#09090b] border border-white/[0.14] shadow-2xl flex items-center justify-center p-4">
            <svg className="w-20 h-20 text-[#9fa3fc]" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="14" width="48" height="32" rx="4" fill="#18181B" stroke="currentColor" strokeWidth="2.5" />
              <polygon points="4,48 60,48 54,53 10,53" fill="#71717A" />
              <circle cx="32" cy="30" r="5" fill="#9fa3fc" opacity="0.8" />
            </svg>
          </div>
          <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-medium">
            Online
          </span>
        </div>

        {/* Spec Information */}
        <div className="space-y-3 flex-1 min-w-0 text-center sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {systemSpecs.modelName}
            </h2>
            <p className="text-xs text-white/50 font-mono mt-0.5">
              {systemSpecs.osVersion}
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-white/70 pt-2 border-t border-white/10">
            <div>
              <span className="font-semibold text-white">Academic Chip: </span>
              <span className="text-white/80">{systemSpecs.chip}</span>
            </div>
            <div>
              <span className="font-semibold text-white">Execution Memory: </span>
              <span className="text-white/80">{systemSpecs.memory}</span>
            </div>
            <div>
              <span className="font-semibold text-white">Compute & Models: </span>
              <span className="text-white/80">{systemSpecs.graphics}</span>
            </div>
            <div>
              <span className="font-semibold text-white">Storage & Lake: </span>
              <span className="text-white/80">{systemSpecs.storage}</span>
            </div>
            <div>
              <span className="font-semibold text-white">Serial Number: </span>
              <span className="text-[#9fa3fc] font-mono">{systemSpecs.serialNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-white/10 w-full max-w-xl">
        <button
          type="button"
          onClick={onOpenFinder}
          className="px-4 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-xs font-medium text-white transition-colors"
        >
          View System Projects (Finder)
        </button>

        <button
          type="button"
          onClick={onOpenMail}
          className="px-4 py-2 rounded-lg bg-[#9fa3fc] hover:bg-[#9fa3fc]/90 text-black text-xs font-semibold transition-colors shadow-sm"
        >
          Contact / Attachment (Resend)
        </button>

        <a
          href={`mailto:${personal.personalEmail}?subject=Loago%20Montsho%20CV%20Request`}
          className="px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs text-white/60 hover:text-white transition-colors"
        >
          Request Transcript &amp; CV ↗
        </a>
      </div>
    </div>
  )
}
