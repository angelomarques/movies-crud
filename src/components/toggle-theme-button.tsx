import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";

export function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();

  function toggleTheme(isDark: boolean) {
    setTheme(isDark ? "dark" : "light");
  }

  return (
    <div className="flex items-center space-x-3 flex-1 justify-end">
      <Sun className="size-4" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(value) => toggleTheme(value)}
        aria-label="Toggle theme"
      />
      <Moon className="size-4" />
    </div>
  );
}
