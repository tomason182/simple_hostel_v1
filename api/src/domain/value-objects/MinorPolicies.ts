export class MinorPolicies {
  constructor(
    public minCheckInAge: number,
    public acceptChildren: boolean,
    public minorsAdultSupervicion: boolean,
    public minChildAge: number,
    public freeStayAge: number,
  ) {
    this.minCheckInAge = minCheckInAge;
    this.acceptChildren = acceptChildren;
    this.minorsAdultSupervicion = minorsAdultSupervicion;
    this.minChildAge = minChildAge;
    this.freeStayAge = freeStayAge;

    if (minCheckInAge < 0 || minChildAge < 0 || freeStayAge < 0) {
      throw new Error("MinorPolicies Error: Ages must be non-negative");
    }
  };
}

