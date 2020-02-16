import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service'
import { Router, Params } from '@angular/router';
import { Users } from '../../core/user.model';
import {ShowUserComponent} from '../show-user/show-user.component'
import { resolve } from 'url';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../../core/auth.service';
import { Location } from '@angular/common';
import { FirebaseUserModel } from '../../core/user.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, combineLatest  } from 'rxjs';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   items: Array<any>;
   searchitem;
   searchterm: string;
   results: any;
   user: FirebaseUserModel = new FirebaseUserModel();

   startAt = new Subject();
   endAt = new Subject();

   startobs = this.startAt.asObservable();
   endobs = this.endAt.asObservable();

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public authService: AuthService,
    private location : Location,
    private route: ActivatedRoute,
    private afs: AngularFirestore

  ) {  }

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
    
      combineLatest(this.startobs, this.endobs).subscribe((value) =>{
      this.firequery(value[0], value[1]).subscribe((results) =>{
        this.searchitem = results;
        console.log(this.searchitem)
      })
    })
    
  }

  search($event){
    let q = $event.target.value;
    console.log(q)
    if(q != ''){
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
      this.searchitem = this.items;
    }
  }

  firequery(start, end) {
    return this.afs.collection('users', ref => ref.limit(4).orderBy('FirstName').startAt(start).endAt(end)).valueChanges();
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