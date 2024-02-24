import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculateLatLngService } from 'src/app/services/calculate-lat-lng.service';
import { HttpService } from 'src/app/services/http.service';
import { IGuess } from 'src/interfaces/IGuess';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('img') img!: ElementRef;
  form!: FormGroup;
  currentCountry!: any;
  attempts=0;
  answer!: string;

  //user guesses
  guesses: IGuess[] = [];

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private calcDistance: CalculateLatLngService
  ){
    this.form = this.fb.group({
      userAnswer: ['', Validators.required]
    })
  };

  ngOnInit(): void{
    this.fetchApi();
  }

  fetchApi(){
    this.httpService.getAllCountries().subscribe((data: any) =>{
      this.currentCountry = data[Math.floor(Math.random()*194)]
      this.answer = this.currentCountry.translations.por.common
      .toLowerCase()
      console.log(this.answer)
    })
  }

  fetchSpecificCountry(userAnswer: string){
    this.httpService.getSpecificCountry(userAnswer).subscribe((data: any) =>{
      console.log(data[0]);
      this.guesses.push({
        countryName: userAnswer,
        distanceInKm: this.calcDistance.calculateKm(
          data[0].latlng[0], 
          data[0].latlng[1],
          this.currentCountry.latlng[0],
          this.currentCountry.latlng[1]
          ),
        directionTo: 'k'
      })
    })
  }
  
  onSubmit(){
    if(this.form.value.userAnswer.length < 3) return;
    if(this.form.value.userAnswer.toLowerCase() === this.answer.toLowerCase()){
      this.img.nativeElement.style.opacity=0
      this.fetchApi();
      this.attempts=0;
      this.guesses = [];
    }else {
      this.attempts++;
      this.fetchSpecificCountry(this.form.value.userAnswer)
    }
    
    if(this.attempts==3){
      this.img.nativeElement.src = this.currentCountry.flags.png;
      this.img.nativeElement.style.opacity=1
    }
  
    this.form.reset();
  }
}
