import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Inject } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pending-resolve-pharmacy-details-popup',
  templateUrl: './pending-resolve-pharmacy-details-popup.component.html',
  styleUrls: ['./pending-resolve-pharmacy-details-popup.component.scss']
})
export class PendingResolvePharmacyDetailsPopupComponent implements OnInit {
 
  private userDoc : AngularFirestoreDocument<user>;
  userData : Observable<user>;
  finalUserData : user = {
    Address : null,
  FirstName :null,
  LastName :null,
  Telephone: null,
  UserType : null,
  email :null,
  loggedIn:null,
  password:null,
  registered:null,
  }
  ;

  constructor(public dialogbox:MatDialogRef<PendingResolvePharmacyDetailsPopupComponent>,private afs:AngularFirestore) { 
    
    let id = localStorage.getItem("damageId");
    console.log("THIS IS ID")
    console.log(id);

    this.afs.collection("damaged").doc(id).valueChanges().subscribe(val=>{
      console.log(val);
      console.log("THIS IS PHARMACY ID")
      console.log(val["pharmacy_id"])
      localStorage.setItem("pharmacyId",val["pharmacy_id"]);
    })
    
    let userId=localStorage.getItem("pharmacyId");
    console.log("THIS IS USER Pharmacy ID")
    console.log(userId) 
    
    this.userDoc = afs.doc<user>("users/"+userId);
    this.userData = this.afs.collection("users").doc<user>(userId).valueChanges();
  }

  ngOnInit() {
   
    //console.log(localStorage.getItem("damageId"));
    this.userData.subscribe(res=>{
      // console.log(res);
      this.finalUserData = res;
      console.log(this.finalUserData);
    });
    
    
  }

  onClose(){
    this.dialogbox.close();
    
  }

  
}

export interface user {
  Address : string;
  FirstName :string;
  LastName :string;
  Telephone: number;
  UserType : string;
  email :string;
  loggedIn:string;
  password:string;
  registered:string;
} 
