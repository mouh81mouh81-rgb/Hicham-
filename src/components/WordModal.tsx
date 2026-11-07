/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Volume2, X, Bookmark, Check, Sparkles, BookOpen } from 'lucide-react';
import { VocabDefinition } from '../data/bookData';

interface WordModalProps {
  wordData: VocabDefinition | null;
  onClose: () => void;
  onSpeak: (text: string) => void;
}

export function WordModal({ wordData, onClose, onSpeak }: WordModalProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (!wordData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#f7f2e4] rounded-t-3xl sm:rounded-2xl border-t sm:border border-[#cfbea0] shadow-2xl overflow-hidden p-5 max-h-[85vh] overflow-y-auto"
        dir="ltr"
      >
        {/* Top Handle / Close */}
        <div className="flex items-center justify-between border-b border-[#dfcfb5] pb-3 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f472b6] inline-block" />
            <span className="text-xs font-cinzel text-[#876e55] uppercase tracking-wider font-semibold">
              Vocabulary Intelligence · المفردات
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#755d46] hover:bg-[#ebdcc4] transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Word Header with Audio Pronunciation */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-lora text-[#2a2016]">
                {wordData.word}
              </h2>
              <button
                type="button"
                onClick={() => onSpeak(wordData.word)}
                className="p-2 rounded-full bg-[#7a121e] text-white hover:bg-[#941726] shadow-sm transition-transform active:scale-90 cursor-pointer"
                title="استمع إلى نطق الكلمة بالإنجليزية"
                aria-label="استمع إلى نطق الكلمة بالإنجليزية"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-1 text-xs text-[#785f47]">
              <span className="font-mono text-xs bg-[#ebe0cc] px-2 py-0.5 rounded border border-[#dacbb1]">
                {wordData.phonetic}
              </span>
              <span>·</span>
              <span className="italic font-lora text-amber-900 font-medium">
                {wordData.partOfSpeech}
              </span>
              <span>·</span>
              <span className="text-[10px] text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                {wordData.level}
              </span>
            </div>
          </div>

          {/* Save to Flashcards Button */}
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
              isSaved
                ? 'bg-emerald-800 text-white border-emerald-900'
                : 'bg-[#ebdcc4] hover:bg-[#e0cfb4] text-[#423121] border-[#d8c5a6]'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span className="text-[11px] font-amiri font-semibold">
              {isSaved ? 'تم الحفظ' : 'حفظ'}
            </span>
          </button>
        </div>

        {/* Arabic Translation Block (Clear & Big) */}
        <div
          className="bg-[#faeed6] border border-[#d8be92] rounded-xl p-3.5 mb-4 text-right shadow-xs"
          dir="rtl"
        >
          <div className="text-[11px] font-amiri text-[#8a6845] mb-0.5 font-bold">
            الترجمة العربية والمعنى السياقي:
          </div>
          <div className="text-xl font-bold font-amiri text-[#6b141e] leading-snug">
            {wordData.arabicTranslation}
          </div>
        </div>

        {/* English Definition */}
        <div className="mb-4">
          <div className="text-[11px] uppercase font-cinzel text-[#876e55] tracking-wider mb-1">
            English Definition
          </div>
          <p className="text-sm font-lora text-[#33271d] leading-relaxed bg-[#f2e7d3] p-3 rounded-lg border border-[#e2d5c0]">
            {wordData.englishDefinition}
          </p>
        </div>

        {/* Context Sentence */}
        <div className="mb-5">
          <div className="text-[11px] uppercase font-cinzel text-[#876e55] tracking-wider mb-1 flex items-center justify-between">
            <span>Literary Example</span>
            <button
              type="button"
              onClick={() => onSpeak(wordData.contextSentence)}
              className="text-[10px] text-[#7a121e] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-3 h-3" />
              Listen to example
            </button>
          </div>
          <blockquote className="text-xs font-lora italic text-[#3f3125] bg-[#ebdcc4]/60 p-3 rounded-lg border-l-2 border-[#7a121e]">
            "{wordData.contextSentence}"
          </blockquote>
        </div>

        {/* Quick Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#292019] text-[#f7eee2] text-sm font-medium hover:bg-[#382d24] transition-colors cursor-pointer"
        >
          متابعة القراءة (Continue Reading)
        </button>
      </div>
    </div>
  );
}
