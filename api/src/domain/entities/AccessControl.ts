export type UserRole = "admin" | "manager" | "employee";

export class AccessControl {
  public id: number | null;
  public userId: number;
  public propertyId: number;
  public role: UserRole;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: number | null, userId: number, propertyId: number, role: UserRole, createdAt: Date, updatedAt: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.propertyId = propertyId;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  };

};
