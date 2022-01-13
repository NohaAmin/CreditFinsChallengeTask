import {Injectable} from '@angular/core';
import {MovieGenre} from "../models/movie-genre";
import {map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MoviesTypes} from "../enums/movies-types";
import {MovieListInfo} from "../models/movie-list-info";

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  constructor(protected http: HttpClient) {
  }

  getMoviesGenres(): Observable<MovieGenre[]> {
    return this.http.get<any>(`${environment.httpApi}genre/movie/list`, {
      params: new HttpParams().set('api_key', environment.apiKey)
    }).pipe(map((res) => res?.genres))
  }

  getAllMoviesList(type: MoviesTypes, page: number = 1): Observable<MovieListInfo> {
    return this.http.get<any>(`${environment.httpApi}movie/${type}`, {
      params: new HttpParams().set('api_key', environment.apiKey).set('page', page)
    }).pipe(map((res) => ({
        page: res?.page,
        total_pages: res?.total_pages,
        total_results: res?.total_results,
        results: res?.results
      })
    ))
  }

}
