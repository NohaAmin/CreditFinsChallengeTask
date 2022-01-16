import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMoviesListComponent } from './pages/all-movies-list/all-movies-list.component';
import { SingleMoviePageComponent } from './pages/single-movie-page/single-movie-page.component';

const routes: Routes = [
  {path: 'movies-dashboard', component: AllMoviesListComponent},
  {path: 'approved/movies-dashboard', component: AllMoviesListComponent},
  {path: 'approved', component: AllMoviesListComponent},
  {path: 'movies-dashboard/:id/details', component: SingleMoviePageComponent},
  {path: '', redirectTo: 'movies-dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
