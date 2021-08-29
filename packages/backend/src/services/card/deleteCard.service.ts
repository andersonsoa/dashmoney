import { ApplicationError } from "../../config/error";
import { CardRepository } from "../../repositories/card.repository";

export async function deleteCard(id: string) {
  const hasTransaction = await CardRepository.showWhitTransactions(id);

  if (hasTransaction)
    throw new ApplicationError("Este cartão possui transações");

  return await CardRepository.delete(id);
}
