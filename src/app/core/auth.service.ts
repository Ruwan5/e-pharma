import { Injectable, NgZone } from "@angular/core";
import {} from 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {auth} from 'firebase/app'
import { Router } from "@angular/router";
import {UserService} from '../core/user.service'
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr





@Injectable()
export class AuthService {

  constructor(
   public afAuth: AngularFireAuth,
   public router: Router,
   public userService: UserService,
   public firestore: AngularFirestore,
   private toastr: ToastrService
 ){}

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        
        resolve(res);  
        this.SendVerificationMail();
      }, err => reject(err))
    });
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      
      this.toastr.success('Password reset email sent, check your inbox', '',{
        timeOut:3000,
          positionClass: 'toast-top-center',
      });

    }).catch((error) => {

      this.toastr.error(error, '',{
        timeOut:3000,
          positionClass: 'toast-top-center',
      });
    })
  }

// send verificarion mail to veryfy the new user
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify']);
    })
  }

  doLogout(){
    
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        
        this.afAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }


}
