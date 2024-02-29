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

  createUser(body: IUser){
    return this.http.post('http://localhost:5000/user', body)
  }

  increaseScore(){
    return this.http.get('http://localhost:5000/user', { withCredentials: true })
  }

  getScore(){
    return this.http.get('http://localhost:5000/user/score');
  }
}
