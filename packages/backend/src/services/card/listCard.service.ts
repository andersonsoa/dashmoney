import { CardRepository } from "../../repositories/card.repository";

export async function listCard() {
  return await CardRepository.list();
}
