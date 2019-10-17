import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
// import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {Userinterface} from '../core/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

 public registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  //new
  // uusers: Userinterface[];

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}
   
   ngOnInit() {
    this.userForm();
    // this.userService.getUserList();

    // this.userService.getUser().subscribe(data => {
    //   this.uusers = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as Userinterface;
    //   })
    // });
    
   }

   userForm(){
    this.registerForm = this.fb.group({
      'FirstName': ['', Validators.required],
      'Address': ['', Validators.required],
      'email': ['', Validators.required ],
      'password': ['',Validators.required],
      'Telephone': ['', Validators.required],
      'UserType': ['', Validators.required],
    })
   }

   submitUserData() {
    
     this.userService.insertUser(this.registerForm.value);
      
   } 
   
//   submitUserData(user: Userinterface){
//     this.userService.insertUser(user);

// }

   tryRegister(value){
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     });
   }

}


