import type { BookingSource, PaymentStatus, ReservationStatus } from "../entities/Reservation";
import { SelectedRoom } from "../value-objects/SelectedRoom";

interface AuditableDTO {
  propertyId: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
}
export interface ReservationDTO {
  bookingSource: BookingSource;
  reservationStatus: ReservationStatus;
  paymentStatus: PaymentStatus;
  checkIn: Date;
  checkOut: Date;
  specialRequest: string;
  selectedRooms: Array<SelectedRoom>;
}

export interface ReservationOutputDTO extends ReservationDTO, AuditableDTO { }
