import type {
  CourseOverviewType,
  ChapterOverviewType,
} from "@/components/Layout/overview/overview.datatypes";
import ChapterOverview from "./ChapterOverview";
import Expandable from "./Expandable";

export default function CourseOverview({ name, chapters }: CourseOverviewType) {
  return (
    <Expandable name={name} buttonContent={null} className="pl-12">
      {chapters &&
        chapters.map((chapter: ChapterOverviewType) => (
          <ChapterOverview key={chapter.id} {...chapter} />
        ))}
    </Expandable>
  );
}
