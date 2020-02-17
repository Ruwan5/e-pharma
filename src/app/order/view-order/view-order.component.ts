import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../core/order.service";

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  pharmacyid: string;
  list1: any;

  constructor(private service: OrderService) { }

  ngOnInit() {
    this.pharmacyid = localStorage.getItem("pharmacyid");
    console.log(this.pharmacyid);
    this.service.vieworder(this.pharmacyid).snapshotChanges().subscribe(result=>{
      console.log("ha" + result)
      this.list1 = result.map( a => {
        return{
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        }
      })
    })
  }

}
