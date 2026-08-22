"use client";

/**
 * Three-state theme control: system, light, dark.
 *
 * Which face is visible is decided by CSS from the data-theme attribute that
 * the inline script in the root layout stamps on <html> before first paint, so
 * this component holds no state and renders identically on server and client.
 * That is the whole reason there is no hydration mismatch and no flash.
 */

type Theme = "system" | "light" | "dark";

const NEXT: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

function current(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : "system";
}

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") {
    root.removeAttribute("data-theme");
    try {
      localStorage.removeItem("theme");
    } catch {
      // private mode or blocked storage: the attribute change still applies
    }
    return;
  }
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // as above
  }
}

const faces: { theme: Theme; label: string; path: React.ReactNode }[] = [
  {
    theme: "system",
    label: "Theme: follow system",
    path: (
      <>
        <rect x="2.5" y="3.5" width="11" height="8" rx="1.2" />
        <path d="M6 14h4" />
      </>
    ),
  },
  {
    theme: "light",
    label: "Theme: light",
    path: (
      <>
        <circle cx="8" cy="8" r="3.1" />
        <path d="M8 1v1.8M8 13.2V15M1 8h1.8M13.2 8H15M3.1 3.1l1.3 1.3M11.6 11.6l1.3 1.3M12.9 3.1l-1.3 1.3M4.4 11.6l-1.3 1.3" />
      </>
    ),
  },
  {
    theme: "dark",
    label: "Theme: dark",
    path: <path d="M13 9.6A5.6 5.6 0 0 1 6.4 3a5.7 5.7 0 1 0 6.6 6.6Z" />,
  },
];

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() => apply(NEXT[current()])}
      title="Change theme"
      className="-my-1 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {faces.map((f) => (
        <span
          key={f.theme}
          className={`theme-face theme-face-${f.theme} items-center justify-center`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {f.path}
          </svg>
          <span className="vh">{f.label}. Activate to change.</span>
        </span>
      ))}
    </button>
  );
}
