"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setMounted(true);
    // Always start with dark theme
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    document.documentElement.classList.toggle(
      "light",
      initialTheme === "light",
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  if (!mounted) {
    return (
      <div className="relative w-10 h-10 rounded-full bg-black/5 dark:bg-white/5" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-105"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Moon className="w-5 h-5 text-white transition-all duration-300" />
      ) : (
        <Sun className="w-5 h-5 text-gray-900 transition-all duration-300" />
      )}
    </button>
  );
}
