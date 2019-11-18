import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  // CRUD API service class
import { Inventory } from './../shared/inventory';   // Inventory interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Inventory:Inventory[];                 // Save inventory data in Inventory's array.
  hideWhenNoInventory: boolean = false; // Hide inventory data table when no data.
  noData: boolean = false;            // Showing No Inventory Message, when no inventory data in database.
  preLoader: boolean = true;  
  items: Array<any>;        // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)

  constructor(
    public crudApi: CrudService, // Inject inventory CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.getDrugs();
  }

  getDrugs(){
    this.crudApi.getInventory()
    .subscribe(result => {
      this.items = result;
      console.log(result);
    })
  }

  // Using valueChanges() method to fetch simple list of inventory data. It updates the state of hideWhenNoInventory, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.crudApi.GetInventoryList().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoInventory = false;
        this.noData = true;
      } else {
        this.hideWhenNoInventory = true;
        this.noData = false;
      }
    })
  }

  // Method to delete inventory object
  deleteInventory(inventory) {
    if (window.confirm('Are sure you want to delete this drug ?')) { // Asking from user before Deleting inventory data.
      this.crudApi.DeleteInventory(inventory.$key) // Using Delete inventory API to delete inventory.
      this.toastr.success(inventory.brandName + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }

}


