import { Component, } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../core/user.service'
import { auth } from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';
  usertype: string = '';
  

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public userService: UserService
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
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
}
