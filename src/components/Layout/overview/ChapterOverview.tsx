import type { ChapterOverviewType } from "@/components/Layout/overview/overview.datatypes";
import { useNavigate } from "react-router-dom";
import Button from "@/components/UI/buttons/Button";
import ProgressBars from "./ProgressBars";
import config from "@/config/config";

export default function ChapterOverview({
  id,
  name,
  pointsAchieved,
  pointsRequired,
  nextAt,
  finishedAt,
}: ChapterOverviewType) {
  const navigate = useNavigate();

  const isTimeToPractice = !nextAt || new Date(nextAt) <= new Date();
  const isDisabled = finishedAt !== null || !isTimeToPractice;

  // Calculate progress for each phase
  const progressPhases = pointsRequired
    ?.slice(0, config.srs.intervals.length)
    .map((required, idx) => {
      const achieved = pointsAchieved?.[idx] ?? 0;
      const percent = Math.min(1, Math.round((achieved / required) * 1));
      return percent;
    });

  return (
    <div className="flex justify-between h-button border mb-1">
      <div className="flex items-center justify-between pl-4 grow ">
        <h1>{name}</h1>
        <ProgressBars values={progressPhases} />
      </div>

      {/* Additional chapter details can be added here */}
      <Button
        disabled={isDisabled}
        className="w-20 grow-0 border-none"
        onClick={() => navigate(`/practice/${encodeURIComponent(id)}`)}
      >
        Další
      </Button>
    </div>
  );
}
