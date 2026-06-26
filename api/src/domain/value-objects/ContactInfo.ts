export class ContactInfo {
  public email: string;
  public phoneCallsCode: string;
  public phoneCalls: string;
  public phoneWhatsappCode: string;
  public phoneWhatsapp: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    email: string,
    phoneCallsCode: string,
    phoneCalls: string,
    phoneWhatsappCode: string,
    phoneWhatsapp: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.email = email;
    this.phoneCallsCode = phoneCallsCode;
    this.phoneCalls = phoneCalls;
    this.phoneWhatsappCode = phoneWhatsappCode;
    this.phoneWhatsapp = phoneWhatsapp;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  };

};
