import { Request, Response, NextFunction } from "express";
import { IGuestService } from "../domain/interfaces/IGuestService";

export class GuestController {
  constructor(private readonly guestService: IGuestService) {
    this.guestService = guestService;
  }

  public async updateGuest(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, userId } = req.auth;

      const { guestDTO } = req.body;

      const result = await this.guestService.update(userId, guestDTO);

      return res.status(200).json(result);

    } catch (err) {
      next(err);
    }
  }
}
