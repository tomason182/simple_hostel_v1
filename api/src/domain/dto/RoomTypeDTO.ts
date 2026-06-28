
export interface RoomTypeDTO {
  id: number | null;
  propertyId: number;
  description: string;
  type: string;
  gender: string;
  maxOccupancy: number;
  inventory: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
