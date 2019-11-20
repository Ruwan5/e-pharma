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

  constructor( private afs: AngularFirestore) { 
  
  }

  getPeople(userKey){
    return this.afs.collection('users').doc(userKey).snapshotChanges();
  }

  getUsers(){
    return this.afs.collection('users').snapshotChanges();
  }

  searchUsersByAge(value){
    return this.afs.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

  searchUsers(searchValue){
    return this.afs.collection('users',ref => ref.where('nameToSerach', '>=', searchValue)
    .where('nameToSearch', '<=', searchValue + '\uf8ff'))
    .snapshotChanges()
  }


  deleteUser(userKey){
    return this.afs.collection('users').doc(userKey).delete();
  }

}
