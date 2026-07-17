import { GuestDTO } from "../dto/GuestDTO";
import { Guest } from "../entities/Guest";

export interface IGuestService {
  create(propertyId: number, userId: number, guestDTO: GuestDTO): Promise<Guest>;

  update(userId: number, guestDTO: GuestDTO): Promise<GuestDTO>;
}
