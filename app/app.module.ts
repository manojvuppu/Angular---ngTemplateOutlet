import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { GMapComponent } from './components/map.component';
import { MeteoComponent } from './components/meteo.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, GMapComponent, MeteoComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
