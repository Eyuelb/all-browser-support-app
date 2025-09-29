

export type BingoCard = (number | "FREE")[][];

// Specific type for bingo board - a 5x5 grid of cells
export type Board = [
  [number | "FREE", number | "FREE", number | "FREE", number | "FREE", number | "FREE"],
  [number | "FREE", number | "FREE", number | "FREE", number | "FREE", number | "FREE"],
  [number | "FREE", number | "FREE", "FREE", number | "FREE", number | "FREE"], // Middle row with center FREE space
  [number | "FREE", number | "FREE", number | "FREE", number | "FREE", number | "FREE"],
  [number | "FREE", number | "FREE", number | "FREE", number | "FREE", number | "FREE"]
];

// Alternative: More flexible board type that matches current usage
export type BingoBoard = (number | "FREE")[][];

export type BingoGame = {
  id: string
  reservedCartelas: number[];
  blockedCartelas: number[];
  drawnNumbers: number[];
  betAmount: number;
  totalWinAfterCommission: number;
  winner: number[];
  status: "PENDING" | "PLAYING" | "FINISHED";
};

export type CreateBingoGame = {
  reservedCartelas: number[];
  blockedCartelas: number[];
  drawnNumbers: number[];
  betAmount: number;
  totalPlayersCount: number;
  winner: number[];
  status: "PENDING" | "PLAYING" | "FINISHED";
};

export type UpdateBingo = {
  reservedCartelas: number[];
  blockedCartelas: number[];
  drawnNumbers: number[];
  betAmount: number;
  winner: number[];
  status: "PENDING" | "PLAYING" | "FINISHED";
};




export type BingoGameList = {
  items: BingoGame[];
  total: number;
};

export type BingoGameDashbordItem = {
  winner: number[]
  totalplayerscount: number
  totalwinaftercommission: number
  gamestartedat: Date
  gamecompletedat: Date
  status: string
  betamount: number
  drawnnumbers: number[]
}

export type BingoGameDashbord = {
  gameHistory: {
    items: BingoGameDashbordItem[];
    limit: number
    page: number
    total: number
  }
  status: {
    "walletBalance": number,
    "totalgamesplayedtoday": number,
    "totalearningstoday": number,
    "totalgamesplayed": number,
    "totalearnings": number
  }
};

export type CheckWinner =
  {
    win: boolean,
    activeNumbers: BingoCard,
    passedNumbers: BingoCard,
    cartela: BingoCard,
    gameId: string,
    cardNumber: number,
    currentWinners: number[],
    gameStatus: "PENDING" | "PLAYING" | "FINISHED"

  }

// New types for cartellas (bingo card sets)
export type CartellaSet = {
  id: string;
  name: string;
  boards: BingoCard[];
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCartellaSet = {

  name: string;
  boards: BingoCard[];
};

export type CartellaSetList = CartellaSet[];


