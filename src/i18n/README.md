# Internationalization (i18n) System

This directory contains the internationalization system for the Bingo Telegram Bot Mini App, supporting English and Amharic languages.

## Structure

```
src/i18n/
├── locales/
│   ├── en.json          # English translations
│   └── am.json          # Amharic translations
├── LanguageContext.tsx  # React context for language management
├── index.ts            # Exports
└── README.md           # This file
```

## Features

- **Language Switching**: Toggle between English and Amharic
- **Persistent Storage**: Language preference saved in localStorage
- **Fallback Support**: Falls back to English if translation is missing
- **Type Safety**: Full TypeScript support
- **Dynamic Loading**: Translations loaded on demand

## Usage

### 1. Using the Hook

```tsx
import { useLanguage } from "@/i18n";

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t("common.hello")}</h1>
      <button onClick={() => setLanguage("am")}>Switch to Amharic</button>
    </div>
  );
}
```

### 2. Translation Keys

Translation keys use dot notation for nested objects:

```json
{
  "common": {
    "hello": "Hello",
    "play": "Play"
  },
  "gameModes": {
    "mini": "Mini"
  }
}
```

Access with: `t("common.hello")` or `t("gameModes.mini")`

### 3. Adding New Translations

1. Add the key to both `en.json` and `am.json`
2. Use the key in your component with `t("your.key")`

## Language Switcher

The language switcher is automatically added to the header component. Users can click the globe icon to toggle between languages.

## Supported Languages

- **English (en)**: Default language
- **Amharic (am)**: Ethiopian language with proper Unicode support

## Translation Files

### English (en.json)

Contains all English translations with clear, user-friendly text.

### Amharic (am.json)

Contains Amharic translations using proper Unicode characters. The translations are culturally appropriate and use common Amharic terms.

## Implementation Details

- **Context Provider**: Wraps the entire app in `layout.tsx`
- **Dynamic Imports**: Translations loaded asynchronously
- **Error Handling**: Graceful fallback to English on load errors
- **Performance**: Translations cached in memory after first load

## Adding New Languages

1. Create a new JSON file in `locales/` (e.g., `fr.json` for French)
2. Add the language type to `Language` type in `LanguageContext.tsx`
3. Update the language switcher logic
4. Add translations for all keys

## Best Practices

- Keep translation keys descriptive and hierarchical
- Use consistent naming conventions
- Test both languages thoroughly
- Consider text length differences between languages
- Use proper Unicode for non-Latin scripts
