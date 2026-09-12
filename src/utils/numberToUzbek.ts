/**
 * Natural sonlarni o'zbek tilida so'z bilan ifodalash va sinflarga ajratish yordamchi funksiyalari
 */

const ONES: Record<number, string> = {
  1: 'bir',
  2: 'ikki',
  3: 'uch',
  4: 'to‘rt',
  5: 'besh',
  6: 'olti',
  7: 'yetti',
  8: 'sakkiz',
  9: 'to‘qqiz',
};

const TENS: Record<number, string> = {
  1: 'o‘n',
  2: 'yigirma',
  3: 'o‘ttiz',
  4: 'qirq',
  5: 'ellik',
  6: 'oltmish',
  7: 'yetmish',
  8: 'sakson',
  9: 'to‘qson',
};

export const CLASS_NAMES = [
  'Birliklar sinfi',
  'Minglar sinfi',
  'Millionlar sinfi',
  'Milliardlar sinfi',
  'Trillionlar sinfi',
];

export const CLASS_SHORT_NAMES = [
  '',
  'ming',
  'million',
  'milliard',
  'trillion',
];

export const CLASS_COLORS = [
  { bg: 'bg-emerald-500/10', border: 'border-emerald-500/40', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' },
  { bg: 'bg-cyan-500/10', border: 'border-cyan-500/40', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300' },
  { bg: 'bg-amber-500/10', border: 'border-amber-500/40', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300' },
  { bg: 'bg-purple-500/10', border: 'border-purple-500/40', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' },
  { bg: 'bg-rose-500/10', border: 'border-rose-500/40', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300' },
];

/**
 * 3 xonali guruhni (0-999) o'zbekcha so'zga aylantiradi
 */
export function tripletToUzbek(num: number): string {
  if (num === 0) return '';
  const parts: string[] = [];

  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;
  const tens = Math.floor(remainder / 10);
  const ones = remainder % 10;

  if (hundreds > 0) {
    if (hundreds === 1) {
      parts.push('bir yuz');
    } else {
      parts.push(`${ONES[hundreds]} yuz`);
    }
  }

  if (tens > 0) {
    parts.push(TENS[tens]);
  }

  if (ones > 0) {
    parts.push(ONES[ones]);
  }

  return parts.join(' ');
}

/**
 * Istalgan natural sonni yoki 0 ni to'liq o'zbek tilidagi so'zga aylantiradi
 */
export function numberToUzbekWords(input: string | number | bigint): string {
  const cleanStr = String(input).replace(/\s+/g, '').replace(/[^0-9]/g, '');
  if (!cleanStr) return '';
  if (cleanStr === '0') return 'nol';

  // Sonni chap tomondagi ortiqcha 0 lardan tozalash
  const trimmed = cleanStr.replace(/^0+/, '') || '0';
  if (trimmed === '0') return 'nol';

  // 3 xonadan guruhlarga ajratish (o'ngdan chapga)
  const triplets: number[] = [];
  let s = trimmed;
  while (s.length > 0) {
    const chunk = s.slice(Math.max(0, s.length - 3));
    triplets.push(parseInt(chunk, 10));
    s = s.slice(0, Math.max(0, s.length - 3));
  }

  const words: string[] = [];

  for (let i = triplets.length - 1; i >= 0; i--) {
    const tripletVal = triplets[i];
    if (tripletVal === 0) continue;

    const tripletWords = tripletToUzbek(tripletVal);
    const className = CLASS_SHORT_NAMES[i];

    if (className) {
      words.push(`${tripletWords} ${className}`);
    } else {
      words.push(tripletWords);
    }
  }

  return words.join(' ').trim();
}

/**
 * Sonni probellar bilan 3 xonali guruhlarga formatlash (masalan, 12500700 -> "12 500 700")
 */
export function formatWithSpaces(input: string | number | bigint): string {
  const cleanStr = String(input).replace(/\s+/g, '').replace(/[^0-9]/g, '');
  if (!cleanStr) return '';
  const trimmed = cleanStr.replace(/^0+/, '') || '0';
  return trimmed.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export interface ClassBreakdown {
  index: number;
  className: string;
  shortName: string;
  rawTriplet: string;
  numberValue: number;
  reading: string;
  color: typeof CLASS_COLORS[0];
}

/**
 * Sonni sinflar bo'yicha tahlil qilib beradi
 */
export function splitIntoClasses(input: string | number | bigint): ClassBreakdown[] {
  const cleanStr = String(input).replace(/\s+/g, '').replace(/[^0-9]/g, '');
  if (!cleanStr) return [];
  const trimmed = cleanStr.replace(/^0+/, '') || '0';

  const rawChunks: string[] = [];
  let s = trimmed;
  while (s.length > 0) {
    const chunk = s.slice(Math.max(0, s.length - 3));
    rawChunks.push(chunk);
    s = s.slice(0, Math.max(0, s.length - 3));
  }

  const result: ClassBreakdown[] = [];
  for (let i = 0; i < rawChunks.length; i++) {
    const rawTriplet = rawChunks[i];
    const val = parseInt(rawTriplet, 10);
    const cName = CLASS_NAMES[i] || `${i + 1}-sinf`;
    const sName = CLASS_SHORT_NAMES[i] || '';
    const color = CLASS_COLORS[i % CLASS_COLORS.length];
    const read = tripletToUzbek(val);
    const fullClassReading = val === 0 ? 'Nollar (o‘qilmaydi)' : (sName ? `${read} ${sName}` : read);

    result.push({
      index: i,
      className: cName,
      shortName: sName,
      rawTriplet,
      numberValue: val,
      reading: fullClassReading,
      color,
    });
  }

  // Yuqori sinfdan (chapdan o'ngga) qaytarish
  return result.reverse();
}

/**
 * Sonning har bir raqami bo'yicha xonalarini tahlil qilish (o'ngdan chapga: 1-birlik, 2-o'nlik, 3-yuzlik, ...)
 */
export interface PlaceBreakdown {
  digit: string;
  positionFromRight: number; // 1-indexed
  placeName: string;
  classIndex: number;
  className: string;
  placeValue: string;
}

const PLACE_NAMES_IN_CLASS = ['birlik', 'o‘nlik', 'yuzlik'];

export function decomposePlaces(input: string | number | bigint): PlaceBreakdown[] {
  const cleanStr = String(input).replace(/\s+/g, '').replace(/[^0-9]/g, '');
  if (!cleanStr) return [];
  const trimmed = cleanStr.replace(/^0+/, '') || '0';

  const results: PlaceBreakdown[] = [];
  const len = trimmed.length;

  for (let i = 0; i < len; i++) {
    const digit = trimmed[i];
    const posFromRight = len - i; // 1 = oxirgi raqam
    const classIdx = Math.floor((posFromRight - 1) / 3);
    const inClassPos = (posFromRight - 1) % 3; // 0=birlik, 1=o'nlik, 2=yuzlik

    const classBase = CLASS_SHORT_NAMES[classIdx];
    let placeName = PLACE_NAMES_IN_CLASS[inClassPos];
    if (classBase) {
      placeName = `${classBase}lar ${placeName}i`;
    } else {
      placeName = `${placeName}lar xonasi`;
    }

    const multiplier = '1' + '0'.repeat(posFromRight - 1);
    const valString = digit === '0' ? '0' : formatWithSpaces(BigInt(digit) * BigInt(multiplier));

    results.push({
      digit,
      positionFromRight: posFromRight,
      placeName,
      classIndex: classIdx,
      className: CLASS_NAMES[classIdx] || `${classIdx + 1}-sinf`,
      placeValue: valString,
    });
  }

  return results;
}

/**
 * O'zbekcha matndan sonni taxminiy tiklash (o'rganish trenajyori uchun)
 */
export function uzbekWordsToNumber(text: string): string | null {
  const normalized = text.toLowerCase().replace(/[\.,]/g, '').trim().replace(/\s+/g, ' ');
  if (!normalized) return null;
  if (normalized === 'nol') return '0';

  const wordMap: Record<string, { val: number; type: 'unit' | 'ten' | 'hundred' | 'class' }> = {
    'bir': { val: 1, type: 'unit' },
    'ikki': { val: 2, type: 'unit' },
    'uch': { val: 3, type: 'unit' },
    'to‘rt': { val: 4, type: 'unit' },
    'tort': { val: 4, type: 'unit' },
    'to\'rt': { val: 4, type: 'unit' },
    'besh': { val: 5, type: 'unit' },
    'olti': { val: 6, type: 'unit' },
    'yetti': { val: 7, type: 'unit' },
    'sakkiz': { val: 8, type: 'unit' },
    'to‘qqiz': { val: 9, type: 'unit' },
    'toqqiz': { val: 9, type: 'unit' },
    'to\'qqiz': { val: 9, type: 'unit' },

    'o‘n': { val: 10, type: 'ten' },
    'on': { val: 10, type: 'ten' },
    'o\'n': { val: 10, type: 'ten' },
    'yigirma': { val: 20, type: 'ten' },
    'o‘ttiz': { val: 30, type: 'ten' },
    'ottiz': { val: 30, type: 'ten' },
    'o\'ttiz': { val: 30, type: 'ten' },
    'qirq': { val: 40, type: 'ten' },
    'ellik': { val: 50, type: 'ten' },
    'oltmish': { val: 60, type: 'ten' },
    'yetmish': { val: 70, type: 'ten' },
    'sakson': { val: 80, type: 'ten' },
    'to‘qson': { val: 90, type: 'ten' },
    'toqson': { val: 90, type: 'ten' },
    'to\'qson': { val: 90, type: 'ten' },

    'yuz': { val: 100, type: 'hundred' },
    'ming': { val: 1000, type: 'class' },
    'million': { val: 1000000, type: 'class' },
    'milliard': { val: 1000000000, type: 'class' },
    'trillion': { val: 1000000000000, type: 'class' },
  };

  const words = normalized.split(' ');
  let total = 0n;
  let currentClassTotal = 0n;
  let currentNumber = 0n;

  for (const w of words) {
    const item = wordMap[w];
    if (!item) return null;

    if (item.type === 'unit' || item.type === 'ten') {
      currentNumber += BigInt(item.val);
    } else if (item.type === 'hundred') {
      if (currentNumber === 0n) currentNumber = 1n;
      currentClassTotal += currentNumber * 100n;
      currentNumber = 0n;
    } else if (item.type === 'class') {
      currentClassTotal += currentNumber;
      if (currentClassTotal === 0n && w === 'ming') {
        // "ming" deyilganda (masalan "ming ikki yuz")
        currentClassTotal = 1n;
      }
      total += currentClassTotal * BigInt(item.val);
      currentClassTotal = 0n;
      currentNumber = 0n;
    }
  }

  total += currentClassTotal + currentNumber;
  return total.toString();
}

/**
 * Web Speech API orqali ovozli o'qish (brauzer qo'llab-quvvatlasa)
 */
export function speakUzbek(text: string): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'uz-UZ';
    utterance.rate = 0.85;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    return false;
  }
}
