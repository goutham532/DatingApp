import { ReactiveFormsModule } from '@angular/forms';
import { Message } from './../_models/message';
import { map } from 'rxjs/operators';
import { PaginationResult } from './../_models/pagination';
import { User } from './../_models/User';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { 
  // this.getUsers();
}

getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginationResult<User[]>> {
 
  const paginatedResult: PaginationResult<User[]> = new PaginationResult<User[]>();

  let params = new HttpParams();
  if(page != null && itemsPerPage!= null){
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if(userParams != null){
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }
  if(likesParam === "Likers"){
    params = params.append('likers', 'true');
  }
  if(likesParam === "Likees"){
    params = params.append('likees', 'true');
  }

  return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params})
  .pipe(
    map(
      response => {
        paginatedResult.result=response.body;
        if(response.headers.get('pagination') != null){
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }
    )
  );
}

getUser(id: string): Observable<User>{
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(user: User){
  return this.http.put(this.baseUrl + 'users/update/' + user.id +  "/" 
  + user.introduction + "/" + user.lookingFor + "/" + user.interests + "/" + user.city + "/"
  + user.country + "/", null);
}

SetMainPhoto(PhotoId: number, UserId: Number){

  return this.http.post(this.baseUrl + "Photos/SetMainPhoto/" + UserId + "/" + PhotoId, null);
}

SendLike(id: number, recipientId: number){
  return this.http.post(this.baseUrl + "users/like/" + id + "/" + recipientId, null);
}

GetMessages(id: number, page?, itemsPerPage?, messageContainer?){
  const paginatedResult: PaginationResult<Message[]> = new PaginationResult<Message[]>();

  let params = new HttpParams();
  params = params.append('messageContainer', messageContainer);
  if(page != null && itemsPerPage!= null){
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  return this.http.get<Message[]>(this.baseUrl + 'messages/GetMessagesForUser/' + id, {observe: 'response', params})
  .pipe(
    map(
      response => {
        paginatedResult.result=response.body;
        if(response.headers.get('pagination') != null){
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }
    )
  );
}

// MarkAsRead(userId: number, messageId: number){
//   debugger;
//   return this.http.post('http://localhost:5000/api/messages/MarkMessageAsRead/' + userId + '/' + messageId,{});
// }

GetMessageThread(id:number, recipientId:number){
  return this.http.get<Message[]>(this.baseUrl + 'messages/GetMessagesForUserThread/' + id + '/' + recipientId);
}

SendMessage(id: number, message: Message){
  return this.http.post(this.baseUrl + 'messages/createMessage/' + id + '/' + message.recipientId + '/' + message.content, {});
}

MarkAsRead(userId: number, id: number){
  return this.http.post(this.baseUrl + 'messages/MarkMessageAsRead/' + userId + '/' + id + '/', {});
}

DeleteMessage(id: number, userId: number){
  return this.http.post(this.baseUrl + 'messages/deleteMessage/' + id + '/' + userId, {});
}





}
