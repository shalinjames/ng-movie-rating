import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { MoviesState } from "./store/movies.store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ngMovieRating";
  @Select(MoviesState.getMovies)
  movies$: Observable<any>;
  constructor() {}

  ngOnInit() {
    this.movies$.subscribe(res => {
      console.log(res);
    });
  }
}
