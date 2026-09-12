import React, { useState } from 'react';
import { 
  Calculator, 
  Volume2, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Copy, 
  Check, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { 
  formatWithSpaces, 
  numberToUzbekWords, 
  splitIntoClasses, 
  decomposePlaces,
  speakUzbek,
  uzbekWordsToNumber
} from '../utils/numberToUzbek';

export const NumberReaderLab: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('25300612');
  const [copied, setCopied] = useState<boolean>(false);
  const [mode, setMode] = useState<'num_to_words' | 'words_to_num'>('num_to_words');
  const [wordInput, setWordInput] = useState<string>('o‘ttiz million to‘rt yuz ming ellik');

  const cleanNum = inputVal.replace(/\s+/g, '').replace(/[^0-9]/g, '');
  const uzbekWords = numberToUzbekWords(cleanNum);
  const classes = splitIntoClasses(cleanNum);
  const places = decomposePlaces(cleanNum);

  const presets = [
    { label: 'O‘zbekiston aholisi', num: '37200000' },
    { label: 'Quyoshgacha masofa (km)', num: '149600000' },
    { label: 'Dunyo aholisi', num: '8100000000' },
    { label: 'Nollar qoidasi', num: '50060700' },
    { label: '1 Trillion', num: '1000000000000' },
    { label: 'Murakkab misol', num: '105020400700' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(uzbekWords);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convertedNumberFromWords = uzbekWordsToNumber(wordInput);

  return (
    <div className="space-y-8 pb-16" id="lab-container">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 uppercase tracking-wider">
          Interaktiv Trenajyor
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          SON O‘QUVCHI VA TAHLIL LABORATORIYASI
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Istalgan ko‘p xonali sonni kiriting. Tizim uni avtomatik sinflarga, xonalarga ajratadi va to‘g‘ri o‘qilishini taqdim etadi.
        </p>

        {/* Mode switcher */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setMode('num_to_words')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'num_to_words' 
                ? 'bg-cyan-500 text-slate-950 shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Raqamdan → So‘zga (O‘qish)
          </button>
          <button
            onClick={() => setMode('words_to_num')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'words_to_num' 
                ? 'bg-cyan-500 text-slate-950 shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            So‘zdan → Raqamga (Qurish)
          </button>
        </div>
      </div>

      {mode === 'num_to_words' ? (
        <div className="space-y-6">
          
          {/* Input & Presets Card */}
          <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Natural sonni kiriting (raqamlarda):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formatWithSpaces(cleanNum)}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Masalan: 25 300 612"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 text-2xl sm:text-3xl font-black font-mono text-cyan-400 tracking-wider outline-none transition-colors"
                />
                {cleanNum && (
                  <button
                    onClick={() => setInputVal('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-bold px-2 py-1 rounded-md bg-slate-800"
                  >
                    Tozalash
                  </button>
                )}
              </div>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400">Tezkor namunalar:</div>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setInputVal(p.num)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
                  >
                    {p.label} ({formatWithSpaces(p.num)})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* O‘qilishi Natijasi */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0c1a33] to-[#0f172a] border-2 border-cyan-500/30 p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                O‘zbek tilidagi to‘liq o‘qilishi:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
                  title="Nusxalash"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Nusxalandi' : 'Nusxa'}</span>
                </button>
                <button
                  onClick={() => speakUzbek(uzbekWords)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-all shadow-md"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Ovozli eshitish</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-xl sm:text-2xl font-bold text-white leading-relaxed tracking-wide">
              {uzbekWords ? `«${uzbekWords}»` : 'Iltimos, son kiriting'}
            </div>
          </div>

          {/* Sinflar Tahlili (3 talik guruhlar) */}
          <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  Sinflar bo‘yicha vizual ajratish (3 talik guruhlar)
                </h3>
                <p className="text-xs text-slate-400">
                  Son o‘ngdan chapga qarab sinflarga bo‘linadi va chapdan o‘ngga qarab o‘qiladi
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30">
                {classes.length} ta sinf
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {classes.map((cls) => (
                <div 
                  key={cls.className + cls.index}
                  className={`rounded-2xl p-5 border ${cls.color.border} ${cls.color.bg} space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${cls.color.badge}`}>
                      {cls.className}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {cls.shortName || 'birlik'}
                    </span>
                  </div>

                  <div className="font-mono text-3xl font-black text-white">
                    {cls.rawTriplet}
                  </div>

                  <div className="pt-2 border-t border-slate-700/40 text-xs font-semibold text-slate-200">
                    O‘qilishi: <span className="text-amber-300">«{cls.reading}»</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Xonalar jadvali */}
          <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Har bir raqamning xona birliklari jadvali
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                    <th className="py-3 px-3">Raqam</th>
                    <th className="py-3 px-3">Sinf nomi</th>
                    <th className="py-3 px-3">Xona nomi</th>
                    <th className="py-3 px-3">Xonadagi qiymati</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {places.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-black text-amber-400 text-base">
                        {p.digit}
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-sans">
                        {p.className}
                      </td>
                      <td className="py-3 px-3 text-cyan-300 font-sans">
                        {p.placeName}
                      </td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">
                        {p.placeValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* So‘zdan Raqamga Rejimi */
        <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl max-w-3xl mx-auto">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Sonni o‘zbek tilida so‘z bilan yozing:
            </label>
            <textarea
              rows={3}
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              placeholder="Masalan: o‘ttiz million to‘rt yuz ming ellik"
              className="w-full px-5 py-4 rounded-2xl bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 text-base sm:text-lg font-bold text-white outline-none"
            />
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Raqamdagi ko‘rinishi:
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-black text-amber-400">
              {convertedNumberFromWords ? formatWithSpaces(convertedNumberFromWords) : 'Kutilmoqda...'}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
