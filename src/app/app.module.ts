
import { NgModule }      from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home/home.component';
import { LoginPageComponent } from './login/login.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FeedComponent } from './feed/feed.component';
import { MapComponent } from './feed/map.component';

import { AddItemService } from './add-item/add-item.service';
import { FeedService } from './feed/feed.service';


@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule, HttpModule, routing,     AgmCoreModule.forRoot({
    apiKey: 'AIzaSyDuP5FGwC4FohXtjQe4KpWCAFGwghh27nQ'
  })],       // module dependencies
  declarations: [ AppComponent, HomeComponent, LoginPageComponent, AddItemComponent, FeedComponent, MapComponent],   // components and directives
  bootstrap: [ AppComponent ],     // root component
  providers: [ AddItemService, FeedService ]                    // services
})
export class AppModule { }

