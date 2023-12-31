import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Rates {
  [key: string]: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private apiUrl = 'https://api.monobank.ua/bank/currency';
  public currencies: string[] = ["UAH", "GBP", "CHF", "CNY", "AUD"];
  public rates: Rates = {};
  public firstcurr = this.currencies[0];
  public secondcurr = this.currencies[1];
  public defaultmoney = 1000;
  public defaultmoneyout = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      const tempCurrencies = data.slice(3, 7).map(item => item.rateCross);
      this.rates = this.currencies.reduce((acc, code, index) => {
        acc[code] = index === 0 ? 1 : tempCurrencies[index - 1];
        return acc;
      }, {} as Rates);
      this.defaultmoneyout = (this.defaultmoney * this.rates[this.secondcurr])
    });
  }
  handleFirstCurrChange(event: any) {
    this.firstcurr = event.target.value;

    if (this.firstcurr !== "UAH" && this.secondcurr === "UAH") {
      this.defaultmoneyout = +((this.defaultmoney * this.rates[this.firstcurr]) / this.rates[this.secondcurr]).toFixed(2);
    } else if (this.firstcurr === "UAH" && this.secondcurr !== "UAH") {
      this.defaultmoneyout = +((this.defaultmoney * this.rates[this.secondcurr]).toFixed(2));
    } else {
      this.defaultmoneyout = +((this.defaultmoney / this.rates[this.firstcurr]) / this.rates[this.secondcurr]).toFixed(2);
    }
  }

  handleSecondCurrChange(event: any) {
    this.secondcurr = event.target.value;

    if (this.firstcurr !== "UAH" && this.secondcurr === "UAH") {
      this.defaultmoney = +((this.defaultmoneyout * this.rates[this.secondcurr]) / this.rates[this.firstcurr]).toFixed(2);
    } else if (this.firstcurr === "UAH" && this.secondcurr !== "UAH") {
      this.defaultmoney = +((this.defaultmoneyout / this.rates[this.secondcurr]).toFixed(2));
    } else {
      this.defaultmoney = +((this.defaultmoneyout * this.rates[this.secondcurr]) / this.rates[this.firstcurr]).toFixed(2);
    }
  }

  handleFirstInput(event: any) {
    const input = parseFloat(event.target.value);

    if (this.firstcurr !== "UAH" && this.secondcurr === "UAH") {
      this.defaultmoneyout = +((input / this.rates[this.firstcurr]) * this.rates[this.secondcurr]).toFixed(2);
    } else if (this.firstcurr === "UAH" && this.secondcurr !== "UAH") {
      this.defaultmoneyout = +((input * this.rates[this.secondcurr]).toFixed(2));
    } else {
      this.defaultmoneyout = +((input / this.rates[this.firstcurr]) * this.rates[this.secondcurr]).toFixed(2);
    }
  }

  handleSecondInput(event: any) {
    const input = parseFloat(event.target.value);

    if (this.firstcurr !== "UAH" && this.secondcurr === "UAH") {
      this.defaultmoney = +((input / this.rates[this.secondcurr]) * this.rates[this.firstcurr]).toFixed(2);
    } else if (this.firstcurr === "UAH" && this.secondcurr !== "UAH") {
      this.defaultmoney = +((input / this.rates[this.secondcurr]).toFixed(2));
    } else {
      this.defaultmoney = +((input / this.rates[this.secondcurr]) * this.rates[this.firstcurr]).toFixed(2);
    }
  }


  switchCurrencies() {
    const temp = this.firstcurr;
    this.firstcurr = this.secondcurr;
    this.secondcurr = temp;
    this.defaultmoneyout = +(this.defaultmoney / this.rates[this.firstcurr] * this.rates[this.secondcurr]).toFixed(2);
    if (this.firstcurr === "UAH" && this.secondcurr !== "UAH") {
      this.defaultmoneyout = +((this.defaultmoney * this.rates[this.secondcurr]).toFixed(2));
    }
  }
  getExchangeRateString(): string {
    const rate = this.rates[this.secondcurr] / this.rates[this.firstcurr];
    return `1 ${this.firstcurr} = ${rate.toFixed(2)} ${this.secondcurr}`;
  }
}
