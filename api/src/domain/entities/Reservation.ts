import { ReservationDTO } from "../dto/ReservationDTO";
import { Currencies } from "../value-objects/Currencies";
import { PaymentPolicies } from "../value-objects/PaymentPolicies";
import type { SelectedRooms } from "../value-objects/SelectedRooms";
import { RatesAndAvailability } from "./RatesAndAvailability";
export type BookingSource = "BOOK_ENGINE" | "DIRECT" | "BOOKING.COM" | "HOSTELWORD.COM";
export type ReservationStatus = "CONFIRMED" | "PENDING" | "CANCELED";
export type PaymentStatus = "PARTIAL" | "FULL_PAID" | "PENDING";

export class Reservation {
  private totalAmountHelper: number = 0;
  constructor(
    public id: number | null,
    public guestId: number,
    public propertyId: number,
    public bookingSource: BookingSource,
    public reservationStatus: ReservationStatus,
    public paymentStatus: PaymentStatus,
    public totalAmount: number,
    public currency: string,
    public advancePaymentAmount: number,
    public checkIn: Date,
    public checkOut: Date,
    public specialRequest: string,
    public createdBy: number,
    public updatedBy: number,
    public createdAt: Date,
    public updatedAt: Date,
    public selectedRooms: Array<SelectedRooms>,
    public assignedBeds: Array<number>
  ) {
    this.id = id;
    this.guestId = guestId;
    this.propertyId = propertyId;
    this.bookingSource = bookingSource;
    this.reservationStatus = reservationStatus;
    this.paymentStatus = paymentStatus;
    this.totalAmount = 0;
    this.currency = currency;
    this.advancePaymentAmount = advancePaymentAmount;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.specialRequest = specialRequest;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.selectedRooms = selectedRooms;
    this.assignedBeds = assignedBeds;


    this.setReservationStatus();
  };

  public create(guestId: number, dto: ReservationDTO, rates: Array<RatesAndAvailability>, currencies: Currencies, paymentPolicie: PaymentPolicies, userId: number) {
    const currency = currencies.getPaymentCurrency();
    const totalAmount = this.calculateTotalAmount(dto, dto.selectedRooms, rates)
    const advancePaymentAmount = paymentPolicie.checkAPA(dto, totalAmount);
    return new Reservation(
      null,
      guestId,
      dto.propertyId,
      dto.bookingSource,
      dto.reservationStatus,
      dto.paymentStatus,
      totalAmount,
      currency,
      advancePaymentAmount,
      dto.checkIn,
      dto.checkOut,
      dto.specialRequest,
      userId,
      userId,
      new Date(),
      new Date(),
      dto.selectedRooms,
      [1]

    )
  }

  private calculateTotalAmount(dto: ReservationDTO, rooms: Array<SelectedRooms>, rates: Array<RatesAndAvailability>): number {
    let totalAmount = 0;

    // Chequear restricciones de RatesaAndAvailability.
    RatesAndAvailability.checkRatesConstrains(rates, dto);

    for (const room of rooms) {
      const roomId = room.roomTypeId;
      const roomRates = rates.filter(r => r.roomTypeId === roomId);
      const unitTotal = roomRates.reduce((acc, rate) => acc + rate.customRate, 0);
      const quantity = room.quantity;

      totalAmount += unitTotal * quantity;
    }

    return totalAmount;
  }

  // Logica para reservation status.
  private setReservationStatus() {
    if (this.bookingSource === "BOOK_ENGINE") {
      this.reservationStatus = "PENDING";
      this.paymentStatus = "PENDING";
    }
  }

  // METODOS DE INSTANCIA
  public isActiveOn(date: Date): boolean {
    const timestamp = date.getTime();

    return (
      this.checkIn.getTime() <= timestamp &&
      this.checkOut.getTime() > timestamp
    );
  };

  // Getters y Setters.
  public getId(): number {
    if (!this.id) {
      throw new Error("ID_NOT_SET");
    }
    return this.id
  }
  public getQuantity(roomTypeId: number): number {

    const selectedRooms = this.selectedRooms;
    // Buscar si la reserva contiene el roomId.
    const selectedRoom = selectedRooms.find(sr => sr.roomTypeId === roomTypeId);
    if (selectedRoom) {
      return selectedRoom.quantity;
    }

    return 0;

  }



}
