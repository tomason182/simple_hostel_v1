interface AuditableDTO {
  id: number;
  propertyId: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export interface RoomTypeDTO {
  description: string;
  type: string;
  gender: string;
  maxOccupancy: number;
  inventory: number;
}

export interface RoomTypeInputDTO extends RoomTypeDTO, AuditableDTO { };

