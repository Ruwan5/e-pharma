import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../core/user.service'
import { auth } from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth"
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr



@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent{

  loginForm: FormGroup;
  errorMessage: string = '';
  usertype: string = '';
  

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public userService: UserService,
    public afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    });
  }


  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      // var emailChecked = this.userService.checkVerifyEmail();
      // if (emailChecked == true) {
        

        this.userService.getUserType().then(res => {
        
          switch(res) {                                          //redirect to relevant dash baord
              case <any>'Pharmacist':
                this.router.navigate(['/user']);
                break;
              case <any>"Dealer":
                this.router.navigate(['/dealer_dashboard']);
                break;
              case <any>"Admin":
                this.router.navigate(['/admin_dashboard']);
                break;
            } 
  
        });
      // }
      // else {
      //   this.toastr.warning('You should verify your email address before sign in!', 'Check your email!',{
      //     timeOut:3000,
      //       positionClass: 'toast-bottom-center',
      //   });
      // } 
      
    }, err => {
      this.errorMessage = err.message;
      console.log(err);
      this.toastr.error(this.errorMessage, '',{
        timeOut:3000,
          positionClass: 'toast-bottom-center',
      });
      
    })
  }
}
