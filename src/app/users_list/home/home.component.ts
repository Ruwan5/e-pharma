import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service'
import { Router, Params } from '@angular/router';
import { from } from 'rxjs';
import { Users } from '../../core/user.model';
import {ShowUserComponent} from '../show-user/show-user.component'
import { resolve } from 'url';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../../core/auth.service';
import { Location } from '@angular/common';
import { FirebaseUserModel } from '../../core/user.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   items: Array<any>;
   searchValue: string = "";
   results: any;
   user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public authService: AuthService,
    private location : Location,
    private route: ActivatedRoute,
    private afs: AngularFirestore

  ) { }

  ngOnInit() {
    this.getData();

    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        console.log(this.user)
        
      }
    })
  }

  viewDetails(item){
    this.router.navigate(['/show_user/'+ item.payload.doc.id]);
  }

  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
      console.log(result);
    })
  }

  

  // searchByName(){
  //   let value = this.searchValue.toLowerCase();
  //   this.firebaseService.searchUsers(value)
  //   .subscribe(result => {
  //     this.name_filtered_items = result;
  //   })
  // }

  search(){    //search users 
    let self = this;
    self.results = self.afs.collection('users', ref => ref
    .orderBy("FirstName")
    .startAt(self.searchValue.toLowerCase())
    .endAt(self.searchValue.toLowerCase()+"\uf8ff")
    .limit(10))
    .valueChanges();
    console.log(self.results)
  }


  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}