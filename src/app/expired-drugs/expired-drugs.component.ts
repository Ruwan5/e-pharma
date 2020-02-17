import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/firestore";
import { expired_drugs_model } from "./expired_drugs_model.model";
import {AddDamagedPopupComponent} from "../add-damaged-popup/add-damaged-popup.component";
import {UpdateDamagedPopupComponent} from "../update-damaged-popup/update-damaged-popup.component";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expired-drugs',
  templateUrl: './expired-drugs.component.html',
  styleUrls: ['./expired-drugs.component.scss']
})

export class ExpiredDrugsComponent implements OnInit {



  uidnew;
  list: expired_drugs_model[];
  
  constructor(private afs: AngularFirestore,private dialog : MatDialog, private toastr: ToastrService) {
    
    this.uidnew = localStorage.getItem('uid');
    console.log(this.uidnew)

   }

  

  ngOnInit() {

    // this.afs.collection('users').doc(this.uidnew).collection('Inventory').snapshotChanges().subscribe(res => {
    //   console.log(res)
    //   this.list = res.map( a=> {
    //     return{
    //       id: a.payload.doc.id,
    //       ...a.payload.doc.data()
    //     } as unknown as expired_drugs_model
    //   }
    //   )
    // })
    this.afs.collection('damaged',ref=>ref.where('pharmacy_id','==',this.uidnew)).snapshotChanges().subscribe(res=>{
      console.log(res)
      this.list = res.map( a =>{
        return{
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        } as unknown as expired_drugs_model
      })
    })

  }

  view(){
    const dialogconfig = new MatDialogConfig;
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "45%";
    dialogconfig.height = "65%";
    dialogconfig.data = {
  
    }
    this.dialog.open(AddDamagedPopupComponent, dialogconfig);
    console.log("hiii");
  }

  update(id: string){

    localStorage.setItem("damageId",id);
    const dialogconfig = new MatDialogConfig;
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "45%";
    dialogconfig.height = "65%";
    dialogconfig.data = {
      id:id
    }
    this.dialog.open(UpdateDamagedPopupComponent, dialogconfig);
    console.log("update popup loaded");
  }

  delete(id){
    this.afs.collection("damaged").doc(id).delete();

    this.toastr.success('Successfully Resolved!', '',{
      timeOut:2500,
        positionClass: 'toast-top-center',
    });
  }

}


