export interface PoliciesDTO {
  generalPolicies: GeneralPoliciesDTO;
  paymentPolicies: PaymentPoliciesDTO;
  minorPolicies: MinorPoliciesDTO;
  otherPolicies: OtherPoliciesDTO;
}

export interface GeneralPoliciesDTO {
  minLengthStay: number;
  maxLengthStay: number;
  minAdvanceBooking: number;
  breakfastIncluded: boolean;
  checkInFrom: string;
  checkOutFrom: string;
  checkInUntil: string;
  checkOutUntil: string;
};

export interface PaymentPoliciesDTO {
  advancePaymentRequired: boolean;
  depositAmount: number;
};

export interface MinorPoliciesDTO {
  minCheckInAge: number;
  acceptChildren: boolean;
  minorsAdultsSupervision: boolean;
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


