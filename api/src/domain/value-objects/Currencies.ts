import { CurrenciesDTO } from "../dto/CurrenciesDTO";

export class Currencies {
  public propertyId: number;
  public baseCurrency: string;
  public paymentCurrency: string;
  public updatedAt: Date;
  public updatedBy: number;

  constructor(propertyId: number, baseCurrency: string, paymentCurrency: string, updatedAt: Date, updatedBy: number) {
    this.propertyId = propertyId,
      this.baseCurrency = baseCurrency,
      this.paymentCurrency = paymentCurrency,
      this.updatedAt = updatedAt,
      this.updatedBy = updatedBy
  }

  public setId(id: number) {
    this.propertyId = id;
  }
  public getId(): number | null {
    return this.propertyId;
  }

  public getPaymentCurrency(): string {
    return this.paymentCurrency;
  }

  public setPaymentCurrency(currency: string) {
    let formatted = currency;
    if (formatted !== null) {
      formatted = this.currencyFormatter(formatted);
    }
    this.paymentCurrency = formatted;
  }

  public setBaseCurrency(currency: string) {
    let formatted = currency;
    if (formatted !== null) {
      formatted = this.currencyFormatter(formatted);
    }
    this.baseCurrency = formatted;
  }

  public getBaseCurrency(): string {
    return this.baseCurrency;
  }

  static make(dto: CurrenciesDTO, propertyId: number, userId: number): Currencies {
    // Se deberia comprobar que currency es de un formato determinado.
    const currencies = new Currencies(propertyId, dto.baseCurrency, dto.paymentCurrency, new Date(), userId);

    return currencies;
  }

  public update(dto: CurrenciesDTO, userId: number): void {
    this.setBaseCurrency(dto.baseCurrency);
    this.setPaymentCurrency(dto.paymentCurrency);
    this.updatedAt = new Date();
    this.updatedBy = userId
  }


  private currencyFormatter(currency: string): string {
    let formatter = currency;
    formatter.trim();
    formatter.toLowerCase();

    if (formatter.length !== 3) {
      throw new Error("INVALID_CURRENCY_FORMAT");
    }

    return formatter;
  }

}
