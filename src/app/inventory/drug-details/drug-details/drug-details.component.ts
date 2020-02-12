import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {CrudService } from '../../shared/crud.service';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr



@Component({
  selector: 'app-drug-details',
  templateUrl: './drug-details.component.html',
  styleUrls: ['./drug-details.component.scss']
})
export class DrugDetailsComponent implements OnInit {

    brandName: any
    actIngreName: any
    excipientName: any
    actIngreOtherName: any
    actIngreShortName: any
    number: any
    unit: any
    formula: any
    drugPart: any
    color: any
    form: any
    smell: any
    taste: any
    usage: any
    price: any
    id:any
    

  constructor(public route: ActivatedRoute,
              public afs: CrudService,
              private router: Router,  
              private toastr: ToastrService,  // Toastr service for alert message


    ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      console.log(data.payload.data().brandName)
      
        this.brandName = data.payload.data().brandName;
        this.actIngreName = data.payload.data().actIngreName;
        this.excipientName = data.payload.data().excipientName;
        this.actIngreOtherName = data.payload.data().actIngreOtherName;
        this.actIngreShortName = data.payload.data().actIngreShortName;
        this.number = data.payload.data().number;
        this.unit = data.payload.data().unit;
        this.formula = data.payload.data().formula;
        this.drugPart = data.payload.data().drugPart;
        this.color = data.payload.data().color;
        this.form = data.payload.data().form;
        this.smell = data.payload.data().smell;
        this.taste = data.payload.data().taste;
        this.usage = data.payload.data().usage;
        this.price = data.payload.data().price;
        this.id = data.payload.id;
        
        
      
    })

  }

  delete(){
    this.afs.deleteDrug(this.id)
    .then(
      res => {
        this.router.navigate(['/list-inventory']);
        
        this.toastr.success('The drug has been successfully deleted!',null,{
          timeOut:4000,
            positionClass: 'toast-top-center',
        });
      }
    )
  }

}


