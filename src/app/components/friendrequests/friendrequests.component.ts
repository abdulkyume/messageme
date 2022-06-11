import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.component.html',
  styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent implements OnInit {
  user_info!:any;
  friendrequest!:any;
  constructor(private apiservice:ApiService) { }

  ngOnInit(): void {
    this.user_info = localStorage.getItem('ulc');
    let usermail = this.user_info.split(',');
    let userinfo = { "email": usermail[0] }
    this.apiservice.getfriendreq(userinfo).subscribe((data) => {
      this.setinfo2(data);
    });
  }

  setinfo2(data:any){}

}
