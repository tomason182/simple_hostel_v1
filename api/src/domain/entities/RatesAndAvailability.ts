export class RatesAndAvailability {
  constructor(
    public id: number | null,
    public propertyId: number,
    public roomTypeId: number,
    public date: Date,
    public customRate: number,
    public roomsToSell: number,
    public createdBy: number,
    public createdAt: Date
  ) {
    this.id = id;
    this.propertyId = propertyId;
    this.roomTypeId = roomTypeId;
    this.date = date;
    this.customRate = customRate;
    this.roomsToSell = roomsToSell;
    this.createdBy = createdBy;
    this.createdAt = createdAt;

  }

}
