'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { portfolioData, Project } from '@/src/data/portfolio'
import ModeSwitchToast from '@/components/ModeSwitchToast'

export default function HomePage() {
  const { personal, ventures, projects, skills } = portfolioData
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [contactState, setContactState] = useState<{
    submitting: boolean
    submitted: boolean
    error: string | null
  }>({
    submitting: false,
    submitted: false,
    error: null,
  })

  const [formData, setFormData] = useState<{
    name: string
    email: string
    company: string
    phone: string
    message: string
    source: 'LinkedIn' | 'Google' | 'Event' | 'Referral' | 'Other'
  }>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    source: 'LinkedIn',
  })

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactState({ submitting: true, submitted: false, error: null })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          consent: true,
          honeypot: '',
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to dispatch inquiry')
      }

      setContactState({ submitting: false, submitted: true, error: null })
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        source: 'LinkedIn',
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setContactState({ submitting: false, submitted: false, error: message })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── 1. Hero Section ── */}
      <section
        id="overview"
        className="relative pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden bg-[#121212] border-b border-white/[0.08]"
      >
        {/* Background Image at 45% opacity with gradient fade (Blanc Visual DNA) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/background.webp"
            alt=""
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/40 via-transparent to-[#121212]" />
        </div>

        {/* Ambient background glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(159, 163, 252, 0.18) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            {/* Attachment Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-white/90 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Seeking Data Analyst Attachment · Jan – Jun 2027</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-white/60 hidden sm:inline">Gaborone, Botswana</span>
            </div>

            {/* Main Headline */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#9fa3fc] font-mono mb-2 font-semibold">
                Loago Kevin Montsho · &ldquo;{personal.moniker}&rdquo;
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.12]">
                {personal.headline}
              </h1>
            </div>

            {/* Tagline & Short Bio */}
            <p className="text-lg md:text-xl text-white/65 max-w-2xl font-normal leading-relaxed">
              {personal.heroTagline}
            </p>

            <p className="text-sm md:text-base text-white/50 max-w-2xl leading-relaxed">
              {personal.shortBio}
            </p>

            {/* Primary CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-md"
              >
                <span>Explore Flagship Systems</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <Link
                href="/os"
                className="inline-flex items-center gap-2 bg-[#9fa3fc]/15 hover:bg-[#9fa3fc]/25 text-[#9fa3fc] hover:text-white text-sm font-medium px-5 py-3 rounded-full border border-[#9fa3fc]/35 transition-all group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span>Launch Desktop View</span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/10 text-white/80 border border-white/10">
                  ⌘D
                </kbd>
              </Link>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-sm font-medium px-5 py-3 rounded-full border border-white/[0.1] transition-all"
              >
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-white/[0.08]">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-3xl lg:text-4xl font-medium text-white tracking-tight">94.79%</div>
              <div className="text-xs text-[#9fa3fc] font-mono mt-1">Swin ViT Accuracy</div>
              <p className="text-[11px] text-white/50 mt-1">5-Class Kellgren-Lawrence Knee Radiograph Classifier</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-3xl lg:text-4xl font-medium text-white tracking-tight">Medallion</div>
              <div className="text-xs text-[#9fa3fc] font-mono mt-1">Delta Lakehouse</div>
              <p className="text-[11px] text-white/50 mt-1">Bronze/Silver/Gold Databricks & PySpark architecture</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-3xl lg:text-4xl font-medium text-white tracking-tight">8 Devs</div>
              <div className="text-xs text-[#9fa3fc] font-mono mt-1">Squad Lead · TWS</div>
              <p className="text-[11px] text-white/50 mt-1">18-project progressive curriculum & 7-role rotation</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-3xl lg:text-4xl font-medium text-white tracking-tight">Jan–Jun &apos;27</div>
              <div className="text-xs text-emerald-400 font-mono mt-1">Attachment Window</div>
              <p className="text-[11px] text-white/50 mt-1">Targeting BSE, capital markets & financial institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Academic Attachment Focus Callout ── */}
      <section id="attachment" className="py-16 md:py-24 bg-[#151515] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#141414] border border-white/[0.1] relative overflow-hidden shadow-2xl">
            {/* Ambient accent flare */}
            <div
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#9fa3fc]/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="max-w-3xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9fa3fc]/10 border border-[#9fa3fc]/20 text-[#9fa3fc] text-xs font-mono font-medium">
                <span>Transitional Career Focus</span>
                <span>•</span>
                <span>6-Month Academic Attachment</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white tracking-tight leading-snug">
                Targeting Financial & Capital Market Analytics Placements in Botswana
              </h2>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                As part of the third year of the BSc (Hons) Business Intelligence and Data Analytics degree at
                Botswana Accountancy College (University of Sunderland), I am actively securing a 6-month
                attachment from <strong className="text-white font-medium">January to June 2027</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xs uppercase font-mono tracking-wider text-[#9fa3fc] font-semibold mb-1">
                    Target Institutions
                  </p>
                  <p className="text-sm text-white/80">
                    Botswana Stock Exchange (BSE), RMB Botswana, Stanbic Bank, commercial banks, and asset managers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-xs uppercase font-mono tracking-wider text-[#9fa3fc] font-semibold mb-1">
                    Strategic Trajectory
                  </p>
                  <p className="text-sm text-white/80">
                    Progressing along a Quantitative Analyst to Portfolio Manager path, preparing for CFA and FMVA credentials.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-white text-black text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-all shadow"
                >
                  <span>Discuss Attachment Opportunities</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <span className="text-xs text-white/50">
                  Official BAC academic transcript available on institutional request.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Flagship Projects & Systems ── */}
      <section id="projects" className="relative py-20 md:py-28 bg-[#121212] border-b border-white/[0.08] overflow-hidden">
        {/* Ambient background with projects-bg */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
          <Image
            src="/projects-bg.webp"
            alt=""
            fill
            quality={75}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#121212]/80 to-[#121212]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] font-mono block mb-2">
                Engineering & Modeling Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                Flagship Systems & Technical Projects
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08]">
              {['All', 'Data & ML', 'Web & Product', 'Academic'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project: Project) => (
              <div
                key={project.id}
                className="group flex flex-col p-6 rounded-2xl bg-[#181818] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-200 hover:-translate-y-1 shadow-lg"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-white/70">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-400/10 px-2 py-0.5 rounded">
                    {project.stage}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-white group-hover:text-[#9fa3fc] transition-colors leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-white/50 mb-3 font-mono">{project.subtitle}</p>

                <p className="text-sm text-white/65 leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Metrics if available */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-4">
                    {project.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="text-[10px] text-white/40 uppercase font-mono">{m.label}</div>
                        <div className="text-sm font-semibold text-white/90">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-white/40">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3 mt-auto">
                  {project.repoSlug ? (
                    <Link
                      href={`/os?app=safari&repo=${project.repoSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9fa3fc] hover:text-white transition-colors"
                      title="Inspect interactive code in macOS Safari"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                      </svg>
                      <span>Inspect in Safari</span>
                    </Link>
                  ) : (
                    <span className="text-xs text-white/40">Internal Architecture</span>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
                    >
                      <span>Live Demo</span>
                      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
                        <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                  {project.githubUrl && !project.liveUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
                    >
                      <span>GitHub</span>
                      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
                        <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Ventures & Leadership ── */}
      <section id="ventures" className="py-20 md:py-28 bg-[#151515] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] font-mono block mb-2">
              Entrepreneurship & Community
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
              Ventures & Leadership Initiatives
            </h2>
            <p className="text-white/60 text-sm mt-3">
              Building sustainable platforms, training student developer cohorts, and leading campus innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ventures.map((venture) => (
              <div
                key={venture.id}
                className="p-8 rounded-2xl bg-[#191919] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#9fa3fc] bg-[#9fa3fc]/10 px-2.5 py-1 rounded-full">
                      {venture.role}
                    </span>
                    <span className="text-xs font-mono text-white/40">{venture.status}</span>
                  </div>

                  <h3 className="text-2xl font-medium text-white mb-1">{venture.title}</h3>
                  <p className="text-xs text-white/50 mb-4 font-mono">{venture.category}</p>

                  <p className="text-sm text-white/70 leading-relaxed mb-6">{venture.overview}</p>

                  <ul className="space-y-2.5 mb-6">
                    {venture.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-white/65 leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9fa3fc] mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {venture.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/60 border border-white/[0.05]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {venture.url && (
                    <a
                      href={venture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#9fa3fc] hover:text-white shrink-0 font-medium"
                    >
                      <span>Visit</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                        <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Technical Skills Matrix ── */}
      <section id="skills" className="py-20 md:py-28 bg-[#121212] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] font-mono block mb-2">
              Capabilities Inventory
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
              Technical Stack & Domain Skills
            </h2>
            <p className="text-white/60 text-sm mt-3">
              Mastered through high-throughput coursework, independent system development, and commercial consulting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((cat) => (
              <div
                key={cat.category}
                className="p-6 rounded-2xl bg-[#181818] border border-white/[0.08] flex flex-col"
              >
                <h3 className="text-base font-medium text-white mb-1.5">{cat.category}</h3>
                <p className="text-xs text-white/50 mb-5 leading-relaxed">{cat.description}</p>

                <ul className="space-y-2 mt-auto">
                  {cat.skills.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                    >
                      <span className={`text-xs ${s.highlight ? 'text-white font-medium' : 'text-white/70'}`}>
                        {s.name}
                      </span>
                      {s.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9fa3fc]" title="Core Competency" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Education & Certifications ── */}
      <section className="py-20 md:py-24 bg-[#151515] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Formal Education */}
            <div className="p-8 rounded-2xl bg-[#191919] border border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#9fa3fc] font-semibold block mb-2">
                Undergraduate Degree
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">
                BSc (Hons) Business Intelligence & Data Analytics
              </h3>
              <p className="text-sm text-white/70 mb-4">
                Botswana Accountancy College (BAC) in partnership with the University of Sunderland
              </p>
              <div className="space-y-2 text-xs text-white/60">
                <p><strong className="text-white">Status:</strong> Third-Year Undergraduate</p>
                <p><strong className="text-white">Attachment Period:</strong> January – June 2027 (6 Months)</p>
                <p><strong className="text-white">Key Modules:</strong> Data Warehousing (BI205), Advanced Data Analytics (BI206), Business Management (BI304), Entrepreneurship Development (ICT205), Database Design.</p>
              </div>
            </div>

            {/* Certifications & Roadmap */}
            <div className="p-8 rounded-2xl bg-[#191919] border border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
                Credentials & Continuous Rigor
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-4">
                Professional Certifications
              </h3>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Lean Six Sigma Yellow Belt</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Completed</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Process optimization, root-cause DMAIC analysis, and workflow efficiency.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Power BI for Data Cleaning</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Completed</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Automated Power Query M transformations and structured schema modeling.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">CFA Program & FMVA</span>
                    <span className="text-[10px] font-mono text-[#9fa3fc] bg-[#9fa3fc]/10 px-2 py-0.5 rounded">Candidate Roadmap</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Portfolio management, equity valuation, and financial statement modeling.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Contact Section ── */}
      <section id="contact" className="py-20 md:py-28 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#9fa3fc] font-mono block mb-2">
                  Direct Inquiries
                </span>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                  Let&apos;s Build Together.
                </h2>
                <p className="text-white/60 text-sm mt-3 leading-relaxed">
                  Open to academic attachment discussions for Jan–Jun 2027, data lakehouse engineering, and enterprise consulting opportunities.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-[11px] font-mono text-white/40 uppercase">Personal Email</p>
                  <a
                    href={`mailto:${personal.personalEmail}`}
                    className="text-sm font-medium text-white hover:text-[#9fa3fc] transition-colors"
                  >
                    {personal.personalEmail}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-[11px] font-mono text-white/40 uppercase">Studio & Consultancy</p>
                  <a
                    href={`mailto:${personal.ventureEmail}`}
                    className="text-sm font-medium text-white hover:text-[#9fa3fc] transition-colors"
                  >
                    {personal.ventureEmail}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-[11px] font-mono text-white/40 uppercase">Direct Phone / WhatsApp</p>
                  <p className="text-sm font-medium text-white">{personal.phone}</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-[11px] font-mono text-white/40 uppercase">Location & Timezone</p>
                  <p className="text-sm font-medium text-white">Gaborone, Botswana · Central Africa Time (CAT)</p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-2xl bg-[#181818] border border-white/[0.08] shadow-2xl">
                <h3 className="text-xl font-medium text-white mb-2">Send an Attachment or Project Inquiry</h3>
                <p className="text-xs text-white/50 mb-6">
                  Dispatched directly to Loago Montsho via Resend. You will receive an immediate confirmation email.
                </p>

                {contactState.submitted ? (
                  <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h4 className="text-base font-medium text-white">Inquiry Dispatched Successfully</h4>
                    <p className="text-xs text-white/70 max-w-sm mx-auto">
                      Thank you. Your message has been received by Loago Kevin Montsho. A confirmation was sent to your inbox.
                    </p>
                    <button
                      type="button"
                      onClick={() => setContactState({ submitting: false, submitted: false, error: null })}
                      className="text-xs text-[#9fa3fc] hover:underline pt-2 inline-block cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitContact} className="space-y-4">
                    {contactState.error && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        {contactState.error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-1.5">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Kagiso Motlhanka"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-[#9fa3fc] focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.co.bw"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-[#9fa3fc] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-1.5">Organization / Bank</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Botswana Stock Exchange / RMB"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-[#9fa3fc] focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/60 mb-1.5">Inquiry Type</label>
                        <select
                          value={formData.source}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              source: e.target.value as 'LinkedIn' | 'Google' | 'Event' | 'Referral' | 'Other',
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#202020] border border-white/[0.1] text-white text-sm focus:border-[#9fa3fc] focus:outline-none transition-colors"
                        >
                          <option value="LinkedIn">Attachment Placement (Jan–Jun 2027)</option>
                          <option value="Google">Enterprise Data Lakehouse / BI</option>
                          <option value="Referral">Commercial Client Web Engineering</option>
                          <option value="Event">BAC / Student Community</option>
                          <option value="Other">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1.5">Message / Details *</label>
                      <textarea
                        required
                        rows={4}
                        minLength={10}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about the attachment role, scope of work, or technical problem you are solving..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-[#9fa3fc] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={contactState.submitting}
                        className="w-full py-3 px-6 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer shadow-md flex items-center justify-center gap-2"
                      >
                        {contactState.submitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>Dispatching via Resend...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Transition Toast in bottom right */}
      <ModeSwitchToast />
    </div>
  )
}
