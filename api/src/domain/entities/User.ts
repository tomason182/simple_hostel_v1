export class User {
  public readonly id: number;
  public username: string;
  public firstName: string;
  public lastName: string;
  private passwordHash:string;
  public isEmailVerified: boolean;
  public lastResendEmail:Date;
  public avatar:string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id:number, 
              username:string, 
              firstName:string, 
              lastName:string, 
              passwordHash:string, 
              isEmailVerified:boolean, 
              lastResendEmail:Date, 
              avatar:string, 
              createdAt:Date, 
              updatedAt:Date) {
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

  getPasswordHash() {
    return this.passwordHash;
  };

}
