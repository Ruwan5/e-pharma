import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class OrderlistService {
  

  constructor(private db: AngularFirestore) { }

  getdruglist(){
    return this.db.collection('drugs').snapshotChanges();
  }

  
  getdrug(id: string){
    return this.db.collection('drugs').doc(id).valueChanges();
  }

  addtoCart(array: any){
    console.log("working");
    return this.db.collection('cart').add(array);
  }

}
