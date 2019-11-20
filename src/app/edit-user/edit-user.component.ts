import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {FirebaseService } from '../users_list/firebase.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,  
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authService: AuthService,
    private location : Location
  ) { }

  FirstName: any;
  LastName: any;
  Address: any;
  email: any;
  id: any;
  UserType: any;
  Telephone: any;
  item: any;

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        
        this.FirstName = data.payload.data().FirstName;
        this.LastName = data.payload.data().LastName;
        this.Address = data.payload.data().Address;
        this.email = data.payload.data().email;
        this.UserType = data.payload.data().UserType;
        this.id = data.payload.id;
        this.Telephone = data.payload.data().Telephone;
        console.log(this.id);
      }
    })
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
