import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile_name!:any;
  user_info!:any;
  s_user_info!:any;
  constructor(private apiservice:ApiService) { }

  ngOnInit(): void {
    this.user_info = localStorage.getItem('ulc');
    let usermail = this.user_info.split(',');
    let userinfo = { "email": usermail[0] }
    this.apiservice.getprofile(userinfo).subscribe((data) => this.s_user_info = JSON.parse(JSON.stringify(data)));
    this.profile_name = this.s_user_info;
    console.log(this.s_user_info);
  }

}
