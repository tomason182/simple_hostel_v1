export type BookingSource = "WEB_PAGE" | "DIRECT" | "BOOKING.COM" | "HOSTELWORD.COM";
export type ReservationStatus = "CONFIRMED" | "PENDING" | "CANCELED";
export type PaymentStatus = "PARTIAL" | "FULL_PAID" | "PENDING";

export class Reservation {
  constructor(
    public id: number,
    public guestId: number,
    public propertyId: number,
    public bookingSource: BookingSource,
    public currency: string,
    public reservationStatus: ReservationStatus,
    public paymentStatus: PaymentStatus,
    public totalAmount: number,
    public advancePaymentAmount: number,
    public checkIn: Date,
    public checkOut: Date,
    public specialRequest: string,
    public createdBy: number,
    public updatedBy: number,
    public createdAt: Date,
    public updatedAt: Date,
    public selectedRooms: Array<number>,
    public assignedBeds: Array<number>
  ) {
    this.id = id;
    this.guestId = guestId;
    this.propertyId = propertyId;
    this.bookingSource = bookingSource;
    this.currency = currency;
    this.reservationStatus = reservationStatus;
    this.paymentStatus = paymentStatus;
    this.totalAmount = totalAmount;
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


  };
}
