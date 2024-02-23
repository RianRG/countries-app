import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
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
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      userAnswer: ['', Validators.required]
    })
  };

  ngOnInit(): void{
    this.fetchApi();
  }

  fetchApi(){
    this.httpService.getCountriesApi().subscribe((data: any) =>{
      this.currentCountry = data[Math.floor(Math.random()*194)]
      this.answer = this.currentCountry.translations.por.common
      .toLowerCase()
      console.log(this.answer)
    })
  }
  
  onSubmit(){
    if(this.form.value.userAnswer.toLowerCase() === this.answer.toLowerCase()){
      this.fetchApi();
      this.attempts=0;
      this.img.nativeElement.style.opacity=0
    }else 
      this.attempts++;
    
    if(this.attempts==3){
      this.img.nativeElement.src = this.currentCountry.flags.png;
      this.img.nativeElement.style.opacity=1
    }
  
    this.form.reset();
  }
}
