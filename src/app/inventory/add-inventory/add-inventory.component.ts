import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import {UserService} from '../../core/user.service';
import {drugInfo} from '../shared/inventory'


@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})


export class AddInventoryComponent implements OnInit {
  // public inventoryForm: FormGroup; 

  drugData = new drugInfo();

  // inventory: Inventory
  inventoryForm = new FormGroup({
    brandName: new FormControl(),
    actIngreName: new FormControl(),
    excipientName: new FormControl(),
    actIngreOtherName: new FormControl(),
    actIngreShortName: new FormControl(),
    number: new FormControl(),
    unit: new FormControl(),
    formula: new FormControl(),
    drugPart: new FormControl(),
    color: new FormControl(),
    form: new FormControl(),
    smell: new FormControl(),
    taste: new FormControl(),
    usage: new FormControl(),
    expire: new FormControl(),
    price: new FormControl(),
    userid: new FormControl(),
  });
   // Define FormGroup to inventory's form
   item: any
  
 
  constructor(
    public crudApi: CrudService,  // CRUD API services  
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    private toastr: ToastrService,  // Toastr service for alert message
    public userService: UserService,
    
  ) { 
    
  }

  ngOnInit() {
    
    this.crudApi.GetInventoryList();  // Call GetInventoryList() before main form is being called
    this.userService.getCurrentUserId().then( res => {
      
      this.item = res;
      this.inventorForm();
      console.log(this.item)
    });
     // Call drug form when component is ready 
     
  }



 //  Reactive inventory form
 inventorForm() {
   console.log(this.item)
  this.inventoryForm = this.fb.group({
    brandName:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    actIngreName:[''],
    excipientName: [''],
    actIngreOtherName:[''],
    actIngreShortName: [''],
    number:['',[ Validators.pattern('^[0-9]+$')]],
    unit:[''],
    formula:[''],
    drugPart:[''],
    color:[''],
    form: [''],
    smell: [''],
    taste: [''],
    usage: [''],
    expire:[''],
    price: [''],
    userid: [this.item, Validators.required]
   
  })  
}

//Accessing form control using getters
get brandName() {
  return this.inventoryForm.get('brandName');
}

get actIngreName() {
  return this.inventoryForm.get('actIngreName');
}

get excipientName() {
  return this.inventoryForm.get('excipientName');
}

get actIngreOtherName() {
  return this.inventoryForm.get('actIngreOtherName');
}



get actIngreShortName() {
  return this.inventoryForm.get('actIngreShortName');
}

get number() {
  return this.inventoryForm.get('number');
} 

get unit() {
  return this.inventoryForm.get('unit');
}

get formula() {
  return this.inventoryForm.get('formula');
}

get drugPart() {
  return this.inventoryForm.get('drugPart');
}

get color() {
  return this.inventoryForm.get('color');
}

get form() {
  return this.inventoryForm.get('form');
}

get smell() {
  return this.inventoryForm.get('smell');
}

get taste() {
  return this.inventoryForm.get('taste');
}

get usage() {
  return this.inventoryForm.get('usage');
}

get expire() {
  return this.inventoryForm.get('expire');
}

get price() {
  return this.inventoryForm.get('price');
}

get userId() {
  return this.inventoryForm.get('userid');
}



// Reset inventory form's values
ResetForm() {
  this.inventoryForm.reset();
}  

submitInventoryData() {
  this.crudApi.AddInventory(this.inventoryForm.value); // Submit Inventory data using CRUD API
  this.toastr.success('The drug has been successfully posted!',null,{
    timeOut:3000,
      positionClass: 'toast-top-center',
  });

  this.ResetForm();  // Reset form when clicked on reset button

  
  
 };

}