import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to inventory's edit form

  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.updateInventoryData();   // Call updateInventoryData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetInventory(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }
   // Accessing form control using getters
   get brandName() {
    return this.editForm.get('brandName');
  }
  
  get actIngreName() {
    return this.editForm.get('actIngreName');
  }
  
  get excipientName() {
    return this.editForm.get('excipientName');
  }
  
  get actIngreOtherName() {
    return this.editForm.get('actIngreOtherName');
  }
  
  
  
  get actIngreShortName() {
    return this.editForm.get('actIngreShortName');
  }
  
  get number() {
    return this.editForm.get('number');
  }
  
  get unit() {
    return this.editForm.get('unit');
  }
  
  get formula() {
    return this.editForm.get('formula');
  }
  
  get drugPart() {
    return this.editForm.get('drugPart');
  }
  
  get color() {
    return this.editForm.get('color');
  }
  
  get form() {
    return this.editForm.get('form');
  }
  
  get smell() {
    return this.editForm.get('smell');
  }
  
  get taste() {
    return this.editForm.get('taste');
  }
  
  get usage() {
    return this.editForm.get('usage');
  }
  

  // Contains Reactive Form logic
  updateInventoryData() {
    this.editForm = this.fb.group({
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
    usage: ['']
   
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.crudApi.UpdateInventory(this.editForm.value);       // Update inventory data using CRUD API
    this.toastr.success(this.editForm.controls['brandName'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['view-inventory']);               // Navigate to student's list page when inventory data is updated
  }

}
