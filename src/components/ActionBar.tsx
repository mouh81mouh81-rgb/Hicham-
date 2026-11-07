/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Headphones, Globe, Volume2, Pause } from 'lucide-react';

interface ActionBarProps {
  onToggleReadMode: () => void;
  onToggleListen: () => void;
  onToggleTranslate: () => void;
  isPlayingAudio?: boolean;
  activeTab?: 'read' | 'listen' | 'translate' | null;
}

export function ActionBar({
  onToggleReadMode,
  onToggleListen,
  onToggleTranslate,
  isPlayingAudio = false,
  activeTab = null,
}: ActionBarProps) {
  return (
    <div className="w-full px-4 py-3.5 z-20">
      {/* Horizontal row of three capsule-shaped, deep red buttons with white icons and Arabic text */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 max-w-md mx-auto" dir="rtl">
        {/* 1. "اقرأ" (Read) with an open book icon */}
        <button
          type="button"
          onClick={onToggleReadMode}
          className={`flex-1 min-h-[48px] py-2.5 px-3 rounded-full flex items-center justify-center gap-2 text-white font-medium text-sm transition-all duration-200 shadow-md active:scale-95 cursor-pointer ${
            activeTab === 'read'
              ? 'bg-[#560a12] ring-2 ring-[#e8b975] shadow-lg shadow-[#560a12]/50'
              : 'bg-[#7a121e] hover:bg-[#8f1826] active:bg-[#5f0d17]'
          }`}
          aria-label="اقرأ - ضبط خيارات القراءة والنصوص"
        >
          <BookOpen className="w-4 h-4 text-white stroke-[2.2]" />
          <span className="font-amiri font-bold text-base tracking-wide">اقرأ</span>
        </button>

        {/* 2. "استمع" (Listen) with a headphone icon */}
        <button
          type="button"
          onClick={onToggleListen}
          className={`flex-1 min-h-[48px] py-2.5 px-3 rounded-full flex items-center justify-center gap-2 text-white font-medium text-sm transition-all duration-200 shadow-md active:scale-95 cursor-pointer relative overflow-hidden ${
            isPlayingAudio || activeTab === 'listen'
              ? 'bg-[#560a12] ring-2 ring-[#e8b975] shadow-lg shadow-[#560a12]/50'
              : 'bg-[#7a121e] hover:bg-[#8f1826] active:bg-[#5f0d17]'
          }`}
          aria-label="استمع - تشغيل القراءة الصوتية"
        >
          {isPlayingAudio ? (
            <>
              <Pause className="w-4 h-4 text-white stroke-[2.5]" />
              <span className="font-amiri font-bold text-base tracking-wide">إيقاف</span>
              <span className="absolute bottom-0 inset-x-0 h-1 bg-amber-400 animate-pulse" />
            </>
          ) : (
            <>
              <Headphones className="w-4 h-4 text-white stroke-[2.2]" />
              <span className="font-amiri font-bold text-base tracking-wide">استمع</span>
            </>
          )}
        </button>

        {/* 3. "ترجم" (Translate) with a globe icon */}
        <button
          type="button"
          onClick={onToggleTranslate}
          className={`flex-1 min-h-[48px] py-2.5 px-3 rounded-full flex items-center justify-center gap-2 text-white font-medium text-sm transition-all duration-200 shadow-md active:scale-95 cursor-pointer ${
            activeTab === 'translate'
              ? 'bg-[#560a12] ring-2 ring-[#e8b975] shadow-lg shadow-[#560a12]/50'
              : 'bg-[#7a121e] hover:bg-[#8f1826] active:bg-[#5f0d17]'
          }`}
          aria-label="ترجم - استكشاف المفردات والترجمة"
        >
          <Globe className="w-4 h-4 text-white stroke-[2.2]" />
          <span className="font-amiri font-bold text-base tracking-wide">ترجم</span>
        </button>
      </div>
    </div>
  );
}
