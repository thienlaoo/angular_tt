import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Rates {
  [key: string]: number;
}
@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeService {
  private apiUrl = 'https://api.monobank.ua/bank/currency';

  constructor(private http: HttpClient) {}
  getExchangeRates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  extractRates(data: any[]): Rates {
    const tempCurrencies = data.slice(3, 7).map(item => item.rateCross);
    return ["UAH", "GBP", "CHF", "CNY", "AUD"].reduce((acc, code, index) => {
      acc[code] = index === 0 ? 1 : tempCurrencies[index - 1];
      return acc;
    }, {} as Rates);
  }
}
