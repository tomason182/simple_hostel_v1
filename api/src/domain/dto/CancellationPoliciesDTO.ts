export interface CancellationPoliciesRequestDTO {
  daysBeforeArrival: number;
  amountRefund: number
}


export interface CancellationPoliciesResponseDTO {
  propertyId: number;
  daysBeforeArrival: number;
  amountRefund: number;
  updatedAt: Date;
  updatedBy: number
}
