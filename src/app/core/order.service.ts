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
    return this.afs.collection('drugs').snapshotChanges(); //retrive posted drug lists order component
  }
  getDrug(id: string) {
    return this.afs.doc<any>('drugs/' + id).valueChanges(); //get drug details by passing id view component
  }
  // test() {
  //   return this.afs.collection('drugs');
  // }
  addtocart(id: string) {
    return this.afs.collection('orders').doc(id); //for add to cart in cart component
  }
  viewcart(id: string) {
    return this.afs.collection('orders', ref => ref.where('pharmacy_id', '==', id).where('isOrder', '==', 0)); //view cart in cart component
  }
  vieworder(id: string) {
    return this.afs.collection('orders', ref => ref.where('pharmacy_id', '==', id).where('isOrder', '==', 1)); //view in order component
  }
  vieworderdealer(id: string) {
    return this.afs.collection('orders', ref => ref.where('dealer_id', '==', id).where('isOrder', '==', 1)); // show orders to dealers
  }

  getusername(id: string) {
    return this.afs.doc<any>('users/' + id).valueChanges(); // get usr name by passing own id in view component
  }
  getpharmacyid(email: string) {
    return this.afs.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }
  getCurrentUserId() { // check whether emais in all document and corrosponding document id return
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

  AddInventory(inventory: Inventory, id: string) {
    return this.afs.collection('users').doc(id).collection('Inventory').add(inventory);
  }

}
