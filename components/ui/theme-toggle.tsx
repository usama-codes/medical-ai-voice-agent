"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300"
        disabled
      >
        <div className="w-5 h-5 rounded-full bg-muted animate-pulse" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-blue-500" />
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-amber-500" />
    </Button>
  );
}
