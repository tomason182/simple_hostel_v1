import { GuestRequestDTO, GuestResponseDTO } from "../domain/dto/GuestDTO";
import { Guest } from "../domain/entities/Guest";
import { IGuestService } from "../domain/interfaces/IGuestService";
import { IGuestRepository } from "../domain/ports/IGuestRepository";
import { IPropertyRepository } from "../domain/ports/IPropertyRepository";

export class GuestService implements IGuestService {
  constructor(
    private readonly guestRepository: IGuestRepository, private readonly propertyRepository: IPropertyRepository) {
    this.guestRepository = guestRepository;
    this.propertyRepository = propertyRepository;
  }

  public async create(propertyId: number, userId: number, dto: GuestRequestDTO): Promise<Guest> {
    if (!this.propertyRepository.findById(propertyId)) {
      throw new Error("PROPERTY_NOT_FOUND");
    };

    let guest = Guest.fromDTO(propertyId, userId, dto);

    // Chequear que el huesped no exista.
    if (!this.guestRepository.findByEmail(guest.email)) {
      throw new Error("GUEST_ALREADY_EXIST");
    }

    guest = await this.guestRepository.save(guest);

    return guest;
  }

  public async update(userId: number, dto: GuestRequestDTO): Promise<GuestResponseDTO> {
    const guestId = dto.id;

    if (!guestId) {
      throw new Error("NO_GUEST_ID_PROVIDED");
    }

    let guest = await this.guestRepository.findById(guestId)
    if (!guest) {
      throw new Error("GUEST_NOT_FOUND");
    }

    guest.update(guestId, userId, dto);

    guest = await this.guestRepository.save(guest);

    return guest.toDTO();
  }


}
