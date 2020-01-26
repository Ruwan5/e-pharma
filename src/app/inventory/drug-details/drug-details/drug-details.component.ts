import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
    

  constructor(public route: ActivatedRoute) { }

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
        
        
      
    })

  }

  }


