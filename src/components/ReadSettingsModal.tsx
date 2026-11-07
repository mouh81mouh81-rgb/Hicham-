/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  X,
  Type,
  Bookmark,
  Check,
  Volume2,
  Trash2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { SentenceItem, BookChapter } from '../data/bookData';

interface ReadSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: 'sm' | 'md' | 'lg';
  setFontSize: (size: 'sm' | 'md' | 'lg') => void;
  showPinkHighlights: boolean;
  setShowPinkHighlights: (show: boolean) => void;
  bilingualLayout: 'interleaved' | 'english-first' | 'side-by-side';
  setBilingualLayout: (layout: 'interleaved' | 'english-first' | 'side-by-side') => void;
  book: BookChapter;
  bookmarkedSentences: Record<string, boolean>;
  onToggleBookmark: (id: string) => void;
  onPlaySentenceAudio: (sentence: SentenceItem) => void;
  initialTab?: 'settings' | 'saved';
}

export function ReadSettingsModal({
  isOpen,
  onClose,
  fontSize,
  setFontSize,
  showPinkHighlights,
  setShowPinkHighlights,
  bilingualLayout,
  setBilingualLayout,
  book,
  bookmarkedSentences,
  onToggleBookmark,
  onPlaySentenceAudio,
  initialTab = 'settings',
}: ReadSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'settings' | 'saved'>(initialTab);

  if (!isOpen) return null;

  // Filter bookmarked sentences
  const savedSentenceList = book.sentences.filter(
    (item) => bookmarkedSentences[item.id]
  );
  const savedCount = savedSentenceList.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#f7f2e4] rounded-t-3xl sm:rounded-2xl border-t sm:border border-[#cfbea0] shadow-2xl p-5 max-h-[88vh] flex flex-col"
        dir="rtl"
      >
        {/* Header with Title & Close */}
        <div className="flex items-center justify-between border-b border-[#dfcfb5] pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#7a121e]" />
            <h3 className="font-amiri font-bold text-lg text-[#2a2016]">
              {activeTab === 'saved' ? 'الجمل المحفوظة (Saved)' : 'تخصيص القراءة (اقرأ)'}
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

        {/* Tab Switcher: Settings vs Saved */}
        <div className="flex items-center gap-2 mb-4 bg-[#ede0cb] p-1 rounded-xl border border-[#d9c9b1] shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-amiri font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-white text-[#7a121e] shadow-xs'
                : 'text-[#69533f] hover:text-[#2a2016]'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>خيارات القراءة</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-amiri font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-white text-[#7a121e] shadow-xs'
                : 'text-[#69533f] hover:text-[#2a2016]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-current' : ''}`} />
            <span>الجمل المحفوظة</span>
            {savedCount > 0 && (
              <span className="bg-[#7a121e] text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                {savedCount}
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Saved View */}
        {activeTab === 'saved' ? (
          <div className="overflow-y-auto space-y-3 flex-1 pr-1">
            {savedSentenceList.length === 0 ? (
              <div className="text-center py-10 px-4 bg-[#f2e7d3] rounded-2xl border border-[#dfcfb8]">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#faeed6] border border-[#d4be99] flex items-center justify-center text-[#7a121e]">
                  <Bookmark className="w-6 h-6 stroke-[1.8]" />
                </div>
                <h4 className="font-amiri font-bold text-base text-[#2e2319] mb-1">
                  لا توجد جمل محفوظة بعد
                </h4>
                <p className="text-xs text-[#735b45] leading-relaxed max-w-xs mx-auto mb-4 font-amiri">
                  اضغط على أيقونة الإشارة المرجعية <Bookmark className="w-3.5 h-3.5 inline mx-1 text-[#7a121e]" /> بجانب أي جملة في منطقة القراءة لحفظها ومراجعتها هنا في أي وقت.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-[#7a121e] text-white font-amiri text-xs font-bold hover:bg-[#8f1826] transition-colors cursor-pointer"
                >
                  العودة للقراءة وحفظ الجمل
                </button>
              </div>
            ) : (
              savedSentenceList.map((sentence, idx) => (
                <div
                  key={sentence.id}
                  className="bg-[#faeed6] border border-[#d9c4a0] rounded-xl p-3.5 shadow-xs relative group transition-all hover:border-[#b88c4f]"
                >
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#e5d4bb]">
                    <span className="text-[11px] font-cinzel text-[#876e55] font-semibold">
                      Sentence 0{idx + 1}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Play Audio Button */}
                      <button
                        type="button"
                        onClick={() => onPlaySentenceAudio(sentence)}
                        className="p-1.5 rounded-lg bg-[#ebdcc4] hover:bg-[#e0cfb4] text-[#4d3826] transition-colors flex items-center gap-1 text-[11px] font-amiri cursor-pointer"
                        title="استمع إلى الجملة بالإنجليزية"
                        aria-label="استمع إلى الجملة بالإنجليزية"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#7a121e]" />
                        <span>استمع</span>
                      </button>

                      {/* Remove Bookmark Button */}
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(sentence.id)}
                        className="p-1.5 rounded-lg bg-[#fae3e6] hover:bg-[#f7d0d5] text-[#991b1b] transition-colors cursor-pointer"
                        title="إزالة من المحفوظات"
                        aria-label="إزالة من المحفوظات"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Translation */}
                  <p className="font-amiri font-bold text-sm text-[#2c221a] mb-2 leading-relaxed text-right">
                    {sentence.arabic}
                  </p>

                  {/* English Original */}
                  <p
                    className="font-lora italic text-xs text-[#423427] bg-[#f2e7d3] p-2.5 rounded-lg border border-[#e2d5c0] leading-relaxed text-left"
                    dir="ltr"
                  >
                    "{sentence.english}"
                  </p>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Tab 2: Settings View */
          <div className="overflow-y-auto space-y-5 flex-1 pr-1">
            {/* Font Size Selector */}
            <div>
              <label className="block text-xs font-amiri font-bold text-[#624b37] mb-2">
                حجم الخط (Text Size):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'sm', label: 'صغير', preview: 'A' },
                    { id: 'md', label: 'متوسط', preview: 'AA' },
                    { id: 'lg', label: 'كبير', preview: 'AAA' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFontSize(opt.id)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      fontSize === opt.id
                        ? 'bg-[#7a121e] text-white border-[#580d15] shadow-sm font-bold'
                        : 'bg-[#ede1cd] text-[#4d3826] border-[#dacbb2] hover:bg-[#e4d6bf]'
                    }`}
                  >
                    <div className="text-xs font-mono mb-0.5">{opt.preview}</div>
                    <div className="text-xs font-amiri">{opt.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bilingual Layout Selector */}
            <div>
              <label className="block text-xs font-amiri font-bold text-[#624b37] mb-2">
                ترتيب النص ثنائي اللغة:
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setBilingualLayout('interleaved')}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-right transition-all cursor-pointer ${
                    bilingualLayout === 'interleaved'
                      ? 'bg-[#faeed6] border-[#c4924c] text-[#3d2c1c]'
                      : 'bg-[#ede1cd] border-[#dacbb2] text-[#5c4532]'
                  }`}
                >
                  <div>
                    <div className="font-amiri font-bold text-sm">العربية أولاً ثم الإنجليزية أسفلها</div>
                    <div className="text-[11px] text-[#7a644f] font-sans">
                      Arabic sentence followed directly by English
                    </div>
                  </div>
                  {bilingualLayout === 'interleaved' && <Check className="w-4 h-4 text-[#7a121e]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setBilingualLayout('english-first')}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-right transition-all cursor-pointer ${
                    bilingualLayout === 'english-first'
                      ? 'bg-[#faeed6] border-[#c4924c] text-[#3d2c1c]'
                      : 'bg-[#ede1cd] border-[#dacbb2] text-[#5c4532]'
                  }`}
                >
                  <div>
                    <div className="font-amiri font-bold text-sm">الإنجليزية أولاً ثم الترجمة العربية</div>
                    <div className="text-[11px] text-[#7a644f] font-sans">
                      English original first followed by Arabic
                    </div>
                  </div>
                  {bilingualLayout === 'english-first' && <Check className="w-4 h-4 text-[#7a121e]" />}
                </button>
              </div>
            </div>

            {/* Pink Highlight Toggle */}
            <div className="bg-[#f0e3ce] p-3 rounded-xl border border-[#decbb2] flex items-center justify-between">
              <div>
                <div className="font-amiri font-bold text-sm text-[#2b2118] flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#f472b6] inline-block" />
                  <span>إبراز الكلمات التعليمية بالوردي</span>
                </div>
                <div className="text-[11px] text-[#705844]">
                  تظليل المفردات المهمة لتسهيل النقر والاستماع
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPinkHighlights(!showPinkHighlights)}
                className={`w-12 h-6 flex items-center rounded-full p-1 duration-200 cursor-pointer ${
                  showPinkHighlights ? 'bg-[#7a121e] justify-end' : 'bg-[#c2b29c] justify-start'
                }`}
                aria-label="تفعيل أو تعطيل التظليل الوردي"
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md transform" />
              </button>
            </div>
          </div>
        )}

        {/* Modal Bottom Action */}
        <div className="pt-3 border-t border-[#dfcfb5] mt-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#7a121e] hover:bg-[#8f1826] text-white font-amiri font-bold text-sm shadow-md transition-colors cursor-pointer"
          >
            إغلاق ومتابعة القراءة
          </button>
        </div>
      </div>
    </div>
  );
}
