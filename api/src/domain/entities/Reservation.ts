import { ReservationDTO } from "../dto/ReservationDTO";
import { Currencies } from "../value-objects/Currencies";
import { PaymentPolicies } from "../value-objects/PaymentPolicies";
import { SelectedRoom } from "../value-objects/SelectedRoom";
import { Calendar } from "./Calendar";
import { addDays } from "../../utils/dateUtils";
export type BookingSource = "BOOK_ENGINE" | "DIRECT" | "BOOKING.COM" | "HOSTELWORD.COM";
export type ReservationStatus = "CONFIRMED" | "PENDING" | "CANCELED";
export type PaymentStatus = "PARTIAL" | "FULL_PAID" | "PENDING";

export class Reservation {
  private totalAmount: number = 0;
  private advancePaymentAmount: number = 0;
  constructor(
    public id: number | null,
    public guestId: number,
    public propertyId: number,
    public bookingSource: BookingSource,
    public reservationStatus: ReservationStatus,
    public paymentStatus: PaymentStatus,
    public currency: string,
    public checkIn: Date,
    public checkOut: Date,
    public specialRequest: string,
    public createdBy: number,
    public updatedBy: number,
    public createdAt: Date,
    public updatedAt: Date,
    public selectedRooms: Array<SelectedRoom>,
  ) {
    this.id = id;
    this.guestId = guestId;
    this.propertyId = propertyId;
    this.bookingSource = bookingSource;
    this.reservationStatus = reservationStatus;
    this.paymentStatus = paymentStatus;
    this.currency = currency;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.specialRequest = specialRequest;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.selectedRooms = selectedRooms;

    this.setReservationStatus();
  };

  static create(guestId: number, dto: ReservationDTO, currencies: Currencies, userId: number) {
    const currency = currencies.getPaymentCurrency();
    return new Reservation(
      null,
      guestId,
      dto.propertyId,
      dto.bookingSource,
      dto.reservationStatus,
      dto.paymentStatus,
      currency,
      dto.checkIn,
      dto.checkOut,
      dto.specialRequest,
      userId,
      userId,
      new Date(),
      new Date(),
      dto.selectedRooms,
    )
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

  public calculateTotalAmount(calendar: Calendar): number {
    let total = 0;

    for (const selectedRoom of this.selectedRooms) {
      const roomTypeId = selectedRoom.getRoomTypeId();
      const qty = selectedRoom.getQuantity();
      for (let date = this.checkIn.getTime(); date < this.checkOut.getTime(); date = addDays(new Date(date), 1).getTime()) {
        const day = calendar.getDay(roomTypeId, date);
        const rate = day.getRate();
        total += rate.customRate * qty;
      }
    }
    return total
  }

  public setTotalAmount(amount: number): void {
    this.totalAmount = amount;
  }

  public getTotalAmount(): number {
    return this.totalAmount;
  }

  public getAdvancePaymentAmount(): number {
    return this.advancePaymentAmount;
  }

  // Getters y Setters.
  public getId(): number | null {
    return this.id
  };

  public setId(id: number): void {
    this.id = id;
  }

  public getSelectedRooms(): Array<SelectedRoom> {
    return this.selectedRooms;
  };
}
