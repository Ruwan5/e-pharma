import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service'
import { Router, Params } from '@angular/router';
import { from } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   items: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.firebaseService.getPeople().then(result => {
      this.items = result;
    });
  
}
}
