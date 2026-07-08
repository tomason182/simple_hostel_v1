import { Bed } from "../entities/Bed";

export class SelectedRoom {
  constructor(
    private roomTypeId: number,
    private quantity: number,
    private beds: Array<Bed>,
  ) {
    this.roomTypeId = roomTypeId;
    this.quantity = quantity;
    this.beds = beds
  }

  public getRoomTypeId(): number {
    return this.roomTypeId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getBeds(): Array<Bed> {
    return this.beds;
  }

  public assignBeds(beds: Array<Bed>): void {

    if (beds.length !== this.quantity) {
      throw new Error("BED_ASSIGNMENT_ERROR");
    }
    this.beds = [...beds];
  }

  public removeBeds(): void {
    this.beds = [];
  }

}
