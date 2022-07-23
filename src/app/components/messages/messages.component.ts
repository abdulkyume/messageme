import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  demo_name="demo name"
  demo_message="demo message";
  constructor(private route:ActivatedRoute,private location:Location) { }

  ngOnInit(): void {
    if(history.state){
      console.log(true)
    }
    else{
      console.log(false)
    }
    console.log(history.state._id);
  }

}
