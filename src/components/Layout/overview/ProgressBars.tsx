type ProgressBarsProps = {
  values: number[]; // Array of numbers 0 (empty) ... 1 (full)
  fullColor?: string;
  emptyColor?: string;
  className?: string;
};

export default function ProgressBars({
  values,
  className = "",
}: ProgressBarsProps) {
  return (
    <div className={`flex items-end h-full border-l ${className} bg-bar-empty`}>
      {values.map((val, idx) => {
        const clamped = Math.max(0, Math.min(1, val));
        const barWidth = idx === 0 ? "w-4" : "w-2";
        return (
          <div
            className={`${barWidth} h-full border-r flex flex-col z-100 justify-end`}
            key={idx}
          >
            <div
              className="bg-bar-full"
              title={`${Math.round(clamped * 100)}%`}
              style={{
                height: `${clamped * 100}%`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
