import { useEffect, useState } from "react";
import { api } from "../services/api";
import { currencyFormatter, dateFormatter } from "../utils/formatters";

type TransactionType = "deposit" | "whitdrawn";

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
      .then(({ data }) => {
        const transactions = data.map((transaction) => {
          return {
            ...transaction,
            value: currencyFormatter(transaction.value),
            created_at: dateFormatter(transaction.created_at),
          };
        });

        setTransactions(transactions);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    transactions,
    isLoading,
  };
}
