import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import { dateFormatter } from "../utils/formatters";

export type Period = {
  id: string;
  title: string;
  payed: boolean;
  payed_at?: Date;
  created_at: Date;
  user_id: string;
};

export function usePeriod() {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createNewPeriod = useCallback(async (card: Pick<Period, "title">) => {
    return api.post("/periods", card);
  }, []);

  const updatePeriod = async (period: Period) => {
    try {
      const { data } = await api.put<Period>(`periods/${period.id}`, period);

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/periods")
      .then((response) => {
        const cards = response.data.map((period): Period[] => {
          return {
            ...period,
            payed: !!period.payer,
            payed_at: period.payed_at && dateFormatter(period.payed_at),
            created_at: dateFormatter(period.created_at),
          };
        });

        setPeriods(cards);
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    periods,
    isLoading,
    createNewPeriod,
    updatePeriod,
  };
}
