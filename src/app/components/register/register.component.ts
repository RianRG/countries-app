import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup
  errorClass!: boolean;
  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router
  ){
    this.registerForm = this.fb.group({
      nick: ['', Validators.required],
      password: ['', Validators.required]
    })
  };

  createUser(){
    const  { nick, password } = this.registerForm.value

    if(nick.length<5 || password.length<5){
      this.errorClass=true
      return;
    }
    else
      this.errorClass=false;

    this.http.createUser({
      nick,
      password
    }).subscribe(data =>{
      console.log(data)
    })
    this.registerForm.reset()

    this.router.navigate(['/home'])
  }
}
