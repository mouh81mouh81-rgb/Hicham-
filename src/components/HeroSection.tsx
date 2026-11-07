/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Sparkles, BookOpen, Clock } from 'lucide-react';

interface HeroSectionProps {
  onOpenBookSelector?: () => void;
  dailyStreak?: number;
}

export function HeroSection({ onOpenBookSelector, dailyStreak = 3 }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-b-2xl shadow-xl border-b border-[#3d2f23]">
      {/* Dark Gothic Castle Image Container */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#0e0c0b]">
        <img
          src="/src/assets/images/gothic_usher_castle_1794041677640.jpg"
          alt="Dark gothic castle of House of Usher in the storm"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-110 scale-100 hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Gradient Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100d] via-[#14100d]/65 to-black/35" />

        {/* Top Badges Strip inside Hero */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          {/* Green 5-Star Badge: Highly recommended by teachers */}
          <div className="flex items-center gap-1.5 bg-[#173a26]/95 border border-[#2e6d49] text-[#bbf7d0] px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm text-xs font-medium">
            <div className="flex text-amber-300 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-300 text-amber-300" />
              ))}
            </div>
            <span className="font-semibold tracking-tight text-[11px] sm:text-xs text-white">
              موصى به بشدة من المعلمين
            </span>
          </div>

          {/* Daily 10-min goal tag */}
          <div className="flex items-center gap-1 bg-[#261d16]/90 border border-[#523d2e] text-[#f7e6c4] px-2.5 py-1 rounded-full text-xs shadow-md">
            <Clock className="w-3 h-3 text-amber-400" />
            <span className="font-medium text-[11px]">10 دقائق/يوم</span>
          </div>
        </div>

        {/* Center / Bottom Content Overlay */}
        <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-col items-center text-center">
          {/* Overlay title text in Arabic (Primary Prompt Requirement) */}
          <h1
            dir="rtl"
            className="font-amiri text-2xl sm:text-3xl font-bold text-[#faf5ea] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-md mx-auto mb-2 text-balance"
          >
            تعلم الإنجليزية مع الكتب لمدة 10 دقائق يوميًا
          </h1>

          {/* Book Title & Author translated on image */}
          <div className="w-full max-w-sm bg-[#1c1612]/85 border border-[#4a392b] backdrop-blur-md rounded-xl p-2.5 shadow-lg mt-1">
            <div className="flex items-center justify-between text-xs text-[#d6c4a8] mb-0.5 border-b border-[#3f3024] pb-1 px-1">
              <span className="font-cinzel tracking-wider text-[11px] text-[#e8b975] uppercase">
                Classic Gothic Literature
              </span>
              <span dir="rtl" className="font-amiri text-xs text-emerald-400">
                المستوى المتوسط - المتقدم
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 px-1 pt-1">
              {/* English Book & Author */}
              <div className="text-left">
                <div className="font-cinzel font-bold text-sm text-[#f5ebd7] leading-tight">
                  The Fall of the House of Usher
                </div>
                <div className="text-[11px] text-[#b3a18a] font-serif">
                  by Edgar Allan Poe
                </div>
              </div>

              {/* Decorative separator */}
              <div className="h-6 w-px bg-[#4a392b] shrink-0" />

              {/* Arabic Book & Author */}
              <div className="text-right" dir="rtl">
                <div className="font-amiri font-bold text-sm text-[#f5ebd7] leading-tight">
                  سقوط منزل آشر
                </div>
                <div className="font-amiri text-xs text-[#c2b29b]">
                  بقلم: إدغار آلان بو
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
