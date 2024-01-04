import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.scss'],
})
export class CurrencyConverterFormComponent {
  @Input() currencies: string[] = [];
  @Input() firstCurrency: string = '';
  @Input() secondCurrency: string = '';
  @Input() defaultMoney: number = 0;
  @Input() defaultMoneyOut: number = 0;
  @Input() rates: any = {};

  @Output() firstCurrencyChange = new EventEmitter<string>();
  @Output() secondCurrencyChange = new EventEmitter<string>();
  @Output() defaultMoneyChange = new EventEmitter<number>();
  @Output() defaultMoneyOutChange = new EventEmitter<number>();

  handleFirstCurrChange(event: any) {
    this.firstCurrency = event.target.value;

    if (this.firstCurrency !== "UAH" && this.secondCurrency === "UAH") {
      this.defaultMoneyOut = +((this.defaultMoney * this.rates[this.firstCurrency]) / this.rates[this.secondCurrency]).toFixed(2);
    } else if (this.firstCurrency === "UAH" && this.secondCurrency !== "UAH") {
      this.defaultMoneyOut = +((this.defaultMoney * this.rates[this.secondCurrency]).toFixed(2));
    } else {
      this.defaultMoneyOut = +((this.defaultMoney / this.rates[this.firstCurrency]) / this.rates[this.secondCurrency]).toFixed(2);
    }

    this.emitChanges();
  }

  handleSecondCurrChange(event: any) {
    this.secondCurrency = event.target.value;

    if (this.firstCurrency !== "UAH" && this.secondCurrency === "UAH") {
      this.defaultMoney = +((this.defaultMoneyOut * this.rates[this.secondCurrency]) / this.rates[this.firstCurrency]).toFixed(2);
    } else if (this.firstCurrency === "UAH" && this.secondCurrency !== "UAH") {
      this.defaultMoney = +((this.defaultMoneyOut / this.rates[this.secondCurrency]).toFixed(2));
    } else {
      this.defaultMoney = +((this.defaultMoneyOut * this.rates[this.secondCurrency]) / this.rates[this.firstCurrency]).toFixed(2);
    }

    this.emitChanges();
  }

  handleFirstInput(event: any) {
    const input = parseFloat(event.target.value);

    if (this.firstCurrency !== "UAH" && this.secondCurrency === "UAH") {
      this.defaultMoneyOut = +((input / this.rates[this.firstCurrency]) * this.rates[this.secondCurrency]).toFixed(2);
    } else if (this.firstCurrency === "UAH" && this.secondCurrency !== "UAH") {
      this.defaultMoneyOut = +((input * this.rates[this.secondCurrency]).toFixed(2));
    } else {
      this.defaultMoneyOut = +((input / this.rates[this.firstCurrency]) * this.rates[this.secondCurrency]).toFixed(2);
    }

    this.emitChanges();
  }

  handleSecondInput(event: any) {
    const input = parseFloat(event.target.value);

    if (this.firstCurrency !== "UAH" && this.secondCurrency === "UAH") {
      this.defaultMoney = +((input / this.rates[this.secondCurrency]) * this.rates[this.firstCurrency]).toFixed(2);
    } else if (this.firstCurrency === "UAH" && this.secondCurrency !== "UAH") {
      this.defaultMoney = +((input / this.rates[this.secondCurrency]).toFixed(2));
    } else {
      this.defaultMoney = +((input / this.rates[this.secondCurrency]) * this.rates[this.firstCurrency]).toFixed(2);
    }

    this.emitChanges();
  }

  switchCurrencies() {
    const temp = this.firstCurrency;
    this.firstCurrency = this.secondCurrency;
    this.secondCurrency = temp;
    this.defaultMoneyOut = +(this.defaultMoney / this.rates[this.firstCurrency] * this.rates[this.secondCurrency]).toFixed(2);
    if (this.firstCurrency === "UAH" && this.secondCurrency !== "UAH") {
      this.defaultMoneyOut = +((this.defaultMoney * this.rates[this.secondCurrency]).toFixed(2));
    }

    this.emitChanges();
  }

  private emitChanges() {
    this.firstCurrencyChange.emit(this.firstCurrency);
    this.secondCurrencyChange.emit(this.secondCurrency);
    this.defaultMoneyChange.emit(this.defaultMoney);
    this.defaultMoneyOutChange.emit(this.defaultMoneyOut);
  }
}
