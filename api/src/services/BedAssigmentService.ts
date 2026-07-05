import { Reservation } from "../domain/entities/Reservation";
import { RoomType } from "../domain/entities/RoomTypes";
import { IReservationRepository } from "../domain/ports/IReservationRepository";
import { IRoomTypeRepository } from "../domain/ports/IRoomTypeRepository";

export class BedAssigmentService {
  constructor(
    private reservationRepository: IReservationRepository,
    private roomTypeRepository: IRoomTypeRepository,
    private reservationsToAssing: Array<Reservation> = [],
    private committed = false,
  ) {
    this.reservationRepository = reservationRepository;
    this.roomTypeRepository = roomTypeRepository;
  }

  public init(reservation: Reservation) {
    this.reservationsToAssing.push(reservation)
    while (this.reservationsToAssing.length > 0) {
      this.AssignemetProblem(this.reservationsToAssing)
    }
  }

  public AssignemtSolver(reservation: Reservation) {

  };

  private AssignemetProblem(reservations: Array<Reservation>) {
    let firstIn = this.reservationsToAssing[0].checkIn;
    let lastOut = this.reservationsToAssing[0].checkOut;

    for (const reservation of reservations) {
      if (reservation.checkIn.getTime() < firstIn.getTime()) {
        firstIn = reservation.checkIn
      }

      if (reservation.checkOut > lastOut) {
        lastOut = reservation.checkOut
      }

      const roomTypes = reservation.getRoomTypes();

      for (const roomType of roomTypes) {
        const reservationsRoomTypeByPeriod = await this.reservationRepository.getReservationsByRoomTypeAndPeriod(roomType, firstIn, lastOut);
        const beds = roomType.getBeds();
        const roomTypeId = roomType.getId();

        for (const bed of beds) {
          for (let date = reservation.checkIn.getTime(); date < reservation.checkOut.getTime(); date = this.nextDay(new Date(date))) {
            if (!bed.Available()) {
              break;
            }
            reservation.setBed(bed.getId());
          }
        }

        if (resevation.getAssignedBeds < )
          
          
        }
    }
  }

  public async assignBeds(reservation: Reservation) {


    const roomTypes = reservation.getRoomTypes();
    for (const roomType of roomTypes) {

      const beds = roomType.getBeds();
      const roomTypeId = roomType.getId();

      const reservationQty = reservation.getQuantity(roomTypeId);

      let bedCount = 0;

      while (bedCount < reservationQty) {

        for (const bed of beds) {
          let bedsChecked = 0;

          if (bedsChecked >= beds.length) {
            for (const reservation of reservationsRoomTypeByPeriod) {
              this.reservationsToAssing.push(reservation);
              break;
            }
          }


          const bedNumber = bed.getId();
          reservation.setBed(bedNumber);
          bedCount += 1;

        }
      }

      await this.reservationRepository.updateReservationsBeds(this.reservationsToAssing);
      this.reservationsToAssing = [];



    }




  }
}
  }

  public nextDay(date: Date): number {
  return date.setUTCDate((date.getUTCDate() + 1))
}
}
