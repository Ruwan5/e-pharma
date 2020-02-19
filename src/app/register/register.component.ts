import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Users} from '../core/user.model'
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if(matchingControl.errors && !matchingControl.errors.MustMatch) {
      //return if another validator has already found
      return;
    }

    //set error on matchingControl if validation fails

    if(control.value !== matchingControl.value){
      matchingControl.setErrors({ MustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  }

}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

// custom validor to check password and comfirm passwords fields



export class RegisterComponent implements OnInit{

 public registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  submitted = false; 
 

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

   // gets easy fields from the form
   get f() {
     return this.registerForm.controls;
   }

   userForm(){
    this.registerForm = this.fb.group({
      'FirstName': ['', Validators.required],
      'LastName': ['',Validators.required ],
      'Address': ['', Validators.required],
      'email': ['', [Validators.required , Validators.email]],
      'password': ['',[Validators.required, Validators.minLength(6)]],
      'ConfrmPassword': ['', Validators.required],
      'Telephone': ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]],
      'UserType': ['', Validators.required],
      'registered': ['false']  
    }, {
      validator: MustMatch('password', 'ConfrmPassword')
    });
   }

   

   submitUserData() {
     this.submitted = true;

      // stop here if form is invalid
     if(this.registerForm.invalid){
       return;
     }
    
     this.userService.insertUser(this.registerForm.value);
     this.tryRegister(this.registerForm.value);
     this.ResetForm();
      
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

   ResetForm() {
     this.submitted = false; 
     this.registerForm.reset();
   }

}


