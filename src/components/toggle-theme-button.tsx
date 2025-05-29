import { useTheme } from "@/hooks/use-theme";
import { Button } from "./ui/button";

export function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <Button onClick={toggleTheme} variant="destructive">
      Toggle Theme
    </Button>
  );
}
