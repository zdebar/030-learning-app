import type {
  SchoolLevelOverviewType,
  ClassOverviewType,
} from "@/components/Layout/overview/overview.datatypes";
import ClassOverview from "./ClassOverview";
import Expandable from "./Expandable";

export default function SchoolLevelOverview({
  name,
  classes,
}: SchoolLevelOverviewType) {
  return (
    <Expandable name={name} buttonContent={null}>
      {classes &&
        classes.map((cls: ClassOverviewType) => (
          <ClassOverview key={cls.id} {...cls} />
        ))}
    </Expandable>
  );
}
