import React from 'react';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  Layers, 
  Flame, 
  GraduationCap, 
  Clock, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UserProgress, TabType } from '../types';
import { ALL_LESSONS } from '../data/curriculum';

interface ResultsViewProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onSelectTab: (tab: TabType) => void;
  onStartLesson: (lessonId: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  progress,
  onResetProgress,
  onSelectTab,
  onStartLesson,
}) => {
  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.round((completedCount / 14) * 100);

  return (
    <div className="space-y-10 pb-16 max-w-5xl mx-auto" id="results-container">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 border border-amber-400/30 text-amber-400 uppercase tracking-wider inline-flex items-center gap-1.5">
          <Trophy className="w-4 h-4" />
          Mening Natijalarim
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          SHAXSIY TA’LIM PORTFOLIOSI
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Kurs davomida erishgan yutuqlaringiz, nishonlaringiz va o‘zlashtirish ko‘rsatkichlaringiz
        </p>
      </div>

      {/* 4 Ta Metrika Bloklari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Umumiy Kurs</span>
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{progressPercent}%</div>
          <div className="text-xs text-slate-400">{completedCount} / 14 dars bajarildi</div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Final Test</span>
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400">
            {progress.finalTestScore !== undefined ? `${progress.finalTestScore} / 20` : '—'}
          </div>
          <div className="text-xs text-slate-400">
            {progress.finalTestScore !== undefined 
              ? progress.finalTestScore >= 18 ? 'Muvaffaqiyatli topshirildi ✓' : 'Qayta topshirish kerak'
              : 'Hali topshirilmadi'}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">30s Chaqiriq</span>
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            {progress.speedChallengeBest} / 5
          </div>
          <div className="text-xs text-slate-400">Eng yuqori rekord</div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0f172a] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Bitiruv Loyihasi</span>
            <GraduationCap className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400">
            {progress.graduationProjectScore !== undefined ? `${progress.graduationProjectScore} ball` : '—'}
          </div>
          <div className="text-xs text-slate-400">
            {progress.graduationProjectScore !== undefined ? 'Sertifikat tasdiqlangan' : 'Loyiha kutilmoqda'}
          </div>
        </div>

      </div>

      {/* Gamifikatsiya Nishonlari (4 Ta Sharafli Daraja) */}
      <div className="rounded-3xl bg-[#0e162b] border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              «SONLAR USTASI» NISHONLARI (4 DARAJA)
            </h2>
            <p className="text-xs text-slate-400">
              Har bir modulni to‘liq bajarganingizda mos nishon avtomatik ochiladi:
            </p>
          </div>
          <span className="text-xs font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
            {progress.badges.filter(b => b.unlocked).length} / 4 nishon ochildi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {progress.badges.map((badge) => (
            <div 
              key={badge.id}
              className={`rounded-2xl p-5 border text-center space-y-3 transition-all ${
                badge.unlocked 
                  ? 'bg-amber-400/10 border-amber-400/40 shadow-lg shadow-amber-400/5' 
                  : 'bg-slate-900/50 border-slate-800 opacity-60'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl mx-auto">
                {badge.icon}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{badge.name}</h3>
                <span className="text-xs font-bold text-amber-400">{badge.level}</span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2">
                {badge.description}
              </p>

              <div className="pt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  badge.unlocked ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                }`}>
                  {badge.unlocked ? 'OCHILGAN ✓' : 'QULFLANGAN'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Darslar Jurnali */}
      <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-400" />
          Darslar bo‘yicha shaxsiy jurnal
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                <th className="py-3 px-3">Dars</th>
                <th className="py-3 px-3">Mavzu</th>
                <th className="py-3 px-3">Holat</th>
                <th className="py-3 px-3">Natija</th>
                <th className="py-3 px-3 text-right">Harakat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {ALL_LESSONS.map((lesson) => {
                const isDone = progress.completedLessons.includes(lesson.id);
                const score = progress.lessonScores[lesson.id];

                return (
                  <tr key={lesson.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-amber-400">
                      #{lesson.number}
                    </td>
                    <td className="py-3 px-3 font-medium text-white">
                      {lesson.title}
                    </td>
                    <td className="py-3 px-3">
                      {isDone ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Bajarilgan
                        </span>
                      ) : (
                        <span className="text-slate-500">Bajarilmagan</span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      {score !== undefined ? (
                        <span className="text-amber-400 font-bold">{score} ball</span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onStartLesson(lesson.id)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                      >
                        {isDone ? 'Takrorlash' : 'Boshlash'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Qayta tozalash tugmasi */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Barcha natijalarni nollab, kursni boshidan qayta boshlamoqchimisiz?
        </div>
        <button
          onClick={() => {
            if (confirm('Barcha saqlangan natijalar tozalanadi. Tasdiqlaysizmi?')) {
              onResetProgress();
            }
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700 text-xs font-bold text-slate-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Statistikani tozalash</span>
        </button>
      </div>

    </div>
  );
};
