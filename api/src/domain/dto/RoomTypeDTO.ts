import { RoomTypeLiteral } from "../entities/RoomTypes";
import { Gender } from "../entities/RoomTypes";

export interface RoomTypeRequestDTO {
  description: string;
  type: RoomTypeLiteral;
  gender: Gender;
  maxOccupancy: number;
  inventory: number;
}

export interface RoomTypeResponseDTO {
  id: number;
  propertyId: number;
  description: string;
  type: RoomTypeLiteral;
  gender: Gender;
  maxOccupancy: number;
  inventory: number;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}


