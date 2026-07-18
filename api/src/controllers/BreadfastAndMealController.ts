import { Request, Response, NextFunction } from "express";
import { IBreakfastAndMealService } from "../domain/interfaces/IBreakfastAndMealService";
import { BreakfastInputDTO } from "../domain/dto/BreakfastDTO";

export class BreakfastAndMealController {
  constructor(private readonly breakfastAndMealService: IBreakfastAndMealService) {
    this.breakfastAndMealService = breakfastAndMealService;
  }

  public async saveOrUpdateBreakfastSettings(req: Request, res: Response, next: NextFunction) {
    try {

      const { propertyId, userId } = req.user;

      const input: BreakfastInputDTO = {
        isServed: req.body.isServed,
        isIncluded: req.body.isIncluded,
        price: req.body.price,
        from: req.body.from,
        to: req.body.to
      }

      const result = await this.breakfastAndMealService.saveOrUpdateBreakfastSettings(propertyId, userId, input);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
