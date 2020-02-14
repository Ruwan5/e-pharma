import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { expired_drugs_model } from "./expired_drugs_model.model";

@Component({
  selector: 'app-expired-drugs',
  templateUrl: './expired-drugs.component.html',
  styleUrls: ['./expired-drugs.component.scss']
})

export class ExpiredDrugsComponent implements OnInit {

  uidnew;
  list: expired_drugs_model[];
  
  constructor(private afs: AngularFirestore) {
    
    this.uidnew = localStorage.getItem('uid');

   }

  

  ngOnInit() {

    this.afs.collection('users').doc(this.uidnew).collection('Inventory').snapshotChanges().subscribe(res => {
      console.log(res)
      this.list = res.map( a=> {
        return{
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        } as unknown as expired_drugs_model
      }
      )
    })

  }

}
