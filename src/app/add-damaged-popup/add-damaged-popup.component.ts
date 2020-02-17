import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { FormControl,FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";


@Component({
  selector: 'app-add-damaged-popup',
  templateUrl: './add-damaged-popup.component.html',
  styleUrls: ['./add-damaged-popup.component.scss']
})
export class AddDamagedPopupComponent implements OnInit {
  uidnew;
  pharmacy_name;
  
  form:FormGroup
  

  



  constructor(public dialogbox: MatDialogRef<AddDamagedPopupComponent> ,@Inject(MAT_DIALOG_DATA) public data: any,fb:FormBuilder ,private afs: AngularFirestore) {
    this.uidnew = localStorage.getItem('uid');
    this.form = fb.group({
      drugId: new FormControl(''),
      quantity: new FormControl(''),
      remarks: new FormControl(''),
    });
   }

   get dId()
   {
     return  this.form.get("drugId"); // local id from the form input
   }

   get qty()
   {
    return  this.form.get("quantity");

   }

   get Remarks()
   {
    return  this.form.get("remarks");

   }


   submit()
   { 
    var supp_id: string ;
    var supp_name: any; 
    var name: any;

    console.log("submit called")

     
     console.log(this.form.value);
     
    var dId = this.dId.value;
    var qty = this.qty.value;
    var Remarks = this.Remarks.value;
    // console.log(dId)

    this.afs.collection("users").doc(this.uidnew).valueChanges().subscribe(val=>{
      console.log(val);
        localStorage.setItem("pharName",val["FirstName"]);
      
    })

    this.afs.collection("users").doc(this.uidnew).collection("Inventory",ref=>ref.where('local_id','==',dId)).valueChanges().subscribe(val=>{
      console.log(val);
        val.forEach(element=>{
        supp_id=element["supplier"];
        supp_name=element["supplier_name"];
        name = element["name"];
        console.log("TEST")
        this.writeToDB(supp_id,supp_name,name);
        // console.log(supp_id)
       
       })
      
    })

      
    
 

   }

  ngOnInit() {
  }
  
  onClose(){
    this.dialogbox.close();
    
  }

  writeToDB(supp_id,supp_name,name){
        console.log(supp_id)
    var dId = this.dId.value;
    var qty = this.qty.value;
    var Remarks = this.Remarks.value;

    this.afs.collection("damaged").add({
      drug_id: dId,
      pharmacy_id: this.uidnew,
      qty:qty,
      remarks:Remarks,
      supplier_id: supp_id,
      supplier_name: supp_name,
      supplier_notify: "Test",
      supplier_resolve: "False",
      name: name,
      pharmacy_name:localStorage.getItem("pharName"),
    })

    this.dialogbox.close();
   }
}
