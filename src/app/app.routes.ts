import { PLATFORM_DIRECTIVES } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login/login.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddItemCameraComponent } from './add-item-2/add-item-camera.component';
import { AddItemDescComponent } from './add-item-2/add-item-desc.component';
import { FeedComponent } from './feed/feed.component';
import { MapComponent } from './feed/map.component';

const routes: Routes = [
  {path: '',  redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'add', component: AddItemComponent},
  { path: 'add-camera', component: AddItemCameraComponent},
  { path: 'add-camera/add-item-desc', component: AddItemDescComponent},
  { path: 'items', component: FeedComponent},
  { path: 'items/:id', component: MapComponent},

];


export const routing = RouterModule.forRoot(routes);

