import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/auth.service'
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  userEmailAddres: string = ''
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.userEmailAddres = this.authService.userEmail
  }

}
