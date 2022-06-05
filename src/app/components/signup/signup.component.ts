import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  userForm !: FormGroup;

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
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get myForm() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    }
    else {
      return this.apiservice.createuser(this.userForm.value).subscribe({
        complete: () => {
          console.log('User Created'),
            this.ngzone.run(() => this.router.navigateByUrl('/login'));
        },
        error: (e: any) => {
          console.log(e);
        }
      });
    }
  }
}
