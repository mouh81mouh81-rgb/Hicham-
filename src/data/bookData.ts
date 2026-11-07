/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WordToken {
  text: string;
  isHighlighted?: boolean;
  vocabKey?: string;
  cleanWord?: string;
}

export interface SentenceItem {
  id: string;
  arabic: string;
  english: string;
  tokens: WordToken[];
  audioStartMs?: number;
  audioDurationMs?: number;
}

export interface VocabDefinition {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  arabicTranslation: string;
  englishDefinition: string;
  contextSentence: string;
  level: 'Intermediate' | 'Advanced' | 'Literary';
}

export interface BookChapter {
  id: string;
  bookTitleEnglish: string;
  bookTitleArabic: string;
  authorEnglish: string;
  authorArabic: string;
  coverImage: string;
  summaryArabic: string;
  readingTimeMinutes: number;
  sentences: SentenceItem[];
  vocabularyMap: Record<string, VocabDefinition>;
}

export const VOCABULARY_DICTIONARY: Record<string, VocabDefinition> = {
  power: {
    word: 'power',
    phonetic: '/ˈpaʊ.ər/',
    partOfSpeech: 'noun',
    arabicTranslation: 'سلطة / قوّة / سطوة',
    englishDefinition: 'The ability or capacity to do something or act in a particular way; influence over others.',
    contextSentence: 'An unreasoning terror held absolute power over his trembling heart.',
    level: 'Intermediate',
  },
  escape: {
    word: 'escape',
    phonetic: '/ɪˈskeɪp/',
    partOfSpeech: 'verb',
    arabicTranslation: 'الهروب / النجاة / التخلّص',
    englishDefinition: 'Break free from confinement or control; elude or succeed in avoiding.',
    contextSentence: 'He sought vainly to escape the grim shadow that stalked his ancestral halls.',
    level: 'Intermediate',
  },
  influence: {
    word: 'influence',
    phonetic: '/ˈɪn.flu.əns/',
    partOfSpeech: 'noun',
    arabicTranslation: 'تأثير / نفوذ / هيمنة',
    englishDefinition: 'The capacity to have an effect on the character, development, or behaviour of someone or something.',
    contextSentence: 'The dark influence of the antique mansion seemed to seep into the very air.',
    level: 'Advanced',
  },
  oppressive: {
    word: 'oppressive',
    phonetic: '/əˈpres.ɪv/',
    partOfSpeech: 'adjective',
    arabicTranslation: 'خانق / كئيب / مُرهِق',
    englishDefinition: 'Inflicting harsh and authoritarian treatment; weighing heavily on the mind or spirits.',
    contextSentence: 'A feeling of oppressive sorrow fell like a heavy shroud across the room.',
    level: 'Advanced',
  },
  melancholy: {
    word: 'melancholy',
    phonetic: '/ˈmel.əŋ.kɒl.i/',
    partOfSpeech: 'noun / adjective',
    arabicTranslation: 'سوداوية / كآبة عميقة',
    englishDefinition: 'A feeling of pensive sadness, typically with no obvious cause.',
    contextSentence: 'His eyes shone with a wild, melancholy luster that frightened his friend.',
    level: 'Literary',
  },
  gloomy: {
    word: 'gloomy',
    phonetic: '/ˈɡluː.mi/',
    partOfSpeech: 'adjective',
    arabicTranslation: 'مُظلِم / كئيب / عابس',
    englishDefinition: 'Dark or poorly lit, especially so as to appear depressing or frightening.',
    contextSentence: 'The gloomy tarn mirrored the cracked stones of the crumbling castle.',
    level: 'Intermediate',
  },
  insufferable: {
    word: 'insufferable',
    phonetic: '/ɪnˈsʌf.ər.ə.bəl/',
    partOfSpeech: 'adjective',
    arabicTranslation: 'لا يُطاق / لا يُحتمل',
    englishDefinition: 'Too extreme to bear; intolerable.',
    contextSentence: 'With the first glimpse of the building, a sense of insufferable gloom pervaded my spirit.',
    level: 'Literary',
  },
};

