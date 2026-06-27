export type RoomType = "dorm" | "private";
export type RoomGender = "mixed" | "female" | "male";

export interface RoomTypeDTO {
  id: number | null;
  propertyId: number;
  description: string;
  type: RoomType;
  gender: RoomGender;
  maxOccupancy: number;
  inventory: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
