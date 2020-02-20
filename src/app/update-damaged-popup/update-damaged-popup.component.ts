import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-damaged-popup',
  templateUrl: './update-damaged-popup.component.html',
  styleUrls: ['./update-damaged-popup.component.scss']
})
export class UpdateDamagedPopupComponent implements OnInit {

  
  private drugDoc : AngularFirestoreDocument<drug>;            // Create an AngularFirestoreDocument object
  drugData : Observable<drug>;                                 // Create an observable from the drug document with 'drug' interface
  
  finalDrugData : drug = {                                     // Create a model from the 'drug' interface
    drug_id : null,
    pharmacy_id :null,
    qty: null,
    remarks : null,
    supplier_id :null,
    supplier_name:null,
    supplier_notify:null,
    supplier_resolve:null,
  };

  constructor(public dialogbox:MatDialogRef<UpdateDamagedPopupComponent>,private afs:AngularFirestore,private toastr: ToastrService) {
    let id = localStorage.getItem("damageId");                                       // Get the id of the selected post from the browser history
    console.log(id);
    this.drugDoc = afs.doc<drug>("damaged/"+id);                                     // Set the values of the object with the relevent document of the damaged collection
    this.drugData = this.afs.collection("damaged").doc<drug>(id).valueChanges();     
   }

  ngOnInit() {
    
    this.drugData.subscribe(res=>{
      
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


