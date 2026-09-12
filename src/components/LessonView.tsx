import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Volume2, 
  Lightbulb, 
  Check, 
  RefreshCw, 
  BookOpen, 
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import { Lesson, Question } from '../types';
import { numberToUzbekWords, formatWithSpaces, splitIntoClasses, speakUzbek } from '../utils/numberToUzbek';

interface LessonViewProps {
  lesson: Lesson;
  onCompleteLesson: (lessonId: string, score: number) => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  isCompleted: boolean;
  savedScore?: number;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onCompleteLesson,
  onNextLesson,
  onPrevLesson,
  isCompleted,
  savedScore,
}) => {
  // 7-step pedagogical tabs/stages
  // 0: Muammo, 1: Tushuntirish, 2: Namuna, 3: Birga Bajarish, 4: Mustaqil, 5: Mini Test, 6: Natija
  const [activeStep, setActiveStep] = useState<number>(0);

  // Guided practice state
  const [guidedAnswer, setGuidedAnswer] = useState<string | null>(null);
  const [showGuidedHint, setShowGuidedHint] = useState<boolean>(false);

  // Independent practice state
  const [independentAnswer, setIndependentAnswer] = useState<string | null>(null);
  const [showIndependentHint, setShowIndependentHint] = useState<boolean>(false);

  // Mini Test state
  const [currentTestQIndex, setCurrentTestQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [qStatus, setQStatus] = useState<Record<number, 'correct' | 'wrong' | 'revealed'>>({});
  const [showHintForQ, setShowHintForQ] = useState<Record<number, boolean>>({});
  const [testCompleted, setTestCompleted] = useState<boolean>(false);

  // Specific Interactive Widget states
  const [pickedNaturalItems, setPickedNaturalItems] = useState<Record<string, boolean>>({});
  const [naturalFeedback, setNaturalFeedback] = useState<string | null>(null);

  // Digits building state (Lesson 2)
  const [builtDigits, setBuiltDigits] = useState<string[]>([]);

  // Drag & drop slots state (Lesson 4)
  const [slotAssignments, setSlotAssignments] = useState<Record<string, string>>({});
  const [slotFeedback, setSlotFeedback] = useState<string | null>(null);

  // Triplet grouping state (Lesson 6)
  const [userGrouped, setUserGrouped] = useState<string>('');
  const [groupedFeedback, setGroupedFeedback] = useState<string | null>(null);

  // 3-step algorithm state (Lesson 11)
  const [algoStep, setAlgoStep] = useState<number>(1);

  // Reset states when lesson changes
  useEffect(() => {
    setActiveStep(0);
    setGuidedAnswer(null);
    setShowGuidedHint(false);
    setIndependentAnswer(null);
    setShowIndependentHint(false);
    setCurrentTestQIndex(0);
    setSelectedAnswers({});
    setQStatus({});
    setShowHintForQ({});
    setTestCompleted(false);
    setPickedNaturalItems({});
    setNaturalFeedback(null);
    setBuiltDigits([]);
    setSlotAssignments({});
    setSlotFeedback(null);
    setUserGrouped('');
    setGroupedFeedback(null);
    setAlgoStep(1);
  }, [lesson.id]);

  const stepLabels = [
    '1. Muammo',
    '2. Tushuntirish',
    '3. Namuna',
    '4. Birga yechamiz',
    '5. Mustaqil mashq',
    '6. Mini Test',
    '7. Natija'
  ];

  // Test answers handler
  const handleAnswerQuestion = (qIndex: number, optionIdx: number) => {
    const q = lesson.content.miniTest[qIndex];
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionIdx }));

    if (optionIdx === q.correctIndex) {
      setQStatus(prev => ({ ...prev, [qIndex]: 'correct' }));
    } else {
      setQStatus(prev => ({ ...prev, [qIndex]: 'wrong' }));
    }
  };

  const calculateLessonScore = () => {
    const totalQ = lesson.content.miniTest.length;
    if (totalQ === 0) return 100;
    let correctCount = 0;
    lesson.content.miniTest.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correctCount++;
    });
    return Math.round((correctCount / totalQ) * 100);
  };

  const handleFinishLesson = () => {
    const score = calculateLessonScore();
    onCompleteLesson(lesson.id, score);
    setActiveStep(6);
  };

  return (
    <div className="space-y-8 pb-16" id={`lesson-view-${lesson.id}`}>
      
      {/* Lesson Header */}
      <div className="rounded-3xl bg-[#0c1427] border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950">
              {lesson.moduleId}-MODUL • DARS {lesson.number}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Tugallangan ({savedScore ?? 100} ball)
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lesson.title}
          </h1>
          <p className="text-sm text-slate-300">
            {lesson.tagline}
          </p>
        </div>

        {/* Navigation between lessons */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          {onPrevLesson && (
            <button
              onClick={onPrevLesson}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Oldingi dars"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          {onNextLesson && (
            <button
              onClick={onNextLesson}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors"
            >
              <span>Keyingi dars</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 7-Step Stepper Bar */}
      <div className="overflow-x-auto no-scrollbar py-2">
        <div className="flex items-center gap-1.5 min-w-[700px] bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          {stepLabels.map((label, index) => {
            const isActive = activeStep === index;
            const isPassed = activeStep > index;

            return (
              <button
                key={label}
                id={`step-tab-${index}`}
                onClick={() => setActiveStep(index)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : isPassed
                    ? 'bg-slate-800/80 text-emerald-400 hover:bg-slate-800'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {isPassed ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: MUAMMO */}
      {activeStep === 0 && (
        <section className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 space-y-6 shadow-xl animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase">
            <HelpCircle className="w-4 h-4" />
            1. Real Muammo
          </div>

          <div className="space-y-4 max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Nega bu mavzuni o‘rganishimiz shart?
            </h2>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-base text-slate-200 leading-relaxed border-l-4 border-l-amber-400">
              {lesson.content.problem}
            </div>
            <p className="text-sm text-slate-400">
              Ushbu dars yakunida siz bu savolga to‘liq, mustaqil va ilmiy-amaliy javob topasiz.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => setActiveStep(1)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all"
            >
              <span>Tushuntirishga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 2: TUSHUNTIRISH */}
      {activeStep === 1 && (
        <section className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 space-y-8 shadow-xl animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase">
            <BookOpen className="w-4 h-4" />
            2. Pedagogik Tushuntirish
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Oddiy va bosqichma-bosqich izoh
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {lesson.content.explanation.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3.5 text-sm sm:text-base text-slate-200"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Darsga mos maxsus interaktiv trenajyor vidjeti */}
          {lesson.content.interactiveType === 'pick_natural' && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-400/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Interaktiv mashq: Natural sonlarni tanlang
                </h3>
                <span className="text-xs text-slate-400">Ustiga bosing</span>
              </div>
              <p className="text-xs text-slate-300">{lesson.content.interactiveData.instruction}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {lesson.content.interactiveData.items.map((it: any) => {
                  const isSelected = pickedNaturalItems[it.val];
                  return (
                    <button
                      key={it.val}
                      onClick={() => {
                        setPickedNaturalItems(prev => ({ ...prev, [it.val]: !prev[it.val] }));
                        if (it.isNatural) {
                          setNaturalFeedback(`To‘g‘ri! ${it.val} — natural son.`);
                        } else {
                          setNaturalFeedback(`E’tibor bering! ${it.hint || `${it.val} natural son emas.`}`);
                        }
                      }}
                      className={`p-4 rounded-xl font-mono text-lg font-bold border transition-all ${
                        isSelected
                          ? it.isNatural
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-rose-500/20 border-rose-500 text-rose-300'
                          : 'bg-slate-800 border-slate-700 text-white hover:border-amber-400'
                      }`}
                    >
                      {it.val}
                    </button>
                  );
                })}
              </div>

              {naturalFeedback && (
                <div className="p-3 rounded-xl bg-slate-800/80 text-xs font-semibold text-amber-300 border border-amber-400/20">
                  💡 {naturalFeedback}
                </div>
              )}
            </div>
          )}

          {lesson.content.interactiveType === 'build_number' && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-400/30 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Interaktiv topshiriq: Eng katta sonni tuzing!
              </h3>
              <p className="text-xs text-slate-300">
                Raqamlarni ketma-ket bosib, eng katta 4 xonali sonni hosil qiling:
              </p>

              <div className="flex items-center gap-3">
                {lesson.content.interactiveData.digits.map((d: string) => {
                  const isUsed = builtDigits.includes(d);
                  return (
                    <button
                      key={d}
                      disabled={isUsed}
                      onClick={() => setBuiltDigits(prev => [...prev, d])}
                      className={`w-12 h-12 rounded-xl text-xl font-black font-mono transition-all ${
                        isUsed 
                          ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700' 
                          : 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}

                <button
                  onClick={() => setBuiltDigits([])}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 ml-auto"
                >
                  Qayta boshlash
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                <div className="text-xs text-slate-400">Siz tuzgan son:</div>
                <div className="font-mono text-2xl font-black text-amber-400">
                  {builtDigits.join('') || '____'}
                </div>
              </div>

              {builtDigits.length === 4 && (
                <div className={`p-3 rounded-xl text-xs font-bold ${
                  builtDigits.join('') === lesson.content.interactiveData.expected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {builtDigits.join('') === lesson.content.interactiveData.expected
                    ? '✓ Barakalla! 9742 — tuzish mumkin bo‘lgan eng katta sondir!'
                    : 'Maslahat: Eng katta raqamni oldinga qo‘ying (9, 7, 4, 2)!'}
                </div>
              )}
            </div>
          )}

          {lesson.content.interactiveType === 'drag_drop_slots' && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-400/30 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Interaktiv: Raqamlarni tegishli xonaga joylashtiring (746 soni)
              </h3>
              <p className="text-xs text-slate-300">
                Har bir xonaga to‘g‘ri keladigan raqamni tanlang:
              </p>

              <div className="grid grid-cols-3 gap-3">
                {lesson.content.interactiveData.slots.map((slot: any) => (
                  <div key={slot.label} className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-center space-y-2">
                    <span className="text-xs font-bold text-amber-400">{slot.label}</span>
                    <div className="h-12 rounded-lg bg-slate-900 border border-dashed border-slate-600 flex items-center justify-center font-mono text-xl font-bold text-white">
                      {slotAssignments[slot.label] || '?'}
                    </div>
                    <div className="flex justify-center gap-1">
                      {['7', '4', '6'].map(d => (
                        <button
                          key={d}
                          onClick={() => {
                            setSlotAssignments(prev => ({ ...prev, [slot.label]: d }));
                          }}
                          className={`w-7 h-7 rounded text-xs font-mono font-bold ${
                            slotAssignments[slot.label] === d ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {Object.keys(slotAssignments).length === 3 && (
                <div className="p-3 rounded-xl bg-slate-800 text-xs font-bold text-slate-200">
                  {slotAssignments['Yuzliklar'] === '7' && slotAssignments['O‘nliklar'] === '4' && slotAssignments['Birliklar'] === '6'
                    ? '✓ To‘ppa-to‘g‘ri! 7 — yuzlik (700), 4 — o‘nlik (40), 6 — birlik (6).'
                    : 'Qayta tekshiring: 746 sonida 7 yuzlik, 4 o‘nlik va 6 birlik!'}
                </div>
              )}
            </div>
          )}

          {lesson.content.interactiveType === 'group_triplets' && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-400/30 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Interaktiv: Sonni o‘ngdan 3 talik guruhlarga ajrating!
              </h3>
              <p className="text-xs text-slate-300">
                Berilgan son: <span className="font-mono font-bold text-amber-400 text-base">2500700</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {['2500700', '25 00 700', '2 500 700', '250 0700'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setUserGrouped(opt);
                      if (opt === '2 500 700') {
                        setGroupedFeedback('✓ To‘g‘ri! O‘ngdan 3 tadan ajratganda 2 500 700 hosil bo‘ladi.');
                      } else {
                        setGroupedFeedback('Maslahat: Har doim o‘ngdan (oxiridan) boshlab 3 tadan raqam sanang.');
                      }
                    }}
                    className={`px-4 py-2.5 rounded-xl font-mono text-sm font-bold border transition-all ${
                      userGrouped === opt
                        ? opt === '2 500 700'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-800 border-slate-700 text-white hover:border-amber-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {groupedFeedback && (
                <div className="p-3 rounded-xl bg-slate-800 text-xs font-semibold text-amber-300">
                  {groupedFeedback}
                </div>
              )}
            </div>
          )}

          {lesson.content.interactiveType === 'three_step_algorithm' && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-400/30 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                3 Qadam Algoritmi Simulyatori (84 502 310)
              </h3>
              
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setAlgoStep(1)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    algoStep === 1 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  1-Qadam: Ajrat
                </button>
                <button
                  onClick={() => setAlgoStep(2)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    algoStep === 2 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  2-Qadam: Sinflarni o‘qi
                </button>
                <button
                  onClick={() => setAlgoStep(3)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    algoStep === 3 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  3-Qadam: Birlashtir
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-center space-y-3">
                {algoStep === 1 && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">O‘ngdan chapga 3 tadan ajratildi:</div>
                    <div className="text-2xl font-black text-amber-400 tracking-wider">
                      84 <span className="text-slate-600">•</span> 502 <span className="text-slate-600">•</span> 310
                    </div>
                  </div>
                )}
                {algoStep === 2 && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30">
                      <div className="text-[10px] text-amber-400 uppercase">Millionlar</div>
                      <div className="text-lg font-bold text-white">84</div>
                      <div className="text-[10px] text-slate-400">«sakson to‘rt million»</div>
                    </div>
                    <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30">
                      <div className="text-[10px] text-cyan-400 uppercase">Minglar</div>
                      <div className="text-lg font-bold text-white">502</div>
                      <div className="text-[10px] text-slate-400">«besh yuz ikki ming»</div>
                    </div>
                    <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30">
                      <div className="text-[10px] text-emerald-400 uppercase">Birliklar</div>
                      <div className="text-lg font-bold text-white">310</div>
                      <div className="text-[10px] text-slate-400">«uch yuz o‘n»</div>
                    </div>
                  </div>
                )}
                {algoStep === 3 && (
                  <div className="space-y-2">
                    <div className="text-xs text-slate-400">To‘liq o‘qilishi:</div>
                    <div className="text-lg font-bold text-emerald-400">
                      «Sakson to‘rt million besh yuz ikki ming uch yuz o‘n»
                    </div>
                    <button
                      onClick={() => speakUzbek('Sakson to‘rt million besh yuz ikki ming uch yuz o‘n')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      Tinglash
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => setActiveStep(0)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              ← Oldingi qadam
            </button>
            <button
              onClick={() => setActiveStep(2)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all"
            >
              <span>Namunaga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 3: NAMUNA */}
      {activeStep === 2 && (
        <section className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 space-y-6 shadow-xl animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            3. O‘qituvchi Namunasi
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Misollarni birga tahlil qilamiz
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.content.examples.map((ex, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-black text-amber-400">
                      {formatWithSpaces(ex.number) || ex.number}
                    </span>
                    <button
                      onClick={() => speakUzbek(ex.reading)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-400 transition-colors"
                      title="Ovozli o‘qish"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-sm font-semibold text-white">
                    «{ex.reading}»
                  </div>

                  {ex.breakdown && (
                    <div className="text-xs font-mono text-cyan-300 bg-cyan-950/30 px-2.5 py-1.5 rounded-lg border border-cyan-800/40">
                      {ex.breakdown}
                    </div>
                  )}

                  {ex.note && (
                    <div className="text-xs text-slate-400">
                      💡 {ex.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => setActiveStep(1)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              ← Tushuntirish
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all"
            >
              <span>Birga yechamiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 4: O‘QUVCHI BILAN BIRGA */}
      {activeStep === 3 && (
        <section className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 space-y-6 shadow-xl animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            4. O‘qituvchi bilan Birga Yechamiz
          </div>

          <div className="space-y-4 max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {lesson.content.guidedPractice.instruction}
            </h2>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xl sm:text-2xl font-bold text-amber-400">
              {lesson.content.guidedPractice.target}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {lesson.content.guidedPractice.options.map((opt) => {
                const isSelected = guidedAnswer === opt;
                const isCorrect = opt === lesson.content.guidedPractice.correctAnswer;

                return (
                  <button
                    key={opt}
                    onClick={() => setGuidedAnswer(opt)}
                    className={`p-4 rounded-xl text-left text-sm font-semibold border transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Soft Feedback & Maslahat olish */}
            {guidedAnswer && (
              <div className="space-y-3 pt-2">
                {guidedAnswer === lesson.content.guidedPractice.correctAnswer ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{lesson.content.guidedPractice.explanation}</span>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Yana bir bor urinib ko‘ring.</span>
                      <button
                        onClick={() => setShowGuidedHint(true)}
                        className="px-3 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold border border-amber-400/40"
                      >
                        💡 Maslahat olish
                      </button>
                    </div>
                    {showGuidedHint && (
                      <p className="text-xs text-amber-200 pt-1">
                        <strong>Maslahat:</strong> {lesson.content.guidedPractice.hint}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => setActiveStep(2)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              ← Namuna
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all"
            >
              <span>Mustaqil mashqqa o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 5: MUSTAQIL TOPSHIRIQ */}
      {activeStep === 4 && (
        <section className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 space-y-6 shadow-xl animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
            <Sparkles className="w-4 h-4" />
            5. Mustaqil Topshiriq
          </div>

          <div className="space-y-4 max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {lesson.content.independentPractice.instruction}
            </h2>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xl font-bold text-cyan-300">
              {lesson.content.independentPractice.target}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {lesson.content.independentPractice.options.map((opt) => {
                const isSelected = independentAnswer === opt;
                const isCorrect = opt === lesson.content.independentPractice.correctAnswer;

                return (
                  <button
                    key={opt}
                    onClick={() => setIndependentAnswer(opt)}
                    className={`p-4 rounded-xl text-left text-sm font-semibold border transition-all ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {independentAnswer && (
              <div className="space-y-3 pt-2">
                {independentAnswer === lesson.content.independentPractice.correctAnswer ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{lesson.content.independentPractice.explanation}</span>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Diqqat! Yana bir bor urinib ko‘ring.</span>
                      <button
                        onClick={() => setShowIndependentHint(true)}
                        className="px-3 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold border border-amber-400/40"
                      >
                        💡 Maslahat olish
                      </button>
                    </div>
                    {showIndependentHint && (
                      <p className="text-xs text-amber-200 pt-1">
                        <strong>Maslahat:</strong> {lesson.content.independentPractice.hint}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => setActiveStep(3)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              ← Birga yechamiz
            </button>
            <button
              onClick={() => setActiveStep(5)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all"
            >
              <span>Mini Testga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 6: MINI TEST */}
      {activeStep === 5 && (
        <section className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 space-y-6 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              6. Mini Test (Dars Sinovi)
            </div>
            <span className="text-xs font-bold text-slate-400">
              Savol {currentTestQIndex + 1} / {lesson.content.miniTest.length}
            </span>
          </div>

          {lesson.content.miniTest.length > 0 ? (
            <div className="space-y-6 max-w-3xl">
              {(() => {
                const q = lesson.content.miniTest[currentTestQIndex];
                const selected = selectedAnswers[currentTestQIndex];
                const status = qStatus[currentTestQIndex];
                const showHint = showHintForQ[currentTestQIndex];

                return (
                  <div className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {q.question}
                    </h2>

                    <div className="space-y-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        const isCorrect = optIdx === q.correctIndex;

                        let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';
                        if (isChosen) {
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
                            onClick={() => handleAnswerQuestion(currentTestQIndex, optIdx)}
                            className={`w-full p-4 rounded-xl text-left text-sm border flex items-center justify-between transition-all ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isChosen && status === 'correct' && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            )}
                            {isChosen && status === 'wrong' && (
                              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback block */}
                    {status === 'correct' && (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-bold">Barakalla! To‘g‘ri javob.</div>
                          <div className="text-xs text-emerald-400/90">{q.explanation}</div>
                        </div>
                      </div>
                    )}

                    {status === 'wrong' && (
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Yana bir bor urinib ko‘ring.</span>
                          <button
                            onClick={() => setShowHintForQ(prev => ({ ...prev, [currentTestQIndex]: true }))}
                            className="px-3 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold border border-amber-400/40"
                          >
                            💡 Maslahat olish
                          </button>
                        </div>
                        {showHint && (
                          <div className="text-xs text-amber-200 border-t border-rose-500/20 pt-2 flex items-start justify-between gap-2">
                            <div>
                              <strong>Maslahat:</strong> {q.hint}
                            </div>
                            <button
                              onClick={() => setQStatus(prev => ({ ...prev, [currentTestQIndex]: 'revealed' }))}
                              className="text-[11px] underline text-slate-400 hover:text-white shrink-0"
                            >
                              Javobni ko‘rish
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {status === 'revealed' && (
                      <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300 space-y-1">
                        <div className="font-bold text-amber-300">To‘g‘ri javob: {q.options[q.correctIndex]}</div>
                        <div>{q.explanation}</div>
                      </div>
                    )}

                    {/* Next / Previous questions inside mini-test */}
                    <div className="flex items-center justify-between pt-4">
                      <button
                        disabled={currentTestQIndex === 0}
                        onClick={() => setCurrentTestQIndex(prev => prev - 1)}
                        className={`text-xs font-bold px-4 py-2 rounded-lg ${
                          currentTestQIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        ← Oldingi savol
                      </button>

                      {currentTestQIndex < lesson.content.miniTest.length - 1 ? (
                        <button
                          onClick={() => setCurrentTestQIndex(prev => prev + 1)}
                          className="text-xs font-bold px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950"
                        >
                          Keyingi savol →
                        </button>
                      ) : (
                        <button
                          onClick={handleFinishLesson}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
                        >
                          <Award className="w-4 h-4" />
                          <span>Darsni yakunlash va natijani ko‘rish</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <p className="text-sm text-slate-400">Bu dars uchun to‘liq yakuniy test bo‘limi mavjud.</p>
              <button
                onClick={handleFinishLesson}
                className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm"
              >
                Natijaga o‘tish
              </button>
            </div>
          )}
        </section>
      )}

      {/* STEP 7: NATIJA */}
      {activeStep === 6 && (
        <section className="rounded-3xl bg-[#0f172a] border border-slate-800 p-6 sm:p-10 space-y-6 shadow-xl animate-fadeIn text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Tabriklaymiz! Dars muvaffaqiyatli yakunlandi!
            </h2>
            <p className="text-sm text-slate-300">
              Bugun siz: <span className="font-bold text-amber-400">{lesson.title}</span> mavzusini to‘liq o‘zlashtirdingiz.
            </p>
          </div>

          {/* Dars xulosalari */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Bugungi dars xulosalari:
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
              {lesson.content.summary.map((sum, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sum}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Dars bahosi:</span>
            <span className="text-xl font-black text-amber-400">{calculateLessonScore()} / 100 ball</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveStep(0)}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              Darsni qayta ko‘rish
            </button>
            {onNextLesson && (
              <button
                onClick={onNextLesson}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20"
              >
                <span>Keyingi darsga o‘tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>
      )}

    </div>
  );
};
