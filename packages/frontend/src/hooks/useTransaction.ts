import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import { currencyFormatter, dateFormatter } from "../utils/formatters";

type Period = {
  title: string;
  id: string;
};

type Transaction = {
  id: string;
  title: string;
  value: number;
  created_at: string;
  formattedValue: string;
  period: Period;
};

type NewTransaction = {
  title: string;
  value: number;
  period_id: string;
  card_id: string;
};

export function useTransacion() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTransactions = useCallback(async (period?: string) => {
    setIsLoading(true);
    api
      .get(`/transactions?period=${period || ""}`)
      .then((response) => {
        const transactions = response.data.map((transaction) => {
          return {
            ...transaction,
            formattedValue: currencyFormatter(transaction.value),
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

  const createTransaction = useCallback(
    async (data: NewTransaction) => {
      api.post("/transactions", data).then(() => {
        getTransactions();
      });
    },
    [getTransactions]
  );

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const total = transactions.reduce((cur, acc) => cur + acc.value, 0);

  return {
    transactions,
    isLoading,
    total: currencyFormatter(total),
    createTransaction,
    getTransactions,
  };
}
