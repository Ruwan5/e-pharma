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

  getPeople(){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/users').snapshotChanges().subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

  getInfo(usr: Users) {
    return new Promise<{}>((resolve, reject) => {   // Promise<{}> should be added to pass an object as a parameter of resolve function 
    var db = firebase.firestore();
    db.collection("users").where("email", "==", usr.email)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        console.log(doc.id, " => ", doc.data());
        var data = doc.data();
        return resolve(data);
       
      });
    }).catch(function(error) {
      console.log("Error getting documents: ", error);
    });
    })
      
  }


}
