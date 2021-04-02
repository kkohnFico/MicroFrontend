import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ResourcesComponent } from './resources/resources.component';
import {APP_ROUTES} from './app.routes';
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, ResourcesComponent],
  imports: [BrowserModule,
    RouterModule.forRoot(
        APP_ROUTES,
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
