import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListRoutingModule } from './app-routing-module';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    ListRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
