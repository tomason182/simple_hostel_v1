export interface PoliciesDTO {
  general: GeneralPoliciesDTO | null;
  payment: PaymentPoliciesDTO | null;
  minor: MinorPoliciesDTO | null;
  other: OtherPoliciesDTO | null;
}

export interface AuditableDTO {
  propertyId: number,
  updatedAt: Date | null,
  updatedBy: number | null
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

export interface GeneralPoliciesOutputDTO extends GeneralPoliciesDTO, AuditableDTO { };

export interface PaymentPoliciesDTO {
  advancePaymentRequired: boolean | null;
  depositAmount: number | null;
};

export interface PaymentPoliciesOutputDTO extends PaymentPoliciesDTO, AuditableDTO { }



export interface MinorPoliciesDTO {
  minCheckInAge: number | null;
  acceptChildren: boolean | null;
  minorsAdultSupervision: boolean | null;
  minChildAge: number | null;
  freeStayAge: number | null;
};

export interface MinorPoliciesOutputDTO extends MinorPoliciesDTO, AuditableDTO { }

export interface OtherPoliciesDTO {
  quietHoursFrom: string | null;
  quietHoursUntil: string | null;
  hasSmookingAreas: boolean | null;
  allowExternalGuest: boolean | null;
  allowPets: boolean | null;
};

export interface OtherPoliciesOutputDTO extends OtherPoliciesDTO, AuditableDTO { };


