import { Bed } from "../domain/entities/Bed";
import { Calendar } from "../domain/entities/Calendar";
import { RatesAndAvailability } from "../domain/entities/RatesAndAvailability";
import { Reservation } from "../domain/entities/Reservation";
import { BedOccupancyRepository } from "../domain/ports/IBedOccupancyRepository";
import { IRoomTypeRepository } from "../domain/ports/IRoomTypeRepository";

export class BedOccupancyService {
  constructor(
    private bedOccupancyRepository: BedOccupancyRepository,
    private roomTypeRepository: IRoomTypeRepository,
  ) {
    this.bedOccupancyRepository = bedOccupancyRepository;
    this.roomTypeRepository = roomTypeRepository;
  }

  public async assignBeds(reservation: Reservation, rates: Array<RatesAndAvailability>): Promise<Map<number, Map<number, number>>> {

    let occupiedBedsTimeline = new Map<number, Map<number, number>>();
    for (const selectedRoom of reservation.selectedRooms) {
      const roomTypeId = selectedRoom.getRoomTypeId();
      const qty = selectedRoom.getQuantity();

      const roomType = await this.roomTypeRepository.findById(roomTypeId);
      if (!roomType) {
        throw new Error("ROOM_TYPE_NOT_FOUND");
      }

      const beds = roomType.getBeds();

      const occupancyList = await this.bedOccupancyRepository.getOccupancy(roomTypeId, reservation.checkIn, reservation.checkOut);

      const calendar = Calendar.build(rates, occupancyList);

      let availableBeds: Array<Bed> = [...beds];
      for (let date = reservation.checkIn.getTime(); date < reservation.checkOut.getTime(); date = calendar.nextDay(date)) {
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
        for (let date = reservation.checkIn.getTime(); date < reservation.checkOut.getTime(); date = calendar.nextDay(date)) {
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

}
