import { Component, OnInit } from "@angular/core";

import { MoviesService } from "./webservice/movies.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ngMovieRating";
  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovies().subscribe(res => {
      console.log(res);
    });
  }
}
