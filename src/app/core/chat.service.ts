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
   uid:string

  constructor(
    private db:AngularFirestore,
    private afs: AngularFirestore,
    private afAuth:AngularFireAuthModule

    
   )
    {
      
     }
  sendMessage(msg:string){
    var user = firebase.auth().currentUser;
    var userEmail = user.email;
    
    console.log(msg);
    // console.log(user)
    this.afs.collection('messages').add({
      data:msg,
       from:user.email,
       time:new Date()

    });

    

    console.log('Called sendMessage()!');

  }
   
  getMessages(){
    return this.db.collection('messages').valueChanges();
  }

  getAllUsers(){
    return this.db.collection('users').valueChanges();
  }

  
  
  getUserName() {
    return new Promise<void>((resolve, reject) => {
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var userEmail = user.email;
    db.collection("users").where("email", "==", userEmail)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        console.log(doc.id, " => ", doc.data());
        var data = doc.data();
        if(data.UserType){
          resolve(data.FirstName);
        } else {
          reject("Error!!!");
        }
       
      });
    }).catch(function(error) {
      console.log("Error getting documents: ", error);
    });
    })
      
  }
 
}
;