import { Component, OnInit } from '@angular/core';
import { OrderService } from "src/app/core/order.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  usrid: string;
  list: any;
  sum: number;

  constructor(private service: OrderService, private Authfire: AngularFireAuth, private afs: AngularFirestore) {
    this.usrid = this.Authfire.auth.currentUser.uid;
    console.log(this.usrid)
  }

  ngOnInit() {
    this.afs.collection('cart').doc(this.usrid).collection('subcart').snapshotChanges().subscribe(result => {
      console.log(result);
      this.list = result.map(drgs => {
        return {
          id: drgs.payload.doc.id,
          ...drgs.payload.doc.data()
        }
      })

    })
  }

  delete_(id: string) {
    console.log(id)
    this.afs.collection("cart").doc(this.usrid).collection('subcart').doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  edit_(id: String) {
    

  }
  

}
