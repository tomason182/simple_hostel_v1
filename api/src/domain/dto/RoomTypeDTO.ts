import { RoomTypeLiteral } from "../entities/RoomTypes";
import { Gender } from "../entities/RoomTypes";
export interface RoomTypeDTO {
  id: number | null;
  propertyId: number;
  description: string;
  type: RoomTypeLiteral;
  gender: Gender;
  maxOccupancy: number;
  inventory: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
