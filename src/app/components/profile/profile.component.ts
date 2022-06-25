import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { User } from 'src/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile_name!: any;
  user_info!: any;
  friend_name = 'as';
  s_user_info!: {};
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.user_info = localStorage.getItem('ulc');
    let usermail = this.user_info.split(',');
    let userinfo = { "email": usermail[0] }
    this.apiservice.getprofile(userinfo).subscribe((data) => {
      this.setinfo(data);
    });
    this.apiservice.getfriends(userinfo).subscribe((data) => {
      this.setinfo2(data);
    });
  }

  setinfo(data: any) {
    this.s_user_info = data;
    let inf = JSON.parse(JSON.stringify(this.s_user_info));
    this.profile_name = inf[0]['username'];
  }

}
