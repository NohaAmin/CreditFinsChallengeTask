import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MoviesTypes} from "../enums/movies-types";
import {MovieListInfo} from "../models/movie-list-info";
import {Urls} from '../constants/urls';
import {SingleMovieResult} from "../models/single-movie-result";
import {UserReview} from "../models/user-review";

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  private favouriteMovies: BehaviorSubject<SingleMovieResult[]> = new BehaviorSubject<SingleMovieResult[]>([])
  private favouriteMoviesIds: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([])

  constructor(protected http: HttpClient) {
  }

  setFavouriteMovies(movies: SingleMovieResult[]): void {
    this.favouriteMovies.next(movies);
  }

  getFavouriteMovies(): SingleMovieResult[] {
    return this.favouriteMovies.value;
  }

  setFavouriteMoviesIds(ids: number[]): void {
    this.favouriteMoviesIds.next(ids);
  }

  getFavouriteMoviesIds(): number[] {
    return this.favouriteMoviesIds.value;
  }

  getAllMoviesList(type: MoviesTypes, page: number = 1): Observable<MovieListInfo> {
    return this.http.get<any>(`${environment.httpApi}/${Urls.MOVIES_API}${type}`, {
      params: new HttpParams().set('api_key', environment.apiKey).set('page', page)
    }).pipe(map((res) => ({
        page: res?.page,
        total_pages: res?.total_pages,
        total_results: res?.total_results,
        results: (res?.results as any[]).map((item) => ({
          id: item.id,
          title: item.title,
          posterPath: item.poster_path
        }))
      })
    ))
  }

  getMovieDetails(id: number): Observable<SingleMovieResult> {
    return this.http.get<any>(`${environment.httpApi}/${Urls.MOVIES_API}/${id}`,
      {params: new HttpParams().set('api_key', environment.apiKey)})
      .pipe(map((res) => ({
        id: res.id,
        title: res.title,
        posterPath: res.poster_path,
        overview: res.overview,
        popularity: res.popularity,
        releaseDate: res.release_date,
        voteAverage: res.vote_average
      }) as SingleMovieResult))
  }

  getMovieReviews(id: number): Observable<UserReview[]> {
    return this.http.get<any>(`${environment.httpApi}/${Urls.MOVIES_API}/${id}/${Urls.MOVIE_USER_REVIEWS}`,
      {params: new HttpParams().set('api_key', environment.apiKey)})
      .pipe(map((res) => {
        return (res?.results) ? res?.results.map((x: any) => ({
          author: x.author,
          content: x.content,
          createdAt: x.created_at
        })) : []
      }))
  }

}
