import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngxs/store";

import { Movie } from "../../type/movie";
import { UpdateMovie } from "../../store/movie.actions";

@Component({
  selector: "app-movie-list-item",
  templateUrl: "./movie-list-item.component.html",
  styleUrls: ["./movie-list-item.component.css"]
})
export class MovieListItemComponent implements OnInit {
  @Input("movie") movie: Movie;
  @Input("index") index: number;
  constructor(private store: Store) {}

  ngOnInit() {}

  getRatingLabelText(ratings) {
    let ratingText = "Below Average";
    if (ratings > 2 && ratings < 3) ratingText = "Average";
    if (ratings >= 3) ratingText = "Good";
    return ratingText;
  }
  starClickChange($event, $index, movie) {
    console.log($event, this.index, movie);
    movie.ratings = $event.rating;
    this.store.dispatch(new UpdateMovie(this.index, movie));
  }
}
