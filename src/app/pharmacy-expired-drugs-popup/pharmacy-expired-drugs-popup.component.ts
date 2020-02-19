import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {inventory_drugs_model } from '../pharmacy-expired-drugs-popup/inventory_drugs_model.model';
import { AngularFirestore} from "@angular/fire/firestore";
import * as moment from "moment"; // to get current date

@Component({
  selector: 'app-pharmacy-expired-drugs-popup',
  templateUrl: './pharmacy-expired-drugs-popup.component.html',
  styleUrls: ['./pharmacy-expired-drugs-popup.component.scss']
})
export class PharmacyExpiredDrugsPopupComponent implements OnInit {
  list: inventory_drugs_model[];
  uidnew;
  myDate = new Date();

  constructor(private afs: AngularFirestore,public dialogbox:MatDialogRef<PharmacyExpiredDrugsPopupComponent>) {
    this.uidnew = localStorage.getItem('uid');
    
    
   }

  ngOnInit() {
    this.afs.collection("users").doc(this.uidnew).collection("Inventory",ref=>ref.where('expiration_date','<=',"2020-02-19")).snapshotChanges().subscribe(res=>{
      console.log(res)
      this.list = res.map( a =>{
        return{
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        } as unknown as inventory_drugs_model
      })
    })

  }

  onClose(){
    this.dialogbox.close();
    
  }

  report(id,local_id,name,stock,supplier,supplier_name){

    this.afs.collection("damaged").add({
      drug_id: local_id,                                  //local_id
      pharmacy_id: this.uidnew,                           //set the current user id as the pharmacy id 
      qty:stock,                                          //stock
      remarks:"Expired TSET",                             // automatically set the remark as expired
      supplier_id: supplier,
      supplier_name: supplier_name,
      supplier_notify: "yes",
      supplier_resolve: "False",                         //initially supplier has not resolved the post
      name: name,
      pharmacy_name:localStorage.getItem("pharName"),    //set the current user name as the pharmacist name
      inventory_id:id,                                   //add the inventory id to the damaged collection.
    })

    this.afs.collection("users").doc(this.uidnew).collection("Inventory").doc(id).update({exp_flag:"yes"});    //set the flag as yes then the report button will be disabled

    
    

  }

}
