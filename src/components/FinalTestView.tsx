import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  Check
} from 'lucide-react';
import { FINAL_TEST_QUESTIONS } from '../data/curriculum';
import { Question } from '../types';

interface FinalTestViewProps {
  onCompleteTest: (score: number, total: number) => void;
  savedScore?: number;
  savedTotal?: number;
}

export const FinalTestView: React.FC<FinalTestViewProps> = ({
  onCompleteTest,
  savedScore,
  savedTotal = 20,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [qStatus, setQStatus] = useState<Record<number, 'correct' | 'wrong' | 'revealed'>>({});
  const [showHintFor, setShowHintFor] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const questions = FINAL_TEST_QUESTIONS;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
    if (optIdx === currentQ.correctIndex) {
      setQStatus(prev => ({ ...prev, [currentIdx]: 'correct' }));
    } else {
      setQStatus(prev => ({ ...prev, [currentIdx]: 'wrong' }));
    }
  };

  const calculateScore = () => {
    let count = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        count++;
      }
    });
    return count;
  };

  const handleFinishTest = () => {
    const score = calculateScore();
    setIsFinished(true);
    onCompleteTest(score, questions.length);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setQStatus({});
    setShowHintFor({});
    setIsFinished(false);
  };

  const finalScore = calculateScore();
  const passed = finalScore >= 18;

  // Category label helper
  const getCategoryLabel = (cat?: string) => {
    switch (cat) {
      case 'xonalar': return '1. Xonalarni aniqlash';
      case 'oqish': return '2. Sonlarni to‘g‘ri o‘qish';
      case 'sozdan_raqamga': return '3. So‘zdan raqamga o‘girish';
      case 'xato_topish': return '4. Xatoni topish va tuzatish';
      default: return 'Matematik savol';
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto" id="final-test-container">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 border border-amber-400/30 text-amber-400 uppercase tracking-wider inline-flex items-center gap-1.5">
          <Layers className="w-4 h-4" />
          Yakuniy Imtihon
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          FINAL TEST (20 TA SAVOL)
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          O‘tish chegarasi: <strong className="text-amber-400">18 / 20</strong> ball. Har bir to‘g‘ri javob sizni oliy unvonga yaqinlashtiradi!
        </p>
      </div>

      {!isFinished ? (
        <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 space-y-6 shadow-2xl animate-fadeIn">
          
          {/* Progress & Category */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              {getCategoryLabel(currentQ.category)}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">
                Savol {currentIdx + 1} / {questions.length}
              </span>
              <div className="w-28 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Savol matni */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h2>

            {/* 4 Ta Variant */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const status = qStatus[currentIdx];
                const isCorrect = optIdx === currentQ.correctIndex;

                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';
                if (isSelected) {
                  if (status === 'correct') {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                  } else if (status === 'wrong') {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                  }
                } else if (status === 'revealed' && isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                }

                return (
                  <button
                    key={opt}
                    disabled={status === 'correct' || status === 'revealed'}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl text-left text-sm border flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSelected && status === 'correct' && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isSelected && status === 'wrong' && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Hint Handling (Prompt mandates: Soft feedback with Maslahat olish) */}
          {qStatus[currentIdx] === 'correct' && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold">Barakalla! To‘g‘ri javob.</div>
                <div className="text-xs text-emerald-400/90">{currentQ.explanation}</div>
              </div>
            </div>
          )}

          {qStatus[currentIdx] === 'wrong' && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Yana bir bor urinib ko‘ring.</span>
                <button
                  onClick={() => setShowHintFor(prev => ({ ...prev, [currentIdx]: true }))}
                  className="px-3.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold border border-amber-400/40 transition-colors"
                >
                  💡 Maslahat olish
                </button>
              </div>

              {showHintFor[currentIdx] && (
                <div className="text-xs text-amber-200 border-t border-rose-500/20 pt-2 flex items-start justify-between gap-2">
                  <div>
                    <strong>Maslahat:</strong> {currentQ.hint}
                  </div>
                  <button
                    onClick={() => setQStatus(prev => ({ ...prev, [currentIdx]: 'revealed' }))}
                    className="text-[11px] underline text-slate-400 hover:text-white shrink-0"
                  >
                    To‘g‘ri javobni ko‘rish
                  </button>
                </div>
              )}
            </div>
          )}

          {qStatus[currentIdx] === 'revealed' && (
            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-amber-300">To‘g‘ri javob: {currentQ.options[currentQ.correctIndex]}</div>
              <div>{currentQ.explanation}</div>
            </div>
          )}

          {/* Navigatsiya: Oldingi / Keyingi savol */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold ${
                currentIdx === 0 ? 'text-slate-600 cursor-not-allowed' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Oldingi</span>
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors"
              >
                <span>Keyingi savol</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishTest}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                <Award className="w-4 h-4" />
                <span>Testni yakunlash</span>
              </button>
            )}
          </div>

          {/* Savollar raqamlari matritsasi */}
          <div className="pt-4 border-t border-slate-800">
            <div className="text-[11px] text-slate-500 mb-2">Barcha savollar bo‘yicha holat:</div>
            <div className="flex flex-wrap gap-1.5">
              {questions.map((_, idx) => {
                const st = qStatus[idx];
                let color = 'bg-slate-800 text-slate-500';
                if (st === 'correct') color = 'bg-emerald-500 text-slate-950 font-bold';
                else if (st === 'wrong') color = 'bg-rose-500 text-white font-bold';
                else if (idx === currentIdx) color = 'bg-amber-400 text-slate-950 font-bold';

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center transition-all ${color}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Test Yakuni */
        <div className="rounded-3xl bg-[#0f172a] border border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fadeIn">
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto border ${
            passed 
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
          }`}>
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white">
              {passed ? 'A’lo Natija! Test topshirildi! 🎉' : 'O‘tish chegarasiga yetmadi! 📚'}
            </h2>
            <p className="text-sm text-slate-300">
              {passed 
                ? 'Siz 18+ ball to‘pladingiz va «Matematik Diktor» talabini muvaffaqiyatli bajardingiz!' 
                : 'O‘tish uchun kamida 18 ball kerak. Kurs modullarini takrorlab, qayta urinib ko‘ring.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 font-mono inline-block">
            <span className="text-xs text-slate-500 block uppercase">Yakuniy Test Balli:</span>
            <span className={`text-4xl font-black ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
              {finalScore} / {questions.length}
            </span>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Testni qayta boshlash</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
