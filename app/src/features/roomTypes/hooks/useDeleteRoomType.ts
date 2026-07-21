import { useMutation, useQueryClient } from "@tanstack/react-query";

import { roomTypeService } from "../services/RoomTypeService";
import { roomTypeQueryKeys } from "../queryKeys";

export function useDeleteRoomType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roomTypeService.delete,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: roomTypeQueryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: roomTypeQueryKeys.byId(id)
      })
    }
  })

}
