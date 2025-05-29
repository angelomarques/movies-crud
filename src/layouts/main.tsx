import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { Film } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="px-2 sm:px-5">
      <header className="py-3 px-2 sm:px-3 flex border-b border-b-slate-200 gap-2 items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="hidden sm:block">
            <Film className="size-5" />
            <span className="sr-only">Visitar Página Principal</span>
          </Link>

          <p className="font-semibold text-lg leading-tight">
            Gerenciador de Filmes
          </p>
        </div>

        <ToggleThemeButton />
      </header>

      <Outlet />
    </div>
  );
}
