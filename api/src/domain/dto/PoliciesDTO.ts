export interface PoliciesDTO {
  propertyId: number;
  general: GeneralPoliciesDTO | null;
  payment: PaymentPoliciesDTO | null;
  minor: MinorPoliciesDTO | null;
  other: OtherPoliciesDTO | null;
}

export interface GeneralPoliciesDTO {
  propertyId: number;
  minLengthStay: number | null;
  maxLengthStay: number | null;
  minAdvanceBooking: number | null;
  checkInFrom: string | null;
  checkOutFrom: string | null;
  checkInUntil: string | null;
  checkOutUntil: string | null;
};

export interface PaymentPoliciesDTO {
  propertyId: number,
  advancePaymentRequired: boolean | null;
  depositAmount: number | null;
};

export interface MinorPoliciesDTO {
  propertyId: number;
  minCheckInAge: number | null;
  acceptChildren: boolean | null;
  minorsAdultSupervision: boolean | null;
  minChildAge: number | null;
  freeStayAge: number | null;
};

export interface OtherPoliciesDTO {
  propertyId: number;
  quietHoursFrom: string | null;
  quietHoursUntil: string | null;
  hasSmookingAreas: boolean | null;
  allowExternalGuest: boolean | null;
  allowPets: boolean | null;
};


