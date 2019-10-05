import { Injectable, OnInit } from "@angular/core";
import {} from 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Userinterface} from '../core/user'

@Injectable()
export class UserService{

  userListOb: AngularFireObject<any>;
  userList: AngularFireList<any>;

  
  public db: AngularFireDatabase
  constructor(
   public afAuth: AngularFireAuth,
   
   ){}
  


  insertUser(user: Userinterface){
    this.userList.push({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Address: user.Address,
      email: user.email,
      password: user.password,
      Telephone: user.Telephone,
      UserType: user.UserType
    });
  }

  getUser(id: string){
    this.userListOb = this.db.object('users' + id);
    return this.userListOb;
  }

  getUserList(){
    this.userList= this.db.list('users');
    return this.userList;
  }



  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
}
