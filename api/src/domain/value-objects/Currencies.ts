export class Currencies {
  constructor(
    public baseCurrency: string,
    public paymentCurrency: string
  ) {
    this.baseCurrency = baseCurrency;
    this.paymentCurrency = paymentCurrency;
  };

}
