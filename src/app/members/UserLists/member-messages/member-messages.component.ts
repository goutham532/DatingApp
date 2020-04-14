import { AlertifyService } from './../../../_services/alertify.service';
import { AuthService } from './../../../_services/auth.service';
import { UserService } from './../../../_services/User.service';
import { Message } from './../../../_models/message';
import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  AnyMessage: any = {};
  constructor(private userservice: UserService, 
    private authservice: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.LoadMessages();
  }

  LoadMessages(){
    const currentUserId = +this.authservice.decodedToken.nameid[0];
    debugger;
    this.userservice.GetMessageThread(this.authservice.decodedToken.nameid[0], this.recipientId)
    .pipe(
      tap(messages =>{
        for(let i=0;i<messages.length;i++){
          if(messages[i].isRead === false && messages[i].recipientId === currentUserId){
            this.userservice.MarkAsRead(currentUserId,messages[i].id).subscribe(() =>{
              // this.alertify.success("marked as read");
            }
            );
          }
        }
      })
    )
    .subscribe(responde => {
      this.messages=responde;
    }), error =>{
        this.alertify.error(error);
    }
  }

  sendMessages(){
    this.AnyMessage.recipientId = this.recipientId;
    this.userservice.SendMessage(this.authservice.decodedToken.nameid[0], this.AnyMessage)
    .subscribe((message: Message) => {
      debugger;
      if(this.messages==null){
        this.messages = [];
        this.messages.push(message);
      }
      else{
      this.messages.unshift(message);
      }
      this.AnyMessage.content = "";
    }), error => {
      this.alertify.error(error);
    }
  }

  

}
