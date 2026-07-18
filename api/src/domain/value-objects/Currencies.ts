import { CurrenciesDTO } from "../dto/CurrenciesDTO";

export class Currencies {
  private propertyId: number | null = null;
  private baseCurrency: string | null = null;
  private paymentCurrency: string | null = null;
  public updatedAt: Date | null = null;
  public updatedBy: number | null = null;

  public setId(id: number | null) {
    this.propertyId = id;
  }
  public getId(): number | null {
    return this.propertyId;
  }

  public getPaymentCurrency(): string | null {
    return this.paymentCurrency;
  }

  public setPaymentCurrency(currency: string | null) {
    let formatted = currency;
    if (formatted !== null) {
      formatted = this.currencyFormatter(formatted);
    }
    this.paymentCurrency = formatted;
  }

  public setBaseCurrency(currency: string | null) {
    let formatted = currency;
    if (formatted !== null) {
      formatted = this.currencyFormatter(formatted);
    }
    this.baseCurrency = formatted;
  }

  public getBaseCurrency(): string | null {
    return this.baseCurrency;
  }

  static make(dto: CurrenciesDTO): Currencies {
    // Se deberia comprobar que currency es de un formato determinado.
    const currencies = new Currencies();
    currencies.setBaseCurrency(dto.baseCurrency);
    currencies.setPaymentCurrency(dto.paymentCurrency);
    currencies.updatedAt = new Date();
    currencies.updatedBy = dto.user_id;
    return currencies;
  }

  public update(dto: CurrenciesDTO): void {
    this.setBaseCurrency(dto.baseCurrency);
    this.setPaymentCurrency(dto.paymentCurrency);
    this.updatedAt = new Date();
    this.updatedBy = dto.user_id;
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
