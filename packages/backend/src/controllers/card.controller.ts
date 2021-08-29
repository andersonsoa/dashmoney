import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  UseBefore,
} from "routing-controllers";
import { AuthenticationMiddleware } from "../config/middlewares/authentication.middleware";
import { Card } from "../models/Card.model";
import {
  createCard,
  deleteCard,
  listCard,
  showCard,
  updateCard,
} from "../services/card";

@UseBefore(AuthenticationMiddleware)
@JsonController("/cards")
export class CardController {
  @Get()
  async list() {
    return await listCard();
  }

  @Get("/:id")
  async show(@Param("id") id: string) {
    return await showCard(id);
  }

  @Post()
  async create(@Body({ validate: true }) card: Card) {
    return await createCard(card);
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body({ validate: true }) card: Card) {
    return await updateCard(id, card);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    return await deleteCard(id);
  }
}
