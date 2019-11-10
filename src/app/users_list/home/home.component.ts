import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service'
import { Router, Params } from '@angular/router';
import { from } from 'rxjs';
import { Users } from '../../core/user.model';
import {ShowUserComponent} from '../show-user/show-user.component'
import { resolve } from 'url';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   items: Array<any>;
  

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.firebaseService.getPeople().then(result => {
      this.items = result;
    });
  }

  viewDetails(item: Users) {
     return new Promise<{}>((resolve) => {
        this.firebaseService.getInfo(item).then(data => { 
            console.log(data);
            resolve(data);
            this.router.navigate(['/show_user']);
            
        }
      )
   })
  }
}