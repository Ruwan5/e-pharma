import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { navItems } from '../_nav';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;
   onlineUser: Array<any>;
  

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    public router: Router
  ) {

  }

  ngOnInit(){

    this.userService.getOnlineUsers().subscribe(data => {  //retrive online users
      this.onlineUser = data
      console.log(this.onlineUser)
    })
  
    
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        
      }
    })
  }

  
  editUser() {
      this.router.navigate(['/edit-user']);
  }

  



  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      // this.router.navigate(['/login']);
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
