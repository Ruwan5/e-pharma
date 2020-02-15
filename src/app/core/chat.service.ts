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
  

  constructor(
    private db:AngularFirestore,
    private afAuth:AngularFireAuthModule
   )
    {
      
     }
  sendMessage(msg:string){
    
    const email='test@example.com';
    console.log(msg);
    this.db.collection('messages').add({
      msg
    });

    

    console.log('Called sendMessage()!');

  }
   
  getMessages(){
    return this.db.collection('messages').valueChanges();
  }

  getAllUsers(){
    return this.db.collection('users').valueChanges();
  }
  




 
}
;