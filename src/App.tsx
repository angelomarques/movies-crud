import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { AuthRouteLayout } from "./layouts/auth-route";
import { MainLayout } from "./layouts/main";
import { ProtectedRouteLayout } from "./layouts/protected-route";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { SignUpPage } from "./pages/sign-up";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route element={<ProtectedRouteLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<AuthRouteLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
