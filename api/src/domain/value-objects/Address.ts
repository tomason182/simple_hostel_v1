export class Address {
  public houseNumber: string;
  public street: string;
  public city: string;
  public postalCode: string;
  public state: string;
  public country: string;
  public alpha2code: string;
  public lat: number;
  public lon: number;
  public osmId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    houseNumber: string,
    street: string,
    city: string,
    postalCode: string,
    state: string,
    country: string,
    alpha2code: string,
    lat: number,
    lon: number,
    osmId: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.houseNumber = houseNumber;
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
    this.state = state;
    this.country = country;
    this.alpha2code = alpha2code;
    this.lat = lat;
    this.lon = lon;
    this.osmId = osmId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt
  };

}
