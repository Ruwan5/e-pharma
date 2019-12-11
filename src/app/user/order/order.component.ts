import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ViewComponent } from "./view/view.component";
import { OrderlistService } from "src/app/core/orderlist.service";
import { Orderlist } from "src/app/user/order/orderlist.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  list: Orderlist[];

  constructor(private dialog: MatDialog, private service: OrderlistService) { }

  ngOnInit() {
    this.service.getdruglist().subscribe(drugArray=> {
      this.list = drugArray.map(drgs => {
        return {
          id: drgs.payload.doc.id,
          ...drgs.payload.doc.data()
        } as Orderlist;
      })
    })
  }

  view(id: String){
    const dialogconfig = new MatDialogConfig; 
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "40%";
    dialogconfig.height = "60%";
    dialogconfig.data = {
      id: id
    }
    this.dialog.open(ViewComponent, dialogconfig);

  }

}
