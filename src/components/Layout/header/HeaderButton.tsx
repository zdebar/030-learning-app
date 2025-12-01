import type { ReactNode } from "react";
import { Link, useMatch, type LinkProps } from "react-router-dom";

interface HeaderButtonProps extends LinkProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  to: string;
}

export default function HeaderButton({
  children,
  disabled = false,
  className = "",
  to,
  ...props
}: HeaderButtonProps) {
  const isSelected = useMatch(to);

  if (disabled) {
    return (
      <span
        className={`shape-button-header color-button-header-disabled flex items-center justify-center ${className}`}
        aria-disabled="true"
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      to={to}
      className={`shape-button-header color-button-header flex items-center justify-center ${
        isSelected ? "color-selected" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
