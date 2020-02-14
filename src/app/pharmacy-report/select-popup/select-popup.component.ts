import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { PharmacyReportModel } from "../pharmacy-report-model.model"; 


@Component({
  selector: 'app-select-popup',
  templateUrl: './select-popup.component.html',
  styleUrls: ['./select-popup.component.scss']
})

export class SelectPopupComponent implements OnInit {
  uidnew;
  name = this.data.abc;
  id = this.data.id;
  list: PharmacyReportModel[];
  
  constructor(public dialogbox: MatDialogRef<SelectPopupComponent> , @Inject(MAT_DIALOG_DATA) public data: any ,private afs: AngularFirestore) {
    this.uidnew = localStorage.getItem('uid');
   }

  

  ngOnInit() {
    console.log(this.id)
    console.log(this.name)

    this.afs.collection('users').doc(this.uidnew).collection('Inventory').snapshotChanges().subscribe(res => {
      console.log(res)
      this.list = res.map( a=> {
        return{
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        } as unknown as PharmacyReportModel
      }
      )
    })
    console.log("list=> " + this.list)
  }
  onClose(){
    this.dialogbox.close();
    
  }

}
