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
  friend_name!:any;
  constructor(private apiservice:ApiService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let profile_id = this.route.snapshot.paramMap.get('id');
    this.apiservice.getaddprofile(profile_id).subscribe((data) => {
      this.setinfo(data);
    });
  }

  setinfo(data:any){
    this.user = JSON.parse(JSON.stringify(data))[0];
  }

  addfriend(data:any){
    console.log(data)
  }

}
