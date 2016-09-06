import { PLATFORM_DIRECTIVES } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login/login.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FeedComponent } from './feed/feed.component';
<<<<<<< HEAD
=======
import { MapComponent } from './feed/map.component';
>>>>>>> 8bdabf29792874558e016478c1311c32e7690e51




const routes: Routes = [
  {path: '',  redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'add', component: AddItemComponent},
  { path: 'items', component: FeedComponent},
  { path: 'items/:id', component: MapComponent},

];


export const routing = RouterModule.forRoot(routes);

