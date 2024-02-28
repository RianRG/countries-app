import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/interfaces/IUser';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAllCountries(){
    return this.http.get('https://restcountries.com/v3.1/independent?status=true&&fields=capital,region,translations,latlng,flags');
  }

  getSpecificCountry(value: string){
    return this.http.get(`https://restcountries.com/v3.1/translation/${value}?fields=latlng,translations`)
  }

  getCountriesWhenTyping(value: string){
    return this.http.get(`https://restcountries.com/v3.1/translation/${value}?fields=translations,independent`);
  }

  createUser(body: IUser){
    return this.http.post('http://localhost:5000/user', body)
  }
}
