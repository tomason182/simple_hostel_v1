export class Currencies {
  constructor(
    public baseCurrency: string | null,
    public paymentCurrency: string | null,
  ) {
    this.baseCurrency = baseCurrency;
    this.paymentCurrency = paymentCurrency;
  };


  public getPaymentCurrency(): string | null {
    return this.paymentCurrency;
  }

  public getBaseCurrency(): string | null {
    return this.baseCurrency;
  }

}
