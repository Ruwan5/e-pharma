import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from "../../core/order.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id = this.data.id;
  brandName: string;
  uid: string;


  constructor(private service: OrderService,private authfire:AngularFireAuth, public dialogbox: MatDialogRef<ViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.uid = this.authfire.auth.currentUser.uid;
    this.service.getDrug(this.id).subscribe(res => {
      this.brandName = res.brandName;
      console.log(this.brandName);
    })
    
  }

  ngOnInit() {
    
  }
   onClose(){
     this.dialogbox.close();
   }

   onAdd(){
    this.service.addtocart(this.uid).add({
      'brandName': this.brandName,
    }).then(_ => {
      alert("inserted");
    });
    this.onClose();
   }

}
