export class Guest {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public id_number: string,
    public email: string,
    public phoneNumber: string,
    public phoneCode: string,
    public street: string,
    public city: string,
    public country: string,
    public alpa_2_code: string,
    public createdBy: number,
    public updatedBy: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id_number = id_number;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.phoneCode = phoneCode;
    this.street = street;
    this.city = city;
    this.country = country;
    this.alpa_2_code = alpa_2_code;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

  }
}
