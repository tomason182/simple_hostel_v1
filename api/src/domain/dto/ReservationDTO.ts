import type { BookingSource, PaymentStatus, ReservationStatus } from "../entities/Reservation";
import { SelectedRoom } from "../value-objects/SelectedRoom";
export interface ReservationDTO {
  propertyId: number;
  bookingSource: BookingSource;
  reservationStatus: ReservationStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  currency: string;
  advancePaymentAmount: number;
  checkIn: Date;
  checkOut: Date;
  specialRequest: string;
  selectedRooms: Array<SelectedRoom>;

}
