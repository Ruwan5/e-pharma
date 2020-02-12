import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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

  item:any
  id:any

  editForm = new FormGroup({
    brandName: new FormControl(),
    actIngreName:  new FormControl(), 
    excipientName:  new FormControl(),
    actIngreOtherName:  new FormControl(),
    actIngreShortName:  new FormControl(),
    number:  new FormControl(),
    unit:  new FormControl(),
    formula:  new FormControl(),
    drugPart:  new FormControl(),
    color:  new FormControl(),
    form:  new FormControl(),
    smell:  new FormControl(),
    taste:  new FormControl(),
    usage:  new FormControl(),
    expire: new FormControl(),
    price:  new FormControl(),
    drugid: new FormControl()
    

  })

  constructor(
    public route: ActivatedRoute,
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
       this.item = routeData['data'];
       this.id = this.item.payload.id;
      console.log(this.id)
    })
    this.createForm();

    
  }

  onSubmit(value){
    this.crudApi.updateDrug(value, this.id);
    console.log("done");

    this.toastr.success('The drug has been successfully updated!', '',{
      timeOut:3000,
        positionClass: 'toast-top-center',
    });

    this.router.navigate(['/drugs-details/'+ this.id]);
  }

  createForm(){
    this.editForm = this.fb.group({
      brandName:[this.item.payload.data().brandName, [Validators.required]],
      actIngreName:[this.item.payload.data().actIngreName, [Validators.required]],
      excipientName: [this.item.payload.data().excipientName, [Validators.required]],
      actIngreOtherName:[this.item.payload.data().actIngreOtherName, [Validators.required]],
      actIngreShortName: [this.item.payload.data().actIngreShortName, [Validators.required]],
      number:[this.item.payload.data().number,[ Validators.pattern('^[0-9]+$')]],
      unit:[this.item.payload.data().unit, [Validators.required]],
      formula:[this.item.payload.data().formula, [Validators.required]],
      drugPart:[this.item.payload.data().drugPart, [Validators.required]],
      color:[this.item.payload.data().color, [Validators.required]],
      form: [this.item.payload.data().form, [Validators.required]],
      smell: [this.item.payload.data().smell, [Validators.required]],
      taste: [this.item.payload.data().taste, [Validators.required]],
      usage: [this.item.payload.data().usage, [Validators.required]],
      expire: [this.item.payload.data().expire, [Validators.required]],
      price: [this.item.payload.data().price, [Validators.required]],
      drugid: [this.item.id, [Validators.required]]
    })
  }

  ResetForm() {
    this.editForm.reset();
  } 
  

}
