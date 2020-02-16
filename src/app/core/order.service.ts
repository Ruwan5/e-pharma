import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore) { }

  getdruglist() {
    return this.afs.collection('drugs').snapshotChanges();
  }
  getDrug(id: string) {
    return this.afs.doc<any>('drugs/' + id).valueChanges();
  }
  test(){
    return this.afs.collection('drugs');
  }
  addtocart(id1: string, id2:string) {
    return this.afs.collection('cart').doc(id1).collection('subcart').doc(id2);
  }
  viewcart(id: string){
    return this.afs.collection('cart').doc(id).collection('subcart');
  }

  getusername(id: string){
    return this.afs.doc<any>('users/' + id).valueChanges();
  }
}
