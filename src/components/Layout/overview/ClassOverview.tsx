import type {
  ClassOverviewType,
  CourseOverviewType,
} from "@/components/Layout/overview/overview.datatypes";
import CourseOverview from "./CourseOverview";
import { useState } from "react";

export default function ClassOverview({ name, courses }: ClassOverviewType) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        className="h-button flex items-center pl-8"
        onClick={() => setExpanded(!expanded)}
      >
        <h1>{name}</h1>
      </button>
      {expanded &&
        courses &&
        courses.map((course: CourseOverviewType) => (
          <CourseOverview key={course.id} {...course} />
        ))}
    </div>
  );
}
