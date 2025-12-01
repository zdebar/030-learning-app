import { useThemeStore, type UserTheme } from "./theme-store";
import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, chooseTheme } = useThemeStore();

  useEffect(() => {
    // Determine the default theme based on system settings
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme: UserTheme = prefersDark ? "dark" : "light";

    // Load the stored theme or fall back to the system's default
    const storedTheme =
      (localStorage.getItem("theme") as UserTheme) || defaultTheme;

    chooseTheme(storedTheme);

    // Apply the theme to the document
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(storedTheme);
    localStorage.setItem("theme", storedTheme);
  }, [chooseTheme]);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <>{children}</>;
}
