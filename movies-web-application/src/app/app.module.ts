import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllMoviesListComponent } from './pages/all-movies-list/all-movies-list.component';
import { SingleMoviePageComponent } from './pages/single-movie-page/single-movie-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AllMoviesListComponent,
    SingleMoviePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
