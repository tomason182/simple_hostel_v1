import { AppError } from "../../errors/AppError";
import { GuestRequestDTO, GuestResponseDTO } from "../dto/GuestDTO";
export type Status = "ACTIVE" | "DEACTIVATE" | "BLOCKED"
export class Guest {
  private status: Status = "ACTIVE";

  constructor(
    private id: number | null,
    public propertyId: number,
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
    this.propertyId = propertyId;
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

  static fromDTO(propertyId: number, userId: number, dto: GuestRequestDTO): Guest {
    const createdBy = userId;
    const updatedBy = userId;
    const createdAt = new Date();
    const updatedAt = new Date();

    return new Guest(
      null,
      propertyId,
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

  public toDTO(): GuestResponseDTO {
    if (!this.id) {
      throw new Error("GUEST_ID_NOT_PROVIDED")
    }
    return {
      id: this.id,
      propertyId: this.propertyId,
      firstName: this.firstName,
      lastName: this.lastName,
      idNumber: this.idNumber,
      email: this.email,
      phoneNumber: this.phoneNumber,
      phoneCode: this.phoneCode,
      street: this.street,
      city: this.city,
      country: this.country,
      alpa2code: this.alpa2code,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy
    }
  }

  public update(guestId: number, userId: number, dto: GuestRequestDTO) {
    const updatedBy = userId;
    const updatedAt = new Date();
    return new Guest(
      guestId,
      this.propertyId,
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
      this.createdBy,
      updatedBy,
      this.createdAt,
      updatedAt,
    )
  }

  public setStatus(status: Status) {
    this.status = status;
  }

  public getId(): number | null {
    return this.id
  }

  public setId(id: number): void {
    this.id = id;
  }
}
