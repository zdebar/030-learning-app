export type SchoolLevelOverviewType = {
  id: number;
  level: string;
  classes: ClassOverviewType[];
};

export type ClassOverviewType = {
  id: number;
  class: string;
  courses: CourseOverviewType[];
};

export type CourseOverviewType = {
  id: number;
  course: string;
  chapters: ChapterOverviewType[];
};

export type ChapterOverviewType = {
  id: number;
  chapter: string;
  pointsAchieved: number;
  pointsRequired: number;
  nextAt: string | null;
  finishedAt: string | null;
};
