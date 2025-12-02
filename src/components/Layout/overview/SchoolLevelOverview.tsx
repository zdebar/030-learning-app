import type {
  SchoolLevelOverviewType,
  ClassOverviewType,
} from "@/database/overview.datatypes";
import ClassOverview from "./ClassOverview";

export default function SchoolLevelOverview({
  level,
  classes,
}: SchoolLevelOverviewType) {
  return (
    <section>
      <h2>{level}</h2>
      {classes.map((cls: ClassOverviewType) => (
        <ClassOverview key={cls.id} {...cls} />
      ))}
    </section>
  );
}
