import type {
  CourseOverviewType,
  ChapterOverviewType,
} from "@/database/overview.datatypes";
import ChapterOverview from "./ChapterOverview";

export default function CourseOverview({
  course,
  chapters,
}: CourseOverviewType) {
  return (
    <div>
      <h4>{course}</h4>
      {chapters &&
        chapters.map((chapter: ChapterOverviewType) => (
          <ChapterOverview key={chapter.id} {...chapter} />
        ))}
    </div>
  );
}
