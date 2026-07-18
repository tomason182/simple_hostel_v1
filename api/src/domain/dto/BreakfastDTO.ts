export interface BreakfastInputDTO {
  isServed: boolean;
  isIncluded: boolean;
  price: number;
  from: string;
  to: string;
};

export interface BreakfastOutputDTO {
  propertyId: number;
  isServed: boolean | null;
  isIncluded: boolean | null;
  price: number | null;
  from: string | null;
  to: string | null;
  updatedBy: number | null;
  updatedAt: Date | null;
}
