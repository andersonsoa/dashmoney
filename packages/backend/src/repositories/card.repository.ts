import { getRepository } from "typeorm";
import { ApplicationError, NotFoundError } from "../config/error";
import { Card } from "../models/Card.model";

export class CardRepository {
  static async list() {
    return await getRepository(Card).find();
  }

  static async show(cardId: string) {
    const repository = getRepository(Card);

    const card = await repository.findOne(cardId);

    return card;
  }

  static async showWhitTransactions(cardId: string) {
    return await getRepository(Card).findOne(cardId, {
      relations: ["transactions"],
    });
  }

  static async create(cardData: Card) {
    const repository = getRepository(Card);

    const cardAlreadyExists = await repository.findOne({
      where: {
        title: cardData.title,
      },
    });
    if (cardAlreadyExists)
      throw new ApplicationError("Já existe um card com este nome");

    const card = repository.create(cardData);

    await repository.save(card);

    return card;
  }

  static async update(cardId: string, cardData: Card) {
    const repository = getRepository(Card);

    const card = await repository.findOne(cardId);
    if (!card) throw new NotFoundError("Cartão não encontrada");

    repository.update(cardId, cardData);

    return await repository.findOne(cardId);
  }

  static async delete(cardId: string) {
    return await getRepository(Card).delete(cardId);
  }
}
