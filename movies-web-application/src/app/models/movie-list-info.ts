import {SingleMovieResult} from "./single-movie-result";

export interface MovieListInfo {
  page: number,
  total_pages: number,
  total_results: number,
  results: SingleMovieResult[]
}
