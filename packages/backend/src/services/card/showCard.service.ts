import { CardRepository } from "../../repositories/card.repository";

export async function showCard(id: string) {
  return await CardRepository.show(id);
}
