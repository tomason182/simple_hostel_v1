import bcrypt from "bcrypt";

export class User {
  public readonly id: number | null;
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

  static setLastResendEmail() {
    return new Date();
  }


  // Metodos de instancia
  async comparePassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.passwordHash);
    } catch (e) {
      return false
    }
  };

  async changePassword(newPassword: string, repeatPassword: string): Promise<void> {
    if (newPassword != repeatPassword) {
      throw new Error("Passwords doesnt match");
    }

    this.passwordHash = await User.passwordHash(newPassword);

  }

  // Getters and Setters
  setLastResenEmail(): void {
    this.lastResendEmail = new Date()
  };

  getId(): number {
    const id = this.id;
    if (!id) {
      throw new Error("User id is not set")
    }
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getFirstName(): string {
    return this.firstName;
  }


}
