import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/User.service';
import { User } from 'src/app/_models/User';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";

@Injectable()
export class MemberDetailResolver implements Resolve<User>{
    constructor(private userService: UserService, private router: Router, 
        private alertify: AlertifyService){

    }

    resolve(route : ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError => {
                this.alertify.error("Problem retriving data");
                this.router.navigate(['/members']);
                return of(null);
            }
        )
    }
}