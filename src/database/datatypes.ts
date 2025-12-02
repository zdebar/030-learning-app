// Exercise data types
export type ExerciseStep = {
  operation: string;
  explanation?: string;
  "steps-hidden"?: string[];
  steps: string[];
  points: number;
};

export type ExerciseSolution = ExerciseStep[];

export type ExerciseContent = {
  question: string;
  asignment: string;
  solutions: ExerciseSolution[];
};

// Explanation data types
export type ExplanationContent = {
  html?: string;
  markdown?: string;
  text?: string;
};

export type Explanation = {
  id: number;
  title: string;
  content: ExplanationContent;
  examples?: string[];
};
