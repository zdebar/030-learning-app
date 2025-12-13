export default function RibbonOverview({
  current = 0,
  max = 0,
}: {
  current: number;
  max: number;
}) {
  return (
    <div>
      {current} / {max}
    </div>
  );
}
