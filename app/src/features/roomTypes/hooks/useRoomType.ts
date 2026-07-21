import { useQuery } from "@tanstack/react-query";

import { roomTypeQueryKeys } from "../queryKeys";
import { roomTypeService } from "../services/RoomTypeService";

export function useRoomType(id: number) {
  return useQuery({
    queryKey: roomTypeQueryKeys.byId(id),
    queryFn: () => roomTypeService.getById(id),
    enabled: id > 0
  })
}
