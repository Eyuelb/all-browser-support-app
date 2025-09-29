import { bingoCards } from "@/config/bingo";
import { BingoCard } from "@/models/bingo";

export const getBingoLetter = (number: number): string => {
  if (number >= 1 && number <= 15) return "B";
  if (number >= 16 && number <= 30) return "I";
  if (number >= 31 && number <= 45) return "N";
  if (number >= 46 && number <= 60) return "G";
  return "O";
};

export const handleNumberDrawing = ({
  setDrawnNumbers,
  autoCallInterval,
}: {
  autoCallInterval: number;
  setDrawnNumbers: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const numberQueue = new Set<number>([]);
  console.log(numberQueue);
  const drawNumbers = async () => {
    if (numberQueue.size >= 75) {
      return;
    }

    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 75) + 1;
    } while (numberQueue.has(newNumber));

    numberQueue.add(newNumber);

    setDrawnNumbers(Array.from(numberQueue));
    if (Array.from(numberQueue).length === 75) {
      return;
    }


  };

  const drawingInterval = async () => {
    await drawNumbers();

    if (numberQueue.size < 75) {
      setTimeout(drawingInterval, autoCallInterval * 1000);
    }
  };
  drawingInterval();
};
export const generateRandomNumber = (drawnNumbers: number[]): number => {
  const min = 1;
  const max = 75;
  let number: number;
  do {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (drawnNumbers.includes(number));
  return number;
};

export const bingoLetters = ["B", "I", "N", "G", "O"];
export const bingoColors: Record<string, string> = {
  B: "#1EFF00",
  I: "#FF0000",
  N: "#FFA600",
  G: "rgb(38, 38, 217)",
  O: "rgb(217, 38, 128)",
};
export const bingoLetterGradientColors: Record<string, string[]> = {
  B: [
    "hsl(120, 70%, 40%)",
    "hsl(120, 70%, 30%)",
    "hsl(120, 70%, 30%)",
    "hsl(120, 70%, 50%)",
  ], // Green
  I: [
    "hsl(0, 70%, 40%)",
    "hsl(0, 70%, 30%)",
    "hsl(0, 70%, 30%)",
    "hsl(0, 70%, 50%)",
  ], // Red
  N: [
    "hsl(39, 70%, 40%)",
    "hsl(39, 70%, 30%)",
    "hsl(39, 70%, 30%)",
    "hsl(39, 70%, 50%)",
  ], // Orange
  G: [
    "hsl(240, 70%, 40%)",
    "hsl(240, 70%, 30%)",
    "hsl(240, 70%, 30%)",
    "hsl(240, 70%, 50%)",
  ], // Blue
  O: [
    "hsl(330, 70%, 40%)",
    "hsl(330, 70%, 30%)",
    "hsl(330, 70%, 30%)",
    "hsl(330, 70%, 50%)",
  ], // Pink
};

const numberRanges = {
  B: [1, 15],
  I: [16, 30],
  N: [31, 45],
  G: [46, 60],
  O: [61, 75],
};
export const bingoGridNumbers = Object.keys(numberRanges).map((letter) => {
  const [start, end] = numberRanges[letter as keyof typeof numberRanges];
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
});

export const winningPatterns = [
  // horizontal lines
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  // vertical lines
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  // diagonal lines
  [0, 6, 18, 24],
  [4, 8, 16, 20],
  // four corners
  [0, 4, 20, 24],
];

export function isWinningCartela({
  drawnNumbers,
  winnerCard,
}: {
  drawnNumbers: number[];
  winnerCard: number;
}): {
  win: boolean;
  activeNumbers: BingoCard;
  passedNumbers: BingoCard;
  cartela: BingoCard | null;
  error?: string;
} {
  const cartela = bingoCards[winnerCard - 1];
  const flatCartela = cartela.flat().map((num) => (num === "FREE" ? -1 : num));
  const lastDrawnNumber = drawnNumbers[drawnNumbers.length - 1];

  const extendedBoardNumbers = drawnNumbers.includes(-1)
    ? drawnNumbers
    : [...drawnNumbers, -1];
  const activeNumbers: BingoCard = [];
  const passedNumbers: BingoCard = [];

  for (const pattern of winningPatterns) {
    const matchedNumbers = pattern.filter((index) =>
      extendedBoardNumbers.includes(flatCartela[index]),
    );
    const remainingNumbers = pattern.length - matchedNumbers.length;

    if (
      remainingNumbers === 0 &&
      pattern.some((index) => flatCartela[index] === lastDrawnNumber)
    ) {
      activeNumbers.push(getWinningNumbers(pattern, cartela));
    } else if (remainingNumbers === 0) {
      // console.log({ pattern, matchedNumbers })
      passedNumbers.push(getWinningNumbers(pattern, cartela));
    }
  }

  return {
    win: activeNumbers.length > 0,
    activeNumbers,
    passedNumbers,
    cartela,
  };
}
export function getWinningNumbers(
  pattern: number[],
  cartela: BingoCard,
): (number | "FREE")[] {
  // Flatten the cartela and replace 'FREE' with -1
  const flatCartela = cartela
    .flat()
    .map((num) => (num === "FREE" ? "FREE" : num));

  // Map pattern indices to actual numbers from cartela
  const winningNumbers = pattern.map((index) => flatCartela[index]);

  return winningNumbers;
}

export const getGameSound = async ({
  selectedLanguage,
  gender,
  type,
  version
}: {
  selectedLanguage: 'am' | 'en';
  gender: 'male' | 'female';
  type: 'stop' | 'start'
  version: number
}) => {
  try {
    const audioUrl = `/game/audio/${gender}/${selectedLanguage}/${version}/${type}.mp3`;
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      return await audio.play();
    }
  } catch (error) {
    console.error("Error playing bingo number sound:", error);
  }
};

export const getBingoNumbersSound = async ({
  selectedLanguage,
  gender,
  selectedNumber,
  version
}: {
  selectedLanguage: 'am' | 'en';
  gender: 'male' | 'female';
  selectedNumber: number;
  version: number
}) => {
  try {
    const audioUrl = `/game/audio/${gender}/${selectedLanguage}/${version}/${selectedNumber}.mp3`;
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      return await audio.play();
    }
  } catch (error) {
    console.error("Error playing bingo number sound:", error);
  }
};


export const getShuffleSound = async () => {
  try {
    const audioUrl = `/game/audio/shuffle.mp3`;
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      return await audio.play();
    }
  } catch (error) {
    console.error("Error playing shuffle sound:", error);
  }
};

export const getWinnerSound = async () => {
  try {
    const winnerAudioUrl = `/game/audio/winner.mp3`;
    const winnerAudio = new Audio(winnerAudioUrl);

    winnerAudio.load();
    return await winnerAudio.play();
  } catch (error) {
    console.error("Error playing winner sound:", error);
  }
};

export const getFalseWinSound = async () => {
  try {
    const falseWinAudioUrl = `/game/audio/falsewin.mp3`;
    const falseWinAudio = new Audio(falseWinAudioUrl);

    falseWinAudio.load();
    return await falseWinAudio.play();
  } catch (error) {
    console.error("Error playing winner sound:", error);
  }
};

export const updateDrawnNumbers = (numbers: number[], lastNumber: number | null): number[] => {
  if (!lastNumber) return numbers;
  return numbers.filter(num => num !== lastNumber);
};

export const getLastDrawnNumber = (numbers: number[]): number | null => {
  return numbers.length > 0 ? numbers[numbers.length - 1] : null;
};
