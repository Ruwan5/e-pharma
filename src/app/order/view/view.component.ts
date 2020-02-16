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
  uid: string;
  dealer: string;


  brandName: string;
  actIngreName: string;
  excipientName: string;
  actIngreOtherName: string;
  actIngreShortName: string;
  number: Number;
  unit: string;
  formula: string;
  drugPart: string;
  color: string;
  form: string;
  smell: string;
  taste: string;
  usage: string;
  price: number;
  userid: string;


  constructor(private service: OrderService, private authfire: AngularFireAuth, public dialogbox: MatDialogRef<ViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.uid = this.authfire.auth.currentUser.uid;
    this.service.getDrug(this.id).subscribe(res => {
      this.brandName = res.brandName;
      this.actIngreName = res.actIngreName;
      this.excipientName = res.excipientName;
      this.actIngreOtherName = res.actIngreOtherName;
      this.actIngreShortName = res.actIngreShortName;
      this.number = res.number;
      this.unit = res.unit;
      this.formula = res.formula;
      this.drugPart = res.drugPart;
      this.color = res.color;
      this.form = res.form;
      this.smell = res.smell;
      this.taste = res.taste;
      this.usage = res.usage;
      this.price = res.price;
      this.userid = res.userid;
      console.log(res.userid)
      this.delername(res.userid);


    })

  }

  ngOnInit() {

  }
  onClose() {
    this.dialogbox.close();
  }
  delername(id: string) {
    console.log(id)
    this.service.getusername(id).subscribe(res =>{
      this.dealer = res["FirstName"] +" "+ res["LastName"];
      console.log(res+"=>"+this.dealer)
    })
    
  }


  onAdd() {
    if (this.counterValue>0) {
      this.service.addtocart(this.uid, this.id).set({
        'brandName': this.brandName,
        'actIngreName': this.actIngreName,
        'excipientName': this.excipientName,
        'actIngreOtherName': this.actIngreOtherName,
        'actIngreShortName': this.actIngreShortName,
        'number': this.number,
        'unit': this.unit,
        'formula': this.formula,
        'drugPart': this.drugPart,
        'color': this.color,
        'form': this.form,
        'smell': this.smell,
        'taste': this.taste,
        'usage': this.usage,
        'price': this.price,
        'userid': this.userid,
        'quantity': this.counterValue,
        'unit_total': this.unitTot(),
      }).then(_ => {
        alert("inserted");
      });
      console.log(this.counterValue)
      this.onClose();
    } else {
      console.error();
      alert("Enter Quantity");
      
    }
    
  }
  counterValue = 0;

  get counter() {
    return this.counterValue;
  }

  set counter(value) {
    this.counterValue = value;
  }

  decrement() {
    this.counter--;
  }

  increment() {
    this.counter++;
  }
  unitTot(){
    return this.counterValue*this.price;
  }

}
