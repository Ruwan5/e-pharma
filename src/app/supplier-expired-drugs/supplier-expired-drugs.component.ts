import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { expired_drugs_model } from "../expired-drugs/expired_drugs_model.model"; // reused the expired drugs model
import {SupplierPendingResolvePopupComponent} from "../supplier-pending-resolve-popup/supplier-pending-resolve-popup.component";
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-supplier-expired-drugs',
  templateUrl: './supplier-expired-drugs.component.html',
  styleUrls: ['./supplier-expired-drugs.component.scss']
})
export class SupplierExpiredDrugsComponent implements OnInit {
  uidnew;
  list: expired_drugs_model[];
  constructor(private afs: AngularFirestore,private dialog : MatDialog) { 
    
    this.uidnew = localStorage.getItem('uid');
    console.log(this.uidnew)

  }

  ngOnInit() {

    //this.afs.collection('damaged',ref=>ref.where('supplier_resolve','==','False').where('supplier_id','==',this.uidnew)).snapshotChanges().subscribe(res=>{
    this.afs.collection('damaged',ref=>ref.where('supplier_resolve','==','False')).snapshotChanges().subscribe(res=>{
      console.log(res)
      this.list = res.map( a =>{
        return{
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        } as unknown as expired_drugs_model
      })
    })

  }

mark(id){
  console.log(id)
  this.afs.collection("damaged").doc(id).update({supplier_resolve:"True"})
}
  
view(){
  
  const dialogconfig = new MatDialogConfig;
  dialogconfig.disableClose = true;
  dialogconfig.autoFocus = true;
  dialogconfig.width = "65%";
  dialogconfig.height = "65%";
  dialogconfig.data = {
    
  }
  this.dialog.open(SupplierPendingResolvePopupComponent, dialogconfig);
  console.log("pending resolves popup loaded");
}


}
