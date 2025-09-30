# Theme System

This directory contains the theme management system for the Bingo Telegram Bot Mini App, supporting both light and dark modes.

## Structure

```
src/contexts/
├── ThemeContext.tsx  # React context for theme management
└── README.md         # This file
```

## Features

- **Theme Switching**: Toggle between light and dark modes
- **System Preference Detection**: Automatically detects user's system theme preference
- **Persistent Storage**: Theme preference saved in localStorage
- **Smooth Transitions**: CSS transitions for theme changes
- **Type Safety**: Full TypeScript support
- **Hydration Safe**: Prevents hydration mismatches

## Usage

### 1. Using the Hook

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div className={theme === "dark" ? "bg-slate-900" : "bg-white"}>
      <button onClick={toggleTheme}>
        Switch to {theme === "dark" ? "light" : "dark"} mode
      </button>
    </div>
  );
}
```

### 2. Theme Toggle Component

```tsx
import ThemeToggle from "@/components/ThemeToggle";

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

## Theme Values

- **"light"**: Light mode with bright backgrounds and dark text
- **"dark"**: Dark mode with dark backgrounds and light text

## CSS Classes

The theme system uses Tailwind's dark mode classes:

```tsx
// Conditional styling
<div className={theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>

// Or using Tailwind's dark: prefix
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
```

## Custom Theme Colors

The app includes custom theme-aware colors defined in `globals.css`:

- `--bingo-primary`: Primary accent color
- `--bingo-secondary`: Secondary accent color
- `--bingo-accent`: Accent color
- `--bingo-bg`: Main background color
- `--bingo-bg-secondary`: Secondary background color
- `--bingo-text`: Main text color
- `--bingo-text-secondary`: Secondary text color
- `--bingo-card`: Card background color
- `--bingo-border`: Border color

## Implementation Details

- **Context Provider**: Wraps the entire app in `layout.tsx`
- **Document Class**: Adds `light` or `dark` class to `document.documentElement`
- **Hydration Safety**: Prevents flash of wrong theme on page load
- **System Detection**: Automatically detects user's system preference
- **Persistence**: Saves theme choice to localStorage

## Theme-Aware Components

All components are updated to support both themes:

- **Header**: Theme toggle button and adaptive text colors
- **BackgroundPattern**: Different opacity and colors for each theme
- **BalanceCard**: Adaptive gradient colors
- **InstructionsButton**: Different background colors
- **GameModes**: Adaptive text and button colors
- **BottomNavigation**: Different background and text colors
- **Footer**: Adaptive text colors

## Adding New Theme-Aware Components

1. Import the `useTheme` hook
2. Use conditional classes based on `theme` value
3. Test both light and dark modes

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 ${
        theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-900"
      }`}
    >
      Content
    </div>
  );
}
```

## Best Practices

- Always test both light and dark modes
- Use semantic color names when possible
- Ensure sufficient contrast in both themes
- Consider accessibility guidelines
- Use CSS custom properties for consistent theming
- Test with system theme changes
