import { Component } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { MoviesState } from "./store/movies.store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @Select(MoviesState.getMovies) movies$: Observable<any>;
  constructor() {}
}
