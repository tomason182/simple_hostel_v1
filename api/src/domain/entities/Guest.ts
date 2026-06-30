import { GuestDTO } from "../dto/GuestDTO";

export class Guest {
  constructor(
    public id: number | null,
    public firstName: string,
    public lastName: string,
    public idNumber: string,
    public email: string,
    public phoneNumber: string,
    public phoneCode: string,
    public street: string,
    public city: string,
    public country: string,
    public alpa2code: string,
    public createdBy: number,
    public updatedBy: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.idNumber = idNumber;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.phoneCode = phoneCode;
    this.street = street;
    this.city = city;
    this.country = country;
    this.alpa2code = alpa2code;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromDTO(dto: GuestDTO, userId: number): Guest {
    const createdBy = userId;
    const updatedBy = userId;
    const createdAt = new Date();
    const updatedAt = new Date();

    return new Guest(
      null,
      dto.firstName,
      dto.lastName,
      dto.idNumber,
      dto.email,
      dto.phoneNumber,
      dto.phoneCode,
      dto.street,
      dto.city,
      dto.country,
      dto.alpa2code,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt
    )
  }

  public getId(): number {
    if (this.id === null) {
      throw new Error("NULL_ID");
    }
    return this.id
  }
}
