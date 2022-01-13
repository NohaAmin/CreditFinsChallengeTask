import { Component, OnInit } from '@angular/core';
import {MoviesApiService} from "../../services/movies-api.service";
import {SingleMovieResult} from "../../models/single-movie-result";
import {MoviesTypes} from "../../enums/movies-types";

@Component({
  selector: 'app-all-movies-list',
  templateUrl: './all-movies-list.component.html',
  styleUrls: ['./all-movies-list.component.scss']
})
export class AllMoviesListComponent implements OnInit {

  moviesList: SingleMovieResult[] = [];
  pageNumber = 1;

  constructor(private moviesApiService: MoviesApiService) { }

  ngOnInit(): void {
    this.moviesApiService.getAllMoviesList(MoviesTypes.UPCOMING, this.pageNumber).subscribe((res) => {
      this.moviesList = res?.results;
      console.log('movies', this.moviesList)

    });
  }

}
