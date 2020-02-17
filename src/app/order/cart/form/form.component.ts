import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from "../../../core/order.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  inventoryForm = new FormGroup({
    expdate: new FormControl(),
    batchno: new FormControl(),
    orderdate: new FormControl(),

  });

  item: any

  constructor(public dialogbox: MatDialogRef<FormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    private toastr: ToastrService,
    public service: OrderService
    ) { }

  ngOnInit() {
    console.log(this.data.listdata)
  }
  inventorForm() {
    console.log(this.item)
    this.inventoryForm = this.fb.group({
      expdate: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      batchno: [''],
      orderdate: [''],

      userid: [this.item, Validators.required]

    })
  }

  ResetForm() {
    this.inventoryForm.reset();
  }

  get expdate() {
    return this.inventoryForm.get('expdate');
  }
  get batchno() {
    return this.inventoryForm.get('batchno');
  }
  get orderdate() {
    return this.inventoryForm.get('orderdate');
  } 

  submitInventoryData() {
    this.service.AddInventory(this.inventoryForm.value); // Submit Inventory data using CRUD API
    this.toastr.success('The drug has been successfully posted!',null,{
      timeOut:3000,
        positionClass: 'toast-top-center',
    });
  
    this.ResetForm();  // Reset form when clicked on reset button
  
    
    
   };

}
