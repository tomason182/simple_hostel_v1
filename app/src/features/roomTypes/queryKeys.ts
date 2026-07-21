export const roomTypeQueryKeys = {
  all: ["roomTypes"] as const,
  byId: (id: number) => ["roomTypes", id] as const,
};
