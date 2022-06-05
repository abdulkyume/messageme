import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm !: FormGroup;
  confirmed!:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngzone: NgZone,
    private apiservice: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
  }

  mainForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get myForm() {
    return this.loginForm.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    }
    else {
      this.apiservice.checklogin(this.loginForm.value).subscribe((data) => this.confirmed = data);
      if (this.confirmed?.length > 0) {
        console.log('Login Successfull');
        let ulc = this.confirmed[0]['email'] + "," + this.confirmed[0]['password'];
        localStorage.setItem('ulc',ulc)
        this.ngzone.run(() => this.router.navigateByUrl('/profile'))
      }
      else {
        console.log('error in log in enter again');
      }
    }

  }

}
