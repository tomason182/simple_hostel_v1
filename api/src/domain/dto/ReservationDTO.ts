import type { BookingSource, PaymentStatus, ReservationStatus } from "../entities/Reservation";
import type { SelectedRooms } from "../value-objects/SelectedRooms";

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
  selectedRooms: Array<SelectedRooms>;

}
