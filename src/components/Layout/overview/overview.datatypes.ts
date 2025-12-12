export type SchoolLevelOverviewType = {
  id: number;
  name: string;
  classes: ClassOverviewType[];
};

export type ClassOverviewType = {
  id: number;
  name: string;
  courses: CourseOverviewType[];
};

export type CourseOverviewType = {
  id: number;
  name: string;
  chapters: ChapterOverviewType[];
};

export type ChapterOverviewType = {
  id: number;
  name: string;
  pointsAchieved: number[] | null;
  pointsRequired: number;
  nextAt: string | null;
  finishedAt: string | null;
};
