import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../core/order.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ViewDetailsComponent } from "../view-order/view-details/view-details.component";
import { FormComponent } from "../cart/form/form.component";

@Component({
  selector: 'app-dealer-order',
  templateUrl: './dealer-order.component.html',
  styleUrls: ['./dealer-order.component.scss']
})
export class DealerOrderComponent implements OnInit {

  dealerId: string;
  list: any;
  list1;

  constructor(private service: OrderService, private dialog: MatDialog) { 
   }



  ngOnInit() {
    this.getdealerId()
    this.dealerId = localStorage.getItem("dealerid");
    localStorage.clear();
    console.log(this.dealerId);
    this.service.vieworderdealer(this.dealerId).snapshotChanges().subscribe(result => {

      console.log("mmm" + result)
      this.list = result.map(a => {
        return {
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        }
      })
    })
  }
  getdealerId() {
    this.service.getCurrentUserId().then(data => {
      this.dealerId = data;
      console.log(this.dealerId)
      localStorage.setItem("dealerid",this.dealerId);
    })
  }

  viewDetails(id:string){
    const dialogconfig = new MatDialogConfig;
    dialogconfig.height = "40%";
    dialogconfig.width = "40%";
    dialogconfig.data = {
      id: id
    }
    this.dialog.open(FormComponent, dialogconfig);
  }

}
