import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import {FirebaseService } from '../users_list/firebase.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import {UserService} from '../core/user.service';
import { from } from 'rxjs';
import * as firebase from 'firebase/app';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-edit-user-dealer',
  templateUrl: './edit-user-dealer.component.html',
  styleUrls: ['./edit-user-dealer.component.scss']
})
export class EditUserDealerComponent implements OnInit {

  editForm = new FormGroup({
    FirstName: new FormControl(),
    LastName: new FormControl(),
    Address: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    Telephone: new FormControl(),
    UserType: new FormControl()
  });
  
  item: any;

  validation_messages = {
    'FirstName': [
      { type: 'required', message: 'Name is required.' }
    ],
    'LastName': [
      { type: 'required', message: 'Surname is required.' }
    ]
  };

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,  
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public authService: AuthService,
    private location : Location,
    public userService: UserService,
    private http: HttpClient
  ) { }


  ngOnInit() {
    
    
    this.userService.getUserDetails().then(res => {
      this.item = res; 
      this.item.FirstName;
      this.item.LastName;
      this.createForm();
    });
        
  }

  onSubmit(value) {
    
    this.userService.getCurrentUserId().then( data => {
      console.log(data);
      this.userService.updateUser(data, value);
      this.userService.updateCurrentUser(value);
      this.router.navigate(['/dealer_dashboard']);
    })
    

  }

  createForm() {
    this.editForm = this.fb.group({
      FirstName: [this.item.FirstName, Validators.required],
      LastName: [this.item.LastName, Validators.required],
      Address: [this.item.Address, Validators.required],
      email: [this.item.email, Validators.required],
      password: [this.item.password, Validators.required],
      Telephone: [this.item.Telephone, Validators.required],
      UserType: [this.item.UserType, Validators.required]
    })
  }
  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0]; 
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('https://us-central1-epharma-3593a.cloudfunctions.net/helloWorld',fd, {
      reportProgress: true,
      observe: 'events'
    } )
    .subscribe( event => {
      console.log(event); 
    })
  }



  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))
  }

  ResetForm() {
    this.editForm.reset();

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
