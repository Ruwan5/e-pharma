import { Injectable } from '@angular/core';
import {} from 'rxjs/add/operator/toPromise';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Users } from '../core/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // searchValue: string = "";
  // results: any;

  constructor( public afs: AngularFirestore) { 
  
  }

  getPeople(userKey){
    return this.afs.collection('users').doc(userKey).snapshotChanges();
  }

  getUsers(){
    return this.afs.collection('users').snapshotChanges();
  }

  // searchUsers(){
  //   let self = this;
  //   self.results = self.afs.collection('users', ref => ref
  //   .orderBy("firstName")
  //   .startAt(self.searchValue.toLowerCase())
  //   .endAt(self.searchValue.toLowerCase()+"\uf8ff")
  //   .limit(10))
  //   .valueChanges();
  // }


  deleteUser(userKey){
    return this.afs.collection('users').doc(userKey).delete();
  }

}
