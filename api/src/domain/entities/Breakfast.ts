export class Breakfast {
  constructor(
    private propertyId: number,
    private isIncluded: boolean | null,
    private isServed: boolean | null,
    private price: number | null,
    private from: string | null,
    private to: string | null,
    private updatedBy: number,
    private updatedAt: Date
  ) {
    this.propertyId = propertyId;
    this.isIncluded = isIncluded;
    this.isServed = isServed;
    this.price = price;
    this.from = from;
    this.to = to;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;

  }

  public make(propertyId: number, userId: number, is_included: boolean, is_served: boolean, price: number, from: string, to: string) {
    const updatedBy = userId;
    const updatedAt = new Date();
    return new Breakfast(propertyId, is_included, is_served, price, from, to, updatedBy, updatedAt)
  }

  public setIsServer(status: boolean, userId: number) {
    if (status === false) {
      this.isIncluded = false;
      this.price = 0;
      this.from = null;
      this.to = null
      this.updatedBy = userId;
      this.updatedAt = new Date();
    }
  }

  public setIsInculed(status: boolean, userId: number) {
    if (status === true) {
      this.isServed = true;
    }
    this.isIncluded = status;
    this.updatedBy = userId;
    this.updatedAt = new Date();

  }

  public setPrice(price: number, userId: number) {
    if (price < 0) {
      throw new Error("INVALID_PRICE_VALUE");
    }
    this.price = price;
    this.updatedBy = userId;
    this.updatedAt = new Date();
  }

  public setTime(from: string, to: string, userId: number) {
    // Chequeo que sean time...
    this.from = from;
    this.to = to;
    this.updatedBy = userId;
    this.updatedAt = new Date();
  }

}
