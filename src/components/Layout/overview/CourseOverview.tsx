import type {
  CourseOverviewType,
  ChapterOverviewType,
} from "@/components/Layout/overview/overview.datatypes";
import ChapterOverview from "./ChapterOverview";
import { useState } from "react";

export default function CourseOverview({ name, chapters }: CourseOverviewType) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        className="h-button flex items-center pl-12"
        onClick={() => setExpanded(!expanded)}
      >
        <h1>{name}</h1>
      </button>
      {expanded &&
        chapters &&
        chapters.map((chapter: ChapterOverviewType) => (
          <ChapterOverview key={chapter.id} {...chapter} />
        ))}
    </div>
  );
}
