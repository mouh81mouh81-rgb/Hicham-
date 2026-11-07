/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { ActionBar } from './components/ActionBar';
import { ReadingArea } from './components/ReadingArea';
import { StickyBottomBar } from './components/StickyBottomBar';
import { WordModal } from './components/WordModal';
import { ReadSettingsModal } from './components/ReadSettingsModal';
import { TranslateSheet } from './components/TranslateSheet';
import { OnboardingModal } from './components/OnboardingModal';
import {
  HOUSE_OF_USHER_BOOK,
  VOCABULARY_DICTIONARY,
  VocabDefinition,
  SentenceItem,
} from './data/bookData';
import { SpiderwebCorner } from './components/Spiderweb';

export default function App() {
  // Reading and Audio State
  const [currentBook, setCurrentBook] = useState(HOUSE_OF_USHER_BOOK);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSentenceIndex, setAudioSentenceIndex] = useState(0);

  // Bookmark state (initial state includes the famous Roderick Usher line)
  const [bookmarkedSentences, setBookmarkedSentences] = useState<Record<string, boolean>>({
    s3: true,
  });

  // Modals & Panels State
  const [selectedWordData, setSelectedWordData] = useState<VocabDefinition | null>(null);
  const [selectedWordKey, setSelectedWordKey] = useState<string | null>('influence');
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [readModalInitialTab, setReadModalInitialTab] = useState<'settings' | 'saved'>('settings');
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'read' | 'listen' | 'translate' | null>(null);

  // Customization State
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showPinkHighlights, setShowPinkHighlights] = useState(true);
  const [bilingualLayout, setBilingualLayout] = useState<'interleaved' | 'english-first' | 'side-by-side'>('interleaved');

  // Speech Synthesis reference
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Play narration of a sentence or sequence
  const playSentenceNarration = (sentence: SentenceItem, index?: number) => {
    if (!synthRef.current) return;

    if (isPlayingAudio && activeSentenceId === sentence.id) {
      synthRef.current.cancel();
      setIsPlayingAudio(false);
      setActiveSentenceId(null);
      return;
    }

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(sentence.english);
    utterance.lang = 'en-US';
    utterance.rate = 0.88; // Poe's literature cadence
    utterance.pitch = 0.95;

    // Pick a natural English voice if available
    const voices = synthRef.current.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Daniel') ||
          v.name.includes('Samantha'))
    );
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setActiveSentenceId(sentence.id);
      if (typeof index === 'number') {
        setAudioSentenceIndex(index);
      }
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setActiveSentenceId(null);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setActiveSentenceId(null);
    };

    synthRef.current.speak(utterance);
  };

  // Speak a single word or phrase (for dictionary lookups)
  const speakWord = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    synthRef.current.speak(utterance);
  };

  // Handle word selection
  const handleSelectWord = (word: string, contextSentence: string, vocabKey?: string) => {
    const key = (vocabKey || word).toLowerCase();
    const existing = VOCABULARY_DICTIONARY[key];

    if (existing) {
      setSelectedWordData(existing);
      setSelectedWordKey(key);
    } else {
      setSelectedWordData({
        word: word,
        phonetic: `/${word.toLowerCase()}/`,
        partOfSpeech: 'word in context',
        arabicTranslation: `ترجمة السياق: ${word}`,
        englishDefinition: `Classic literature term occurring in: "${contextSentence.slice(0, 80)}..."`,
        contextSentence: contextSentence,
        level: 'Intermediate',
      });
      setSelectedWordKey(word);
    }

    speakWord(word);
  };

  // Toggle bookmark on a sentence
  const handleToggleBookmark = (id: string) => {
    setBookmarkedSentences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Action bar buttons
  const handleToggleRead = (tab: 'settings' | 'saved' = 'settings') => {
    setActiveTab(activeTab === 'read' ? null : 'read');
    setReadModalInitialTab(tab);
    setIsReadModalOpen(true);
  };

  const handleToggleListen = () => {
    setActiveTab('listen');
    if (isPlayingAudio) {
      if (synthRef.current) synthRef.current.cancel();
      setIsPlayingAudio(false);
      setActiveSentenceId(null);
    } else {
      const targetSentence = currentBook.sentences[2] || currentBook.sentences[0];
      playSentenceNarration(targetSentence, 2);
    }
  };

  const handleToggleTranslate = () => {
    setActiveTab(activeTab === 'translate' ? null : 'translate');
    setIsTranslateOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#14110f] text-[#2b241c] flex flex-col items-center justify-start selection:bg-[#fbcfe8] selection:text-[#831843]">
      {/* Background Ambience & Delicate corner webs for wide screens */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a1e15] via-[#14110f] to-[#0c0a09]" />

      {/* Main Mobile Applet Shell (Mobile-First Container) */}
      <main className="relative w-full max-w-md min-h-screen flex flex-col bg-[#1c1713] shadow-2xl border-x border-[#382b20]/60 overflow-x-hidden">
        {/* Subtle Web Watermarks at Outer Mobile Shell Edges */}
        <SpiderwebCorner className="spiderweb-corner-tl" size={100} opacity={0.15} />
        <SpiderwebCorner className="spiderweb-corner-tr" size={100} opacity={0.15} />

        {/* 1. Hero Section (Top) */}
        <HeroSection
          onOpenBookSelector={() => setIsTranslateOpen(true)}
          dailyStreak={3}
        />

        {/* 2. Action Bar (Middle) */}
        <ActionBar
          onToggleReadMode={() => handleToggleRead('settings')}
          onToggleListen={handleToggleListen}
          onToggleTranslate={handleToggleTranslate}
          isPlayingAudio={isPlayingAudio}
          activeTab={activeTab}
        />

        {/* 3. Reading Area (Bottom) with interleaved bilingual text & bookmark support */}
        <ReadingArea
          book={currentBook}
          activeSentenceId={activeSentenceId}
          isPlayingAudio={isPlayingAudio}
          onPlaySentenceAudio={playSentenceNarration}
          onSelectWord={handleSelectWord}
          selectedWord={selectedWordKey}
          fontSize={fontSize}
          showPinkHighlights={showPinkHighlights}
          bilingualLayout={bilingualLayout}
          bookmarkedSentences={bookmarkedSentences}
          onToggleBookmark={handleToggleBookmark}
          onOpenSavedModal={() => handleToggleRead('saved')}
        />

        {/* 4. Footer / Sticky Bottom Bar */}
        <StickyBottomBar onStartFree={() => setIsOnboardingOpen(true)} />

        {/* Word Vocabulary Intelligence Modal */}
        <WordModal
          wordData={selectedWordData}
          onClose={() => setSelectedWordData(null)}
          onSpeak={speakWord}
        />

        {/* Read Settings Modal ("اقرأ") with Settings and Saved Tabs */}
        <ReadSettingsModal
          isOpen={isReadModalOpen}
          onClose={() => {
            setIsReadModalOpen(false);
            if (activeTab === 'read') setActiveTab(null);
          }}
          fontSize={fontSize}
          setFontSize={setFontSize}
          showPinkHighlights={showPinkHighlights}
          setShowPinkHighlights={setShowPinkHighlights}
          bilingualLayout={bilingualLayout}
          setBilingualLayout={setBilingualLayout}
          book={currentBook}
          bookmarkedSentences={bookmarkedSentences}
          onToggleBookmark={handleToggleBookmark}
          onPlaySentenceAudio={playSentenceNarration}
          initialTab={readModalInitialTab}
        />

        {/* Translation & Dictionary Sheet ("ترجم") */}
        <TranslateSheet
          isOpen={isTranslateOpen}
          onClose={() => {
            setIsTranslateOpen(false);
            if (activeTab === 'translate') setActiveTab(null);
          }}
          onSelectWord={handleSelectWord}
          onSpeak={speakWord}
        />

        {/* Onboarding & App Activation ("Utiliser l'application") */}
        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
        />
      </main>
    </div>
  );
}
