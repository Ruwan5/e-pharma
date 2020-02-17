import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

@Component({
  selector: 'app-update-damaged-popup',
  templateUrl: './update-damaged-popup.component.html',
  styleUrls: ['./update-damaged-popup.component.scss']
})
export class UpdateDamagedPopupComponent implements OnInit {

  
  private drugDoc : AngularFirestoreDocument<drug>;
  drugData : Observable<drug>;
  finalDrugData : drug = {
    drug_id : null,
  pharmacy_id :null,
  qty: null,
  remarks : null,
  supplier_id :null,
  supplier_name:null,
  supplier_notify:null,
  supplier_resolve:null,
  }
  ;

  constructor(public dialogbox:MatDialogRef<UpdateDamagedPopupComponent>,private afs:AngularFirestore,private toastr: ToastrService) {
    let id = localStorage.getItem("damageId");
    console.log(id);
    this.drugDoc = afs.doc<drug>("damaged/"+id);
    this.drugData = this.afs.collection("damaged").doc<drug>(id).valueChanges();
   }

  ngOnInit() {
    //console.log(localStorage.getItem("damageId"));
    this.drugData.subscribe(res=>{
      // console.log(res);
      this.finalDrugData = res;
      console.log(this.finalDrugData);
    });

  }

  onClose(){
    this.dialogbox.close();
    
  }

  onSubmit(){
    let id = localStorage.getItem("damageId");

    this.afs.collection("damaged").doc(id).update(this.finalDrugData);
    this.dialogbox.close();


    this.toastr.success('Successfully updated!', '',{
      timeOut:2500,
        positionClass: 'toast-top-center',
    });
  }



}

export interface drug {
  drug_id : string;
  pharmacy_id :string;
  qty: number;
  remarks : string;
  supplier_id :string;
  supplier_name:string;
  supplier_notify:string;
  supplier_resolve:string;
} 


