/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Volume2, VolumeX, Sparkles, HelpCircle, Bookmark, Check } from 'lucide-react';
import { SentenceItem, WordToken, BookChapter } from '../data/bookData';
import { SpiderwebCorner } from './Spiderweb';

interface ReadingAreaProps {
  book: BookChapter;
  activeSentenceId: string | null;
  isPlayingAudio: boolean;
  onPlaySentenceAudio: (sentence: SentenceItem) => void;
  onSelectWord: (word: string, contextSentence: string, vocabKey?: string) => void;
  selectedWord: string | null;
  fontSize: 'sm' | 'md' | 'lg';
  showPinkHighlights: boolean;
  bilingualLayout: 'interleaved' | 'english-first' | 'side-by-side';
  bookmarkedSentences: Record<string, boolean>;
  onToggleBookmark: (id: string) => void;
  onOpenSavedModal?: () => void;
}

export function ReadingArea({
  book,
  activeSentenceId,
  isPlayingAudio,
  onPlaySentenceAudio,
  onSelectWord,
  selectedWord,
  fontSize,
  showPinkHighlights,
  bilingualLayout,
  bookmarkedSentences,
  onToggleBookmark,
  onOpenSavedModal,
}: ReadingAreaProps) {
  const savedCount = Object.values(bookmarkedSentences).filter(Boolean).length;

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'sm':
        return {
          arabic: 'text-base sm:text-lg leading-relaxed',
          english: 'text-sm sm:text-base leading-relaxed',
        };
      case 'lg':
        return {
          arabic: 'text-xl sm:text-2xl leading-loose',
          english: 'text-lg sm:text-xl leading-loose',
        };
      case 'md':
      default:
        return {
          arabic: 'text-lg sm:text-xl leading-loose',
          english: 'text-base sm:text-lg leading-relaxed',
        };
    }
  };

  const fontSizes = getFontSizeClasses();

  return (
    <div className="relative w-full max-w-md mx-auto px-3 sm:px-4 pb-24 pt-1">
      {/* Vintage Parchment Main Card */}
      <div className="relative parchment-bg rounded-2xl border border-[#d3c0a2] shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Subtle Spiderweb Watermarks in Corners */}
        <SpiderwebCorner className="spiderweb-corner-tl" size={90} opacity={0.25} />
        <SpiderwebCorner className="spiderweb-corner-tr" size={90} opacity={0.25} />
        <SpiderwebCorner className="spiderweb-corner-bl" size={80} opacity={0.22} />
        <SpiderwebCorner className="spiderweb-corner-br" size={80} opacity={0.22} />

        {/* Vintage Top Ornamental Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#ddcdb4] pb-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-[#785f46]">
            <span className="font-cinzel tracking-wider uppercase font-semibold text-[11px] text-[#845f36]">
              Chapter I · Roderick Usher
            </span>
          </div>

          <div className="flex items-center gap-2">
            {savedCount > 0 && onOpenSavedModal && (
              <button
                type="button"
                onClick={onOpenSavedModal}
                className="flex items-center gap-1 text-[11px] font-amiri text-[#7a121e] bg-[#fae5e8] hover:bg-[#f5d2d7] px-2.5 py-0.5 rounded-full border border-[#e8a2ac] transition-all cursor-pointer shadow-xs"
                title="عرض الجمل المحفوظة"
              >
                <Bookmark className="w-3 h-3 fill-current" />
                <span>المحفوظات ({savedCount})</span>
              </button>
            )}
            <span className="text-[11px] font-amiri text-[#6b5139] bg-[#f0e3cc] px-2 py-0.5 rounded border border-[#dfd1bb]">
              نص ثنائي تفاعلي
            </span>
          </div>
        </div>

        {/* Reading Tip Note */}
        <div className="relative z-10 mb-5 bg-[#f5ecda]/90 border border-[#dfceb5] rounded-xl p-2.5 flex items-center justify-between text-xs text-[#6e533d] shadow-xs">
          <div className="flex items-center gap-2" dir="rtl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f472b6] shrink-0 inline-block shadow-xs" />
            <span className="font-amiri text-xs text-[#523d2e]">
              اضغط على الكلمات المظللة بالوردي للترجمة، أو أيقونة 🔖 لحفظ الجملة
            </span>
          </div>
        </div>

        {/* Interleaved Bilingual Reading Area */}
        <div className="relative z-10 space-y-6">
          {book.sentences.map((item, index) => {
            const isActive = activeSentenceId === item.id;
            const isBookmarked = !!bookmarkedSentences[item.id];

            return (
              <div
                key={item.id}
                className={`relative p-3.5 rounded-xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#faeed6] border-[#cf9e58] shadow-md ring-2 ring-[#dfad65]/50'
                    : isBookmarked
                    ? 'bg-[#faf4e9] border-[#d8be92] shadow-xs'
                    : 'bg-[#faf5eb]/70 border-transparent hover:border-[#dfceb7] hover:bg-[#faf4e8]'
                }`}
              >
                {/* Sentence Top Bar: Number, Bookmark & Audio Trigger Icons */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-cinzel text-[#9c8269] tracking-wider uppercase font-semibold">
                      Paragraph 0{index + 1}
                    </span>
                    {isBookmarked && (
                      <span className="text-[10px] font-amiri text-[#7a121e] bg-[#fae3e6] px-1.5 py-0.2 rounded border border-[#e8a2ac] font-bold">
                        محفوظة 🔖
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Sentence Bookmark Icon Button */}
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(item.id)}
                      className={`min-h-[32px] px-2 py-1 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer border ${
                        isBookmarked
                          ? 'bg-[#fae3e6] text-[#7a121e] border-[#e8a2ac] shadow-xs font-bold'
                          : 'bg-[#ede0ca] hover:bg-[#e4d4ba] text-[#69533f] border-[#dacbb2]'
                      }`}
                      title={isBookmarked ? 'إلغاء حفظ هذه الجملة' : 'حفظ هذه الجملة في المفضلة'}
                      aria-label={isBookmarked ? 'إلغاء حفظ هذه الجملة' : 'حفظ هذه الجملة في المفضلة'}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                          isBookmarked ? 'fill-current text-[#7a121e]' : ''
                        }`}
                      />
                      <span className="text-[11px] font-amiri hidden sm:inline">
                        {isBookmarked ? 'محفوظة' : 'حفظ'}
                      </span>
                    </button>

                    {/* Sentence Audio Play Button */}
                    <button
                      type="button"
                      onClick={() => onPlaySentenceAudio(item)}
                      className={`min-h-[32px] px-2 py-1 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer border ${
                        isActive && isPlayingAudio
                          ? 'bg-[#7a121e] text-white border-[#580d15] shadow-xs'
                          : 'bg-[#ede0ca] hover:bg-[#e4d4ba] text-[#5e4732] border-[#dacbb2]'
                      }`}
                      title="استمع إلى هذه الجملة بصوت إنجليزي واضح"
                      aria-label="استمع إلى هذه الجملة بصوت إنجليزي واضح"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-amiri">
                        {isActive && isPlayingAudio ? 'إيقاف' : 'استمع'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Interleaved Structure: Sentence in Arabic first, followed immediately by original English below */}
                {bilingualLayout === 'english-first' ? (
                  <>
                    {/* English sentence first */}
                    <div className="mb-2">
                      <p className={`font-lora text-[#241e17] font-medium ${fontSizes.english}`}>
                        {renderEnglishTokens(
                          item.tokens,
                          item.english,
                          selectedWord,
                          showPinkHighlights,
                          onSelectWord
                        )}
                      </p>
                    </div>

                    {/* Arabic translation immediately below */}
                    <div className="border-t border-[#e2d4be] pt-2 mt-2" dir="rtl">
                      <p className={`font-amiri text-[#4d3b2b] ${fontSizes.arabic}`}>
                        {item.arabic}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Arabic sentence first (Standard Prompt Specification) */}
                    <div className="mb-2.5" dir="rtl">
                      <p className={`font-amiri text-[#2c221a] font-semibold ${fontSizes.arabic}`}>
                        {item.arabic}
                      </p>
                    </div>

                    {/* Original English sentence immediately below it */}
                    <div className="border-t border-[#e5d8c3] pt-2" dir="ltr">
                      <p className={`font-lora text-[#221b14] italic ${fontSizes.english}`}>
                        {renderEnglishTokens(
                          item.tokens,
                          item.english,
                          selectedWord,
                          showPinkHighlights,
                          onSelectWord
                        )}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Vintage Literary Footnote Divider */}
        <div className="relative z-10 mt-8 pt-4 border-t border-[#d8c8ae] text-center">
          <div className="inline-block px-3 py-1 text-[11px] font-cinzel text-[#876e55] tracking-widest uppercase">
            ❦ End of Excerpt · Edgar Allan Poe ❦
          </div>
        </div>
      </div>

      {/* Floating "Speaker" (audio) icon in the bottom right corner to play the narration */}
      <div className="fixed bottom-20 right-4 sm:right-6 md:right-8 z-30">
        <button
          type="button"
          onClick={() => {
            const firstOrActive = book.sentences.find((s) => s.id === activeSentenceId) || book.sentences[0];
            onPlaySentenceAudio(firstOrActive);
          }}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform active:scale-90 cursor-pointer border-2 ${
            isPlayingAudio
              ? 'bg-[#7a121e] border-amber-300 text-white ring-4 ring-[#7a121e]/40 animate-pulse'
              : 'bg-[#183926] border-[#367950] text-[#e8fbe8] hover:bg-[#204a32] shadow-emerald-950/40'
          }`}
          title="تشغيل / إيقاف الرواية الصوتية الإنجليزية"
          aria-label="تشغيل / إيقاف الرواية الصوتية الإنجليزية"
        >
          {isPlayingAudio ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-7 h-7 text-amber-300" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>
          ) : (
            <Volume2 className="w-7 h-7 text-white stroke-[2.2]" />
          )}
        </button>
      </div>
    </div>
  );
}

function renderEnglishTokens(
  tokens: WordToken[],
  fullSentence: string,
  selectedWord: string | null,
  showPinkHighlights: boolean,
  onSelectWord: (word: string, contextSentence: string, vocabKey?: string) => void
) {
  return tokens.map((token, idx) => {
    const isHighlighted = token.isHighlighted && showPinkHighlights;
    const isSelected = selectedWord && token.cleanWord && selectedWord.toLowerCase() === token.cleanWord.toLowerCase();

    if (isHighlighted) {
      return (
        <span key={idx}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectWord(token.cleanWord || token.text, fullSentence, token.vocabKey);
            }}
            className={`vocab-highlight ${isSelected ? 'vocab-highlight-active' : ''}`}
            title="انقر لعرض الترجمة والنطق الصوتي"
          >
            {token.text}
          </button>{' '}
        </span>
      );
    }

    // Allow clicking any word for lookup too
    const clean = token.text.replace(/[^a-zA-Z]/g, '');
    if (clean.length > 3) {
      return (
        <span key={idx}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              onSelectWord(clean, fullSentence, token.vocabKey);
            }}
            className="hover:underline hover:text-[#7a121e] cursor-pointer transition-colors"
          >
            {token.text}
          </span>{' '}
        </span>
      );
    }

    return <span key={idx}>{token.text} </span>;
  });
}
