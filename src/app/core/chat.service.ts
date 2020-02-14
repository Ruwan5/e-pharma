import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
import{ Observable } from 'rxjs';
 import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';




@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //  user:any;
  //  chatMessages:FirebaseListObservable<ChatMessage[]>;
  //  chatMessage:ChatMessage;
  //  userName:Observable<string>;


  constructor(
    private db:AngularFirestore,
    private afAuth:AngularFireAuthModule
   )
    {
      // this.afAuth.authState.subcribe(auth=>{
      //   if(auth!==undefined && auth !==null){
      //     this.user=auth;
      //   }
      // });
     }
  sendMessage(msg:string){
    // const timestamp=this.getTimeStamp();
    //const email=this.user.email;
    const email='test@example.com';
    console.log(msg);
    this.db.collection('chat').add({msg});

    // this.chatMessages=this.getMessages();
    // this.chatMessages.push({
    //   message:msg,
    //   timeSent:timestamp,
    //   //userName: this.userName,
    //   userName: 'test-user',
    //   email: email});

    console.log('Called sendMessage()!');

  }
   
  getMessages(){
    return this.db.collection('chat').valueChanges();
  }
  




  // getTimeStamp(){
  //   const now=new Date();
  //   const date= now.getUTCFullYear() + '/' +
  //               (now.getUTCMonth() + 1)+ '/' +
  //               now.getUTCDate();
  //   const time= now.getUTCHours() + ':' +
  //               now.getUTCMinutes() + '/' +
  //               now.getUTCSeconds();  
    
  //   return (date + ' '+time);
  // }
}
