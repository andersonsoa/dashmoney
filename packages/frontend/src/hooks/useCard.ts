import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import { currencyFormatter } from "../utils/formatters";

type Card = {
  id: string;
  title: string;
  color: string;
  limit: string;
};

export function useCard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createNewCard = useCallback(async (card: Omit<Card, "id">) => {
    return api.post("/cards", card);
  }, []);

  const updateCard = async (card: Card) => {
    try {
      const { data } = await api.put<Card>(`cards/${card.id}`, card);

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/cards")
      .then((response) => {
        const cards = response.data.map((card) => {
          return {
            ...card,
            limit: currencyFormatter(card.limit),
          };
        });

        setCards(cards);
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    cards,
    isLoading,
    createNewCard,
    updateCard,
  };
}
