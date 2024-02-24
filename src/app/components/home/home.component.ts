import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArrowsService } from 'src/app/services/arrows.service';
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

  suggestedCountries: string[] = []
  allCountries: string[] = [];

  errorClass: boolean = false;
  //user guesses
  guesses: IGuess[] = [];

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private calcDistance: CalculateLatLngService,
    private arrowsService: ArrowsService
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
      this.allCountries = data.map((k: any) => k.translations.por.common);

      this.currentCountry = data[Math.floor(Math.random()*194)]
      this.answer = this.currentCountry.translations.por.common
      .toLowerCase()
      console.log(this.answer)
    })
  }

  fetchSpecificCountry(userAnswer: string){
    this.httpService.getSpecificCountry(userAnswer).subscribe((data: any) =>{
      this.guesses.push({
        countryName: userAnswer,
        distanceInKm: this.calcDistance.calculateKm(
          data[0].latlng[0], 
          data[0].latlng[1],
          this.currentCountry.latlng[0],
          this.currentCountry.latlng[1]
          ),
        directionTo: this.arrowsService.determineArrows(data[0].latlng, this.currentCountry.latlng)
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
      if(this.allCountries.includes( this.capitalizeWord(this.form.value.userAnswer ))){
        this.errorClass = false;
        this.attempts++;
        this.fetchSpecificCountry(this.capitalizeWord( this.form.value.userAnswer ))
      } else
        this.errorClass = true;
    }
    
    if(this.attempts==4){
      this.img.nativeElement.src = this.currentCountry.flags.png;
      this.img.nativeElement.style.opacity=1
    }
  
    this.form.reset();
  }

  onInput(){
   this.suggestedCountries = this.allCountries.filter(country =>{
    return country.toLowerCase().includes(this.form.value.userAnswer.toLowerCase());
   })
  }

  capitalizeWord(value: string){
    let words = value.split(' ');

    if(words.length===1){
      return value[0].toUpperCase() + value.slice(1).toLowerCase();
    }

    words = words.map(word =>{
      if(word.length===1) return word
      return word[0].toUpperCase() + word.slice(1).toLowerCase()
    })

    return words.join(' ')
  }
}
