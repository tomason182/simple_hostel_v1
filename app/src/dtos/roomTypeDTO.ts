export interface BathRoomDTO {
  type: string;
  qty: number
}

export interface RoomTypeRequestDTO {
  id: number | null;
  propertyId: number;
}

export interface RoomTypeResponseDTO {
  id: number;
  propertyId: number;
  description: string;
  type: string;
  gender: string;
  maxOccupancy: number;
  inventory: number;
  bathrooms: BathRoomDTO[];

} 
