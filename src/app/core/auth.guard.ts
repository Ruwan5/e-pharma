import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../core/user.service';
import {AuthService} from '../core/auth.service'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    public authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        // if (this.authService.isLoggedIn !== true) {
        
        // }
        this.router.navigate(['/user']);

        
        return resolve(false);
      }, err => {
        return resolve(true);
      })
    })
  }

}
