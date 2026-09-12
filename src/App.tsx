import React, { useState, useEffect } from 'react';
import { TabType, UserProgress, Badge } from './types';
import { ALL_LESSONS, MODULES, INITIAL_BADGES } from './data/curriculum';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CourseMapView } from './components/CourseMapView';
import { LessonView } from './components/LessonView';
import { NumberReaderLab } from './components/NumberReaderLab';
import { SpeedChallengeView } from './components/SpeedChallengeView';
import { GraduationProjectView } from './components/GraduationProjectView';
import { FinalTestView } from './components/FinalTestView';
import { ResultsView } from './components/ResultsView';
import { TeacherModeView } from './components/TeacherModeView';
import { Award, Sparkles, X } from 'lucide-react';

const STORAGE_KEY = 'natural_sonlar_progress_v1';

const getInitialProgress = (): UserProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure badges array is properly populated
      if (!parsed.badges || parsed.badges.length === 0) {
        parsed.badges = INITIAL_BADGES;
      }
      return parsed;
    }
  } catch (e) {
    console.warn('LocalStorage parse error', e);
  }
  return {
    completedLessons: [],
    lessonScores: {},
    badges: INITIAL_BADGES,
    speedChallengeBest: 0,
    lastActiveLessonId: 'lesson-1',
  };
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [activeLessonId, setActiveLessonId] = useState<string>('lesson-1');
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [progress]);

  // Check and unlock badges based on progress
  const checkBadgeUnlocks = (
    completed: string[], 
    finalScore?: number
  ) => {
    setProgress((prev) => {
      let updatedBadges = [...prev.badges];
      let newlyUnlocked: Badge | null = null;

      // Modul 1: lesson-1, lesson-2, lesson-3
      const mod1Done = ['lesson-1', 'lesson-2', 'lesson-3'].every(id => completed.includes(id));
      // Modul 2: lesson-4, lesson-5, lesson-6
      const mod2Done = ['lesson-4', 'lesson-5', 'lesson-6'].every(id => completed.includes(id));
      // Modul 3: lesson-7, lesson-8, lesson-9, lesson-10
      const mod3Done = ['lesson-7', 'lesson-8', 'lesson-9', 'lesson-10'].every(id => completed.includes(id));
      // Modul 4: lesson-11, lesson-12, lesson-13, lesson-14
      const mod4Done = ['lesson-11', 'lesson-12', 'lesson-13', 'lesson-14'].every(id => completed.includes(id)) || (finalScore !== undefined && finalScore >= 18);

      updatedBadges = updatedBadges.map(b => {
        let shouldUnlock = b.unlocked;
        if ((b.id === 'badge-1' || b.id === 'boshlovchi') && mod1Done) shouldUnlock = true;
        if ((b.id === 'badge-2' || b.id === 'son_detektivi') && mod2Done) shouldUnlock = true;
        if ((b.id === 'badge-3' || b.id === 'katta_sonlar_ustasi') && mod3Done) shouldUnlock = true;
        if ((b.id === 'badge-4' || b.id === 'matematik_diktor') && mod4Done) shouldUnlock = true;

        if (shouldUnlock && !b.unlocked) {
          newlyUnlocked = { ...b, unlocked: true, dateUnlocked: new Date().toLocaleDateString('uz-UZ') };
          return newlyUnlocked;
        }
        return b;
      });

      if (newlyUnlocked) {
        setNewlyUnlockedBadge(newlyUnlocked);
      }

      return {
        ...prev,
        badges: updatedBadges,
      };
    });
  };

  const handleStartLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentTab('lesson');
    setProgress(prev => ({ ...prev, lastActiveLessonId: lessonId }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteLesson = (lessonId: string, score: number) => {
    setProgress((prev) => {
      const nextCompleted = prev.completedLessons.includes(lessonId) 
        ? prev.completedLessons 
        : [...prev.completedLessons, lessonId];
      
      const nextScores = { ...prev.lessonScores, [lessonId]: Math.max(prev.lessonScores[lessonId] || 0, score) };
      
      setTimeout(() => {
        checkBadgeUnlocks(nextCompleted, prev.finalTestScore);
      }, 100);

      return {
        ...prev,
        completedLessons: nextCompleted,
        lessonScores: nextScores,
      };
    });
  };

  const handleSpeedChallengeScore = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      speedChallengeBest: Math.max(prev.speedChallengeBest, score),
    }));
  };

  const handleGraduationScore = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      graduationProjectScore: score,
    }));
  };

  const handleFinalTestComplete = (score: number, total: number) => {
    setProgress((prev) => {
      setTimeout(() => {
        checkBadgeUnlocks(prev.completedLessons, score);
      }, 100);

      return {
        ...prev,
        finalTestScore: score,
      };
    });
  };

  const handleResetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress({
      completedLessons: [],
      lessonScores: {},
      badges: INITIAL_BADGES,
      speedChallengeBest: 0,
      lastActiveLessonId: 'lesson-1',
    });
    setActiveLessonId('lesson-1');
    setCurrentTab('home');
  };

  // Find active lesson object
  const currentLesson = ALL_LESSONS.find(l => l.id === activeLessonId) || ALL_LESSONS[0];
  const currentLessonIndex = ALL_LESSONS.findIndex(l => l.id === activeLessonId);

  const handleNextLesson = () => {
    if (currentLessonIndex < ALL_LESSONS.length - 1) {
      handleStartLesson(ALL_LESSONS[currentLessonIndex + 1].id);
    } else {
      setCurrentTab('results');
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      handleStartLesson(ALL_LESSONS[currentLessonIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        progress={progress}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={setCurrentTab}
            onStartLesson={handleStartLesson}
            progress={progress}
          />
        )}

        {currentTab === 'roadmap' && (
          <CourseMapView
            onStartLesson={handleStartLesson}
            progress={progress}
          />
        )}

        {currentTab === 'lesson' && (
          <LessonView
            lesson={currentLesson}
            onCompleteLesson={handleCompleteLesson}
            onNextLesson={currentLessonIndex < ALL_LESSONS.length - 1 ? handleNextLesson : undefined}
            onPrevLesson={currentLessonIndex > 0 ? handlePrevLesson : undefined}
            isCompleted={progress.completedLessons.includes(currentLesson.id)}
            savedScore={progress.lessonScores[currentLesson.id]}
          />
        )}

        {currentTab === 'lab' && (
          <NumberReaderLab />
        )}

        {currentTab === 'speed' && (
          <SpeedChallengeView
            onRecordScore={handleSpeedChallengeScore}
            bestScore={progress.speedChallengeBest}
          />
        )}

        {currentTab === 'graduation' && (
          <GraduationProjectView
            onCompleteProject={handleGraduationScore}
            savedScore={progress.graduationProjectScore}
          />
        )}

        {currentTab === 'test' && (
          <FinalTestView
            onCompleteTest={handleFinalTestComplete}
            savedScore={progress.finalTestScore}
            savedTotal={20}
          />
        )}

        {currentTab === 'results' && (
          <ResultsView
            progress={progress}
            onResetProgress={handleResetProgress}
            onSelectTab={setCurrentTab}
            onStartLesson={handleStartLesson}
          />
        )}

        {currentTab === 'teacher' && (
          <TeacherModeView />
        )}

      </main>

      {/* Newly Unlocked Badge Celebration Toast */}
      {newlyUnlockedBadge && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 p-0.5 shadow-2xl">
            <div className="rounded-[14px] bg-[#0c1427] p-4 sm:p-5 flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-2xl shrink-0">
                {newlyUnlockedBadge.icon}
              </div>
              <div>
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Yangi Nishon Ochildi!
                </div>
                <div className="text-sm font-black">{newlyUnlockedBadge.name}</div>
                <div className="text-xs text-slate-300">{newlyUnlockedBadge.level}</div>
              </div>
              <button
                onClick={() => setNewlyUnlockedBadge(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 bg-[#070b16]">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="font-bold text-slate-400">
            «NATURAL SONLARNI O‘QILISHI» — Interaktiv Ta’lim Platformasi
          </div>
          <p>
            Metodika: Oddiydan murakkabga, mustahkam o‘rganish, qadam-baqadam amaliy ko‘nikma hosil qilish.
          </p>
          <div className="text-[11px] text-slate-600">
            SONNI KO‘R → AJRAT → O‘QI → TEKSHIR → NATIJAGA ERISH!
          </div>
        </div>
      </footer>

    </div>
  );
}
