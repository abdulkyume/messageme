import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile_name!: any;
  user_info!: any;
  s_user_info!: {};
  friends = [];
  constructor(
    private apiservice: ApiService, 
    private router: Router,
    private ngzone: NgZone,) {}

  ngOnInit(): void {
    this.user_info = localStorage.getItem('ulc');
    let usermail = this.user_info.split(',');
    let userinfo = { "email": usermail[0] }
    this.apiservice.getprofile(userinfo).subscribe((data) => {
      this.setinfo(data);
    });
    this.apiservice.getfriends(userinfo).subscribe((data) => {
      this.apiservice.showfriends(JSON.parse(JSON.stringify(data))[0].friends).subscribe((data) => {
        this.friends = JSON.parse(JSON.stringify(data));
      });
    });
  }

  showprofile(fid:any){
    console.log(fid)
    
  }

  sendmessage(fid:any){
    this.ngzone.run(() => this.router.navigateByUrl('/messages',{state:{_id:fid}}))
  }
  deletefriend(fid:any){
    console.log(fid)
  }

  setinfo(data: any) {
    this.s_user_info = data;
    let inf = JSON.parse(JSON.stringify(this.s_user_info));
    this.profile_name = inf[0]['username'];
  }
  logout(){
    localStorage.clear();
    this.ngzone.run(() => this.router.navigateByUrl('/login'))
  }

}
