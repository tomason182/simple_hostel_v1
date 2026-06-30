import { GuestDTO } from "../domain/dto/GuestDTO";
import { ReservationDTO } from "../domain/dto/ReservationDTO";
import { Guest } from "../domain/entities/Guest";
import { IReservationService } from "../domain/interfaces/IReservationService";
import { ICurrenciesRepository } from "../domain/ports/ICurrenciesRepository";
import { IGuestRepository } from "../domain/ports/IGuestRepository";
import { IPoliciesRepository } from "../domain/ports/IPoliciesRepository";
import { IReservationRepository } from "../domain/ports/IReservationRepository";

export class ReservationService implements IReservationService {

  constructor(
    private reservationRepository: IReservationRepository,
    private guestRepository: IGuestRepository,
    private currenciesPolicies: ICurrenciesRepository,
    private policiesRepository: IPoliciesRepository,
  ) {
    this.reservationRepository = reservationRepository;
    this.guestRepository = guestRepository;
    this.currenciesPolicies = currenciesPolicies;
    this.policiesRepository = policiesRepository;
  }

  async createReservation(reservationDTO: ReservationDTO, guestDTO: GuestDTO, userId: number, propertyId: number): Promise<{ msg: string; }> {
    // 1. Crear el huesped y guardarlo.
    const guest = Guest.fromDTO(guestDTO, userId);
    await this.guestRepository.save(guest);

    const guestId = guest.getId();

    // 2. Buscar politicas de pago y monedas.
    const currencies = this.currenciesPolicies.get(propertyId);
    const paymentPolicies = this.policiesRepository.getPaymentPolicies(propertyId);

    // 2. Crear la reserva
    //const reservation = 



    return { msg: "RESERVATION_CREATED" }

  }
}
