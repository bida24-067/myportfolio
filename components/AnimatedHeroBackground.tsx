'use client'

import Image from 'next/image'

interface BirdConfig {
  id: number
  top: string // vertical altitude percentage
  size: number // width in px
  duration: number // seconds to cross right-to-left
  delay: number // seconds delay before start
  flapSpeed: number // wing flap animation duration (seconds)
  opacity: number
  scale?: number
}

const BIRDS: BirdConfig[] = [
  { id: 1, top: '16%', size: 36, duration: 21, delay: 0,   flapSpeed: 0.65, opacity: 0.85 },
  { id: 2, top: '12%', size: 28, duration: 22, delay: 1.5, flapSpeed: 0.60, opacity: 0.70 },
  { id: 3, top: '21%', size: 30, duration: 20, delay: 2.8, flapSpeed: 0.70, opacity: 0.75 },
  { id: 4, top: '8%',  size: 20, duration: 27, delay: 4.8, flapSpeed: 0.55, opacity: 0.45 },
  { id: 5, top: '26%', size: 22, duration: 25, delay: 6.2, flapSpeed: 0.58, opacity: 0.50 },
  { id: 6, top: '34%', size: 34, duration: 23, delay: 11.5, flapSpeed: 0.72, opacity: 0.80 },
  { id: 7, top: '14%', size: 18, duration: 29, delay: 14.0, flapSpeed: 0.52, opacity: 0.40 },
  { id: 8, top: '24%', size: 26, duration: 24, delay: 18.0, flapSpeed: 0.62, opacity: 0.65 },
]

export default function AnimatedHeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* ── 1. Animated Atmospheric Background Image with subtle Ken Burns drift ── */}
      <div className="absolute inset-0 scale-105 animate-[subtle-drift_28s_ease-in-out_infinite_alternate] transform-gpu">
        <Image
          src="/background.webp"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
      </div>

      {/* ── 2. Cinematic Gradient Overlays (Blanc Visual DNA) ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/50 via-transparent to-[#121212]" />
      <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-[#9fa3fc]/[0.05] via-transparent to-transparent" />

      {/* ── 3. Silhouettes of Birds Flying Past from Right to Left ── */}
      <div className="absolute inset-0 overflow-hidden">
        {BIRDS.map((bird) => (
          <div
            key={bird.id}
            className="absolute right-0 will-change-transform"
            style={{
              top: bird.top,
              width: `${bird.size}px`,
              height: `${Math.round(bird.size * 0.55)}px`,
              opacity: bird.opacity,
              animation: `bird-fly-rtl ${bird.duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${bird.delay}s infinite`,
            }}
          >
            {/* Wing Flapping Silhouetted Bird facing Left */}
            <div
              className="w-full h-full will-change-transform"
              style={{
                animation: `bird-wing-flap ${bird.flapSpeed}s ease-in-out infinite alternate`,
                transformOrigin: '50% 50%',
              }}
            >
              <svg
                viewBox="0 0 54 26"
                className="w-full h-full fill-[#0a0a0c] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Photorealistic silhouetted soaring bird facing left */}
                <path
                  d="M 27 15
                     C 22 10, 11 4, 0 8
                     C 6 12, 16 16, 24 16.5
                     C 22 17.5, 18 18.5, 14 19
                     C 19 19.5, 24 18.5, 27 17.5
                     C 30 18.5, 35 19.5, 40 19
                     C 36 18.5, 32 17.5, 30 16.5
                     C 38 16, 48 12, 54 8
                     C 43 4, 32 10, 27 15 Z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes subtle-drift {
          0% {
            transform: scale(1.03) translate(0%, 0%);
          }
          50% {
            transform: scale(1.07) translate(-1.2%, -0.8%);
          }
          100% {
            transform: scale(1.04) translate(0.8%, -0.4%);
          }
        }

        @keyframes bird-fly-rtl {
          0% {
            transform: translate3d(110vw, 0px, 0);
          }
          18% {
            transform: translate3d(85vw, -16px, 0);
          }
          36% {
            transform: translate3d(60vw, 12px, 0);
          }
          54% {
            transform: translate3d(35vw, -12px, 0);
          }
          72% {
            transform: translate3d(10vw, 8px, 0);
          }
          90% {
            transform: translate3d(-10vw, -10px, 0);
          }
          100% {
            transform: translate3d(-25vw, -6px, 0);
          }
        }

        @keyframes bird-wing-flap {
          0% {
            transform: scaleY(1) rotate(0deg);
          }
          50% {
            transform: scaleY(-0.55) translateY(-2px) rotate(-3deg);
          }
          100% {
            transform: scaleY(1) rotate(1deg);
          }
        }
      `}</style>
    </div>
  )
}
