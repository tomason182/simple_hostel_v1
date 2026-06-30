export interface IReservationRepository {
  hasUpcomingReservations(roomTypeId: number, today: Date): Promise<boolean>;
}
