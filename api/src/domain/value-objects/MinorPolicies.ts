import { MinorPoliciesDTO } from "../dto/PoliciesDTO";

export class MinorPolicies {
  constructor(
    public minCheckInAge: number | null,
    public acceptChildren: boolean | null,
    public minorsAdultSupervision: boolean | null,
    public minChildAge: number | null,
    public freeStayAge: number | null,
    public updatedAt: Date | null,
    public updatedBy: number | null
  ) {
    this.minCheckInAge = minCheckInAge;
    this.acceptChildren = acceptChildren;
    this.minorsAdultSupervision = minorsAdultSupervision;
    this.minChildAge = minChildAge;
    this.freeStayAge = freeStayAge;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;

    if (minCheckInAge !== null && minCheckInAge < 0 || minChildAge !== null && minChildAge < 0 || freeStayAge !== null && freeStayAge < 0) {
      throw new Error("MinorPolicies Error: Ages must be non-negative");
    }
  };

  static fromDTO(dto: MinorPoliciesDTO, userId: number): MinorPolicies {
    return new MinorPolicies(
      dto.minCheckInAge,
      dto.acceptChildren,
      dto.minorsAdultSupervision,
      dto.minChildAge,
      dto.freeStayAge,
      new Date(),
      userId
    )
  }

  public toDTO(): MinorPoliciesDTO {
    return ({
      minCheckInAge: this.minCheckInAge,
      acceptChildren: this.acceptChildren,
      minorsAdultSupervision: this.minorsAdultSupervision,
      minChildAge: this.minCheckInAge,
      freeStayAge: this.freeStayAge
    })
  }

  public update(dto: MinorPoliciesDTO, userId: number) {
    this.minCheckInAge = dto.minCheckInAge;
    this.acceptChildren = dto.acceptChildren;
    this.minorsAdultSupervision = dto.minorsAdultSupervision;
    this.minChildAge = dto.minCheckInAge;
    this.freeStayAge = dto.freeStayAge;
    this.updatedAt = new Date();
    this.updatedBy = userId;
  }
}

