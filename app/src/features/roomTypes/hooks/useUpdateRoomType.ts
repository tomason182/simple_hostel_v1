import { useMutation, useQueryClient } from "@tanstack/react-query";

import { roomTypeQueryKeys } from "../queryKeys";
import { roomTypeService } from "../services/RoomTypeService";
import type { RoomTypeDTO } from "../dto/RoomTypeDTO";

interface UpdateRoomTypeVariables {
  id: number;
  dto: RoomTypeDTO
}

export function useUpdateRoomType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: UpdateRoomTypeVariables) => roomTypeService.update(id, dto),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: roomTypeQueryKeys.all
      });
      queryClient.invalidateQueries({
        queryKey: roomTypeQueryKeys.byId(id)
      })
    }
  })
}
