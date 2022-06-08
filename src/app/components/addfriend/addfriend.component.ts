import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/model/user';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.component.html',
  styleUrls: ['./addfriend.component.css']
})
export class AddfriendComponent implements OnInit {

  users!: any;

  constructor(private apiservice: ApiService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.apiservice.searchHeroes(term).subscribe((data)=>console.log(data));
  }

  ngOnInit(): void {
  }

}
