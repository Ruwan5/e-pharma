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
    batch_number: new FormControl(),
    local_id: new FormControl(),
    
    

  });
  pharmacyid :string;
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
      batch_number: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      local_id: [''],

      userid: [this.item, Validators.required]

    })
  }

  ResetForm() {
    this.inventoryForm.reset();
  }

  get batch_number() {
    return this.inventoryForm.get('batch_number');
  }
  get local_id() {
    return this.inventoryForm.get('local_id');
  }


  

  // submitInventoryData() {
  //   this.service.AddInventory(this.inventoryForm.value, this.pharmacyid); // Submit Inventory data using CRUD API
  //   this.toastr.success('The drug has been successfully posted!',null,{
  //     timeOut:3000,
  //       positionClass: 'toast-top-center',
  //   });
  
  //   this.ResetForm();  // Reset form when clicked on reset button
  
    
    
  //  };

  click1(){
    this.toastr.success('The Order has been successfully deliverd!',null,{
          timeOut:3000,
            positionClass: 'toast-top-center',
        });
        this.ResetForm();
        this.dialogbox.close();
  }

}
