import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from "../../../core/order.service";
import { AngularFirestore } from "@angular/fire/firestore";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {


  inventoryForm = new FormGroup({
    batch_number: new FormControl(),
    local_id: new FormControl(),
    globle_id: new FormControl(),
    last_added: new FormControl(),
    name: new FormControl(),
    number: new FormControl(),
    unit: new FormControl(),
    stock: new FormControl(),
    supplier: new FormControl(),
    supplier_name: new FormControl(),
    threshold: new FormControl(),
    unit_price: new FormControl(),
    expire_date: new FormControl(),
  });

  pharmacy_id: string;
  isSubmit : boolean = false;


  globleid: string;
  name: string;
  number: number;
  unit: string;
  stock: number;
  supplier: string;
  supplier_name: string;
  threshold: string;
  unit_price: number;
  expiredate: string;


  constructor(public dialogbox: MatDialogRef<FormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    private toastr: ToastrService,
    public service: OrderService,
    private db: AngularFirestore
  ) {
    
    this.db.doc<any>('orders/' + this.data.id).valueChanges().subscribe(res => {
      console.log(res)
      this.pharmacy_id = res.pharmacy_id;
      //
      this.globleid = res.globle_id;
      this.name = res.actIngreName;
      this.number = res.number;
      this.unit = res.unit;
      this.stock = res.quantity;
      this.supplier = res.dealer_id;
      this.supplier_name = res.dealer;
      this.threshold = res.threshold;
      this.unit_price = res.price;
      this.expiredate = res.expire_date;
      console.log(this.supplier)
      this.inventorForm();

    })
    

  }

  ngOnInit() {


  }

  

  inventorForm() {
    console.log(this.data.id)
    this.inventoryForm = this.fb.group({
      batch_number: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(4),Validators.minLength(4)]],
      local_id: ['', [Validators.required,  Validators.pattern('^[0-9]+$'), Validators.maxLength(4),Validators.minLength(4)]],
      last_added: ['',[Validators.required, Validators.pattern('^[12]+[0-9]+[0-9]+[0-9]+[-]+[01]+[0-9]+[-]+[0123]+[0-9]+$'), Validators.maxLength(10)]],
      globle_id: [this.globleid, Validators.required],
      name: [this.name],
      number: [this.number],
      unit: [this.unit],
      stock: [this.stock],
      supplier: [this.supplier],
      supplier_name: [this.supplier_name],
      threshold: [this.threshold],
      unit_price: [this.unit_price],
      expire_date:[this.expiredate],


    })
   
  }

  get a() { return this.inventoryForm.controls}

  ResetForm() {
    this.inventoryForm.reset();
  }

  get batch_number() {
    return this.inventoryForm.get('batch_number');
  }
  get local_id() {
    return this.inventoryForm.get('local_id');
  }
  get globle_id() {
    return this.inventoryForm.get('globle_id');
  }
  get last_added() {
    return this.inventoryForm.get('last_added');
  }
  




  submitInventoryData() {
    this.isSubmit = true;
    console.log("1")

    if (this.inventoryForm.invalid) {
      return;
    }


    console.log("2")


    this.service.AddInventory(this.inventoryForm.value, this.pharmacy_id); // Submit Inventory data
    this.db.collection('orders').doc(this.data.id).update({pending:false});

    this.toastr.success('The drug has been successfully posted!', null, {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });

    this.ResetForm();  // Reset form when clicked on reset button
    this.dialogbox.close();


  };

}
