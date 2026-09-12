import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Play, 
  Award, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MODULES } from '../data/curriculum';
import { UserProgress } from '../types';

interface CourseMapViewProps {
  onStartLesson: (lessonId: string) => void;
  progress: UserProgress;
}

export const CourseMapView: React.FC<CourseMapViewProps> = ({
  onStartLesson,
  progress,
}) => {
  return (
    <div className="space-y-10 pb-16" id="roadmap-container">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 border border-amber-400/30 text-amber-400 uppercase tracking-wider">
          Metodologik Dastur
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          KURS METODOLOGIK XARITASI
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Oddiydan murakkabga tomon yo‘naltirilgan 4 ta modul va 14 ta amaliy interaktiv dars. Har bir qadamda natijaga erishing!
        </p>
      </div>

      {/* Modules List */}
      <div className="space-y-8">
        {MODULES.map((module) => {
          const completedInMod = module.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
          const isModCompleted = completedInMod === module.lessons.length;
          const badge = progress.badges.find(b => b.id === module.badgeId);

          return (
            <div 
              key={module.id}
              id={`roadmap-module-${module.id}`}
              className="rounded-3xl bg-[#0e162b] border border-slate-800 overflow-hidden shadow-xl"
            >
              {/* Module Header Bar */}
              <div className="p-6 bg-gradient-to-r from-slate-900 via-[#131d38] to-slate-900 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                      {module.id}-MODUL
                    </span>
                    <h2 className="text-xl font-extrabold text-white">
                      {module.title}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300">
                    {module.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto">
                  {/* Badge Status */}
                  {badge && (
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      badge.unlocked 
                        ? 'bg-amber-400/10 border-amber-400/40 text-amber-300' 
                        : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}>
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{badge.name}: {badge.unlocked ? 'Ochilgan' : 'Qulflangan'}</span>
                    </div>
                  )}

                  {/* Progress Indicator */}
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {completedInMod} / {module.lessons.length} bajarildi
                  </span>
                </div>
              </div>

              {/* Module Expected Outcome */}
              <div className="px-6 py-3 bg-slate-900/40 border-b border-slate-800/60 text-xs text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Natija:</strong> {module.outcome}</span>
              </div>

              {/* Lessons Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {module.lessons.map((lesson) => {
                  const isDone = progress.completedLessons.includes(lesson.id);
                  const score = progress.lessonScores[lesson.id];

                  return (
                    <div 
                      key={lesson.id}
                      id={`lesson-card-${lesson.id}`}
                      className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                        isDone 
                          ? 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500/50' 
                          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-amber-400">
                            DARS {lesson.number}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 text-[11px] text-slate-400">
                              <Clock className="w-3 h-3" />
                              {lesson.durationMinutes} daq
                            </span>

                            {isDone ? (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                <CheckCircle2 className="w-3 h-3" />
                                {score !== undefined ? `${score} ball` : 'Bajarildi'}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                                <Circle className="w-3 h-3" />
                                Yangi
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                            {lesson.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {lesson.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <button
                          onClick={() => onStartLesson(lesson.id)}
                          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                            isDone
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                              : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/10'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isDone ? 'Qayta ko‘rish' : 'Darsni boshlash'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>
      
    </div>
  );
};
