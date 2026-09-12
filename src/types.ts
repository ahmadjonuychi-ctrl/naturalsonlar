export type TabType = 
  | 'home' 
  | 'roadmap' 
  | 'lesson' 
  | 'test' 
  | 'speed' 
  | 'lab' 
  | 'graduation' 
  | 'results' 
  | 'teacher';

export interface Question {
  id: string;
  question: string;
  category?: 'xonalar' | 'oqish' | 'sozdan_raqamga' | 'xato_topish';
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface LessonContent {
  problem: string;
  explanation: string[];
  examples: Array<{
    number: string;
    reading: string;
    breakdown?: string;
    note?: string;
  }>;
  interactiveType: 
    | 'pick_natural' 
    | 'build_number' 
    | 'select_reading' 
    | 'drag_drop_slots' 
    | 'value_detector' 
    | 'group_triplets' 
    | 'step_by_step_reader' 
    | 'zero_rules' 
    | 'three_step_algorithm' 
    | 'word_to_num_converter' 
    | 'real_life_explorer';
  interactiveData?: any;
  guidedPractice: {
    instruction: string;
    target: string;
    options: string[];
    correctAnswer: string;
    hint: string;
    explanation: string;
  };
  independentPractice: {
    instruction: string;
    target: string;
    options: string[];
    correctAnswer: string;
    hint: string;
    explanation: string;
  };
  miniTest: Question[];
  summary: string[];
}

export interface Lesson {
  id: string;
  moduleId: number;
  number: number;
  title: string;
  tagline: string;
  durationMinutes: number;
  content: LessonContent;
}

export interface Module {
  id: number;
  title: string;
  tagline: string;
  outcome: string;
  lessons: Lesson[];
  badgeId: string;
}

export interface Badge {
  id: string;
  name: string;
  level: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  dateUnlocked?: string;
}

export interface UserProgress {
  completedLessons: string[];
  lessonScores: Record<string, number>; // lessonId -> score 0-100
  totalScore?: number;
  badges: Badge[];
  finalTestScore?: number;
  finalTestTotal?: number;
  speedChallengeBest: number;
  graduationProjectScore?: number;
  lastActiveLessonId?: string;
}

export interface GraduationStep {
  id: number;
  number: string;
  classes: string[];
  places: { place: string; digit: string; value: string }[];
  reading: string;
  reverseCheck: string;
  realLifeContext: string;
}
