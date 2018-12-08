import { Component, Input } from "@angular/core";
import { Store } from "@ngxs/store";

import { Movie } from "../../type/movie";
import { UpdateMovie } from "../../store/movie.actions";

export enum Rating {
  BELOW_AVG = "Below Average",
  AVG = "Average",
  GOOD = "Good"
}

@Component({
  selector: "app-movie-list-item",
  templateUrl: "./movie-list-item.component.html",
  styleUrls: ["./movie-list-item.component.css"]
})
export class MovieListItemComponent {
  @Input("movie") movie: Movie;
  @Input("index") index: number;

  constructor(private store: Store) {}

  getRatingLabelText(ratings: number): string {
    let ratingText = Rating.BELOW_AVG;
    if (ratings > 2 && ratings < 4) ratingText = Rating.AVG;
    if (ratings >= 4) ratingText = Rating.GOOD;
    return ratingText;
  }
  starClickChange($event: { rating: number }, movie: Movie): void {
    movie.ratings = $event.rating;
    this.store.dispatch(new UpdateMovie(movie));
  }
}
