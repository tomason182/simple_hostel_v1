import { Guest } from "../entities/Guest"

export interface IGuestRepository {
  save(guest: Guest): Promise<Guest>;

  findById(guestId: number): Promise<Guest | null>;

  findByEmail(email: string): Promise<Guest | null>;
}
