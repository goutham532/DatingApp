import { throwError } from 'rxjs';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/User.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';
import { PaginationResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-UserLists',
  templateUrl: './UserLists.component.html',
  styleUrls: ['./UserLists.component.css']
})
export class UserListsComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [ {value: 'male', display: 'Males'}, { value: 'female', display: 'Females'} ];
  pageNumber = 1;
  pageSize = 6;
  userParams: any = {};
  pagination: Pagination;

  constructor(private userservice: UserService, private alertify: AlertifyService) { 
    this.loadUsers();
  }

  ngOnInit() {
    debugger;
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = "lastActive";
  }

  

  ResetFilters(){
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = "lastActive";
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.pageSize = event.itemsPerPage;
    this.loadUsers();
  }

  loadUsers(){
    this.userservice.getUsers(this.pageNumber, this.pageSize, this.userParams).subscribe((users: PaginationResult<User[]>) => {
    
      this.users = users.result;
      this.pagination = users.pagination;
    }, error => {
      this.alertify.error(error);
    });


    const a: string[] =["Rajendra Prasad", "Sarvepalli Radhakrishnan"]; 
    
  }


}
