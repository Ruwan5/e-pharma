import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/firestore";
import { expired_drugs_model } from "./expired_drugs_model.model"; //data model
import {AddDamagedPopupComponent} from "../add-damaged-popup/add-damaged-popup.component";
import {UpdateDamagedPopupComponent} from "../update-damaged-popup/update-damaged-popup.component";
import {PharmacyExpiredDrugsPopupComponent} from "../pharmacy-expired-drugs-popup/pharmacy-expired-drugs-popup.component";
import {ResolveDamagedPopupComponent} from "../resolve-damaged-popup/resolve-damaged-popup.component";
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
    
    this.uidnew = localStorage.getItem('uid');   //Get the current user id of users collection from the user service
    console.log(this.uidnew)

   }

  

  ngOnInit() {

    //Initially corresponding drugs are shown in the table.
    //Firebase query for selecting damaged items of the current user
    this.afs.collection('damaged',ref=>ref.where('pharmacy_id','==',this.uidnew)).snapshotChanges().subscribe(res=>{
      console.log(res)
      this.list = res.map( a =>{
        return{
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        } as unknown as expired_drugs_model  // Return the query result with mapping through expired_drug_model
      })
    })

  }

  add(){
    const dialogconfig = new MatDialogConfig;
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "45%";
    dialogconfig.height = "65%";
    dialogconfig.data = {
  
    }
    this.dialog.open(AddDamagedPopupComponent, dialogconfig);
    console.log("Add damaged popup loaded");
  }

  view(id: string){

    localStorage.setItem("damageId",id);
    const dialogconfig = new MatDialogConfig;
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "75%";
    dialogconfig.height = "75%";
    dialogconfig.data = {
      id:id
    }
    this.dialog.open(PharmacyExpiredDrugsPopupComponent, dialogconfig);
    console.log("view expired popup loaded");
  }

  update(id: string){

    localStorage.setItem("damageId",id);                // Save the id of the post in damaged collection on browser memory
    const dialogconfig = new MatDialogConfig;           // It will be re used in the update popup component
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

  resolve(damaged_id,inventory_id){
    localStorage.setItem("damageId",damaged_id);
    localStorage.setItem("inventoryId",inventory_id);

    const dialogconfig = new MatDialogConfig;
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "45%";
    dialogconfig.height = "75%";
    dialogconfig.data = {
  
    }
    this.dialog.open(ResolveDamagedPopupComponent, dialogconfig);
    console.log("Resolve damaged popup loaded");



    
  }

}


