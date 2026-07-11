import { MinorPoliciesDTO } from "../dto/PoliciesDTO";

export class MinorPolicies {
  constructor(
    public minCheckInAge: number,
    public acceptChildren: boolean,
    public minorsAdultSupervision: boolean,
    public minChildAge: number,
    public freeStayAge: number,
    public updatedAt: Date,
    public updatedBy: number
  ) {
    this.minCheckInAge = minCheckInAge;
    this.acceptChildren = acceptChildren;
    this.minorsAdultSupervision = minorsAdultSupervision;
    this.minChildAge = minChildAge;
    this.freeStayAge = freeStayAge;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;

    if (minCheckInAge < 0 || minChildAge < 0 || freeStayAge < 0) {
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

