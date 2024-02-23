import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry } from 'src/interfaces/ICountry';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getCountriesApi(){
    return this.http.get('https://restcountries.com/v3.1/independent?status=true&&fields=capital,region,translations,latlng,flags');
  }
}
