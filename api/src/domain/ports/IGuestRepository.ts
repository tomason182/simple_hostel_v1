import { Guest } from "../entities/Guest"

export interface IGuestRepository {
  save(guest: Guest): Promise<Guest>;
}
