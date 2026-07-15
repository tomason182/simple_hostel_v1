import { OtherPoliciesDTO } from "../dto/PoliciesDTO";

export class OtherPolicies {
  constructor(
    public quietHoursFrom: string | null,
    public quietHoursUntil: string | null,
    public hasSmookingAreas: boolean | null,
    public allowExternalGuest: boolean | null,
    public allowPets: boolean | null,
    public updatedAt: Date | null,
    public updatedBy: number | null
  ) {
    this.quietHoursFrom = quietHoursFrom;
    this.quietHoursUntil = quietHoursUntil;
    this.hasSmookingAreas = hasSmookingAreas;
    this.allowExternalGuest = allowExternalGuest;
    this.allowPets = allowPets;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }

  static fromDTO(dto: OtherPoliciesDTO, userId: number): OtherPolicies {
    return new OtherPolicies(
      dto.quietHoursFrom,
      dto.quietHoursUntil,
      dto.hasSmookingAreas,
      dto.allowExternalGuest,
      dto.allowPets,
      new Date(),
      userId
    )
  }

  public toDTO(): OtherPoliciesDTO {
    return ({
      quietHoursFrom: this.quietHoursFrom,
      quietHoursUntil: this.quietHoursUntil,
      hasSmookingAreas: this.hasSmookingAreas,
      allowExternalGuest: this.allowExternalGuest,
      allowPets: this.allowPets
    })
  }

  update(dto: OtherPoliciesDTO, userId: number) {
    this.quietHoursFrom = dto.quietHoursFrom;
    this.quietHoursUntil = dto.quietHoursUntil;
    this.hasSmookingAreas = dto.hasSmookingAreas;
    this.allowExternalGuest = dto.allowExternalGuest;
    this.allowPets = dto.allowPets;
    new Date();
    userId
  }

}
