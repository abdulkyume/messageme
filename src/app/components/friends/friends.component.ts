import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friend_name = 'demo friend'
  friends = [];
  user_info!: any;
  
  constructor(
    private apiservice: ApiService, 
    private router: Router,
    private ngzone: NgZone,
  ) { }

  ngOnInit(): void {
    this.user_info = localStorage.getItem('ulc');
    let usermail = this.user_info.split(',');
    let userinfo = { "email": usermail[0] }
    this.apiservice.getfriends(userinfo).subscribe((data) => {
      this.apiservice.showfriends(JSON.parse(JSON.stringify(data))[0].friends).subscribe((data) => {
        this.friends = JSON.parse(JSON.stringify(data));
      });
    });
  }

}
