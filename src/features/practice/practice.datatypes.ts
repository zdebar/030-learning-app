export type Exercise = {
  exercise_id: number;
  name: string;
  type: string;
  points: number;
  content: string;
  user_points_achieved: number;
  user_finished_at: string | null;
};

export type Explanation = {
  explanation_id: number;
  name: string;
  content: string;
  updated_at: string;
};

export type UserChapterProgress = {
  chapter_id: number;
  points_achieved: number[];
  points_required: number[];
};

export type Practice = {
  exercise: Exercise;
  explanation: Explanation;
  user_progress: UserChapterProgress;
};
