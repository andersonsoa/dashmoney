import { Response } from "express";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  QueryParam,
  QueryParams,
  Res,
  UseBefore,
} from "routing-controllers";
import { AuthenticationMiddleware } from "../config/middlewares/authentication.middleware";
import { Transaction } from "../models/Transaction.model";
import {
  createTransaction,
  listTransactionByPeriod,
  listTransaction,
  removeTransaction,
} from "../services/transaction";

@UseBefore(AuthenticationMiddleware)
@JsonController("/transactions")
export class TransactionController {
  @Get("/")
  async list(@Res() res: Response, @QueryParam("period") period: string) {
    const { user } = res.locals;

    return await listTransaction(user.id, { period });
  }

  @Get("/:periodId")
  async listByUserId(@Param("periodId") periodId: string) {
    return await listTransactionByPeriod(periodId);
  }

  @Post()
  async store(@Body() data: Transaction) {
    console.log(data);
    return await createTransaction(data);
  }

  @Delete("/:transactionId")
  async remove(
    @Res() res: Response,
    @Param("transactionId") transactionId: string
  ) {
    const { id } = res.locals.user;
    return await removeTransaction(id, transactionId);
  }
}
