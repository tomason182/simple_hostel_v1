export class Currencies {
  constructor(
    public baseCurrency: string,
    public paymentCurrency: string
  ) {
    this.baseCurrency = baseCurrency;
    this.paymentCurrency = paymentCurrency;
  };


  public getPaymentCurrency(): string {
    if (!this.paymentCurrency) {
      throw new Error("NO_PAYMENT_CURRENCY_SET");
    }
    return this.paymentCurrency;
  }

  public getBaseCurrency(): string {
    if (!this.baseCurrency) {
      throw new Error("NO_BASE_CURRENCY_SET")
    }
    return this.baseCurrency;
  }

}
