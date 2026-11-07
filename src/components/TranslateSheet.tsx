/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Search, Volume2, Globe, Sparkles, BookOpen } from 'lucide-react';
import { VOCABULARY_DICTIONARY, VocabDefinition } from '../data/bookData';

interface TranslateSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWord: (word: string, contextSentence: string, vocabKey?: string) => void;
  onSpeak: (text: string) => void;
}

export function TranslateSheet({ isOpen, onClose, onSelectWord, onSpeak }: TranslateSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const vocabList = Object.values(VOCABULARY_DICTIONARY);
  const filteredVocab = vocabList.filter(
    (item) =>
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.arabicTranslation.includes(searchQuery) ||
      item.englishDefinition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#f7f2e4] rounded-t-3xl sm:rounded-2xl border-t sm:border border-[#cfbea0] shadow-2xl p-5 max-h-[85vh] flex flex-col"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dfcfb5] pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#7a121e]" />
            <h3 className="font-amiri font-bold text-lg text-[#2a2016]">
              قاموس الترجمة والمفردات الأدبية (ترجم)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#755d46] hover:bg-[#ebdcc4] transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="relative mb-3 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن كلمة إنجليزية أو معنى بالعربية..."
            className="w-full bg-[#f0e4cf] border border-[#dacab0] text-[#2c2118] placeholder-[#8c745f] text-xs rounded-xl py-2.5 px-9 focus:outline-hidden focus:ring-2 focus:ring-[#7a121e]"
          />
          <Search className="w-4 h-4 text-[#8c745f] absolute right-3 top-3" />
        </div>

        {/* Quick List */}
        <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
          {filteredVocab.map((item) => (
            <div
              key={item.word}
              className="bg-[#faeed6] border border-[#dcc59f] rounded-xl p-3 hover:border-[#b88c4f] transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5" dir="ltr">
                <div className="flex items-center gap-2">
                  <span className="font-lora font-bold text-base text-[#241a12]">
                    {item.word}
                  </span>
                  <span className="text-[11px] font-mono text-[#785f47] bg-[#ede0cb] px-1.5 py-0.5 rounded">
                    {item.phonetic}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSpeak(item.word)}
                    className="p-1 text-[#7a121e] hover:bg-[#ebd8bd] rounded-full transition-colors cursor-pointer"
                    title="نطق"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                  {item.level}
                </span>
              </div>

              {/* Arabic Translation */}
              <div className="text-right font-amiri font-bold text-sm text-[#7a121e] mb-1">
                {item.arabicTranslation}
              </div>

              {/* Definition */}
              <div className="text-left font-lora text-xs text-[#523e2d] mb-2 leading-relaxed" dir="ltr">
                {item.englishDefinition}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#e2d0b5]">
                <span className="text-[10px] text-[#8c745e] italic font-lora">
                  part: {item.partOfSpeech}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectWord(item.word, item.contextSentence, item.word);
                  }}
                  className="text-xs font-amiri font-semibold text-[#7a121e] hover:underline cursor-pointer"
                >
                  عرض التفاصيل والبطاقة ←
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#dfcfb5] mt-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-[#292019] text-[#f7eee2] text-xs font-amiri font-bold cursor-pointer"
          >
            العودة إلى القراءة
          </button>
        </div>
      </div>
    </div>
  );
}
