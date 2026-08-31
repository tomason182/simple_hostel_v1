import { Guest } from "../entities/Guest"

export interface IGuestRepository {
  save(guest: Guest): Promise<Guest>;

  findById(guestId: number): Promise<Guest | null>;

  findByEmail(propertyId: number, email: string): Promise<Guest | null>;
}
