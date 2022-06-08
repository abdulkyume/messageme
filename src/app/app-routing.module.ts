import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddfriendComponent } from './components/addfriend/addfriend.component';
import { FriendsComponent } from './components/friends/friends.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:'login'},
  {path:"signup", component:SignupComponent},
  {path:"login", component:LoginComponent},
  {path:"profile", component:ProfileComponent},
  {path:"friends", component:FriendsComponent},
  {path:"addfriends", component:AddfriendComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
