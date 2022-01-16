import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MoviesApiService} from "../../services/movies-api.service";
import {combineLatest} from "rxjs";
import {UserReview} from "../../models/user-review";
import {Urls} from "../../constants/urls";
import {SingleMovieResult} from "../../models/single-movie-result";

@Component({
  selector: 'app-single-movie-page',
  templateUrl: './single-movie-page.component.html',
  styleUrls: ['./single-movie-page.component.scss']
})
export class SingleMoviePageComponent implements OnInit {

  urls = Urls;
  movieId!: number;
  movieDetails: SingleMovieResult = {} as SingleMovieResult;
  movieReviews: UserReview[] = [];
  rateValue: number = 0;
  favouriteMoviesListIds: number[] = [];

  constructor(private moviesApiService: MoviesApiService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.movieId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.favouriteMoviesListIds = this.moviesApiService.getFavouriteMoviesIds();
    combineLatest([this.moviesApiService.getMovieDetails(this.movieId), this.moviesApiService.getMovieReviews(this.movieId)]).subscribe(([details, reviews]) => {
      this.movieDetails = details;
      this.movieReviews = reviews;
    })
  }

  onSelectingRate(rateValue: number) {
    console.log('to send post api to add rate to this movie in rating list')
  }

  onSelectingBookmark(item: SingleMovieResult) {
    console.log('to send post api to add this movie in favourite list')
  }
}
