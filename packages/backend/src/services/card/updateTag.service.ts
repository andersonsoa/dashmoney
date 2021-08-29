import { Card } from "../../models/Card.model";
import { CardRepository } from "../../repositories/card.repository";

export async function updateCard(id: string, card: Card) {
  return await CardRepository.update(id, card);
}
