import { PLATFORM_DIRECTIVES } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login/login.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FeedComponent } from './feed/feed.component';




const routes: Routes = [
  {path: '',  redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'add', component: AddItemComponent},
  { path: 'feed', component: FeedComponent},
    
];


export const routing = RouterModule.forRoot(routes);

