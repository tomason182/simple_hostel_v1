export interface PoliciesDTO {
  general: GeneralPoliciesDTO;
  payment: PaymentPoliciesDTO;
  minor: MinorPoliciesDTO;
  other: OtherPoliciesDTO;
}

export interface GeneralPoliciesDTO {
  minLengthStay: number;
  maxLengthStay: number | null;
  minAdvanceBooking: number;
  checkInFrom: string;
  checkOutFrom: string | null;
  checkInUntil: string | null;
  checkOutUntil: string;
};

export interface PaymentPoliciesDTO {
  advancePaymentRequired: boolean;
  depositAmount: number;
};

export interface MinorPoliciesDTO {
  minCheckInAge: number;
  acceptChildren: boolean;
  minorsAdultSupervision: boolean;
  minChildAge: number;
  freeStayAge: number;
};

export interface OtherPoliciesDTO {
  quietHoursFrom: string;
  quietHoursUntil: string;
  hasSmookingAreas: boolean;
  allowExternalGuest: boolean;
  allowPets: boolean;
};


