import type { ChapterOverviewType } from "@/database/overview.datatypes";

export default function ChapterOverview({
  chapter,
  pointsAchieved,
  pointsRequired,
  nextAt,
  finishedAt,
}: ChapterOverviewType) {
  return (
    <div>
      <strong>{chapter}</strong>
      <div>Body získané: {pointsAchieved}</div>
      <div>Body požadované: {pointsRequired}</div>
      <div>Další trénink: {nextAt}</div>
      <div>Dokončeno: {finishedAt}</div>
    </div>
  );
}
