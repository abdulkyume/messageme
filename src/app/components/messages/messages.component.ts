import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { MsgService } from 'src/services/msg.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  demo_name = "demo name"
  demo_message = "demo message";
  user_info!: any;
  udata: any;
  constructor(
    private apiservice: ApiService,
    private msgservice: MsgService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.user_info = localStorage.getItem('ulc');
    let usermail = this.user_info.split(',');
    let userinfo = { "email": usermail[0] }
    if (history.state._id != undefined) {
      this.apiservice.getprofile(userinfo).subscribe((data) => {
        this.udata = data;
        let found = this.udata[0].friends.find((element:any) => element == `${history.state._id}`)
        if(found!=undefined){
          this.msgservice.showmsg(userinfo).subscribe((data) => {
            console.log(data)
          });
        }
        else{}
      });
    }
    else {
      console.log(false)
    }
  }
}
