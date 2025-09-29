// utils/localStorageUtils.ts

import { BingoGame } from "@/models/bingo";

const STORAGE_KEY = "bingoGames";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const delayTime = 300;
const getGamesFromStorage = async (): Promise<BingoGame[]> => {
  await delay(delayTime); // Simulate loading delay
  if (typeof window !== "undefined") {
    const games = localStorage.getItem(STORAGE_KEY);
    return games ? JSON.parse(games) : [];
  }
  return [];
};

const saveGamesToStorage = async (games: BingoGame[]): Promise<BingoGame[]> => {
  await delay(delayTime); // Simulate loading delay
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  }
  return games;
};

export const createGame = async (game: BingoGame): Promise<BingoGame> => {
  await delay(delayTime); // Simulate loading delay
  const games = await getGamesFromStorage();
  games.push(game);
  const updatedGames = await saveGamesToStorage(games);
  return (await updatedGames.find((g) => g.id === game.id)) ?? game;
};

export const getGameById = async (
  id: string,
): Promise<BingoGame | undefined> => {
  await delay(delayTime); // Simulate loading delay
  const games = await getGamesFromStorage();
  return games.find((game) => game.id === id);
};

export const updateGameById = async (
  id: string,
  updatedGame: Partial<BingoGame>,
): Promise<void> => {
  await delay(delayTime); // Simulate loading delay
  const games = await getGamesFromStorage();
  const gameIndex = games.findIndex((game) => game.id === id);

  if (gameIndex !== -1) {
    games[gameIndex] = { ...games[gameIndex], ...updatedGame };
    await saveGamesToStorage(games);
  }
};

export const getAllGames = async (): Promise<BingoGame[]> => {
  return getGamesFromStorage();
};
