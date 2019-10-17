import { Injectable} from "@angular/core";
import {} from 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Users} from '../core/user.model'

@Injectable()
export class UserService{

  constructor(
   public afAuth: AngularFireAuth,
   private firestore: AngularFirestore
  
   ){}
  
  getUser() {
    return this.firestore.collection('users').snapshotChanges();
  }

  insertUser(user: Users){
    return this.firestore.collection('users').add(user);
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
