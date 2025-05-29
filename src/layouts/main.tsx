import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <header>
        <ToggleThemeButton />
      </header>

      <Outlet />
    </>
  );
}
