import { Bed } from "../entities/Bed";

export class SelectedRoom {
  constructor(
    private roomTypeId: number,
    private quantity: number,
  ) {
    this.roomTypeId = roomTypeId;
    this.quantity = quantity;
  }

  public getRoomTypeId(): number {
    return this.roomTypeId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

}
