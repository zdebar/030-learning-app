export interface IconProps {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  viewBox?: string;
}

export default function Icon({
  className = "",
  size = 24,
  strokeWidth = 1.5,
  strokeColor = "currentColor",
  fillColor = "none",
  viewBox = "0 0 24 24",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      className={className}
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
}
