import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import { Inventory } from "../order/cart/inventory.model";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore, private authfire: AngularFireAuth) { }

  getdruglist() {
    return this.afs.collection('drugs').snapshotChanges();
  }
  getDrug(id: string) {
    return this.afs.doc<any>('drugs/' + id).valueChanges();
  }
  test() {
    return this.afs.collection('drugs');
  }
  addtocart(id: string) {
    return this.afs.collection('orders').doc(id);
  }
  viewcart(id: string) {
    return this.afs.collection('orders', ref => ref.where('pharmacy_id', '==', id).where('isOrder', '==', 0));
  }
  vieworder(id: string) {
    return this.afs.collection('orders', ref => ref.where('pharmacy_id', '==', id).where('isOrder', '==', 1));
  }
  vieworderdealer(id: string) {
    return this.afs.collection('orders', ref => ref.where('dealer_id', '==', id).where('isOrder', '==', 1));
  }

  getusername(id: string) {
    return this.afs.doc<any>('users/' + id).valueChanges();
  }
  getpharmacyid(email: string) {
    return this.afs.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }
  getCurrentUserId() {
    return new Promise<any>((resolve) => {
      var db = firebase.firestore();
      var userEmail = this.authfire.auth.currentUser.email;
      console.log(userEmail)
      db.collection('users').where("email", "==", userEmail)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            var data = doc.data();
            console.log(doc.id);
            resolve(doc.id);
          })
        })
    })
  }
  time() {
    return new Date();
  }

  AddInventory(inventory: Inventory, id: string) {

    //return this.afs.collection('orders1').add(inventory);
    return this.afs.collection('users').doc(id).collection('Inventory').add(inventory);
  }

}
