import apiClient from "../../../api/ApiClient";
import type { RoomTypeDTO, RoomTypeInputDTO } from "../dto/RoomTypeDTO";

class RoomTypeService {
  getAll(): Promise<Array<RoomTypeInputDTO>> {
    return apiClient.get<Array<RoomTypeInputDTO>>("/room-types");
  };

  getById(id: number): Promise<RoomTypeInputDTO> {
    return apiClient.get(`/room-types/${id}`);
  };

  create(dto: RoomTypeDTO): Promise<RoomTypeInputDTO> {
    return apiClient.post("room-types", dto);
  }

  update(id: number, dto: RoomTypeDTO): Promise<RoomTypeInputDTO> {
    return apiClient.put(`/room-types/${id}`, dto);
  }

  delete(id: number): Promise<void> {
    return apiClient.delete(`/room-types/${id}`);
  };
}

export const roomTypeService = new RoomTypeService();
