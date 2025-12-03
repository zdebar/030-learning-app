import type {
  ClassOverviewType,
  CourseOverviewType,
} from "@/components/Layout/overview/overview.datatypes";
import CourseOverview from "./CourseOverview";
import Expandable from "./Expandable";

export default function ClassOverview({ name, courses }: ClassOverviewType) {
  return (
    <Expandable name={name} buttonContent={null} className="pl-4">
      {courses &&
        courses.map((course: CourseOverviewType) => (
          <CourseOverview key={course.id} {...course} />
        ))}
    </Expandable>
  );
}
