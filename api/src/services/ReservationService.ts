import { GuestDTO } from "../domain/dto/GuestDTO";
import { ReservationDTO } from "../domain/dto/ReservationDTO";
import { Guest } from "../domain/entities/Guest";
import { IReservationService } from "../domain/interfaces/IReservationService";
import { ICurrenciesRepository } from "../domain/ports/ICurrenciesRepository";
import { IGuestRepository } from "../domain/ports/IGuestRepository";
import { IPoliciesRepository } from "../domain/ports/IPoliciesRepository";
import { IRatesAndAvailabilityRepository } from "../domain/ports/IRatesAndAvailabilityRepository";
import { IReservationRepository } from "../domain/ports/IReservationRepository";
import { Reservation } from "../domain/entities/Reservation";
import { Calendar } from "../domain/entities/Calendar";

export class ReservationService implements IReservationService {

  constructor(
    private reservationRepository: IReservationRepository,
    private guestRepository: IGuestRepository,
    private currenciesRepository: ICurrenciesRepository,
    private policiesRepository: IPoliciesRepository,
    private ratesAndAvailabilityRepository: IRatesAndAvailabilityRepository,
    private reservation: Reservation,
    private calendar: Calendar,
  ) {
    this.reservationRepository = reservationRepository;
    this.guestRepository = guestRepository;
    this.currenciesRepository = currenciesRepository;
    this.policiesRepository = policiesRepository;
    this.ratesAndAvailabilityRepository = ratesAndAvailabilityRepository;
    this.reservation = reservation;
    this.calendar = calendar;
  }

  async createReservation(reservationDTO: ReservationDTO, guestDTO: GuestDTO, userId: number, propertyId: number): Promise<{ msg: string; }> {
    // 1. Crear el huesped y guardarlo.
    const guest = Guest.fromDTO(guestDTO, userId);
    await this.guestRepository.save(guest);

    const guestId = guest.getId();

    // 2. Buscar politicas de pago y monedas.
    const currencies = await this.currenciesRepository.get(propertyId);
    const paymentPolicies = await this.policiesRepository.getPaymentPolicies(propertyId);

    // 3. buscar tarifas y disponibilidad.
    const checkIn = reservationDTO.checkIn;
    const checkOut = reservationDTO.checkOut;
    const roomTypes = reservationDTO.selectedRooms   // Es un array con los roomTypes seleccionados.

    const ratesAndAvailability = await this.ratesAndAvailabilityRepository.getRatesByPeriodAndRooms(propertyId, roomTypes, checkIn, checkOut);
    const reservations = await this.reservationRepository.getReservationsByPeriodAndRooms(propertyId, roomTypes, checkIn, checkOut)

    const calendar = Calendar.build(ratesAndAvailability, reservations);

    calendar.hasAvailability(roomTypes, checkIn, checkOut);

    const reservationAmount = calendar.calculateTotal(checkIn, checkOut, roomTypes);


    const reservation = this.reservation.create(guestId, reservationDTO, ratesAndAvailability, currencies, paymentPolicies, userId);







    return { msg: "RESERVATION_CREATED" }

  }
}
