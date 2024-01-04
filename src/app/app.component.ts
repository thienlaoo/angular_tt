import { Component, OnInit } from '@angular/core';
import {CurrencyExchangeService} from "./currency-exchange.service";

interface Rates {
  [key: string]: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[CurrencyExchangeService],
})
export class AppComponent implements OnInit{
  public currencies: string[] = ["UAH", "GBP", "CHF", "CNY", "AUD"];
  public rates: Rates = {};
  public firstcurr = this.currencies[0];
  public secondcurr = this.currencies[1];
  public defaultMoney = 1000;
  public defaultMoneyOut = 0;
  constructor(
    private currencyExchangeService: CurrencyExchangeService
  ) {}
  getExchangeRateString(): string {
    const rate = this.rates[this.secondcurr] / this.rates[this.firstcurr];
    return `1 ${this.firstcurr} = ${rate.toFixed(2)} ${this.secondcurr}`;
  }
  ngOnInit() {
    this.currencyExchangeService.getExchangeRates().subscribe(data => {
      this.rates = this.currencyExchangeService.extractRates(data);
      this.defaultMoneyOut = this.defaultMoney * this.rates[this.secondcurr];
    });
  }

}
