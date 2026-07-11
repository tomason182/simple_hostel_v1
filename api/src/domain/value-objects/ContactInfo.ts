import { ContactInfoDTO } from "../dto/ContactInfoDTO";

export class ContactInfo {
  public email: string;
  public phoneCallsCode: string;
  public phoneCalls: string;
  public phoneWhatsappCode: string;
  public phoneWhatsapp: string;
  public updatedBy: number;
  public updatedAt: Date;

  constructor(
    email: string,
    phoneCallsCode: string,
    phoneCalls: string,
    phoneWhatsappCode: string,
    phoneWhatsapp: string,
    updatedBy: number,
    updatedAt: Date
  ) {
    this.email = email;
    this.phoneCallsCode = phoneCallsCode;
    this.phoneCalls = phoneCalls;
    this.phoneWhatsappCode = phoneWhatsappCode;
    this.phoneWhatsapp = phoneWhatsapp;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
  };

  static make(dto: ContactInfoDTO, userId: number): ContactInfo {
    return new ContactInfo(dto.email,
      dto.phoneCallsCode,
      dto.phoneCalls,
      dto.phoneWhatsappCode,
      dto.phoneWhatsapp,
      userId,
      new Date()
    );
  }

  public toDTO(): ContactInfoDTO {
    return {
      email: this.email,
      phoneCallsCode: this.phoneCallsCode,
      phoneCalls: this.phoneCalls,
      phoneWhatsappCode: this.phoneWhatsappCode,
      phoneWhatsapp: this.phoneWhatsapp,
    }
  }

  public update(dto: ContactInfoDTO, userId: number): void {
    this.email = dto.email;
    this.phoneCallsCode = dto.phoneCallsCode;
    this.phoneCalls = dto.phoneCalls;
    this.phoneWhatsappCode = dto.phoneWhatsappCode;
    this.phoneWhatsapp = dto.phoneWhatsapp;
    this.updatedBy = userId;
    this.updatedAt = new Date();
  }
};
