import { Component, OnInit } from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import { MoviesApiService } from './services/movies-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'movies-web-application';

  constructor(private primengConfig: PrimeNGConfig,
    private moviesApiService: MoviesApiService) {
}

ngOnInit(): void {
this.primengConfig.ripple = true;

this.moviesApiService.getMoviesGenres().subscribe((res) => {
console.log('res', res)
})
}
}
