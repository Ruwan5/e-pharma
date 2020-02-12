import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import {FirebaseService } from '../firebase.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { HomeComponent} from '../home/home.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { User } from 'firebase';
import { Users } from 'src/app/core/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr




@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent  {

  
  
  FirstName: any;
  LastName: any;
  Address: any;
  email: any;
  id: any;
  UserType: any;
  Telephone: any;
  item: any;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,  
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authService: AuthService,
    private location : Location,
    private toastr: ToastrService,  // Toastr service for alert message

    
    ) { }

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

  delete(){
    this.firebaseService.deleteUser(this.id)
    .then(
      res => {
        this.router.navigate(['/user_list']);

        this.toastr.success('The user has been successfully deleted!',null,{
          timeOut:4000,
            positionClass: 'toast-top-center',
        });
      }
    )
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

