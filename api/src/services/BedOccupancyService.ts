import { Bed } from "../domain/entities/Bed";
import { Calendar } from "../domain/entities/Calendar";
import { Reservation } from "../domain/entities/Reservation";
import { IBedOccupancyRepository } from "../domain/ports/IBedOccupancyRepository";
import { IRoomTypeRepository } from "../domain/ports/IRoomTypeRepository";
import { SelectedRoom } from "../domain/value-objects/SelectedRoom";
import { addDays } from "../utils/dateUtils";

export class BedOccupancyService {
  constructor(
    private bedOccupancyRepository: IBedOccupancyRepository,
    private roomTypeRepository: IRoomTypeRepository,
  ) {
    this.bedOccupancyRepository = bedOccupancyRepository;
    this.roomTypeRepository = roomTypeRepository;
  }

  public async assignBeds(reservation: Reservation, calendar: Calendar): Promise<Map<number, Map<number, number>>> {

    let occupiedBedsTimeline = new Map<number, Map<number, number>>();
    for (const selectedRoom of reservation.selectedRooms) {
      const roomTypeId = selectedRoom.getRoomTypeId();
      const qty = selectedRoom.getQuantity();

      const roomType = await this.roomTypeRepository.findById(roomTypeId);
      if (!roomType) {
        throw new Error("ROOM_TYPE_NOT_FOUND");
      }

      const beds = roomType.getBeds();

      let availableBeds: Array<Bed> = [...beds];
      for (let date = reservation.checkIn.getTime(); date < reservation.checkOut.getTime(); date = addDays(new Date(date), 1).getTime()) {
        const day = calendar.getDay(roomTypeId, date);

        day.checkRoomsToSell(qty);

        day.checkAvailability(qty);

        const occupancy = day.getOccupancy();
        availableBeds = availableBeds.filter(bed => !occupancy.has(bed.getId()));

      }

      if (availableBeds.length < qty) {
        throw new Error("ASSIGNMET_PROBLEM");
      }

      const assignedBeds = availableBeds.slice(0, qty);

      for (const bed of assignedBeds) {
        for (let date = reservation.checkIn.getTime(); date < reservation.checkOut.getTime(); date = addDays(new Date(date), 1).getTime()) {
          let dayOccupancy = occupiedBedsTimeline.get(date);
          if (!dayOccupancy) {
            dayOccupancy = new Map();
            occupiedBedsTimeline.set(date, dayOccupancy);
          }
          dayOccupancy.set(bed.getId(), reservation.getId());
        }
      }
    }
    return occupiedBedsTimeline;

  }

  public async getOccupancyList(selectedRooms: Array<SelectedRoom>, checkIn: Date, checkOut: Date) {
    const occupancyList = await this.bedOccupancyRepository.getOccupancyBySelectedRooms(selectedRooms, checkIn, checkOut);

    return occupancyList;
  }

}
