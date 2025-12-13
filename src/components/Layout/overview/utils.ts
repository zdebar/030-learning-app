import { type ChapterOverviewType } from "./overview.datatypes";

export function calculateCurrentRibbons(
  chapters: ChapterOverviewType[]
): number {
  const currentRibbons =
    chapters?.reduce((total, chapter) => {
      const achieved = chapter.pointsAchieved || [];
      const required = chapter.pointsRequired;
      const ribbons = achieved.reduce(
        (ribbons, points) => ribbons + (points >= (required ?? 0) ? 1 : 0),
        0
      );
      return total + ribbons;
    }, 0) || 0;
  return currentRibbons;
}

export function calculateMaxRibbons(
  chapters: ChapterOverviewType[],
  ribbonsPerChapter: number
): number {
  return chapters?.length * ribbonsPerChapter || 0;
}
