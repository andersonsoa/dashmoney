import { Card } from "../../models/Card.model";
import { CardRepository } from "../../repositories/card.repository";

export async function createCard(card: Card) {
  return await CardRepository.create(card);
}
