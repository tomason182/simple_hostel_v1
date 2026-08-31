import { Request, Response, NextFunction } from "express";
import { IReservationService } from "../domain/interfaces/IReservationService";
import { GuestRequestDTO } from "../domain/dto/GuestDTO";
import { ReservationDTO } from "../domain/dto/ReservationDTO";

export class ReservationController {
  constructor(private readonly reservationService: IReservationService) {
    this.reservationService = reservationService;
  }

  public async createReservation(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, userId } = req.auth;

      const guestDTO: GuestRequestDTO = {
        id: null,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        idNumber: req.body.idNumber,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        phoneCode: req.body.phoneCode,
        street: req.body.street,
        city: req.body.city,
        country: req.body.country,
        alpa2code: req.body.alpa2code
      };

      const reservationDTO: ReservationDTO = {
        bookingSource: req.body.bookingSource,
        reservationStatus: req.body.reservationStatus,
        paymentStatus: req.body.paymentStatus,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        specialRequest: req.body.specialRequest,
        selectedRooms: req.body.selectedRooms
      };

      const result = await this.reservationService.createReservation(reservationDTO, guestDTO, userId, propertyId);

      return res.status(200).json(result);

    } catch (err) {
      next(err);
    }
  }



}

