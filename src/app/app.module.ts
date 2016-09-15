
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { TranslateModule } from 'ng2-translate/ng2-translate';
// import { Ng2BootstrapModule  } from 'ng2-bootstrap/ng2-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'


import { AppComponent }  from './app.component';
import { HomeComponent }  from './home/home.component';
import { LoginPageComponent } from './login/login.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FeedComponent } from './feed/feed.component';
import { NgbdCarouselBasic } from './feed/carousel.component';
import { MapComponent } from './feed/map.component';
import { AddItemCameraComponent } from './add-item-2/add-item-camera.component';
import { AddItemDescComponent } from './add-item-2/add-item-desc.component';


import { AddItemService } from './add-item/add-item.service';
import { AddItemService2 } from './add-item-2/add-item-2.service';
import { FeedService } from './feed/feed.service';
// import { TranslateService } from './translate/translate.service';


@NgModule({
  imports: [ CommonModule, FormsModule, BrowserModule, ReactiveFormsModule, HttpModule, routing, NgbModule,AgmCoreModule.forRoot({
    apiKey: 'AIzaSyDuP5FGwC4FohXtjQe4KpWCAFGwghh27nQ'
  }), TranslateModule.forRoot()],       // module dependencies
  declarations: [ AppComponent, HomeComponent, LoginPageComponent, AddItemComponent, FeedComponent, MapComponent, AddItemCameraComponent, NgbdCarouselBasic, AddItemDescComponent],   // components and directives
  bootstrap: [ AppComponent ],     // root component
  providers: [ AddItemService, FeedService, AddItemService2 ]                    // services
})
export class AppModule { }

