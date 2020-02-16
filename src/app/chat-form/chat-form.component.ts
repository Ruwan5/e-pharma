import { Component, OnInit } from '@angular/core';
import { ChatService } from '../core/chat.service';
import * as firstore from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr







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
 

 alignRight:boolean = false;

  constructor(private chat:ChatService,
    private afs: AngularFirestore,
     private authfire: AngularFireAuth,
     private toaster: ToastrService
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
    this.alignRight = true;
   this.chat.sendMessage(this.message);
  }

  getCurrentuser(){
    var user = firebase.auth().currentUser;
    console.log('user');
    var currusremail = user.email;
    
    //sender=true;
  }

  delete(id:string)
  {
    console.log(id)
    this.toaster.success('Your massage has been removed successfully', null,{
      timeOut:5000,
        positionClass: 'toast-top-center',
    });
    this.afs.collection("messages").doc(id).delete().then(function () 
    {
      
      
      console.log("message removed successfully");
      
      
    }).catch(function (error) {
      console.error("error",error);
    });
    
  }
  handleSubmit(event){
   if(event.keyCode==13){
      this.send();
   }
 }


 

 
  

 }

