import { Component, OnInit } from '@angular/core';
import { ChatService } from '../core/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  message:string;
  temp:any=[];
  contacts: any=[];

  constructor(private chat:ChatService) {
    // chat.getAllUsers().subscribe(contact=>this.contacts=>{
    //   this.contacts=contact;
    // });
     chat.getMessages().subscribe(data=>{
       this.temp=[]=[]
       data.forEach(element => {
        
         this.temp.push(element['msg']);
       });
       console.log(this.temp)
     })
   }

  ngOnInit() {
    console.log("working chat")
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

