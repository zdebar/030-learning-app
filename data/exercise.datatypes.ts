export type ExerciseStep = {
  operation: string;
  explanation?: string;
  steps: string[];
  "steps-hidden"?: string[];
  points?: number;
};

export type ExerciseSolution = ExerciseStep[];

export type ExerciseData = {
  type: string;
  question: string;
  asignment: string;
  points?: number;
  solutions: ExerciseSolution[];
};
