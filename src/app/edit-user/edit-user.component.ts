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
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
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
  submitted = false;

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
    this.submitted = true;

    // stop here if form is invalid
    if(this.editForm.invalid){
      return;
    }

    this.userService.getCurrentUserId().then( data => {
      console.log(data);
      this.userService.updateUser(data, value);

      this.toastr.success('The admin profile has been successfully updated!', '',{
        timeOut:3000,
          positionClass: 'toast-top-center',
      });

      this.router.navigate(['/admin_dashboard']);
    })
    

  }

  // getters easy from the fields
  get f(){
    return this.editForm.controls;
  }

  editUser() {
    this.router.navigate(['/edit-user-dealer']);
}

  createForm() {
    this.editForm = this.fb.group({
      FirstName: [this.item.FirstName, Validators.required],
      LastName: [this.item.LastName, Validators.required],
      Address: [this.item.Address, Validators.required],
      email: [this.item.email, Validators.required],
      password: [this.item.password, [ Validators.required, Validators.minLength(6)]],
      Telephone: [this.item.Telephone, [ Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      UserType: [this.item.UserType, Validators.required]
    })
  }

  ResetForm() {
    this.submitted = false;
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
