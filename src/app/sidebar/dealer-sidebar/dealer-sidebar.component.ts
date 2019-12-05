import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { FirebaseUserModel } from '../../core/user.model';

@Component({
  selector: 'app-dealer-sidebar',
  templateUrl: './dealer-sidebar.component.html',
  styleUrls: ['./dealer-sidebar.component.scss']
})
export class DealerSidebarComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    })
  }

}
