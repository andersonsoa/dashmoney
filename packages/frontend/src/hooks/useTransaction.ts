import { useEffect, useState } from "react";
import { api } from "../services/api";
import { currencyFormatter, dateFormatter } from "../utils/formatters";

type Transaction = {
  id: string;
  title: string;
  value: string;
  created_at: string;
};

export function useTransacion() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/transactions")
      .then((response) => {
        const transactions = response.data.map((transaction) => {
          return {
            ...transaction,
            value: currencyFormatter(transaction.value),
            created_at: dateFormatter(transaction.created_at),
          };
        });

        setTransactions(transactions);
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    transactions,
    isLoading,
  };
}
