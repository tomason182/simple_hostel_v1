import { AddressDTO } from "../dto/AddressDTO";

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
  public updatedBy: number;
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
    updatedBy: number,
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
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt
  };

  static make(dto: AddressDTO, userId: number): Address {
    return new Address(
      dto.houseNumber,
      dto.street,
      dto.city,
      dto.postalCode,
      dto.state,
      dto.country,
      dto.alpha2code,
      dto.lat,
      dto.lon,
      dto.osmId,
      userId,
      new Date()
    )
  }

  public update(dto: AddressDTO, userId: number): void {
    this.houseNumber = dto.houseNumber,
      this.street = dto.street,
      this.city = dto.city,
      this.postalCode = dto.postalCode,
      this.state = dto.state,
      this.country = dto.country,
      this.alpha2code = dto.alpha2code,
      this.lat = dto.lat,
      this.lon = dto.lon,
      this.osmId = dto.osmId,
      this.updatedBy = userId,
      this.updatedAt = new Date()
  }

  public toDTO(): AddressDTO {
    return {
      houseNumber: this.houseNumber,
      street: this.street,
      city: this.city,
      postalCode: this.postalCode,
      state: this.state,
      country: this.country,
      alpha2code: this.alpha2code,
      lat: this.lat,
      lon: this.lon,
      osmId: this.osmId,
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt
    }
  }

}
