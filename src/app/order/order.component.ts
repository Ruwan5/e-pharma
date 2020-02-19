import { Component, OnInit } from '@angular/core';
import { OrderService } from "../core/order.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ViewComponent } from "./view/view.component";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  list: any;

  constructor(private service: OrderService, private dialog: MatDialog) {
    
   }

  ngOnInit() {
    this.service.getdruglist().subscribe(res => {
      this.list = res.map(drug => {
        return {
          id: drug.payload.doc.id,
          ...drug.payload.doc.data()
        }
      })
    })
  }

  view(id: string) {
    const dialogconfig = new MatDialogConfig;
    dialogconfig.height = "80%";
    dialogconfig.width = "40%";
    dialogconfig.data = {
      id: id
    }
    this.dialog.open(ViewComponent, dialogconfig);
  }

}
