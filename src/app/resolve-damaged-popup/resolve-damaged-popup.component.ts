import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resolve-damaged-popup',
  templateUrl: './resolve-damaged-popup.component.html',
  styleUrls: ['./resolve-damaged-popup.component.scss']
})
export class ResolveDamagedPopupComponent implements OnInit {
  uidnew;
  private drugDoc : AngularFirestoreDocument<drug>;     // Create an AngularFirestoreDocument reference object
  drugData : Observable<drug>;                          // Create an observable from the drug document with 'drug' interface
  
  finalDrugData : drug = {                              // create the model object from the 'drug' interface
  batch_number : null,
  exp_flag :null,
  expiration_date: null,
  global_id : null,
  last_added :null,
  local_id:null,
  name:null,
  number:null,
  stock:null,
  supplier:null,
  supplier_name:null,
  threshold:null,
  unit:null,
  unit_price:null,
  };

  constructor(public dialogbox:MatDialogRef<ResolveDamagedPopupComponent>,private afs:AngularFirestore,private toastr: ToastrService) {
    let id = localStorage.getItem("inventoryId"); 
    this.uidnew = localStorage.getItem('uid');          
    console.log(id);
    this.drugDoc = afs.collection("users").doc(this.uidnew).collection("Inventory").doc<drug>("Inventory"+id);                                    // Set the values of the object with the relevent document of the damaged collection
    // set the observable
    this.drugData = this.afs.collection("users").doc(this.uidnew).collection("Inventory").doc<drug>(id).valueChanges(); 
   }

  ngOnInit() {
    // Subscribe the drugData observable
    this.drugData.subscribe(res=>{                     
      
    // Set the returned query result to finalDrugData model
    this.finalDrugData = res;                          
    console.log(this.finalDrugData);
    });
  }

  onClose(){
    this.dialogbox.close();
    
  }

  update(){

    // Get the selected collection id from the local storage
    let inventory_id = localStorage.getItem("inventoryId");       
    this.uidnew = localStorage.getItem('uid'); 
    // Get the damaged id
    let damaged_id = localStorage.getItem("damageId");            

    // Update the document with the data of finalDrugData model
    this.afs.collection("users").doc(this.uidnew).collection("Inventory").doc(inventory_id).update(this.finalDrugData);  
    this.dialogbox.close();

  
    //find the id of the drug in the inventorry and update the exp_flag as 'no'
    this.afs.collection("users").doc(this.uidnew).collection("Inventory").doc(inventory_id).update({exp_flag:"no"});


    //removing from the damaged collection
    this.afs.collection("damaged").doc(damaged_id).delete();

    this.toastr.success('Successfully resolved!', '',{
      timeOut:2500,
        positionClass: 'toast-top-center',
    });

  }

}

// Create a model interface 'drug'
export interface drug {                                                            
  batch_number : string;
  exp_flag :string;
  expiration_date: string;
  global_id : string;
  last_added :string;
  local_id:string;
  name:string;
  number:string;
  stock:number;
  supplier:string;
  supplier_name:string;
  threshold:number;
  unit:number;
  unit_price:number;
} 
