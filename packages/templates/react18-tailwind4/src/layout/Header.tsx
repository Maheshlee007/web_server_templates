import { useTheme } from "@/context/themeContext";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState } from "react";

function Header() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);
  // Enable mouse-follow gradient effect
  useMousePosition();

  const themeIcons = {
    light: <Sun size={18} />,
    dark: <Moon size={18} />,
    system: <Monitor size={18} />,
  };

  return (
    <>
      {/* Header with Glass + Spotlight Effect */}
      <header className="glass-strong rounded-2xl p-2 mb-6 flex flex-col md:flex-row items-center justify-between md:rounded-none">
        <div>
          <h1 className="text-gradient text-3xl md:text-4xl font-bold mb-2">
            React 18 + Tailwind v4
          </h1>
          {/* <p className="text-(--color-text-secondary)">
            Modern glassmorphism design system • Move your mouse around!
          </p> */}
        </div>
        <div className="relative">
          <div
            className="rounded-full p-4 text-gradient text-lg font-bold cursor-pointer"
            onClick={() => setThemeOpen(!themeOpen)}
          >
            ML
          </div>
          {/* Theme Switcher */}
          {themeOpen && (
            <div className=" absolute -left-20  flex flex-col glass  p-2   items-center gap-1">
              {(["light", "dark", "system"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`
                  flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all
                  ${
                    theme === t
                      ? "bg-(--color-brand) text-white shadow-lg"
                      : "text-(--color-text-secondary) hover:text-(--color-text) hover:bg-white/10"
                  }
                `}
                >
                  {themeIcons[t]}
                  <span className="hidden sm:inline capitalize">{t}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
