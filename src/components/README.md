# Components

This directory contains all the reusable components for the Bingo Telegram Bot Mini App.

## Components Overview

### Header

- **File**: `Header.tsx`
- **Props**: `userName?: string`
- **Description**: Top navigation bar with user greeting and control buttons (menu, close, refresh, deposit)

### BackgroundPattern

- **File**: `BackgroundPattern.tsx`
- **Props**: None
- **Description**: Decorative background with scattered bingo numbers and letters

### BalanceCard

- **File**: `BalanceCard.tsx`
- **Props**: `balance?: number`, `bonus?: number`, `currency?: string`
- **Description**: Displays user's balance and bonus with currency information

### InstructionsButton

- **File**: `InstructionsButton.tsx`
- **Props**: `onClick?: () => void`
- **Description**: Call-to-action button for game instructions

### GameModes

- **File**: `GameModes.tsx`
- **Props**: `gameModes?: GameMode[]`
- **Description**: Grid of game mode cards (Mini, Sweety, Standard, Grand) with invite friends button

### BottomNavigation

- **File**: `BottomNavigation.tsx`
- **Props**: `activeTab?: string`, `onTabChange?: (tab: string) => void`
- **Description**: Bottom navigation bar with 5 tabs (Play, Wallet, History, Stats, Settings)

### Footer

- **File**: `Footer.tsx`
- **Props**: `version?: string`, `timestamp?: string`
- **Description**: App version and timestamp display

## Usage

```tsx
import {
  Header,
  BackgroundPattern,
  BalanceCard,
  InstructionsButton,
  GameModes,
  BottomNavigation,
  Footer,
} from "@/components";

// Use in your component
<Header userName="John" />
<BalanceCard balance={100} bonus={50} currency="Birr" />
<GameModes />
```

## TypeScript Support

All components are fully typed with TypeScript interfaces for props and proper type safety.
