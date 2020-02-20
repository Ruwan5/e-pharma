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
  
  pending: boolean;

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
      this.list.forEach(element => {
        console.log(element["pending"])
        this.pending = element["pending"];

      });
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
    dialogconfig.height = "60%";
    dialogconfig.width = "30%";
    dialogconfig.data = {
      id: id
    }
    this.dialog.open(FormComponent, dialogconfig);
  }

}
