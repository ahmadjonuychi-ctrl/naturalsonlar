import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Timer, 
  RotateCcw, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  Flame
} from 'lucide-react';
import { SPEED_CHALLENGE_BANK } from '../data/curriculum';

interface SpeedChallengeViewProps {
  onRecordScore: (score: number) => void;
  bestScore?: number;
}

export const SpeedChallengeView: React.FC<SpeedChallengeViewProps> = ({
  onRecordScore,
  bestScore = 0,
}) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<typeof SPEED_CHALLENGE_BANK>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startChallenge = () => {
    // 5 ta savol tasodifiy tanlash
    const shuffled = [...SPEED_CHALLENGE_BANK].sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedOption(null);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishChallenge(score);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, score]);

  const handleAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return; // Prevent double clicks
    setSelectedOption(optionIdx);

    const isCorrect = optionIdx === questions[currentIndex].correctIndex;
    const nextScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(nextScore);

    setTimeout(() => {
      if (currentIndex + 1 >= 5) {
        finishChallenge(nextScore);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      }
    }, 400);
  };

  const finishChallenge = (finalScore: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('finished');
    onRecordScore(finalScore);
  };

  const getEvaluation = (sc: number) => {
    if (sc === 5) return { title: 'Mukammal! 🏆', desc: 'Siz haqiqiy sonlar dahosisiz!', color: 'text-emerald-400' };
    if (sc === 4) return { title: 'Juda yaxshi! 🥈', desc: 'Ajoyib tezlik va aniqlik!', color: 'text-amber-400' };
    if (sc === 3) return { title: 'Yaxshi! 🥉', desc: 'Yaxshi natija, yana biroz tezlashish mumkin.', color: 'text-cyan-400' };
    return { title: 'Qayta mashq qiling! 💡', desc: 'Sinflarni o‘ngdan 3 talik ajratishni takrorlang.', color: 'text-rose-400' };
  };

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto" id="speed-challenge-container">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 border border-amber-400/30 text-amber-400 uppercase tracking-wider inline-flex items-center gap-1.5">
          <Flame className="w-4 h-4" />
          2-Gamifikatsiya
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          30 SONIYALIK CHAQIRIQ
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Ekranda 5 ta son chiqadi. 30 soniya ichida imkon qadar tez va to‘g‘ri javob bering!
        </p>
      </div>

      {gameState === 'ready' && (
        <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto">
            <Zap className="w-10 h-10 fill-current" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Tezlik va Zehn Sinovi
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              5 ta ko‘p xonali sonning to‘g‘ri o‘qilishini tanlang. Har bir to‘g‘ri javob sizga tezkor tajriba beradi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-around text-xs">
            <div>
              <span className="text-slate-500 block">Savollar:</span>
              <span className="font-bold text-white text-base">5 ta</span>
            </div>
            <div className="border-r border-slate-800 h-8" />
            <div>
              <span className="text-slate-500 block">Vaqt:</span>
              <span className="font-bold text-amber-400 text-base">30 soniya</span>
            </div>
            <div className="border-r border-slate-800 h-8" />
            <div>
              <span className="text-slate-500 block">Eng yaxshi natija:</span>
              <span className="font-bold text-cyan-400 text-base">{bestScore} / 5</span>
            </div>
          </div>

          <button
            onClick={startChallenge}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
          >
            CHAQIRIQNI BOSHLASH! 🔥
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 space-y-6 shadow-2xl animate-fadeIn">
          
          {/* Top Bar with Timer & Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-slate-900 text-xs font-bold text-slate-300 border border-slate-800">
                Savol {currentIndex + 1} / 5
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                Ball: {score}
              </span>
            </div>

            {/* Timer countdown with color warning */}
            <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-mono text-base font-bold border transition-colors ${
              timeLeft <= 10 
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' 
                : 'bg-amber-400/10 text-amber-400 border-amber-400/30'
            }`}>
              <Timer className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          </div>

          {/* Question Number display */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Ushbu son qanday o‘qiladi?
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-black text-amber-400 tracking-wider">
              {questions[currentIndex]?.number}
            </div>
          </div>

          {/* 4 Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questions[currentIndex]?.options.map((opt, idx) => {
              const isChosen = selectedOption === idx;
              const isCorrect = idx === questions[currentIndex].correctIndex;

              let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';
              if (selectedOption !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                } else if (isChosen && !isCorrect) {
                  btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                }
              }

              return (
                <button
                  key={opt}
                  disabled={selectedOption !== null}
                  onClick={() => handleAnswer(idx)}
                  className={`p-4 rounded-xl text-left text-sm font-semibold border transition-all ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

        </div>
      )}

      {gameState === 'finished' && (
        <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className={`text-3xl font-black ${getEvaluation(score).color}`}>
              {getEvaluation(score).title}
            </h2>
            <p className="text-slate-300 text-sm">
              {getEvaluation(score).desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-around font-mono">
            <div>
              <span className="text-xs text-slate-500 block">To‘plangan natija:</span>
              <span className="text-3xl font-black text-amber-400">{score} / 5</span>
            </div>
            <div className="border-r border-slate-800 h-10" />
            <div>
              <span className="text-xs text-slate-500 block">Qolgan vaqt:</span>
              <span className="text-3xl font-black text-cyan-400">{timeLeft}s</span>
            </div>
          </div>

          <button
            onClick={startChallenge}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm mx-auto shadow-lg shadow-amber-400/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Qayta urinib ko‘rish</span>
          </button>
        </div>
      )}

    </div>
  );
};
