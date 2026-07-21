import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomTypeService } from "../services/RoomTypeService";
import { roomTypeQueryKeys } from "../queryKeys";

export function useCreateRoomType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roomTypeService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: roomTypeQueryKeys.all,
      })
    }
  })
}
