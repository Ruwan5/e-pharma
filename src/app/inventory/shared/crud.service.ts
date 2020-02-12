import { Injectable } from '@angular/core';
import { Inventory } from '../shared/inventory';  // inventory data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { AngularFirestore } from '@angular/fire/firestore';
import {UserService } from '../../core/user.service'
import { from, Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { promise } from 'protractor';
import { resolve } from 'url';
import { reject } from 'q';
// import { userInfo } from 'os';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  res:any
  result:any
  inventorysRef: AngularFireList<any>;    // Reference to inventory data list, its an Observable
  inventoryRef: AngularFireObject<any>;   // Reference to inventory object, its an Observable too
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase,
              private firestore: AngularFirestore,
              public userService: UserService) { }

    
   // Create Inventory
   AddInventory(inventory: Inventory) {

    return this.firestore.collection('drugs').add(inventory);
  }

  // Fetch Single inventory Object
  GetInventory(id: string) {
    this.inventoryRef = this.db.object('inventory-list/' + id);
    return this.inventoryRef;
  }

  getInventory(){
         return this.firestore.collection('drugs').snapshotChanges();

  }

  getCurrentUserId() {
    return new Promise<any>((resolve,reject) => {
      var db = firebase.firestore();
      var user = firebase.auth().currentUser;
      var userEmail = user.email;
      db.collection('users').where("email", "==", userEmail)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
          var data = doc.data();
          resolve(doc.id);
        })
      })
    })
  }

  // getReleventDrugs(id){   

  //   return new Promise<any>((resolve, reject) => {   // get the drugs that each user has been posted separatly
  //     var afs = firebase.firestore();
  //     afs.collection('drugs').where("userid", "==", id).get().then(function(querySnapshot){
  //       querySnapshot.forEach(function(doc){
  //         var data = doc.data();
  //         // console.log(data)
  //         var array:any = [];
  //         console.log(data)
  //         array.push(data)
  //         console.log(array)
        
  //         resolve(array);
  //       })
  //     })
  //   })
   
  // }

  getReleventDrugs(id){   
      return this.firestore.collection('drugs', ref=> ref.where("userid", "==", id)).snapshotChanges();
   
  }
  
  getDrugDetails(drugKey){  // get relavant drug details
    return this.firestore.collection('drugs').doc(drugKey).snapshotChanges();
  }


  // Fetch Inventory List
  GetInventoryList() {
    
     return this.firestore.collection('drugs').snapshotChanges();
  
  }  


 



  // Update Inventory Object
  UpdateInventory(inventory: Inventory) {
    this.inventoryRef.update({
      brandName: inventory. brandName,
      actIngreName: inventory. actIngreName,
      excipientName: inventory.excipientName,
      actIngreOtherName: inventory.actIngreOtherName,
      actIngreShortName: inventory. actIngreShortName,
      number: inventory.number,
      unit: inventory.unit,
      formula: inventory.formula,
      drugPart: inventory.drugPart,
      color: inventory.color,
      form: inventory.form,
      smell: inventory.smell,
      taste: inventory.taste,
      usage: inventory.usage,
      price: inventory.price,
      userid: inventory.userid
    })
  }  

  // Delete Inventory Object
  DeleteInventory(id: string) { 
    this.inventoryRef = this.db.object('inventory-list/'+id);
    this.inventoryRef.remove();
  }

  deleteDrug(drugKey){
    
    return this.firestore.collection('drugs').doc(drugKey).delete();
  }

  
}
