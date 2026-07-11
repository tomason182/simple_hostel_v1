import { GuestDTO } from "../domain/dto/GuestDTO";
import { Guest } from "../domain/entities/Guest";
import { IGuestRepository } from "../domain/ports/IGuestRepository";
import { IPropertyRepository } from "../domain/ports/IPropertyRepository";

export class GuestService {
  constructor(
    private readonly guestRepository: IGuestRepository, private readonly propertyRepository: IPropertyRepository) {
    this.guestRepository = guestRepository;
    this.propertyRepository = propertyRepository;
  }

  public async create(propertyId: number, userId: number, guestDTO: GuestDTO): Promise<void> {
    if (!this.propertyRepository.findById(propertyId)) {
      throw new Error("PROPERTY_NOT_FOUND");
    };

    const guest = Guest.fromDTO(propertyId, userId, guestDTO);

    // Chequear que el huesped no exista.
    if (!this.guestRepository.findByEmail(guest.email)) {
      throw new Error("GUEST_ALREADY_EXIST");
    }

    await this.guestRepository.save(guest);
  }

  public async update(guestId: number, userId: number, guestDTO: GuestDTO) {
    let guest = await this.guestRepository.findById(guestId)
    if (!guest) {
      throw new Error("GUEST_NOT_FOUND");
    }

    guest.update(guestId, userId, guestDTO);

    await this.guestRepository.save(guest);
  }


}
