import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MoviesApiService} from "../../services/movies-api.service";
import {SingleMovieResult} from "../../models/single-movie-result";
import {MoviesTypes} from "../../enums/movies-types";
import {Urls} from "../../constants/urls";
import {Router} from "@angular/router";
import {MovieListInfo} from "../../models/movie-list-info";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-all-movies-list',
  templateUrl: './all-movies-list.component.html',
  styleUrls: ['./all-movies-list.component.scss']
})
export class AllMoviesListComponent implements OnInit {
  urls = Urls;
  favouriteMoviesList: SingleMovieResult[] = [];
  favouriteMoviesListIds: number[] = [];
  allMoviesList: SingleMovieResult[] = [];
  allFavouriteMoviesList: SingleMovieResult[] = [];
  moviesListInfo: MovieListInfo = {} as MovieListInfo
  selectedView: 'All Movies' | 'Favourite' = 'All Movies';
  listItems: { label: string, value: string }[] = [
    {label: 'All Movies', value: 'All Movies'},
    {label: 'Favourite', value: 'Favourite'}]

  constructor(private moviesApiService: MoviesApiService,
              // private cdr: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit(): void {
    Object.values(localStorage).forEach((k: string) =>
      this.favouriteMoviesList.push(JSON.parse(k)));
    this.favouriteMoviesListIds = this.favouriteMoviesList
      .map((m) => m.id);
    this.updateServiceWithFavourite();
    this.getMoviesListWithPagination()
  }

  getMoviesListWithPagination(pageNumber: number = 1): void {
    this.moviesApiService.getAllMoviesList(MoviesTypes.NOW_PLAYING, pageNumber).subscribe((res) => {
      this.moviesListInfo = res;
      this.allMoviesList = res.results;
    });
  }

  paginate($event: any) {
    this.getMoviesListWithPagination($event.page + 1);
  }

  onSelectingListType($event: any) {
    this.selectedView = $event.value as ('All Movies' | 'Favourite');
    this.allFavouriteMoviesList = this.moviesApiService.getFavouriteMovies()
    // this.cdr.detectChanges();
  }

  showDetails(id: number) {
    this.router.navigateByUrl(`movies-dashboard/${id}/details`).then();
  }

  onSelectingBookmark(item: SingleMovieResult) {
    if (this.favouriteMoviesListIds.includes(item.id)) {
      Object.keys(localStorage).forEach((k) => {
        if (+k === item.id)
          localStorage.removeItem(k)
      })
      this.updateStorageWithFavourite(item, 'remove')
    } else {
      localStorage.setItem(item.id.toString(), JSON.stringify(item));
      this.updateStorageWithFavourite(item, 'add')
    }
  }

  updateStorageWithFavourite(item: SingleMovieResult, action: 'add' | 'remove'): void {
    if (action === 'add') {
      this.favouriteMoviesList.push(item);
      this.favouriteMoviesListIds.push(item.id)
    } else {
      const removedItem = this.favouriteMoviesList.findIndex((m) => m.id === item.id);
      this.favouriteMoviesList.splice(removedItem, 1);
      const removedId = this.favouriteMoviesListIds.indexOf(item.id);
      this.favouriteMoviesListIds.splice(removedId, 1);
    }
    this.updateServiceWithFavourite();
  }

  updateServiceWithFavourite(): void {
    this.moviesApiService.setFavouriteMovies(this.favouriteMoviesList);
    this.moviesApiService.setFavouriteMoviesIds(this.favouriteMoviesListIds);
  }
}
