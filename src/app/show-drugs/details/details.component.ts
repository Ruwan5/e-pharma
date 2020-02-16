import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {CrudService } from '../../inventory/shared/crud.service';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import {UserService} from '../../core/user.service'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

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
    expire: any
    drugid: any
    price: any
    id:any
    dealerName;
    

  constructor(public route: ActivatedRoute,
              public afs: CrudService,
              private router: Router,  
              private toastr: ToastrService,  // Toastr service for alert message
              private userService: UserService

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
        this.expire = data.payload.data().expire;
        this.drugid = data.payload.data().drugid;
        this.price = data.payload.data().price;
        this.id = data.payload.id;
        this.delerName(this.id); 

        
      
    })

    

  }

  delerName(id) {
    this.afs.getDealerName(id).subscribe(data => {
      this.dealerName = data;
      console.log(this.dealerName)
    })
  }

  delete(){
    this.afs.deleteDrug(this.id)
    .then(
      res => {
        this.router.navigate(['/show-drugs']);
        
        this.toastr.success('The drug has been successfully deleted!',null,{
          timeOut:4000,
            positionClass: 'toast-top-center',
        });
      }
    )
  }

}
