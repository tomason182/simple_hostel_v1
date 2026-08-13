export interface RatesAndAvailabilityDTO {
  roomTypeId: number;
  date: Date;
  customRate: number;
  roomsToSell: number
}

interface auditableDTO {
  propertyId: number;
  updatedAt: Date;
  updatedBy: number
}

export interface RatesAndAvailabilityOutputDTO extends RatesAndAvailabilityDTO, auditableDTO { }

export interface RatesAndAvailabilityBulkDTO {
  roomTypeId: number;
  customRate: number;
  roomsToSell: number;
  from: Date;
  to: Date
}
