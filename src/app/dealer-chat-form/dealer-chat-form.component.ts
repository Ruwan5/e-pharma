import { Component, OnInit } from '@angular/core';
import { ChatService } from '../core/chat.service';
import * as firstore from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { OrderService } from "../core/order.service";

@Component({
  selector: 'app-dealer-chat-form',
  templateUrl: './dealer-chat-form.component.html',
  styleUrls: ['./dealer-chat-form.component.scss']
})
export class DealerChatFormComponent implements OnInit {

  message: string;
  items: Array<any>;
  temp: any = [];
  user: any = []
  currusremail: string;
  cuurusrname: string;
  temp1;
  temp2: Array<string>;
  usrname;

  alignRight: boolean = false;

  constructor(private chat: ChatService,
    private afs: AngularFirestore,
    private authfire: AngularFireAuth,
    private toaster: ToastrService,
    private service: OrderService) { 

      this.getCurrentuser();

 

      chat.getMessages().subscribe(data => {
        this.temp = [],


        data.forEach(element => {

          this.temp.push(element['data']);
        });

      console.log("temp ")
      console.log(this.temp)
    })
  }
    

  ngOnInit() {
    console.log("working chat");
    this.getData();

  }
  getData() {
    return this.afs.collection('messages', ref =>
      ref.orderBy('time')).snapshotChanges()
      .subscribe(result => {
        this.items = result;
        console.log(result);
      })
  }
  send() {
    this.alignRight = true;
    this.chat.sendMessage(this.message,this.usrname);
  }
  getCurrentuser() {
    // var user = firebase.auth().currentUser;
    // console.log('user');
    // var currusremail = user.email;
    this.service.getCurrentUserId().then(x => {
      var cur_uid = x;
      this.service.getusername(x).subscribe(result => {
        this.usrname = result["FirstName"] + " " + result["LastName"];
        console.log(this.usrname)

      })
    })
  }

    delete(id: string) {
      console.log(id)
      this.toaster.success('Your massage has been removed successfully', null, {
        timeOut: 5000,
        positionClass: 'toast-top-center',
      });
      this.afs.collection("messages").doc(id).delete().then(function () {
  
  
        console.log("message removed successfully");
  
  
      }).catch(function (error) {
        console.error("error", error);
      });
    }
    
    

}
