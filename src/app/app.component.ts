import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { MoviesState } from "./store/movies.store";
import { Movie } from "./type/movie";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ngMovieRating";
  @Select(MoviesState.getMovies)
  movies$: Observable<any>;
  public movies: Movie[];

  constructor() {}

  ngOnInit() {
    this.movies$.subscribe(res => {
      this.movies = res;
    });
  }
}
