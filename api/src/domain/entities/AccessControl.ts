export type UserRole = "OWNER" | "ADMIN" | "MANAGER" | "EMPLOYEE";

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


  // Metodos de clase.
  static createNewAccessControl(userId: number, propertyId: number): AccessControl {
    const role = "ADMIN";
    const createdAt = new Date();
    const updatedAt = new Date();

    return new AccessControl(null, userId, propertyId, role, createdAt, updatedAt);
  }

  // Metodos de instancia.
  canEditPolicies() {
    if (this.role === "ADMIN" || this.role === "MANAGER") {
      return true;
    }
    return false;
  }


  // Getters and Setters.
  public getId(): number {
    const id = this.id;
    if (!id) {
      throw new Error("ACCESSCONTROL_ID_NOT_SET");
    }
    return id;
  }

  public setId(id: number): void {
    if (id <= 0) {
      throw new Error("INVALID_ID_VALUE");
    }
    this.id = id;
  }

  public getPropertyId() {
    return this.propertyId;
  };
  public getUserId() {
    return this.userId;
  };
  public getRole() {
    return this.role;
  }

};
