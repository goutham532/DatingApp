import { MemberEditComponent } from './members/UserLists/member-edit/member-edit.component';
import { MemberDetailResolver } from './_resolvers/member-details.resolver';
import { MemberDetailsComponent } from './members/UserLists/member-details/member-details.component';
import { UserListsComponent } from './members/UserLists/UserLists.component';
import { ListComponent } from './List/List.component';
import { MessagesComponent } from './Messages/Messages.component';
import { HomeComponent } from './Home/Home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsavad-changes.guard';

export const appRoutes : Routes = [
    { path: '', component: HomeComponent },
    {
        path : '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListComponent },
            { path: 'members/:id', component: MemberDetailsComponent },
            { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChanges]},
            { path: 'members', component: UserListsComponent}
        ]
    },
    
    { path: '**', redirectTo:'', pathMatch: 'full' },
]

