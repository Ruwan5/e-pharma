import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Users} from '../core/user.model'
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

 public registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 

  uusers: Users[];

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}
   
   ngOnInit() {
    this.userForm();
    this.userService.getUser().subscribe(data => {
      this.uusers = data.map(e => {
        return {
      
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Users;
      })
    });
    
   }

   userForm(){
    this.registerForm = this.fb.group({
      'FirstName': ['', Validators.required],
      'LastName': ['',Validators.required ],
      'Address': ['', Validators.required],
      'email': ['', Validators.required ],
      'password': ['',Validators.required],
      'Telephone': ['', Validators.required],
      'UserType': ['', Validators.required],
      'registered': ['false']
      
    })
   }

   submitUserData() {
    
     this.userService.insertUser(this.registerForm.value);
      
   } 

   tryRegister(value){
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";

       this.successMessage = "Your account has been created";
       this.toastr.success(this.successMessage, '',{
        timeOut:3000,
          positionClass: 'toast-top-center',
      });

     }, err => {
       console.log(err);
       this.errorMessage = err.message;

       this.toastr.error(this.errorMessage, '',{
        timeOut:3000,
          positionClass: 'toast-bottom-center',
      });

     });
   }

}


