import { Pagination, PaginationResult } from './../_models/pagination';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/User.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';

@Component({
  selector: 'app-List',
  templateUrl: './List.component.html',
  styleUrls: ['./List.component.css']
})
export class ListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 6;
  likeParams: any = {};
  constructor(private userService: UserService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.likeParams = "Likers";
    this.loadUsers();
  }
  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.pageSize = event.itemsPerPage;
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParams).subscribe((users: PaginationResult<User[]>) => {
    
      this.users = users.result;
      this.pagination = users.pagination;
    }, error => {
      this.alertify.error(error);
    });}

}
