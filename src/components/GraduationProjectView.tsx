import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  BookOpen, 
  Printer, 
  Volume2,
  Send,
  HelpCircle
} from 'lucide-react';
import { 
  formatWithSpaces, 
  numberToUzbekWords, 
  splitIntoClasses, 
  decomposePlaces,
  speakUzbek
} from '../utils/numberToUzbek';

interface GraduationProjectViewProps {
  onCompleteProject: (score: number) => void;
  savedScore?: number;
}

const DEFAULT_PROJECT_NUMBERS = [
  '7',
  '48',
  '305',
  '4 250',
  '36 800',
  '400 005',
  '2 500 700',
  '37 200 000',
  '1 000 000 000',
  '12 500 300 000'
];

export const GraduationProjectView: React.FC<GraduationProjectViewProps> = ({
  onCompleteProject,
  savedScore,
}) => {
  const [studentName, setStudentName] = useState<string>('O‘quvchi');
  const [activeNumberIndex, setActiveNumberIndex] = useState<number>(0);
  const [numbersList, setNumbersList] = useState<string[]>(DEFAULT_PROJECT_NUMBERS);
  const [customInput, setCustomInput] = useState<string>('');

  // Rubric self/auto scores:
  // 30 ball - sonni to'g'ri o'qish
  // 20 ball - xonalarni aniqlash
  // 15 ball - sinflarga ajratish
  // 15 ball - raqam <-> so'z
  // 10 ball - real hayotiy misol
  // 10 ball - mustaqil tushuntirish
  const [submitted, setSubmitted] = useState<boolean>(!!savedScore);
  const [rubricScores, setRubricScores] = useState({
    reading: 30,
    places: 20,
    classes: 15,
    conversion: 15,
    realLife: 10,
    explanation: 10,
  });

  const totalScore = 
    rubricScores.reading + 
    rubricScores.places + 
    rubricScores.classes + 
    rubricScores.conversion + 
    rubricScores.realLife + 
    rubricScores.explanation;

  const currentNumberClean = numbersList[activeNumberIndex].replace(/\s+/g, '');
  const currentReading = numberToUzbekWords(currentNumberClean);
  const currentClasses = splitIntoClasses(currentNumberClean);
  const currentPlaces = decomposePlaces(currentNumberClean);

  const handleFinish = () => {
    setSubmitted(true);
    onCompleteProject(totalScore);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-10 pb-16" id="graduation-project-container">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400 uppercase tracking-wider inline-flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4" />
          Yakuniy Bitiruv Loyihasi
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          «MEN — NATURAL SONLAR DIKTORIMAN!»
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          10 ta ko‘p xonali natural sonni sinflarga ajrating, xonalarini aniqlang, to‘liq o‘qilishini taqdim eting va 100 ballik nufuzli diplomni qo‘lga kiriting!
        </p>
      </div>

      {/* Student Profile Input */}
      <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Ism va familiyangiz:
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full sm:w-72 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-sm focus:border-purple-400 outline-none"
            placeholder="Ismingizni kiriting"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Jami loyiha balli:</span>
          <span className="text-2xl font-black text-purple-400">{totalScore} / 100</span>
        </div>
      </div>

      {/* 10 Sonlar Tanlash Karuseli */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            10 ta Loyiha Soni (Bosqichma-bosqich o‘tish):
          </h3>
          <span className="text-xs text-purple-400 font-bold">
            {activeNumberIndex + 1} / 10 son
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {numbersList.map((num, idx) => (
            <button
              key={idx}
              onClick={() => setActiveNumberIndex(idx)}
              className={`p-2.5 rounded-xl border text-center font-mono text-xs font-bold transition-all ${
                activeNumberIndex === idx
                  ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-md scale-105'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              #{idx + 1}
              <span className="block truncate text-[11px] mt-0.5 text-white">{num}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Joriy Tanlangan Son Tahlili */}
      <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 space-y-8 shadow-2xl">
        
        {/* 1. Son Ko‘rinishi */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            1. Ekranda ko‘rsatilgan natural son:
          </span>
          <div className="font-mono text-3xl sm:text-5xl font-black text-amber-400 tracking-wider">
            {formatWithSpaces(currentNumberClean)}
          </div>
        </div>

        {/* 2. Uch xonali sinflarga ajratish */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            2. Uch xonali sinflarga ajratilishi:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentClasses.map((cls) => (
              <div key={cls.className} className={`p-4 rounded-xl border ${cls.color.border} ${cls.color.bg} text-center space-y-1`}>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cls.color.badge}`}>
                  {cls.className}
                </span>
                <div className="font-mono text-xl font-bold text-white mt-1">
                  {cls.rawTriplet}
                </div>
                <div className="text-[11px] text-slate-300">
                  «{cls.reading}»
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Xonalarni aniqlash */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            3. Xonalar tahlili:
          </h4>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 overflow-x-auto">
            <div className="flex items-center gap-4 min-w-[500px]">
              {currentPlaces.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex-1 text-center font-mono">
                  <div className="text-lg font-black text-amber-400">{p.digit}</div>
                  <div className="text-[10px] text-cyan-300 font-sans mt-0.5">{p.placeName}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{p.placeValue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. To‘liq o‘qilishi */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              4. Diktor talaffuzi (So‘z bilan to‘liq o‘qilishi):
            </h4>
            <button
              onClick={() => speakUzbek(currentReading)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Ovoz bilan eshitish
            </button>
          </div>
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-lg sm:text-xl font-bold text-white">
            «{currentReading}»
          </div>
        </div>

        {/* 5. Raqam ↔ So‘z o‘girish va 6. Real hayotiy misol */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase">
              5. Raqam ↔ So‘z tekshiruvi:
            </span>
            <p className="text-xs text-slate-300">
              «{currentReading}» so‘zi to‘g‘ridan-to‘g‘ri <span className="font-mono font-bold text-amber-400">{formatWithSpaces(currentNumberClean)}</span> soniga teng.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase">
              6. Hayotiy misol:
            </span>
            <p className="text-xs text-slate-300">
              {Number(currentNumberClean) > 1000000000 
                ? 'Astronomik masofa yoki global aholi ko‘rsatkichi.'
                : Number(currentNumberClean) > 1000000 
                ? 'Shahar aholisi yoki yirik zavod ishlab chiqarish hajmi.'
                : 'Oddiy tovar narxi yoki kundalik statistik hisob-kitob.'}
            </p>
          </div>
        </div>

      </div>

      {/* 100 Ballik Baholash Mezonlari (Rubric) */}
      <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Loyiha Baholash Mezonlari (Jami 100 Ball):
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between font-bold text-white">
              <span>Sonni to‘g‘ri o‘qish:</span>
              <span className="text-amber-400">{rubricScores.reading} / 30 ball</span>
            </div>
            <p className="text-slate-400">10 ta sonning so‘zma-so‘z to‘liq va xatosiz o‘qilishi.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between font-bold text-white">
              <span>Xonalarni aniqlash:</span>
              <span className="text-amber-400">{rubricScores.places} / 20 ball</span>
            </div>
            <p className="text-slate-400">Birlik, o‘nlik, yuzlik va yuqori xonalar to‘g‘ri tahlili.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between font-bold text-white">
              <span>Sinflarga ajratish:</span>
              <span className="text-amber-400">{rubricScores.classes} / 15 ball</span>
            </div>
            <p className="text-slate-400">O‘ngdan 3 talik guruhlarga aniq bo‘lish.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between font-bold text-white">
              <span>Raqam ↔ So‘z:</span>
              <span className="text-amber-400">{rubricScores.conversion} / 15 ball</span>
            </div>
            <p className="text-slate-400">Ikki tomonlama aniq o‘girish.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between font-bold text-white">
              <span>Real hayotiy misol:</span>
              <span className="text-amber-400">{rubricScores.realLife} / 10 ball</span>
            </div>
            <p className="text-slate-400">Sonni amaliy hayot bilan bog‘lay olish.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between font-bold text-white">
              <span>Mustaqil tushuntirish:</span>
              <span className="text-amber-400">{rubricScores.explanation} / 10 ball</span>
            </div>
            <p className="text-slate-400">Mantiqiy izchillik va qoidalarni bayon etish.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleFinish}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-amber-400 hover:from-purple-400 hover:to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-purple-500/20 transition-all"
          >
            <Award className="w-5 h-5" />
            <span>Loyihani himoya qilish va Sertifikatni olish</span>
          </button>
        </div>
      </div>

      {/* Sertifikat Modali / Ko‘rinishi */}
      {submitted && (
        <div className="rounded-3xl bg-gradient-to-b from-[#16203d] to-[#0c1427] border-2 border-amber-400/50 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/40">
            <GraduationCap className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              RASMIY METODOLOGIK SERTIFIKAT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              «MATEMATIK DIKTOR»
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Ushbu sertifikat <strong className="text-amber-400 text-base">{studentName}</strong>ga «Natural Sonlarni O‘qilishi» kursi bo‘yicha barcha modullarni va Bitiruv Loyihasini <strong className="text-emerald-400">{totalScore} ball</strong> bilan muvaffaqiyatli yakunlaganligi munosabati bilan beriladi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 inline-block font-mono text-xs text-slate-400">
            Sana: {new Date().toLocaleDateString('uz-UZ')} • Registratsiya raqami: NS-2026-{(Math.random() * 10000).toFixed(0)}
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Sertifikatni chop etish (Print)</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
