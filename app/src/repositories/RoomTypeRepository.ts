import { ApiError } from "../error/ApiError";
import { type RoomTypeResponseDTO } from "../dtos/roomTypeDTO";
export class RoomTypeRepostiroy {
  private readonly baseUrl = "http://localhost:3000/api/v1";

  public async getAll(): Promise<RoomTypeResponseDTO[]> {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }
    const response = await fetch(`${this.baseUrl}/property/room-types`, options);

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.code, data.errors)
    }


    return data
  }
}
