import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.component.html',
  styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent implements OnInit {
  user_info!: any;
  friendrequest!: any;
  friendrequest_li!: any;
  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    this.user_info = localStorage.getItem('ulc');
    let usermail = this.user_info.split(',');
    let userinfo = { "email": usermail[0] }
    this.apiservice.getfriendreq(userinfo).subscribe((data) => {
      this.setinfo2(data);
    });
  }

  setinfo2(data: any) {
    this.friendrequest = JSON.parse(JSON.stringify(data))[0]['friendsreqs'];
    this.apiservice.getfriendreqprofile(this.friendrequest).subscribe((data) => {
      this.getfriendlist(JSON.parse(JSON.stringify(data)));
    });
  }
  getfriendlist(data: any) {
    this.friendrequest_li = data;
  }
  acceptfriend(dataa: any) {
    this.user_info = localStorage.getItem('ulc');
    let usermail = this.user_info.split(',');
    let userinfo = usermail[0];
    this.apiservice.acceptfrend(userinfo, dataa).subscribe((data) => {
      if (JSON.parse(JSON.stringify(data))['acknowledged']) {
        this.apiservice.deleteafteradd(userinfo, dataa).subscribe((data) => {
          if (JSON.parse(JSON.stringify(data))['acknowledged']) {
            this.friendrequest_li = this.friendrequest_li.filter((data: any) => data._id != dataa)
          }
        });
      }
    });
  }
  deletefriend(dataa: any) {
    this.user_info = localStorage.getItem('ulc');
    let usermail = this.user_info.split(',');
    let userinfo = usermail[0];
    this.apiservice.deletefrendreq(userinfo, dataa).subscribe((data) => {
      if (JSON.parse(JSON.stringify(data))['acknowledged']) {
        this.friendrequest_li = this.friendrequest_li.filter((data: any) => data._id != dataa)
      }
    });
  }
}
