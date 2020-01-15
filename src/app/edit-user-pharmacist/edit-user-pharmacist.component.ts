import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {FirebaseService } from '../users_list/firebase.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import {UserService} from '../core/user.service';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-edit-user-pharmacist',
  templateUrl: './edit-user-pharmacist.component.html',
  styleUrls: ['./edit-user-pharmacist.component.scss']
})
export class EditUserPharmacistComponent implements OnInit {

  editForm = new FormGroup({
    FirstName: new FormControl(),
    LastName: new FormControl(),
    Address: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    Telephone: new FormControl(),
    UserType: new FormControl()
  });
  
  item: any;

  validation_messages = {
    'FirstName': [
      { type: 'required', message: 'Name is required.' }
    ],
    'LastName': [
      { type: 'required', message: 'Surname is required.' }
    ]
  };

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,  
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authService: AuthService,
    private location : Location,
    public userService: UserService,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    this.userService.getUserDetails().then(res => {
      this.item = res; 
      this.item.FirstName;
      this.item.LastName;
      this.createForm();
    });
    
    
  }

  onSubmit(value) {
    this.userService.getCurrentUserId().then( data => {
      console.log(data);
      this.userService.updateUser(data, value);

      this.toastr.success('The user profile has been successfully updated!', '',{
        timeOut:3000,
          positionClass: 'toast-top-center',
      });

      this.router.navigate(['/user']);
    })
  }

  createForm() {
    this.editForm = this.fb.group({
      FirstName: [this.item.FirstName, Validators.required],
      LastName: [this.item.LastName, Validators.required],
      Address: [this.item.Address, Validators.required],
      email: [this.item.email, Validators.required],
      password: [this.item.password, Validators.required],
      Telephone: [this.item.Telephone, Validators.required],
      UserType: [this.item.UserType, Validators.required]
    })
  }

  editUser() {
    this.router.navigate(['/edit-user-pharmacist']);
}

  ResetForm() {
    this.editForm.reset();

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
