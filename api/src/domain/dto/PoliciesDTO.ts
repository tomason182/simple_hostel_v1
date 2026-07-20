export interface PoliciesDTO {
  general: GeneralPoliciesDTO | null;
  payment: PaymentPoliciesDTO | null;
  minor: MinorPoliciesDTO | null;
  other: OtherPoliciesDTO | null;
}

export interface GeneralPoliciesDTO {
  minLengthStay: number | null;
  maxLengthStay: number | null;
  minAdvanceBooking: number | null;
  checkInFrom: string | null;
  checkOutFrom: string | null;
  checkInUntil: string | null;
  checkOutUntil: string | null;
};

export interface PaymentPoliciesDTO {
  advancePaymentRequired: boolean | null;
  depositAmount: number | null;
};

export interface MinorPoliciesDTO {
  minCheckInAge: number | null;
  acceptChildren: boolean | null;
  minorsAdultSupervision: boolean | null;
  minChildAge: number | null;
  freeStayAge: number | null;
};

export interface OtherPoliciesDTO {
  quietHoursFrom: string | null;
  quietHoursUntil: string | null;
  hasSmookingAreas: boolean | null;
  allowExternalGuest: boolean | null;
  allowPets: boolean | null;
};


