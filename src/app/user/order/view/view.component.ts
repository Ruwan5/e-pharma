import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { OrderlistService } from "src/app/core/orderlist.service";
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  
  qty = 1;
  id = this.data.id;
  drug: any;
  
  constructor(private service: OrderlistService, public dialogbox: MatDialogRef<ViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    
    this.service.getdrug(this.id).subscribe(drugArray => {
      this.drug = drugArray;
      
    })
  }
  

  onClose() {
    this.dialogbox.close();
  }
  reduce() {
    if (this.qty > 1) {
      this.qty = this.qty - 1;
    }
  }
  increce() {
    this.qty = this.qty + 1;
    
  }

  onAdd() {
    this.service.addtoCart(this.drug);
    console.log(this.drug);
    this.onClose();
    
  }


}


