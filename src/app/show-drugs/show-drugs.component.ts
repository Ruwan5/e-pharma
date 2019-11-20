import { Component, OnInit } from '@angular/core';
import { CrudService } from '../inventory/shared/crud.service';  
import { Inventory } from '../inventory/shared/inventory';  
import { ToastrService } from 'ngx-toastr';    

@Component({
  selector: 'app-show-drugs',
  templateUrl: './show-drugs.component.html',
  styleUrls: ['./show-drugs.component.scss']
})
export class ShowDrugsComponent implements OnInit {

  items: Array<any>; 

  constructor(
    public crudApi: CrudService, 
    public toastr: ToastrService
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

}
