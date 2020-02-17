import { Component, OnInit } from '@angular/core';
import { OrderService } from "src/app/core/order.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ViewComponent } from '../view/view.component';
import { FormComponent } from "../cart/form/form.component";
import { ToastrService } from "ngx-toastr";



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  pharmacyid: string;
  list: any;

  constructor(private service: OrderService,private toastr: ToastrService, private dialog: MatDialog, private Authfire: AngularFireAuth, private afs: AngularFirestore) {
    
    
  }

  ngOnInit() {
    this.pharmacyid = localStorage.getItem("pharmacyid");
    console.log(this.pharmacyid);
    this.service.viewcart(this.pharmacyid).snapshotChanges().subscribe(result=>{
      console.log("hammohh" + result)
      this.list = result.map( a => {
        return{
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        }
      })
    })
    // this.service.viewcart(this.usrid).snapshotChanges().subscribe(result => {
    //   console.log(result);
    //   this.list = result.map(drgs => {
    //     return {
    //       id: drgs.payload.doc.id,
    //       ...drgs.payload.doc.data()
    //     }
    //   })

    // })
  }

  delete_(id: string) {
    console.log(id)
    this.afs.collection("orders").doc(id).delete().then(function () {
      console.log("Document successfully deleted!")
      
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    this.toastr.success('Successfully Deleted!',null,{
      timeOut:3000,
        positionClass: 'toast-top-center',
    });
  }

  edit_(id: string) {
    console.log(id)
    const dialogconfig = new MatDialogConfig;
    dialogconfig.height = "80%";
    dialogconfig.width = "60%";
    dialogconfig.data = {
      id: id
    }
    this.dialog.open(ViewComponent, dialogconfig);
  }

  buy1(){
    console.log(this.list)
    this.list.forEach(element => {
      this.afs.collection('orders').doc(element["id"]).update({isOrder:true})
    });
    this.toastr.success('Order Successfull',null,{
      timeOut:3000,
        positionClass: 'toast-top-center',
    });
  }

  // buy(){
  //   const dialogconfig = new MatDialogConfig;
  //   dialogconfig.height = "80%";
  //   dialogconfig.width = "40%";
  //   dialogconfig.data = {
  //     listdata:this.list
  //   }
  //   this.dialog.open(FormComponent, dialogconfig);
  // }
}