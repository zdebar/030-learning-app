export function splitEquation(equation: string): [string, string, string] {
  const idx = equation.indexOf("=");
  if (idx === -1) return [equation, "", ""];
  return [equation.slice(0, idx).trim(), "=", equation.slice(idx + 1).trim()];
}
