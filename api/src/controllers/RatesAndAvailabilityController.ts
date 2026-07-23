import { Request, Response, NextFunction } from "express";
import { IRatesAndAvailabilityService } from "../domain/interfaces/IRatesAndAvailabilityService";
import { RatesAndAvailabilityDTO } from "../domain/dto/RatesAndAvailabilityDTO";

export class RatesAndAvailabilityController {
  constructor(private readonly ratesAndAvailabilityService: IRatesAndAvailabilityService) {
    this.ratesAndAvailabilityService = ratesAndAvailabilityService;
  }

  public async createOrUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, userId } = req.auth;

      const dto: RatesAndAvailabilityDTO = {
        roomTypeId: req.body.roomTypeId,
        date: req.body.date,
        customRate: req.body.customRate,
        roomsToSell: req.body.roomsToSell
      }

      const result = await this.ratesAndAvailabilityService.createOrUpdate(propertyId, userId, dto);

      return res.status(200).json(result);

    } catch (err) {
      next(err);
    }
  }
}
