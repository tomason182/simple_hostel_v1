import { RoomTypeLiteral } from "../entities/RoomTypes";
import { Gender } from "../entities/RoomTypes";

interface AuditableDTO {
  id: number;
  propertyId: number;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updateBy: number;

}

export interface RoomTypeDTO {
  description: string;
  type: RoomTypeLiteral;
  gender: Gender;
  maxOccupancy: number;
  inventory: number;
}
