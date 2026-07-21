import { useQuery } from "@tanstack/react-query";

import { roomTypeService } from "../services/RoomTypeService";
import { roomTypeQueryKeys } from "../queryKeys";

export function useRoomTypes() {
  return useQuery({
    queryKey: roomTypeQueryKeys.all,
    queryFn: () => roomTypeService.getAll(),

  });
}

