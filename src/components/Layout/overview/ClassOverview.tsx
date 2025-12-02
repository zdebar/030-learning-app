import type {
  ClassOverviewType,
  CourseOverviewType,
} from "@/database/overview.datatypes";
import CourseOverview from "./CourseOverview";

export default function ClassOverview({
  class: className,
  courses,
}: ClassOverviewType) {
  return (
    <div>
      <h3>{className}</h3>
      {courses &&
        courses.map((course: CourseOverviewType) => (
          <CourseOverview key={course.id} {...course} />
        ))}
    </div>
  );
}
