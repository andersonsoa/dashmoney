import { Response } from "express";
import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Res,
  UseBefore,
} from "routing-controllers";
import { AuthenticationMiddleware } from "../config/middlewares/authentication.middleware";
import { Period } from "../models/Period.model";
import {
  closePeriod,
  createPeriod,
  listPeriod,
  showPeriod,
  updatePeriod,
} from "../services/period";

@UseBefore(AuthenticationMiddleware)
@JsonController("/periods")
export class PeriodController {
  @Get()
  async list(@Res() res: Response) {
    const { user } = res.locals;

    return await listPeriod(user.id);
  }

  @Get("/:id")
  async show(@Res() res: Response, @Param("id") id: string) {
    const { user } = res.locals;

    return await showPeriod(id);
  }

  @Post()
  async create(@Res() res: Response, @Body() data: Period) {
    const { user } = res.locals;

    data.user_id = user.id;

    return await createPeriod(data);
  }

  @Put("close/:id")
  async close(@Param("id") id: string) {
    return await closePeriod(id);
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: Period) {
    return await updatePeriod(id, data);
  }
}
