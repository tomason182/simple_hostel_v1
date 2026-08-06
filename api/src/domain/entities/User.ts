import bcrypt from "bcrypt";
import { UserDTO, UserOutputDTO } from "../dto/UserDTO";

export class User {
  private id: number | null;
  public username: string;
  public firstName: string;
  public lastName: string | null;
  public isEmailVerified: boolean;
  public avatar: string | null;
  public createdAt: Date;
  public updatedAt: Date;
  private passwordHash: string;
  private lastResendEmail: Date;
  private waitingPeriod: number = 5 * 60 * 1000;

  constructor(
    id: number | null,
    username: string,
    firstName: string,
    lastName: string | null,
    passwordHash: string,
    isEmailVerified: boolean,
    lastResendEmail: Date,
    avatar: string | null,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.passwordHash = passwordHash;
    this.isEmailVerified = isEmailVerified;
    this.lastResendEmail = lastResendEmail;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

  }

  // Metodos de clase
  static async createNewUser(username: string, password: string, firstName: string): Promise<User> {
    const passwordHash = await User.passwordHash(password);
    const isEmailVerified = false;
    const lastResendEmail = new Date();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new User(null, username, firstName, null, passwordHash, isEmailVerified, lastResendEmail, null, createdAt, updatedAt);
  }

  static async passwordHash(password: string, saltRounds = 10): Promise<string> {
    try {
      return await bcrypt.hash(password, saltRounds);
    } catch (e) {
      throw new Error("Error hashing password");
    }
  }

  // Metodos de instancia
  public async comparePassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.passwordHash);
    } catch (e) {
      return false
    }
  };

  public async changePassword(oldPassword: string, newPassword: string, repeatPassword: string): Promise<void> {

    if (!this.comparePassword(oldPassword)) {
      throw new Error("INVALID_PASSWORD")
    }
    if (newPassword != repeatPassword) {
      throw new Error("Passwords doesnt match");
    }

    this.passwordHash = await User.passwordHash(newPassword);

  }

  public async resetPassword(newPass: string, repeatNewPass: string): Promise<void> {

    if (newPass !== repeatNewPass) {
      throw new Error("PASSWORD_DONT_MATCH");
    }

    this.passwordHash = await User.passwordHash(newPass);
  }

  public toDTO(): UserOutputDTO {
    if (this.id === null) {
      throw new Error("USER_NOT_EXISTS");
    }
    return {
      id: this.id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  // Getters and Setters
  setLastResenEmail(): void {
    this.lastResendEmail = new Date()
  };

  checkLastResendEmail(): boolean {
    if (this.lastResendEmail.getTime() + this.waitingPeriod < new Date().getTime()) {
      throw new Error("WAITING_PERIOD");
    }

    return true;
  }

  getId(): number {
    const id = this.id;
    if (!id) {
      throw new Error("USER_ID_NOT_SET");
    }
    return id;
  }

  setId(id: number): void {
    if (id <= 0) {
      throw new Error("INVALID_ID_VALUE");
    }
    this.id = id;
  }

  getUsername(): string {
    return this.username;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getPasswordHash(): string {
    return this.passwordHash
  }

  getLastResendEmail(): Date {
    return this.lastResendEmail
  }

  update(userDTO: UserDTO): void {
    if (userDTO.username !== this.username) {
      throw new Error("USERNAME_CAN_NOT_BE_CHANGE")
    };
    this.firstName = userDTO.firstName;
    this.lastName = userDTO.lastName;
  }


}
