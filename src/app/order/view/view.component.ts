import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from "../../core/order.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id = this.data.id;
  uid: string;
  dealer: string;
  pharmacyid: string;


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
  isOrder: boolean = false;


  constructor(private service: OrderService, private toastr: ToastrService, private authfire: AngularFireAuth, public dialogbox: MatDialogRef<ViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.uid = this.authfire.auth.currentUser.uid;
    

    this.service.getDrug(this.id).subscribe(res => {
      console.log('hisdfuh' + res)  
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
    this.getpharmacyid();

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

  getpharmacyid(){
     this.service.getCurrentUserId().then(data=> {
       this.pharmacyid = data;
       console.log(this.pharmacyid)
       localStorage.setItem("pharmacyid",this.pharmacyid);
     })
    
  }


  onAdd() {
    console.log(this.id)
    if (this.counterValue>0) {
      this.service.addtocart(this.id).set({  
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
        'dealer_id': this.userid,
        'quantity': this.counterValue,
        'globle_id': this.id,
        'pharmacy_id': this.pharmacyid,
        'isOrder': this.isOrder,
        'unit_total': this.unitTot(),
      })
      this.toastr.success('Successfully Inserted to the Cart!',null,{
        timeOut:3000,
          positionClass: 'toast-top-center',
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
