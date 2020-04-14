import { MemberMessagesComponent } from './members/UserLists/member-messages/member-messages.component';
import { PhotoEditorComponent } from './members/UserLists/photo-editor/photo-editor.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsavad-changes.guard';

import { UserService } from './_services/User.service';
import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';
//import { MemberDetailResolver } from './_resolvers/member-details.resolver';
import { MemberDetailsComponent } from './members/UserLists/member-details/member-details.component';
import { MemberCardComponent } from './members/UserLists/member-card/member-card.component';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Home/Home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MessagesComponent } from './Messages/Messages.component';
import { UserListsComponent } from './members/UserLists/UserLists.component';
import { ListComponent } from './List/List.component';
import { appRoutes } from './Routes';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import {TabsModule} from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditComponent } from './members/UserLists/member-edit/member-edit.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ButtonsModule } from 'ngx-bootstrap';

export function tokenGetter(){
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MessagesComponent,
      UserListsComponent,
      ListComponent,
      MemberCardComponent,
      MemberEditComponent,
      MemberDetailsComponent,
      PhotoEditorComponent,
      TimeAgoPipe,
      MemberMessagesComponent
      
   ],
   imports: [
    BrowserModule,
	 HttpClientModule,
    FormsModule,
    FileUploadModule,
    BrowserAnimationsModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot(
       {
          config: {
             tokenGetter: tokenGetter,
             whitelistedDomains: ['localhost:5000'],
             blacklistedRoutes: ['localhost:5000/api/auth']
          }
       }
    )
	],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      //MemberDetailResolver,
      AlertifyService,
      PreventUnsavedChanges,
      AuthGuard,
      UserService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