export const HOUSE_OF_USHER_BOOK: BookChapter = {
  id: 'usher',
  bookTitleEnglish: 'The Fall of the House of Usher',
  bookTitleArabic: 'سقوط منزل آشر',
  authorEnglish: 'Edgar Allan Poe',
  authorArabic: 'إدغار آلان بو',
  coverImage: '/src/assets/images/gothic_usher_castle_1794041677640.jpg',
  summaryArabic: 'قصة قوطية كلاسيكية تستكشف أسرار العائلة المتداعية والجنون والغموض في قصر آشر الموحش.',
  readingTimeMinutes: 10,
  vocabularyMap: VOCABULARY_DICTIONARY,
  sentences: [
    {
      id: 's1',
      arabic: 'طوال يوم خريفي كئيب ومظلم وبلا صوت، عندما تدلت الغيوم في السماء بشكل خانق، كنت أعبر بمفردي منطقة موحشة بشكل غريب.',
      english: 'During the whole of a dull, dark, and soundless day in the autumn of the year, when the clouds hung oppressively low in the heavens, I had been passing alone, on horseback, through a singularly dreary tract of country.',
      tokens: [
        { text: 'During' },
        { text: 'the' },
        { text: 'whole' },
        { text: 'of' },
        { text: 'a' },
        { text: 'dull,' },
        { text: 'dark,' },
        { text: 'and' },
        { text: 'soundless' },
        { text: 'day' },
        { text: 'in' },
        { text: 'the' },
        { text: 'autumn' },
        { text: 'of' },
        { text: 'the' },
        { text: 'year,' },
        { text: 'when' },
        { text: 'the' },
        { text: 'clouds' },
        { text: 'hung' },
        { text: 'oppressively', isHighlighted: true, vocabKey: 'oppressive', cleanWord: 'oppressively' },
        { text: 'low' },
        { text: 'in' },
        { text: 'the' },
        { text: 'heavens,' },
        { text: 'I' },
        { text: 'had' },
        { text: 'been' },
        { text: 'passing' },
        { text: 'alone,' },
        { text: 'through' },
        { text: 'a' },
        { text: 'singularly' },
        { text: 'dreary' },
        { text: 'country.' },
      ],
    },
    {
      id: 's2',
      arabic: 'ومع أول نظرة إلى المبنى، تسلل شعور بالكآبة التي لا تُطاق إلى روحي.',
      english: 'With the first glimpse of the building, a sense of insufferable gloom pervaded my spirit.',
      tokens: [
        { text: 'With' },
        { text: 'the' },
        { text: 'first' },
        { text: 'glimpse' },
        { text: 'of' },
        { text: 'the' },
        { text: 'building,' },
        { text: 'a' },
        { text: 'sense' },
        { text: 'of' },
        { text: 'insufferable', isHighlighted: true, vocabKey: 'insufferable', cleanWord: 'insufferable' },
        { text: 'gloom', isHighlighted: true, vocabKey: 'gloomy', cleanWord: 'gloom' },
        { text: 'pervaded' },
        { text: 'my' },
        { text: 'spirit.' },
      ],
    },
    {
      id: 's3',
      arabic: '"سلطة على عقلي، ولا أستطيع الهروب من تأثيره المظلم،" قال رودريك بصوت يرتجف من الحزن.',
      english: '"power over my mind, and I cannot escape its dark influence," said Roderick in a voice that trembled with sorrow.',
      tokens: [
        { text: '"' },
        { text: 'power', isHighlighted: true, vocabKey: 'power', cleanWord: 'power' },
        { text: 'over' },
        { text: 'my' },
        { text: 'mind,' },
        { text: 'and' },
        { text: 'I' },
        { text: 'cannot' },
        { text: 'escape', isHighlighted: true, vocabKey: 'escape', cleanWord: 'escape' },
        { text: 'its' },
        { text: 'dark' },
        { text: 'influence,"', isHighlighted: true, vocabKey: 'influence', cleanWord: 'influence' },
        { text: 'said' },
        { text: 'Roderick' },
        { text: 'in' },
        { text: 'a' },
        { text: 'voice' },
        { text: 'that' },
        { text: 'trembled' },
        { text: 'with' },
        { text: 'sorrow.' },
      ],
    },
    {
      id: 's4',
      arabic: 'كانت تحيط به هالة من الكآبة القاتمة؛ ووسط هذا الصمت المخيف، بدت كل جدران القلعة تنبض بالرهبة.',
      english: 'A dark, brooding melancholy surrounded him; amidst this terrible silence, the antique stone walls seemed to breathe a sinister warning.',
      tokens: [
        { text: 'A' },
        { text: 'dark,' },
        { text: 'brooding' },
        { text: 'melancholy', isHighlighted: true, vocabKey: 'melancholy', cleanWord: 'melancholy' },
        { text: 'surrounded' },
        { text: 'him;' },
        { text: 'amidst' },
        { text: 'this' },
        { text: 'terrible' },
        { text: 'silence,' },
        { text: 'the' },
        { text: 'antique' },
        { text: 'stone' },
        { text: 'walls' },
        { text: 'seemed' },
        { text: 'to' },
        { text: 'breathe' },
        { text: 'a' },
        { text: 'sinister' },
        { text: 'warning.' },
      ],
    },
  ],
};

export const OTHER_CLASSICS = [
  {
    id: 'usher',
    titleEn: 'The Fall of the House of Usher',
    titleAr: 'سقوط منزل آشر',
    author: 'Edgar Allan Poe',
    genre: 'Gothic Horror',
    badge: 'الحالي',
  },
  {
    id: 'dracula',
    titleEn: 'Dracula',
    titleAr: 'دراكولا',
    author: 'Bram Stoker',
    genre: 'Gothic Mystery',
    badge: 'قريباً',
  },
  {
    id: 'frankenstein',
    titleEn: 'Frankenstein',
    titleAr: 'فرانكنشتاين',
    author: 'Mary Shelley',
    genre: 'Science Fiction',
    badge: 'قريباً',
  },
];
