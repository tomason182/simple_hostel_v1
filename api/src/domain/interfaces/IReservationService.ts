import { Reservation } from "../entities/Reservation";
import { ReservationDTO } from "../dto/ReservationDTO";
import { GuestDTO } from "../dto/GuestDTO";
import type { ReservationStatus, PaymentStatus } from "../entities/Reservation";

export interface IReservationService {
  // Crear una reserva nueva.
  createReservation(reservationDTO: ReservationDTO, guestDTO: GuestDTO, userId: number): Promise<{ msg: string }>;

  // Posiblemente necesitomos distinta data para crear que para actualizar.
  updateReservation(reservationDTO: ReservationDTO): Promise<{ msg: string }>;

  // En lugar de eliminar un reserva se cambia su estado.
  changeReservationStatus(reservationId: number, reservationStatus: ReservationStatus): Promise<{ msg: string }>;

  // Cambiar el estado del pago.
  changePaymentStatus(reservationId: number, paymentStatus: PaymentStatus): Promise<{ msg: string }>;

  // cambiar fechas de ingreso y salida.
  changeDates(reservationId: number, checkIn: Date, checkOut: Date): Promise<{ msg: string }>;

  // cambiar dormitorio
  changeRoomType(reservationId: number, roomTypesId: Array<number>): Promise<{ msg: string }>;

  // Cambiar camas asignadas.
  changeBeds(reservationId: number, beds: Array<number>): Promise<{ msg: string }>;



}
