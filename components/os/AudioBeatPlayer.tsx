'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export default function AudioBeatPlayer({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<number | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const stepRef = useRef<number>(0)

  // Initialize Web Audio Context
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(volume, ctx.currentTime)
      masterGain.connect(ctx.destination)
      audioCtxRef.current = ctx
      gainNodeRef.current = masterGain
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
  }, [volume])

  // Play a drum / log hit
  const playLogDrum = useCallback((ctx: AudioContext, master: GainNode, time: number, freq: number) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq * 1.5, time)
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.08)

    gain.gain.setValueAtTime(0.8, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35)

    osc.connect(gain)
    gain.connect(master)
    osc.start(time)
    osc.stop(time + 0.36)
  }, [])

  // Play a soft hi-hat
  const playHat = useCallback((ctx: AudioContext, master: GainNode, time: number) => {
    const bufferSize = ctx.sampleRate * 0.04
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 7500

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.3, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.04)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(master)
    noise.start(time)
  }, [])

  // Play a lush Rhodes electric piano chord
  const playChord = useCallback((ctx: AudioContext, master: GainNode, time: number, freqs: number[]) => {
    freqs.forEach((freq) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, time)

      gain.gain.setValueAtTime(0.08, time)
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.8)

      osc.connect(gain)
      gain.connect(master)
      osc.start(time)
      osc.stop(time + 0.85)
    })
  }, [])

  // Sequencer loop (114 BPM Amapiano / Deep House)
  const startSequencer = useCallback(() => {
    const ctx = audioCtxRef.current
    const master = gainNodeRef.current
    if (!ctx || !master) return

    const bpm = 114
    const stepDuration = 60 / bpm / 4 // 16th note in seconds

    // Chord progressions in D minor / F major
    const chords = [
      [220, 261.63, 329.63, 392], // Am7
      [174.61, 220, 261.63, 329.63], // Fmaj7
      [196, 246.94, 293.66, 349.23], // G7
      [146.83, 174.61, 220, 261.63], // Dm7
    ]

    const tick = () => {
      const now = ctx.currentTime
      const step = stepRef.current % 16

      // Hi-hats on offbeats
      if (step % 2 === 1) {
        playHat(ctx, master, now)
      }

      // Amapiano signature syncopated log drums
      if (step === 0 || step === 3 || step === 6 || step === 10 || step === 12) {
        const pitch = step === 0 ? 65 : step === 6 ? 55 : 73
        playLogDrum(ctx, master, now, pitch)
      }

      // Chords on bar boundaries
      if (step === 0) {
        const chordIndex = Math.floor(stepRef.current / 16) % chords.length
        playChord(ctx, master, now, chords[chordIndex])
      }

      stepRef.current++
      timerRef.current = window.setTimeout(tick, stepDuration * 1000)
    }

    tick()
  }, [playHat, playLogDrum, playChord])

  const togglePlayback = () => {
    if (isPlaying) {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      setIsPlaying(false)
    } else {
      initAudio()
      startSequencer()
      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol)
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  if (!isOpen) return null

  return (
    <div
      className="absolute top-8 right-20 z-50 w-72 rounded-2xl bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/[0.14] shadow-2xl p-4 text-white animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9fa3fc] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">Audio Loop Preview</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-white/40 hover:text-white text-xs p-1"
        >
          ✕
        </button>
      </div>

      <div className="py-3">
        <p className="text-xs font-medium text-white/95">Gaborone Midnight Tick</p>
        <p className="text-[11px] text-white/50">Amapiano Log Drum & Rhodes Loop · 114 BPM</p>
        <p className="text-[10px] text-[#9fa3fc] font-mono mt-0.5">Synthesized via Web Audio API</p>

        {/* Visualizer bars */}
        <div className="flex items-end justify-between h-8 gap-1.5 my-3 px-1">
          {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((height, i) => (
            <div
              key={i}
              className={`w-full rounded-full transition-all duration-150 ${
                isPlaying
                  ? 'bg-gradient-to-t from-[#6d7cff] to-[#9fa3fc] animate-pulse'
                  : 'bg-white/15'
              }`}
              style={{
                height: isPlaying ? `${Math.max(15, (height * (i % 2 === 0 ? 1 : 0.7)))}%` : '20%',
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={togglePlayback}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all ${
              isPlaying
                ? 'bg-[#9fa3fc] text-black font-semibold'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>Pause Beat</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Play Loop</span>
              </>
            )}
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/5">
          <svg className="w-3.5 h-3.5 text-white/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-[#9fa3fc] h-1 bg-white/20 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
