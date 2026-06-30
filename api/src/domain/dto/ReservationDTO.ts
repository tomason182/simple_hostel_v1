import type { BookingSource } from "../entities/Reservation";

export interface ReservationDTO {
  propertyId: number;
  bookingSource: BookingSource;
  currency: string;
  checkIn: Date;
  checkOut: Date;
  specialRequest: string;
  selectedRooms: Array<number>;

}
