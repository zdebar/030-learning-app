import type { ChapterOverviewType } from "@/components/Layout/overview/overview.datatypes";
import Button from "@/components/UI/buttons/Button";

export default function ChapterOverview({
  name,
  pointsAchieved,
  pointsRequired,
  nextAt,
  finishedAt,
}: ChapterOverviewType) {
  const handlePracticeClick = () => {
    console.log(`Practicing chapter: ${name}`);
  };

  const isTimeToPractice = !nextAt || new Date(nextAt) <= new Date();
  const isDisabled = finishedAt !== null || !isTimeToPractice;

  // Calculate progress for each phase
  const progressPhases = pointsRequired?.map((required, idx) => {
    const achieved = pointsAchieved?.[idx] ?? 0;
    const percent = Math.min(100, Math.round((achieved / required) * 100));
    return (
      <div key={idx} className="mr-2">
        {percent}%
      </div>
    );
  });

  return (
    <div className="flex justify-between">
      <div className="flex items-center justify-between pl-16 grow">
        <h1>{name}</h1>
        <div className="flex">
          {progressPhases?.map((phase, index) => (
            <div key={index} className="flex items-center mr-4">
              {phase}
            </div>
          ))}
        </div>
      </div>

      {/* Additional chapter details can be added here */}
      <Button
        disabled={isDisabled}
        className="w-40 grow-0"
        onClick={handlePracticeClick}
      >
        Další
      </Button>
    </div>
  );
}
