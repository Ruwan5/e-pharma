import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { Router, Params } from '@angular/router';
import * as firebase from 'firebase/app';



@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})
export class UserComponent implements OnInit{

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    

    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        console.log(this.user);
        this.createForm(this.user.name);
        this.userService.isLoggedIn();
      }
    })
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {``
      console.log(res);
    }, err => console.log(err))
  }

  editUser() {
    this.router.navigate(['/edit-user-pharmacist']);
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

  viewUserDetails(item){
    this.router.navigate(['/edit-user/'+ item.payload.doc.id]);
  }
}
