import type {
  SchoolLevelOverviewType,
  ClassOverviewType,
} from "@/components/Layout/overview/overview.datatypes";
import ClassOverview from "./ClassOverview";
import { useState } from "react";

export default function SchoolLevelOverview({
  name,
  classes,
}: SchoolLevelOverviewType) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section>
      <button
        className="h-button flex items-center pl-4 w-full border"
        onClick={() => setExpanded(!expanded)}
      >
        <h1>{name}</h1>
      </button>
      {expanded &&
        classes &&
        classes.map((cls: ClassOverviewType) => (
          <ClassOverview key={cls.id} {...cls} />
        ))}
    </section>
  );
}
