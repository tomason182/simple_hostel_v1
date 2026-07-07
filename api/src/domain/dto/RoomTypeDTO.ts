import { RoomTypeLiteral } from "../entities/RoomTypes";
import { Gender } from "../entities/RoomTypes";

export interface RoomTypeDTO {
  propertyId: number;
  description: string;
  type: RoomTypeLiteral;
  gender: Gender;
  maxOccupancy: number;
  inventory: number;
}
