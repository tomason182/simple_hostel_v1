import { OtherPoliciesDTO } from "../dto/PoliciesDTO";

export class OtherPolicies {
  constructor(
    public quietHoursFrom: string,
    public quietHoursUntil: string,
    public hasSmookingAreas: boolean,
    public allowExternalGuest: boolean,
    public allowPets: boolean
  ) {
    this.quietHoursFrom = quietHoursFrom;
    this.quietHoursUntil = quietHoursUntil;
    this.hasSmookingAreas = hasSmookingAreas;
    this.allowExternalGuest = allowExternalGuest;
    this.allowPets = allowPets;
  }

  static fromDTO(dto: OtherPoliciesDTO): OtherPolicies {
    return new OtherPolicies(
      dto.quietHoursFrom,
      dto.quietHoursUntil,
      dto.hasSmookingAreas,
      dto.allowExternalGuest,
      dto.allowPets
    )
  }

}
