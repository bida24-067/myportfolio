'use client'

import { useState, useRef, useEffect } from 'react'
import { portfolioData } from '@/src/data/portfolio'

interface CommandHistoryItem {
  command: string
  output: React.ReactNode
}

export default function TerminalApp({
  onOpenApp,
  onOpenSafariRepo,
  onToggleTheme,
  onExitToStandard,
}: {
  onOpenApp: (appId: string) => void
  onOpenSafariRepo: (repoSlug: string) => void
  onToggleTheme: () => void
  onExitToStandard: () => void
}) {
  const { personal, projects, ventures, skills } = portfolioData

  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-white/70">
          <p className="text-emerald-400 font-bold">
            BlancOS 26.4 (Gaborone High-Craft Edition) · Darwin Kernel 24.1.0
          </p>
          <p className="text-white/50">
            Type <span className="text-[#9fa3fc] font-bold">help</span> to list commands, or{' '}
            <span className="text-[#9fa3fc] font-bold">ls projects</span> to view lakehouse systems.
          </p>
        </div>
      ),
    },
  ])

  const [cmdIndex, setCmdIndex] = useState<number>(-1)
  const [pastCmds, setPastCmds] = useState<string[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim()
    if (!trimmed) return

    setPastCmds((prev) => [...prev, trimmed])
    setCmdIndex(-1)

    const parts = trimmed.split(' ')
    const cmd = parts[0].toLowerCase()
    const arg = parts.slice(1).join(' ').trim()

    let out: React.ReactNode = null

    switch (cmd) {
      case 'help':
        out = (
          <div className="space-y-1 text-xs text-white/80 font-mono">
            <p className="text-[#9fa3fc] font-bold">Available Commands:</p>
            <p><span className="text-emerald-400">whoami</span> — Identity, bio, and 2027 attachment objective</p>
            <p><span className="text-emerald-400">ls [projects|ventures|skills]</span> — List directory items</p>
            <p><span className="text-emerald-400">cat &lt;slug&gt;</span> — Inspect project or venture specifications</p>
            <p><span className="text-emerald-400">skills</span> — Full capabilities &amp; tech stack inventory</p>
            <p><span className="text-emerald-400">open safari [repo]</span> — Launch Safari and inspect GitHub repo</p>
            <p><span className="text-emerald-400">open &lt;app&gt;</span> — Launch finder, safari, notes, mail, trash</p>
            <p><span className="text-emerald-400">contact</span> — Dispatch mail or show direct contact numbers</p>
            <p><span className="text-emerald-400">theme</span> — Toggle desktop light/dark wallpaper</p>
            <p><span className="text-emerald-400">date</span> — Display current CAT timestamp in Gaborone</p>
            <p><span className="text-emerald-400">exit</span> — Return to standard portfolio view (⌘D)</p>
            <p><span className="text-emerald-400">clear</span> — Clear terminal output</p>
          </div>
        )
        break

      case 'whoami':
        out = (
          <div className="space-y-1.5 text-xs text-white/80 font-mono">
            <p className="text-white font-bold">{personal.fullName} (&ldquo;{personal.moniker}&rdquo;)</p>
            <p className="text-[#9fa3fc]">{personal.headline}</p>
            <p className="text-white/70 max-w-xl">{personal.shortBio}</p>
            <p className="text-emerald-400 pt-1">
              Attachment Window: {personal.attachmentGoal.period} ({personal.attachmentGoal.targetInstitutions})
            </p>
          </div>
        )
        break

      case 'ls':
        if (arg === 'projects') {
          out = (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {projects.map((p) => (
                <div key={p.id} className="text-white/80">
                  <span className="text-[#9fa3fc]">{p.id}</span>
                  <span className="text-white/40 block text-[11px]">{p.title}</span>
                </div>
              ))}
            </div>
          )
        } else if (arg === 'ventures') {
          out = (
            <div className="space-y-1 text-xs font-mono">
              {ventures.map((v) => (
                <div key={v.id}>
                  <span className="text-emerald-400 font-bold">{v.title}</span> — {v.category} ({v.role})
                </div>
              ))}
            </div>
          )
        } else {
          out = (
            <div className="flex flex-wrap gap-4 text-xs font-mono text-white/80">
              <span className="text-blue-400 font-bold">projects/</span>
              <span className="text-blue-400 font-bold">ventures/</span>
              <span className="text-blue-400 font-bold">skills/</span>
              <span className="text-blue-400 font-bold">notes/</span>
              <span className="text-emerald-400">attachment_2027.md</span>
              <span className="text-purple-400">credentials.txt</span>
            </div>
          )
        }
        break

      case 'cat':
        if (!arg) {
          out = <span className="text-red-400">usage: cat &lt;slug&gt; (e.g. cat swin-osteoarthritis)</span>
        } else {
          const matchProj = projects.find((p) => p.id === arg || p.repoSlug === arg)
          const matchVenture = ventures.find((v) => v.id === arg)
          if (matchProj) {
            out = (
              <div className="space-y-1 text-xs font-mono text-white/80 max-w-xl">
                <p className="text-[#9fa3fc] font-bold">{matchProj.title}</p>
                <p className="text-white/60">{matchProj.description}</p>
                {matchProj.architecture && <p className="text-emerald-300">Architecture: {matchProj.architecture}</p>}
                {matchProj.tags && <p className="text-white/40">Tags: {matchProj.tags.join(', ')}</p>}
              </div>
            )
          } else if (matchVenture) {
            out = (
              <div className="space-y-1 text-xs font-mono text-white/80 max-w-xl">
                <p className="text-emerald-400 font-bold">{matchVenture.title}</p>
                <p className="text-white/70">{matchVenture.overview}</p>
              </div>
            )
          } else {
            out = <span className="text-red-400">cat: {arg}: No such file or project</span>
          }
        }
        break

      case 'skills':
        out = (
          <div className="space-y-3 text-xs font-mono text-white/80">
            {skills.map((cat) => (
              <div key={cat.category}>
                <p className="text-[#9fa3fc] font-semibold">{cat.category}</p>
                <p className="text-white/60">{cat.skills.map((s) => s.name).join(' · ')}</p>
              </div>
            ))}
          </div>
        )
        break

      case 'open':
        if (arg.startsWith('safari')) {
          const repoArg = arg.replace('safari', '').trim()
          onOpenSafariRepo(repoArg || 'knee-osteoarthritis-classifier')
          out = <span className="text-emerald-400">Launched Safari on {repoArg || 'default repo'}</span>
        } else if (['finder', 'safari', 'notes', 'mail', 'about', 'trash'].includes(arg)) {
          onOpenApp(arg)
          out = <span className="text-emerald-400">Launched {arg}</span>
        } else {
          out = <span className="text-red-400">open: unknown target &apos;{arg}&apos;. Try &apos;open safari&apos; or &apos;open finder&apos;</span>
        }
        break

      case 'contact':
        onOpenApp('mail')
        out = (
          <div className="space-y-1 text-xs font-mono text-white/80">
            <p className="text-[#9fa3fc]">Opening macOS Mail client...</p>
            <p>Personal Email: {personal.personalEmail}</p>
            <p>Consultancy: {personal.ventureEmail}</p>
            <p>Phone: {personal.phone}</p>
          </div>
        )
        break

      case 'theme':
        onToggleTheme()
        out = <span className="text-emerald-400">Desktop theme toggled.</span>
        break

      case 'date':
        out = (
          <span className="text-white font-mono">
            {new Date().toLocaleString('en-GB', { timeZone: 'Africa/Gaborone' })} CAT (Gaborone)
          </span>
        )
        break

      case 'clear':
        setHistory([])
        return

      case 'exit':
        onExitToStandard()
        return

      case 'sudo':
        out = (
          <div className="text-red-400 font-mono text-xs">
            loago is not in the sudoers file. This incident will be reported to Botswana Accountancy College.
          </div>
        )
        break

      default:
        out = (
          <span className="text-red-400 text-xs font-mono">
            zsh: command not found: {cmd}. Type &apos;help&apos; for list of commands.
          </span>
        )
        break
    }

    setHistory((prev) => [...prev, { command: trimmed, output: out }])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (pastCmds.length === 0) return
      const nextIdx = cmdIndex === -1 ? pastCmds.length - 1 : Math.max(0, cmdIndex - 1)
      setCmdIndex(nextIdx)
      setInput(pastCmds[nextIdx] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (pastCmds.length === 0 || cmdIndex === -1) return
      const nextIdx = cmdIndex + 1
      if (nextIdx >= pastCmds.length) {
        setCmdIndex(-1)
        setInput('')
      } else {
        setCmdIndex(nextIdx)
        setInput(pastCmds[nextIdx] || '')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Simple auto-completion for common commands
      const cmds = ['help', 'whoami', 'ls projects', 'skills', 'open safari', 'contact', 'clear']
      const match = cmds.find((c) => c.startsWith(input.trim().toLowerCase()))
      if (match) setInput(match)
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-[#101012] p-4 font-mono text-xs text-white/90 overflow-y-auto select-text cursor-text leading-relaxed"
    >
      <div className="space-y-3 mb-3">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-emerald-400 font-bold">loago@mov-macbook</span>
              <span className="text-white/40">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white/40">%</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-2">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Active prompt line */}
      <div className="flex items-center gap-2 text-white/90">
        <span className="text-emerald-400 font-bold">loago@mov-macbook</span>
        <span className="text-white/40">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white/40">%</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-white focus:outline-none caret-[#9fa3fc]"
        />
      </div>

      <div ref={bottomRef} />
    </div>
  )
}
