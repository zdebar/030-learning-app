import { useState, useEffect } from "react";
import ChevronDownIcon from "./ChevronDownIcon";
import ChevronRightIcon from "./ChevronRightIcon";

type ExpandableProps = {
  name: string;
  buttonContent?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export default function Expandable({
  name,
  buttonContent,
  className = "",
  children,
}: ExpandableProps) {
  const storageKey = `expandable-${name}`;
  const [expanded, setExpanded] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem(storageKey, expanded.toString());
  }, [expanded, storageKey]);

  return (
    <section>
      <button
        className={`h-button flex items-center justify-between px-4 w-full border ${className} ${
          !children && "color-disabled"
        }`}
        onClick={() => setExpanded(!expanded)}
        disabled={!children}
      >
        <h1>{name}</h1>
        <div>
          {buttonContent}
          {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </div>
      </button>
      <div className="pt-1">{expanded && children}</div>
    </section>
  );
}
