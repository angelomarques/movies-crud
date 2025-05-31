import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/auth";
import { Film, LogOut } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export function MainLayout() {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  function signOut() {
    setToken(null);
    navigate("/login");
  }

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

        <div className="flex flex-1 justify-end gap-3">
          <Button variant="ghost" onClick={signOut}>
            <LogOut />
            <span>Sign out</span>
          </Button>

          <ToggleThemeButton />
        </div>
      </header>

      <Outlet />

      <Toaster />
    </div>
  );
}
