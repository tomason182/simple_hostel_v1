export interface GuestInputDTO {
  id: number | null,
  firstName: string,
  lastName: string,
  idNumber: string,
  email: string,
  phoneNumber: string,
  phoneCode: string,
  street: string,
  city: string,
  country: string,
  alpa2code: string,
}

export interface GuestOutputDTO {
  id: number,
  firstName: string,
  lastName: string,
  idNumber: string,
  email: string,
  phoneNumber: string,
  phoneCode: string,
  street: string,
  city: string,
  country: string,
  alpa2code: string,
  createdBy: number,
  createdAt: Date,
  updatedBy: number,
  updatedAt: Date,

}
