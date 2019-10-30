import { Injectable } from '@angular/core';
import {} from 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
   private afs: AngularFirestore
  ) { 
   
  
  }

  getPeople(){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/users').snapshotChanges().subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
}
