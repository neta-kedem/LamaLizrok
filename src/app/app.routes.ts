import { PLATFORM_DIRECTIVES } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChatRoomComponent } from './chat/chat-room.component';
import { LoginPageComponent } from './login/login.component';


const routes: Routes = [
  {path: '',  redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'chat', component: ChatRoomComponent, outlet: 'aux'},
  { path: 'login', component: LoginPageComponent},
];


export const routing = RouterModule.forRoot(routes);

