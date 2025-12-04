export function findSessionIndex(
  points_achieved: number[] | null,
  points_requiered: number[] | null
): number {
  if (!points_achieved || !points_requiered) {
    return 0;
  }
  for (let i = 0; i < points_requiered.length; i++) {
    const achieved = points_achieved[i] ?? 0;
    if (achieved <= points_requiered[i]) {
      return i;
    }
  }
  return 0;
}
