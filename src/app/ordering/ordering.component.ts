import { Component, OnInit } from '@angular/core';

export interface Drugs{
  id: String;
  name: String;
  price: String;
}

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.scss']
})
export class OrderingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  items: Drugs[] = [
    {id: "1", name: "panadol", price: "10.00"},
    {id: "2", name: "panadol", price: "10.00"},
    {id: "3", name: "panadol", price: "10.00"},
    {id: "4", name: "panadol", price: "10.00"},
    {id: "5", name: "panadol", price: "10.00"},
    {id: "6", name: "panadol", price: "10.00"},
    {id: "6", name: "panadol", price: "10.00"},
    {id: "6", name: "panadol", price: "10.00"},
    {id: "6", name: "panadol", price: "10.00"},
    {id: "6", name: "panadol", price: "10.00"},
    {id: "6", name: "panadol", price: "10.00"},
    {id: "6", name: "panadol", price: "10.00"},
    {id: "6", name: "panadol", price: "10.00"},
  ]

}
