import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Message } from './../_models/message';
import { UserService } from './../_services/User.service';
import { Component, OnInit } from '@angular/core';
import { Pagination, PaginationResult } from '../_models/pagination';
import { User } from '../_models/User';

@Component({
  selector: 'app-Messages',
  templateUrl: './Messages.component.html',
  styleUrls: ['./Messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pageNumber = 1;
  pageSize = 6;
  messageContainer = "unread";
  pagination: Pagination;
  constructor(private userservice:UserService, private alertify:AlertifyService, 
    private authservice: AuthService) {
      this.loadMessages();
     }

  ngOnInit() {
  }
  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.pageSize = event.itemsPerPage;
    this.loadMessages();
  }

  loadMessages(){
    this.userservice.GetMessages(this.authservice.decodedToken.nameid[0], 
    this.pageNumber, this.pageSize, this.messageContainer).
    subscribe((messages: PaginationResult<Message[]>) => {
      this.messages = messages.result;
      this.pagination = messages.pagination;
    }, error => {
      this.alertify.error(error);
    });}


    DeleteMessage(id: number){
      this.alertify.confirm('Are you sure You want to delete this message?',() =>{
        this.userservice.DeleteMessage(id, this.authservice.decodedToken.nameid[0]).subscribe(
          () => {
            this.messages.splice(this.messages.findIndex(m => m.id == id), 1);
            this.alertify.success("message deleted succesfully");
          }, error => {
            this.alertify.error(error);
          }
        );
      });
      
    }

}
