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
      this.img.nativeElement.src = this.currentCountry.flags.png;
      this.img.nativeElement.style.display='none'
      console.log(this.answer)
    })
  }
  
  onSubmit(){
    if(this.form.value.userAnswer.toLowerCase() === this.answer.toLowerCase()){
      console.log('nice')
    }
  }
}
