"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  actualTheme: "light" | "dark"; // The actual theme being applied
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("bingo-app-theme") as Theme;
    if (
      savedTheme &&
      (savedTheme === "light" ||
        savedTheme === "dark" ||
        savedTheme === "system")
    ) {
      setThemeState(savedTheme);
    } else {
      setThemeState("system");
    }
    setMounted(true);
  }, []);

  // Update actual theme based on selected theme
  useEffect(() => {
    if (mounted) {
      let newActualTheme: "light" | "dark";

      if (theme === "system") {
        newActualTheme = getSystemTheme();
      } else {
        newActualTheme = theme;
      }

      setActualTheme(newActualTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newActualTheme);
      localStorage.setItem("bingo-app-theme", theme);
    }
  }, [theme, mounted, getSystemTheme]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (mounted && theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const newActualTheme = getSystemTheme();
        setActualTheme(newActualTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newActualTheme);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, mounted, getSystemTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">{children}</div>
    );
  }

  return (
    <ThemeContext.Provider
      value={{ theme, actualTheme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return a default theme object instead of throwing an error
    // This prevents the error during SSR or when ThemeProvider is not available
    return {
      theme: "system" as Theme,
      actualTheme: "dark" as "light" | "dark",
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}
