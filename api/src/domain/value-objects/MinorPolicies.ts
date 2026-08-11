import { MinorPoliciesDTO, MinorPoliciesOutputDTO } from "../dto/PoliciesDTO";

export class MinorPolicies {
  constructor(
    public propertyId: number,
    public minCheckInAge: number | null,
    public acceptChildren: boolean | null,
    public minorAdultSupervision: boolean | null,
    public minChildAge: number | null,
    public freeStayAge: number | null,
    public updatedAt: Date | null,
    public updatedBy: number | null
  ) {
    this.propertyId = propertyId
    this.minCheckInAge = minCheckInAge;
    this.acceptChildren = acceptChildren;
    this.minorAdultSupervision = minorAdultSupervision;
    this.minChildAge = minChildAge;
    this.freeStayAge = freeStayAge;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;

    if (minCheckInAge !== null && minCheckInAge < 0 || minChildAge !== null && minChildAge < 0 || freeStayAge !== null && freeStayAge < 0) {
      throw new Error("MinorPolicies Error: Ages must be non-negative");
    }
  };

  static fromDTO(dto: MinorPoliciesDTO, userId: number, propertyId: number): MinorPolicies {
    return new MinorPolicies(
      propertyId,
      dto.minCheckInAge,
      dto.acceptChildren,
      dto.minorAdultSupervision,
      dto.minChildAge,
      dto.freeStayAge,
      new Date(),
      userId
    )
  }

  public toDTO(): MinorPoliciesOutputDTO {
    return ({
      propertyId: this.propertyId,
      minCheckInAge: this.minCheckInAge,
      acceptChildren: this.acceptChildren,
      minorAdultSupervision: this.minorAdultSupervision,
      minChildAge: this.minCheckInAge,
      freeStayAge: this.freeStayAge,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy
    })
  }

  public update(dto: MinorPoliciesDTO, userId: number) {
    this.minCheckInAge = dto.minCheckInAge;
    this.acceptChildren = dto.acceptChildren;
    this.minorAdultSupervision = dto.minorAdultSupervision;
    this.minChildAge = dto.minCheckInAge;
    this.freeStayAge = dto.freeStayAge;
    this.updatedAt = new Date();
    this.updatedBy = userId;
  }

}

