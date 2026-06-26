import bcrypt from "bcrypt";
import { UserDTO, CreateUserDTO } from "../dto/UserDTO";

export type UserRole = "admin" | "manager" | "employee";

export class User {
  public readonly id: number | null;
  public username: string;
  public firstName: string;
  public lastName: string | null;
  public role: UserRole;
  public isEmailVerified: boolean;
  public avatar:string;
  public createdAt: Date;
  public updatedAt: Date;
  private passwordHash:string;
  public lastResendEmail:Date;
  private waitingPeriod: number = 5 * 60 * 1000;

  constructor(
    id:number | null, 
    username:string, 
    firstName:string, 
    lastName:string | null,
    role: UserRole,
    passwordHash:string, 
    isEmailVerified:boolean, 
    lastResendEmail:Date, 
    avatar:string, 
    createdAt:Date, 
    updatedAt: Date
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.passwordHash = passwordHash;
    this.isEmailVerified = isEmailVerified;
    this.lastResendEmail = lastResendEmail;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

  }

  // Metodos de clase
   static async passwordHash(password:string, saltRounds = 10): Promise<string> {
    try {
      return await bcrypt.hash(password, saltRounds);
    } catch(e) {
      throw new Error("Error hashing password");
    }
  }

  static async newUser(username:string, firstName:string, role:UserRole, password:string ) : Promise<User> {
    const hashPassword = await User.passwordHash(password);
    const isEmailVerified = false;
    const lastResendEmail = new Date();
    const defaultAvatar = "url/to/default/avatar";
    const createdAt = new Date();
    const updatedAt = new Date();


    return new User(null, username, firstName, null, role, hashPassword, isEmailVerified, lastResendEmail, defaultAvatar, createdAt, updatedAt);
  }

  // Metodos de instancia
  async comparePassword(password:string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.passwordHash);
    }catch(e){
      return false
    }
  };

  async changePassword(newPassword:string, repeatPassword:string): Promise<void> {
    if(newPassword != repeatPassword) {
      throw new Error("Passwords doesnt match");
    }

    this.passwordHash = await User.passwordHash(newPassword);

  }

  // Getters and Setters
  setLastResenEmail():void {
    this.lastResendEmail = new Date()
  };

}
