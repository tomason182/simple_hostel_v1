import { GuestRequestDTO } from "../domain/dto/GuestDTO";
import { ReservationDTO } from "../domain/dto/ReservationDTO";
import { Guest } from "../domain/entities/Guest";
import { IBedOccupancyService } from "../domain/interfaces/IBedOccupancyService";
import { IReservationService } from "../domain/interfaces/IReservationService";
import { ICurrenciesRepository } from "../domain/ports/ICurrenciesRepository";
import { IGuestRepository } from "../domain/ports/IGuestRepository";
import { IPoliciesRepository } from "../domain/ports/IPoliciesRepository";
import { IRatesAndAvailabilityRepository } from "../domain/ports/IRatesAndAvailabilityRepository";
import { IReservationRepository } from "../domain/ports/IReservationRepository";
import { Reservation } from "../domain/entities/Reservation";
import { Calendar } from "../domain/entities/Calendar";
import { BedOccupancy } from "../domain/entities/BedOccupancy";
import { BedOccupancyService } from "./BedOccupancyService";
import { RatesAndAvailability } from "../domain/entities/RatesAndAvailability";

export class ReservationService implements IReservationService {

  constructor(
    private bedOccupancyService: IBedOccupancyService,
    private reservationRepository: IReservationRepository,
    private guestRepository: IGuestRepository,
    private currenciesRepository: ICurrenciesRepository,
    private policiesRepository: IPoliciesRepository,
    private ratesAndAvailabilityRepository: IRatesAndAvailabilityRepository,
  ) {
    this.bedOccupancyService = bedOccupancyService;
    this.reservationRepository = reservationRepository;
    this.guestRepository = guestRepository;
    this.currenciesRepository = currenciesRepository;
    this.policiesRepository = policiesRepository;
    this.ratesAndAvailabilityRepository = ratesAndAvailabilityRepository;
  }

  async createReservation(reservationDTO: ReservationDTO, guestDTO: GuestRequestDTO, userId: number, propertyId: number): Promise<{ msg: string; }> {
    // 1. Crear el huesped y guardarlo.
    // Directamente se crea y se guarda sin ninguna confirmacion previa.
    // Se podria chequear el par guest_email - propertyId
    let guest = await this.guestRepository.findByEmail(propertyId, guestDTO.email);

    if (!guest) {
      guest = Guest.fromDTO(propertyId, userId, guestDTO);
      await this.guestRepository.save(guest);
    }

    const guestId = guest.getId();
    if (guestId === null) {
      throw new Error("GUEST_ID_NOT_SET")
    }

    // 2. Buscar politicas de pago y monedas.
    const currencies = await this.currenciesRepository.get(propertyId);
    const paymentPolicies = await this.policiesRepository.getPaymentPolicies(propertyId);

    // 3. buscar tarifas y disponibilidad.
    const checkIn = reservationDTO.checkIn;
    const checkOut = reservationDTO.checkOut;
    const selectedRooms = reservationDTO.selectedRooms   // Es un array con los roomTypes seleccionados.

    const ratesAndAvailability: RatesAndAvailability[] = await this.ratesAndAvailabilityRepository.getRatesByPeriodAndRooms(propertyId, selectedRooms, checkIn, checkOut);
    const occupancyList = await this.bedOccupancyService.getOccupancyList(selectedRooms, checkIn, checkOut);

    const calendar = Calendar.build(ratesAndAvailability, occupancyList);

    const reservation = Reservation.create(propertyId, guestId, reservationDTO, currencies, userId);

    const totalAmount = reservation.calculateTotalAmount(calendar);
    reservation.setTotalAmount(totalAmount)

    const assignedBeds = this.bedOccupancyService.assignBeds(reservation, calendar);

    // 10. guardar la reserva
    await this.reservationRepository.save(reservation);

    return { msg: "RESERVATION_CREATED" }

  }
}
