// hooks/useBingoGames.ts
import { BingoGame, BingoGameDashbord, BingoGameList, CheckWinner, CreateBingoGame, UpdateBingo, CartellaSet, CreateCartellaSet, CartellaSetList, BingoCard, Board } from "@/models/bingo";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { getBaseUrl } from "@/utils/req";
import { useMutationQuery } from "@/hooks/useMutationQuery";
import { useParams } from "next/navigation";


const QUERY_KEY = "bingoGames";

export const useGetAllGames = (params?: {
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}) => useFetchQuery<BingoGameList, void>({
  key: [QUERY_KEY, params],
  fetchParams: {
    url: getBaseUrl("/bingo-game"),
    method: "GET",
    params: {
      dateFrom: params?.dateFrom,
      dateTo: params?.dateTo,
      page: params?.page,
      limit: params?.limit
    }
  },
});

export const useGetAllShopGames = (params?: {
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}) => useFetchQuery<BingoGameDashbord, void>({
  key: [QUERY_KEY, params],
  fetchParams: {
    url: getBaseUrl("/shop/dashboard"),
    method: "GET",
    params: {
      dateFrom: params?.dateFrom,
      dateTo: params?.dateTo,
      page: params?.page,
      limit: params?.limit
    }
  },
});



export const useGetGameById = (id: string) => useFetchQuery<BingoGame, string>({
  key: [QUERY_KEY, id],
  fetchParams: {
    url: getBaseUrl(`/bingo-game/${id}`),
    method: "GET",
  },
  options: {
    enabled: !!id,
  }
});


export const useCreateGame = () => useMutationQuery<BingoGame, CreateBingoGame>({

  mutationParams: {
    url: getBaseUrl("/bingo-game"),
    method: "POST",
  },
  invalidateTags: [QUERY_KEY],
});

export const useBlockCartela = () => {
  const { id } = useParams<{ id: string }>()

  return useMutationQuery<BingoGame, { cardNumber: number }>({

    mutationParams: {
      url: getBaseUrl(`/bingo-game/block-player/${id}`),
      method: "POST",
    },
    invalidateTags: [QUERY_KEY],


  });
}

export const useUpdateGameById = () => {
  const { id } = useParams<{ id: string }>()
  return useMutationQuery<BingoGame, UpdateBingo>({

    mutationParams: {
      url: getBaseUrl(`/bingo-game/${id}`),
      method: "PUT",

    },
    invalidateTags: [QUERY_KEY],
  });
}
export const useCheckGameWinner = (id: string) => useMutationQuery<CheckWinner, { cardNumber: number; drawnNumbers: number[], board: Board }>({
  mutationParams: {
    url: getBaseUrl(`/bingo-game/check-winner/${id}`),
    method: "POST",
  },

  invalidateTags: [QUERY_KEY],
});

// Cartellas (Bingo Card Sets) queries
const CARTELLA_QUERY_KEY = "cartellas";

export const useGetAllCartellas = (params?: {
  page?: number;
  limit?: number;
}) => useFetchQuery<CartellaSetList, void>({
  key: [CARTELLA_QUERY_KEY, params],
  fetchParams: {
    url: getBaseUrl("/cartelas"),
    method: "GET",
    params: {
      page: params?.page,
      limit: params?.limit,


    }
  },
});

export const useGetCartellaById = (id: string) => useFetchQuery<CartellaSet, string>({
  key: [CARTELLA_QUERY_KEY, id],
  fetchParams: {
    url: getBaseUrl(`/cartelas/${id}/getById`),
    method: "GET",
  },
  options: {
    enabled: !!id,
  }
});

export const useCreateCartella = () => useMutationQuery<CartellaSet, CreateCartellaSet>({
  mutationParams: {
    url: getBaseUrl("/cartelas"),
    method: "POST",
  },
  invalidateTags: [CARTELLA_QUERY_KEY],
});

export const useUpdateCartella = () => {

  return useMutationQuery<CartellaSet, { id: string; name: string; boards: BingoCard[] }>({
    mutationParams: {
      url: ({ id }) => getBaseUrl(`/cartelas/${id}`),

      method: "PUT",

    },
    invalidateTags: [CARTELLA_QUERY_KEY],
  });
};

export const useDeleteCartella = () => useMutationQuery<void, string>({
  mutationParams: {
    url: getBaseUrl("/cartellas"),
    method: "DELETE",
  },
  invalidateTags: [CARTELLA_QUERY_KEY],
});

export const useActivateCartella = () => useMutationQuery<boolean, string>({
  mutationParams: {
    url: (id: string) => getBaseUrl(`/cartelas/${id}/activate`),
    method: 'PUT',
  },
  invalidateTags: [CARTELLA_QUERY_KEY],
});

