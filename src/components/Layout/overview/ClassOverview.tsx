import type {
  ClassOverviewType,
  CourseOverviewType,
} from "@/components/Layout/overview/overview.datatypes";
import CourseOverview from "./CourseOverview";
import Expandable from "./Expandable";
import RibbonOverview from "./RibbonOverview";
import { calculateCurrentRibbons, calculateMaxRibbons } from "./utils";
import config from "@/config/config";

export default function ClassOverview({ name, courses }: ClassOverviewType) {
  const currentRibbons = courses.reduce((total, course) => {
    return total + calculateCurrentRibbons(course.chapters);
  }, 0);

  const maxRibbons = courses.reduce((total, course) => {
    return (
      total + calculateMaxRibbons(course.chapters, config.srs.intervals.length)
    );
  }, 0);

  return (
    <Expandable
      name={name}
      buttonContent={
        <RibbonOverview current={currentRibbons} max={maxRibbons} />
      }
      className="pl-4"
    >
      {courses &&
        courses.map((course: CourseOverviewType) => (
          <CourseOverview key={course.id} {...course} />
        ))}
    </Expandable>
  );
}
