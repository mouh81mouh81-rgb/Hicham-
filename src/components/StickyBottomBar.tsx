/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight, BookMarked } from 'lucide-react';

interface StickyBottomBarProps {
  onStartFree: () => void;
}

export function StickyBottomBar({ onStartFree }: StickyBottomBarProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#16120e]/95 backdrop-blur-md border-t border-[#3d2e22] shadow-[0_-8px_25px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left side: Text saying "ابداً مجاناً!" with pointing finger emoji */}
        <div className="flex items-center gap-2 select-none" dir="rtl">
          <span className="font-amiri font-bold text-base sm:text-lg text-[#f4eedd] tracking-wide">
            ابدأ مجاناً!
          </span>
          <span className="text-xl sm:text-2xl animate-bounce" role="img" aria-label="pointing finger">
            👉
          </span>
        </div>

        {/* Right side: CTA button saying "Utiliser l'application" */}
        <button
          type="button"
          onClick={onStartFree}
          className="min-h-[46px] px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-white bg-gradient-to-r from-[#801422] to-[#991b1b] hover:from-[#921727] hover:to-[#b91c1c] active:scale-95 transition-all duration-200 shadow-lg shadow-[#801422]/40 border border-[#b91c1c]/50 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span className="font-semibold tracking-wide">Utiliser l'application</span>
          <ArrowRight className="w-4 h-4 text-white/90" />
        </button>
      </div>
    </footer>
  );
}
