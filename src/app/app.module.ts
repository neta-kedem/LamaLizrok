
import { NgModule }      from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home/home.component';
import { LoginPageComponent } from './login/login.component';

import { routing } from './app.routes';


@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule, HttpModule, routing],       // module dependencies
  declarations: [ AppComponent, HomeComponent, LoginPageComponent],   // components and directives
  bootstrap: [ AppComponent ],     // root component
  providers: [ ]                    // services
})
export class AppModule { }

