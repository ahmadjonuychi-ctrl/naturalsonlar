import React from 'react';
import { 
  BookOpen, 
  Map, 
  Trophy, 
  Zap, 
  Layers, 
  GraduationCap, 
  UserCheck, 
  Home, 
  Calculator,
  Award
} from 'lucide-react';
import { TabType, UserProgress } from '../types';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  progress: UserProgress;
  totalLessonsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  progress,
  totalLessonsCount,
}) => {
  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));
  const unlockedBadgesCount = progress.badges.filter(b => b.unlocked).length;

  return (
    <header className="sticky top-0 z-50 bg-[#0c1427]/95 backdrop-blur-md border-b border-slate-800 shadow-xl" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Shior */}
          <button 
            id="brand-logo-btn"
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 text-left group transition-all"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="font-mono text-lg font-bold">123</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  NATURAL SONLARNI O‘QILISHI
                </span>
                <span className="hidden md:inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  EdTech 0-Daraja
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs md:max-w-md">
                “SONNI KO‘R → AJRAT → O‘QI → TEKSHIR → NATIJAGA ERISH!”
              </p>
            </div>
          </button>

          {/* Progress & Quick Stats */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Real-time Progress Widget */}
            <div className="hidden lg:flex flex-col gap-1 w-44">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Kurs progressi:</span>
                <span className="text-amber-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden p-0.5 border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-cyan-400 via-amber-400 to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Badges and Points Counters */}
            <div className="flex items-center gap-2">
              <button
                id="header-badges-btn"
                onClick={() => onSelectTab('results')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-amber-300 transition-colors"
                title="Qo‘lga kiritilgan nishonlar"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>{unlockedBadgesCount}/4</span>
              </button>

              <button
                id="header-points-btn"
                onClick={() => onSelectTab('results')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-xs font-bold text-amber-400 transition-colors"
                title="To‘plangan umumiy ball"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>{progress.totalScore} ball</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/60 text-xs font-semibold">
          
          <button
            id="nav-tab-home"
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              currentTab === 'home'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Bosh sahifa</span>
          </button>

          <button
            id="nav-tab-roadmap"
            onClick={() => onSelectTab('roadmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              currentTab === 'roadmap'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Kurs xaritasi</span>
          </button>

          <button
            id="nav-tab-lesson"
            onClick={() => onSelectTab('lesson')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              currentTab === 'lesson'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Darslar (14 ta)</span>
          </button>

          <button
            id="nav-tab-lab"
            onClick={() => onSelectTab('lab')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              currentTab === 'lab'
                ? 'bg-cyan-400 text-slate-950 shadow-md font-bold'
                : 'text-cyan-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Son O‘quvchi Trenajyor</span>
          </button>

          <button
            id="nav-tab-speed"
            onClick={() => onSelectTab('speed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              currentTab === 'speed'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>30s Chaqiriq</span>
          </button>

          <button
            id="nav-tab-graduation"
            onClick={() => onSelectTab('graduation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              currentTab === 'graduation'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Bitiruv Loyihasi</span>
          </button>

          <button
            id="nav-tab-test"
            onClick={() => onSelectTab('test')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              currentTab === 'test'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Final Test (20)</span>
          </button>

          <button
            id="nav-tab-results"
            onClick={() => onSelectTab('results')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              currentTab === 'results'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Natijam</span>
          </button>

          <button
            id="nav-tab-teacher"
            onClick={() => onSelectTab('teacher')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              currentTab === 'teacher'
                ? 'bg-slate-100 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>O‘qituvchi Uchun</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
