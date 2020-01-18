import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { navItems } from '../_nav';
import { Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})


export class AdminComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;
   onlineUser: Array<any>;
   unregisteredUsers: Array<any>;
  

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
    public router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(){

    this.userService.getOnlineUsers().subscribe(data => {  //retrive online users
      this.onlineUser = data
      console.log(this.onlineUser)
    })

    this.userService.getUnregisteredUsers().subscribe(res=>{
      this.unregisteredUsers = res
      console.log(this.unregisteredUsers)
    })
  
    
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        console.log(data)
        this.user = data;
        
      }
    })
  }

  
  editUser() {
      this.router.navigate(['/edit-user']);
  }


  verifyAccount(id){
    console.log(id)
    this.userService.setIsRegistered(id);
    this.toastr.success('User verified successfully!', '',{
      timeOut:3000,
        positionClass: 'toast-top-center',
    });
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
