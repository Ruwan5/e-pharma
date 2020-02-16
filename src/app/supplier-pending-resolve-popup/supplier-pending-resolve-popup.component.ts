import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { expired_drugs_model } from "../expired-drugs/expired_drugs_model.model"; // reused the expired drugs model

@Component({
  selector: 'app-supplier-pending-resolve-popup',
  templateUrl: './supplier-pending-resolve-popup.component.html',
  styleUrls: ['./supplier-pending-resolve-popup.component.scss']
})
export class SupplierPendingResolvePopupComponent implements OnInit {
  list: expired_drugs_model[];
  constructor(public dialogbox:MatDialogRef<SupplierPendingResolvePopupComponent>,private afs:AngularFirestore) { }

  ngOnInit() {

    this.afs.collection('damaged',ref=>ref.where('supplier_resolve','==','True')).snapshotChanges().subscribe(res=>{
      console.log(res)
      this.list = res.map( a =>{
        return{
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        } as unknown as expired_drugs_model
      })
    })

  }


  onClose(){
    this.dialogbox.close();
    
  }




  }

  


