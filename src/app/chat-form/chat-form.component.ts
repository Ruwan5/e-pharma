import { Component, OnInit } from '@angular/core';
import { ChatService } from '../core/chat.service';
import * as firstore from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';




@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  message:string;
  items: Array<any>;
  temp:any=[];
  user:any=[]
 currusremail: string;
  cuurusrname: string;
  temp1;
 temp2  : Array<string>;

  constructor(private chat:ChatService,
    private afs: AngularFirestore, private authfire: AngularFireAuth
    ) {
      // var name = this.chat.getUserName();
      // this.currusremail = this.authfire.auth.currentUser.email;
      // console.log(this.currusremail)

      // this.afs.collection('users', ref => ref.where('email', '==', this.currusremail)).valueChanges().subscribe(val=>{
        
      //   this.temp1 = val;
      //   console.log(this.temp1)
      //   var aa = val['FirstName'];
      //   console.log("hammo =>" + aa)

      //   this.temp1.forEach(element => {
      //     // this.temp2.push(element["FirstName"])
      //     element.array.forEach(element2 => {
      //       this.temp2 = element2;
      //     });
      //   });

      //   console.log(this.temp2);
      // });
    
    // chat.getAllUsers().subscribe(contact=>this.contacts=>{
    //   this.contacts=contact;
    // });
     chat.getMessages().subscribe(data=>{
       this.temp=[],
       
       
         
       //this.cuurusrname,
       
      
       
      //  =[]
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

  getData(){
    return this.afs.collection('messages',ref => 
    ref.orderBy('time')).snapshotChanges()
    .subscribe(result => {
      this.items = result;
      console.log(result);
    })
  }
   send(){
   this.chat.sendMessage(this.message);
  }

  handleSubmit(event){
   if(event.keyCode==13){
      this.send();
   }
 }


 

 
  

 }

