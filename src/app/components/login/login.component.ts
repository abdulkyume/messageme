import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm !: FormGroup;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private ngzone:NgZone
    ) {
      this.mainForm();
     }

  ngOnInit(): void {
  }

  mainForm(){
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password:['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$')]],
      checkbox:['', [Validators.required]]
    });
  }

  get myForm(){
    return this.loginForm.controls;
  }

  onSubmit():any{
    console.log(this.loginForm.value);
    this.submitted = true;
    if(!this.loginForm.valid){
      return false;
    }
  }
}
