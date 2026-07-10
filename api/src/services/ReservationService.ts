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
  ) {
    this.reservationRepository = reservationRepository;
    this.guestRepository = guestRepository;
    this.currenciesRepository = currenciesRepository;
    this.policiesRepository = policiesRepository;
    this.ratesAndAvailabilityRepository = ratesAndAvailabilityRepository;
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
    const selectedRooms = reservationDTO.selectedRooms   // Es un array con los roomTypes seleccionados.

    const ratesAndAvailability = await this.ratesAndAvailabilityRepository.getRatesByPeriodAndRooms(propertyId, selectedRooms, checkIn, checkOut);

    // 4. Buscar reservas simultaneas.
    // 5. Crear el calendario
    const calendar = Calendar.build(ratesAndAvailability, bedOccupancy);

    // 6. Comprobar usando el calendario que hay disponibilidad para los cuartos seleccionados.
    // NOTA: Estamos pasando el conjunto de cuartos seleccionados "roomtypes".
    calendar.hasAvailabilityBulk(selectedRooms, checkIn, checkOut);

    // 7. Usar calendar para calcular el total de la reserva.
    const totalAmount = calendar.calculateTotalBulk(selectedRooms, checkIn, checkOut);

    // 8. Crear la reserva con los datos optenidos.
    const reservation = Reservation.create(guestId, reservationDTO, totalAmount, currencies, paymentPolicies, userId);

    // 9. Usar el calendario para asignar camas a la reserva.
    calendar.assignBeds(reservation.getId());
    // 10. guardar la reserva
    await this.reservationRepository.save(reservation);

    return { msg: "RESERVATION_CREATED" }

  }
}
