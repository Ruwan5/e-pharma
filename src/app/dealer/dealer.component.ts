import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { Router, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss']
})
export class DealerComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    public router: Router,
    public firestore: AngularFirestore

  ) {
  
  }

  ngOnInit(): void {
    
    this.userService.checkVerifyEmail();
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
        
        this.userService.isLoggedIn();
      }
    })
  }

  editUser() {
    this.router.navigate(['/edit-user-dealer']);
}

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }

  loggedOut(){
    var user = firebase.auth().currentUser;
    var userEmail = user.email;
    console.log(userEmail)
    this.userService.isLoggedOut(userEmail);                                                                                                                                                                                                                                                                                             
      
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
