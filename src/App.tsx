import { ThemeProvider } from "./components/theme-provider";
import { ToggleThemeButton } from "./components/toggle-theme-button";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToggleThemeButton />
    </ThemeProvider>
  );
}

export default App;
