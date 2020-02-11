import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PokemonServiceService} from "./pokemon-service.service";
import {HttpClientModule} from "@angular/common/http";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    PokemonServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
