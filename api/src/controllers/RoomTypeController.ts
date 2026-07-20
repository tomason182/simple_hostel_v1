import { NextFunction, Request, Response } from "express";
import { IRoomTypeService } from "../domain/interfaces/IRoomTypeService";
import { RoomTypeDTO } from "../domain/dto/RoomTypeDTO";

export class RoomTypeController {
  constructor(private readonly roomTypeService: IRoomTypeService) {
    this.roomTypeService = roomTypeService;
  }

  public async createRoomType(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, userId } = req.user;

      const dto: RoomTypeDTO = {
        description: req.body.description,
        type: req.body.type,
        gender: req.body.gender,
        maxOccupancy: req.body.maxOccupancy,
        inventory: req.body.inventory
      }

      const result = await this.roomTypeService.createRoomType(propertyId, userId, dto);

      return res.status(200).json(result);

    } catch (err) {
      next(err);
    }
  }
}
