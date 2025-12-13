import type {
  CourseOverviewType,
  ChapterOverviewType,
} from "@/components/Layout/overview/overview.datatypes";
import ChapterOverview from "./ChapterOverview";
import Expandable from "./Expandable";
import RibbonOverview from "./RibbonOverview";
import config from "@/config/config";
import { calculateCurrentRibbons, calculateMaxRibbons } from "./utils";

export default function CourseOverview({ name, chapters }: CourseOverviewType) {
  return (
    <Expandable
      name={name}
      buttonContent={
        <RibbonOverview
          current={calculateCurrentRibbons(chapters)}
          max={calculateMaxRibbons(chapters, config.srs.intervals.length)}
        />
      }
      className="pl-4"
    >
      {chapters &&
        chapters.map((chapter: ChapterOverviewType) => (
          <ChapterOverview key={chapter.id} {...chapter} />
        ))}
    </Expandable>
  );
}
