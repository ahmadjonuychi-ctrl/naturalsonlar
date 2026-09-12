import React from 'react';
import { 
  Play, 
  Map, 
  Trophy, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Calculator,
  Compass,
  GraduationCap
} from 'lucide-react';
import { TabType, UserProgress } from '../types';
import { MODULES } from '../data/curriculum';

interface HomeViewProps {
  onSelectTab: (tab: TabType) => void;
  onStartLesson: (lessonId: string) => void;
  progress: UserProgress;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onStartLesson,
  progress,
}) => {
  // Keyingi davom ettiriladigan dars
  const nextLessonId = progress.lastActiveLessonId || 'lesson-1';

  return (
    <div className="space-y-12 pb-16" id="home-container">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#111c38] via-[#0d162d] to-[#0a0f1d] border border-slate-800 p-6 sm:p-10 lg:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>0 DAN BOSHLAB INTERAKTIV METODIKA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            NATURAL SONLARNI <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400">
              O‘QILISHI
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            0 dan boshlab katta sonlarni ishonchli o‘qishni o‘rganing!
          </p>

          {/* Shior */}
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 inline-block font-mono text-xs sm:text-sm font-bold text-cyan-300">
            “SONNI KO‘R → AJRAT → O‘QI → TEKSHIR → NATIJAGA ERISH!”
          </div>

          {/* 4 Asosiy CTA Tugmalar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            
            <button
              id="hero-start-btn"
              onClick={() => onStartLesson(nextLessonId)}
              className="flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>BOSHLASH</span>
            </button>

            <button
              id="hero-roadmap-btn"
              onClick={() => onSelectTab('roadmap')}
              className="flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white font-bold text-sm sm:text-base transition-all"
            >
              <Map className="w-5 h-5 text-amber-400" />
              <span>KURS XARITASI</span>
            </button>

            <button
              id="hero-results-btn"
              onClick={() => onSelectTab('results')}
              className="flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold text-sm sm:text-base transition-all"
            >
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>NATIJAM</span>
            </button>

            <button
              id="hero-test-btn"
              onClick={() => onSelectTab('test')}
              className="flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-sm sm:text-base transition-all"
            >
              <Layers className="w-5 h-5" />
              <span>FINAL TEST</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Bosqich Vizual Xaritasi */}
      <section className="space-y-6" id="home-stages-section">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Compass className="w-6 h-6 text-amber-400" />
              KURS METODOLOGIK XARITASI (4 BOSQICH)
            </h2>
            <p className="text-sm text-slate-400">
              Oddiydan murakkabga tomon tizimli, mustahkam 4 ta modul
            </p>
          </div>
          <button
            onClick={() => onSelectTab('roadmap')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 group"
          >
            Barcha 14 ta darsni ko‘rish
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MODULES.map((mod) => {
            const completedInMod = mod.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
            const isFullyCompleted = completedInMod === mod.lessons.length;
            const percent = Math.round((completedInMod / mod.lessons.length) * 100);

            return (
              <div 
                key={mod.id}
                id={`stage-card-${mod.id}`}
                className="relative rounded-2xl bg-[#0f172a] border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all group shadow-lg"
              >
                <div className="space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-amber-400/10 text-amber-400 border border-amber-400/30">
                      {mod.id}-MODUL
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {completedInMod} / {mod.lessons.length} dars
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {mod.tagline}
                    </p>
                  </div>

                  {/* Modul natijasi */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Kutilayotgan natija: </span>
                      {mod.outcome}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/60 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-amber-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onStartLesson(mod.lessons[0].id)}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 transition-colors shrink-0"
                  >
                    {isFullyCompleted ? 'Takrorlash' : 'Modulni ochish'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interaktiv Trenajyorlar va Imkoniyatlar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5" id="home-features-section">
        
        <div className="rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-800/40 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Son O‘quvchi Trenajyor</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Istalgan sonni (milliard, trilliongacha) kiriting. Tizim uni avtomatik sinflarga bo‘lib, o‘zbek tilida so‘zma-so‘z talaffuz qilib beradi!
            </p>
          </div>
          <button
            onClick={() => onSelectTab('lab')}
            className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors self-start"
          >
            Trenajyorni ochish →
          </button>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-800/40 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">30 Soniyalik Chaqiriq</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tezlik va zehn sinovi! 30 soniyada 5 ta ko‘p xonali sonning o‘qilishini aniqlang va o‘z rekordlaringizni yangilang.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('speed')}
            className="mt-4 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors self-start"
          >
            Chaqiriqqa kirish →
          </button>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-800/40 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-400/20 text-purple-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Bitiruv Loyihasi (100 ball)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              «Men — Natural Sonlar Diktoriman!» deb nomlangan 6 bosqichli amaliy loyiha. 10 ta sonni mustaqil tahlil qiling va sertifikat oling!
            </p>
          </div>
          <button
            onClick={() => onSelectTab('graduation')}
            className="mt-4 px-4 py-2 rounded-lg bg-purple-400 hover:bg-purple-300 text-slate-950 font-bold text-xs transition-colors self-start"
          >
            Loyihani boshlash →
          </button>
        </div>
      </section>

      {/* Gamifikatsiya & Nishonlar Bloki */}
      <section className="rounded-2xl bg-[#0e162b] border border-slate-800 p-6 sm:p-8" id="home-badges-preview">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              «SONLAR USTASI» GAMIFIKATSIYA TIZIMI
            </h3>
            <p className="text-xs text-slate-400">
              Kurs davomida 4 ta sharafli daraja nishonini qo‘lga kiriting:
            </p>
          </div>
          <button
            onClick={() => onSelectTab('results')}
            className="text-xs font-semibold text-amber-400 hover:underline"
          >
            Mening yutuqlarimni ko‘rish
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {progress.badges.map((b) => (
            <div 
              key={b.id}
              className={`rounded-xl p-4 border text-center transition-all ${
                b.unlocked 
                  ? 'bg-amber-400/10 border-amber-400/40 shadow-lg shadow-amber-400/5' 
                  : 'bg-slate-900/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="text-2xl mb-2">{b.level.split(' ')[0]}</div>
              <div className="text-xs font-bold text-white">{b.name}</div>
              <div className="text-[10px] text-amber-400 mt-0.5">{b.level}</div>
              <div className="text-[10px] text-slate-400 mt-2 line-clamp-2">
                {b.description}
              </div>
              <div className="mt-3">
                <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                  b.unlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {b.unlocked ? 'OCHILDI ✓' : 'QULFLANGAN'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pedagogik Kafolat */}
      <section className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 flex items-center gap-4 text-xs text-slate-400">
        <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
        <p>
          Ushbu interaktiv dastur xalqaro matematika ta’limi standartlari, didaktik soddalik va bosqichma-bosqich o‘zlashtirish tamoyili asosida ishlab chiqilgan.
        </p>
      </section>

    </div>
  );
};
