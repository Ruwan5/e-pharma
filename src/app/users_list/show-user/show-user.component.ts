import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import {FirebaseService } from '../firebase.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { HomeComponent} from '../home/home.component';
import { from } from 'rxjs';
import { User } from 'firebase';
import { Users } from 'src/app/core/user.model';


@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  
  
  items: Array<any>;
  hme: HomeComponent;
  usr: Users;
  

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,  
    
    ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.hme.viewDetails(this.usr).then(result => {
      console.log(result);
      
    });
    console.log("Ruwan");
  }

}

