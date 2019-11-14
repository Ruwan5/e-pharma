import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service'
import { Router, Params } from '@angular/router';
import { from } from 'rxjs';
import { Users } from '../../core/user.model';
import {ShowUserComponent} from '../show-user/show-user.component'
import { resolve } from 'url';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../../core/auth.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   items: Array<any>;
   searchValue: string = "";
   age_filtered_items: Array<any>;
   name_filtered_items: Array<any>
  

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public authService: AuthService,
    private location : Location
  ) { }

  ngOnInit() {
    this.getData();
  }


  // viewDetails(item: Users) {
  //    return new Promise<{}>((resolve) => {
  //       this.firebaseService.getInfo(item).then(data => { 
  //           console.log(data);
  //           resolve(data);
  //           this.router.navigate(['/show_user']);
            
  //       }
  //     )
  //  })
  // }

  viewDetails(item){
    this.router.navigate(['/show_user/'+ item.payload.doc.id]);
  }

  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
      console.log(result);
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
  }

  rangeChange(event){
    this.firebaseService.searchUsersByAge(event.value)
    .subscribe(result =>{
      this.age_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
    })
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    })
  }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
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