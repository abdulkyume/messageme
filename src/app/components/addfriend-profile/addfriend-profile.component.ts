import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addfriend-profile',
  templateUrl: './addfriend-profile.component.html',
  styleUrls: ['./addfriend-profile.component.css']
})
export class AddfriendProfileComponent implements OnInit {
  user!:any;
  user_info!:any;
  s_user_info!:any;
  friend_name!:any;
  profile_id!:any;

  constructor(private apiservice:ApiService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.user_info = localStorage.getItem('ulc');
    let usermail = this.user_info.split(',');
    let userinfo = { "email": usermail[0] }
    let profile_id = this.route.snapshot.paramMap.get('id');
    this.apiservice.getprofile(userinfo).subscribe((data) => {
      this.setinfo2(data);
    });
    this.apiservice.getaddprofile(profile_id).subscribe((data) => {
      this.setinfo(data);
    });
  }

  setinfo2(data: any) {
    this.s_user_info = data;
    let inf = JSON.parse(JSON.stringify(this.s_user_info));
    this.profile_id = inf[0]['_id'];
  }

  setinfo(data:any){
    this.user = JSON.parse(JSON.stringify(data))[0];
  }

  addfriend(data:any){
    this.apiservice.addfriend(this.profile_id, data).subscribe((data) => console.log(data));
  }

}
