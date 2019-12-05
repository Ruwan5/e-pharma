import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/auth.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { 
    authService;
  }

  ngOnInit() {
  }

}
