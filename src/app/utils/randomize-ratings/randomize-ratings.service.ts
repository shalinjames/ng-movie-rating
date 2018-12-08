import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";

import { Movie } from "../../type/movie";
import { UpdateMovie } from "../../store";

@Injectable({
  providedIn: "root"
})
export class RandomizeRatingsService {
  public movieIndicies = [];
  public movies: Movie[];
  public randomizeIntervalFunction;
  private timeInterval: number = 1000;

  constructor(public store: Store) {}

  generateRandomNumber(max: number) {
    return Math.floor(Math.random() * max + 1);
  }

  getRandomMovie() {
    const randomNum = this.generateRandomNumber(this.movies.length);
    return this.movies.find(movie => parseInt(movie.id) === randomNum);
  }

  getRandomRating(movie) {
    const randomNum = this.generateRandomNumber(5);
    if (randomNum === movie.ratings) {
      this.getRandomRating(movie);
    }
    return randomNum;
  }

  timer(randomizeActivate) {
    if (randomizeActivate) {
      this.randomizeIntervalFunction = setInterval(() => {
        const movie = this.getRandomMovie();
        if (movie) {
          const rating = this.getRandomRating(movie);
          console.log({
            title: movie.title,
            oldRating: movie.ratings,
            newRating: rating
          });
          movie.ratings = rating;
          this.store.dispatch(new UpdateMovie(movie));
        }
      }, this.timeInterval);
    } else {
      clearInterval(this.randomizeIntervalFunction);
    }
  }

  public randomize(movies, randomizeActivate) {
    this.movies = movies;
    this.timer(randomizeActivate);
  }
}
