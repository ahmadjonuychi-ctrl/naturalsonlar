import React, { useState } from 'react';
import { 
  GraduationCap, 
  AlertTriangle, 
  BookOpen, 
  CheckSquare, 
  Monitor, 
  FileText, 
  Volume2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ALL_LESSONS } from '../data/curriculum';
import { formatWithSpaces, speakUzbek } from '../utils/numberToUzbek';

export const TeacherModeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'mistakes' | 'rubric' | 'homework' | 'board'>('plan');
  const [boardNumber, setBoardNumber] = useState<string>('84 502 310');

  const typicalMistakes = [
    {
      title: '1. O‘ngdan emas, chapdan 3 talik ajratish',
      wrong: '1234567 → 123 456 7 (Noto‘g‘ri)',
      correct: '1234567 → 1 234 567 (To‘g‘ri: har doim oxiridan sanaladi)',
      remedy: 'O‘quvchiga: «Kichik ukangiz birliklardan boshlab sanaymiz, qolgan raqam chapda qoladi» deb eslatish.',
    },
    {
      title: '2. Nollarni e’tiborsiz qoldirish yoki xato o‘qish',
      wrong: '305 ni «o‘ttiz besh» deb o‘qish',
      correct: '305 — «uch yuz besh» (0 o‘nlik bo‘lib, xona qiymatini saqlab turadi)',
      remedy: 'Nol xonani ushlab turuvchi qulf ekanligini, uni tashlab ketmaslik kerakligini jadvalda ko‘rsatish.',
    },
    {
      title: '3. 1 000 ni «bir ming» deb aytish odati',
      wrong: '1 400 ni «bir ming to‘rt yuz» (ba’zi lahjalarda)',
      correct: 'Adabiy tilda: «ming to‘rt yuz» deb aytiladi («bir» aytilmaydi). Biroq millionlarda «bir million» deyiladi.',
      remedy: 'Mingliklar va millionlar sinfi o‘rtasidagi til me’yori farqini ta’kidlash.',
    },
    {
      title: '4. Sinf nomini xona nomi bilan aralashtirib yuborish',
      wrong: '«Million xonasi» deb aytish',
      correct: '«Millionlar sinfi» (unda birlik million, o‘nlik million, yuzlik million xonalari bor)',
      remedy: '«Sinf — katta oila, xona — uydagi kichik xonalar» analogiyasini qo‘llash.',
    },
  ];

  const homeworkBank = [
    {
      level: 'A Daraja (Boshlang‘ich mustahkamlash)',
      tasks: [
        'Quyidagi sonlarni 3 talik qilib yozing va o‘qing: 4500, 12000, 89300.',
        '407 sonida qaysi xonada 0 raqami turibdi?',
        '«Oltmish besh ming sakkiz yuz» sonini raqamlar bilan yozing.'
      ]
    },
    {
      level: 'B Daraja (O‘rta va tahliliy)',
      tasks: [
        '2 500 700 sonida nechta sinf va nechta xona borligini tahlil qiling.',
        '5, 0, 8, 3, 1 raqamlaridan foydalanib eng katta 5 xonali natural sonni tuzing va o‘qing.',
        'O‘zbekiston aholisi (37 200 000) sonini so‘z bilan daftaringizga yozing.'
      ]
    },
    {
      level: 'C Daraja (Murakkab va ijodiy)',
      tasks: [
        '105 020 400 700 sonini 3 qadam algoritmi asosida bosqichma-bosqich yozma tushuntiring.',
        '«Yetti milliard yigirma ming to‘rt» sonini raqamlarda yozing va oraliqdagi nollar sonini tushuntiring.',
        'Real hayotdan milliardlik son bilan ifodalanadigan 2 ta fakt toping (masalan, koinot yoki budjet).'
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto" id="teacher-mode-container">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 border border-amber-400/30 text-amber-400 uppercase tracking-wider inline-flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4" />
          Metodist & O‘qituvchi Rejimi
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          O‘QITUVCHI VA METODIST PANELI
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Dars rejasi, pedagogik rubrikalar, tipik xatolar tahlili, doska rejimi va diferensial uy vazifalari banki
        </p>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {[
            { id: 'plan', label: 'Dars Rejasi', icon: FileText },
            { id: 'mistakes', label: 'Tipik Xatolar', icon: AlertTriangle },
            { id: 'rubric', label: 'Baholash Mezoni', icon: CheckSquare },
            { id: 'homework', label: 'Vazifalar Banki', icon: BookOpen },
            { id: 'board', label: 'Doska Rejimi', icon: Monitor },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Dars Rejasi */}
      {activeTab === 'plan' && (
        <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            14 Ta Darslik To‘liq Metodologik Reja
          </h2>

          <div className="divide-y divide-slate-800/80">
            {ALL_LESSONS.map(l => (
              <div key={l.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-400">Dars {l.number}</span>
                    <span className="font-bold text-sm text-white">{l.title}</span>
                  </div>
                  <p className="text-xs text-slate-400">{l.tagline}</p>
                </div>
                <div className="text-xs text-cyan-300 font-mono self-start sm:self-auto bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  {l.durationMinutes} daqiqa
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Tipik Xatolar */}
      {activeTab === 'mistakes' && (
        <div className="space-y-4">
          {typicalMistakes.map((m, i) => (
            <div key={i} className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 space-y-3 shadow-xl">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {m.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  <span className="font-bold block mb-1">❌ O‘quvchi xatosi:</span>
                  {m.wrong}
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <span className="font-bold block mb-1">✓ To‘g‘ri qoida:</span>
                  {m.correct}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <strong className="text-amber-400">💡 Metodik yechim: </strong>
                {m.remedy}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Baholash Mezoni (Rubric) */}
      {activeTab === 'rubric' && (
        <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-400" />
            O‘quvchilar Bilimini Baholash Mezonlari (100 Ballik Tizim)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold">
                  <th className="py-3 px-3">Komponent</th>
                  <th className="py-3 px-3">Maksimal Ball</th>
                  <th className="py-3 px-3">Tavsif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr>
                  <td className="py-3 px-3 font-bold text-white">Sonni to‘liq va ravon o‘qish</td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">30 ball</td>
                  <td className="py-3 px-3 text-slate-300">Sinflarni chapdan o‘ngga qarab xatosiz talaffuz qilish</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">Xonalarni aniqlash</td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">20 ball</td>
                  <td className="py-3 px-3 text-slate-300">Har bir raqamning xonasi va pozitsion qiymatini bilish</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">Sinflarga ajratish</td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">15 ball</td>
                  <td className="py-3 px-3 text-slate-300">O‘ngdan 3 talik guruhlarga aniq ajrata olish</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">Raqam ↔ So‘z o‘girish</td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">15 ball</td>
                  <td className="py-3 px-3 text-slate-300">Og‘zaki aytilgan sonni raqamlarda to‘g‘ri yozish</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">Real hayotiy misol keltirish</td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">10 ball</td>
                  <td className="py-3 px-3 text-slate-300">Aholi, masofa yoki budjet bilan bog‘lash</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">Mustaqil tushuntirish mahorati</td>
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">10 ball</td>
                  <td className="py-3 px-3 text-slate-300">Nima uchun shunday o‘qilishini isbotlab berish</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Vazifalar Banki */}
      {activeTab === 'homework' && (
        <div className="space-y-4">
          {homeworkBank.map((hb, i) => (
            <div key={i} className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 space-y-3 shadow-xl">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 uppercase">
                {hb.level}
              </span>
              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-200">
                {hb.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-amber-400 shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* 5. Doska Rejimi */}
      {activeTab === 'board' && (
        <div className="rounded-3xl bg-[#0a0f1d] border-2 border-amber-400/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Sinf Xonasi va Proyektor Rejimi
            </span>
            <h2 className="text-xl font-bold text-white">
              Doskada Katta Ko‘rinishda Namoyish Etish
            </h2>
          </div>

          <div className="flex justify-center gap-2 max-w-md mx-auto">
            <input
              type="text"
              value={boardNumber}
              onChange={(e) => setBoardNumber(e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold text-center text-lg outline-none"
              placeholder="Son kiriting"
            />
          </div>

          <div className="p-8 sm:p-14 rounded-3xl bg-slate-950 border border-slate-800 font-mono text-4xl sm:text-7xl font-black text-amber-400 tracking-widest">
            {formatWithSpaces(boardNumber.replace(/\s+/g, ''))}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => speakUzbek(boardNumber)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>O‘qib eshittirish</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
