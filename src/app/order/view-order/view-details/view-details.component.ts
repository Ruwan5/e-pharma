import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OrderService } from "../../../core/order.service";

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  constructor( private service: OrderService, public dialogbox: MatDialogRef<ViewDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogbox.close();
  }
  // delever(id: string){
  //   this.service.addtoInventory(id).add({
      
  //   })
  // }

}
