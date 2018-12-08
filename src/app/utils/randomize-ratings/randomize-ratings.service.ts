import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";

import { Movie } from "../../type/movie";
import { UpdateMovie } from "../../store";

@Injectable({
  providedIn: "root"
})
export class RandomizeRatingsService {
  public movies: Movie[];
  public randomizeIntervalFunction;
  private timeInterval: number = 1000;
  public randomizedMovieIndicies;

  constructor(public store: Store) {
    this.randomizedMovieIndicies = [];
  }

  generateRandomNumber(max: number) {
    return Math.floor(Math.random() * max + 1);
  }

  getRandomMovie() {
    const randomNum = this.generateRandomNumber(this.movies.length);
    if (this.randomizedMovieIndicies.length === this.movies.length) {
      this.randomizedMovieIndicies.length = 0;
    }
    if (this.randomizedMovieIndicies.includes(randomNum)) {
      return this.getRandomMovie();
    } else {
      this.randomizedMovieIndicies.push(randomNum);
      return this.movies.find(movie => parseInt(movie.id) === randomNum);
    }
  }

  getRandomRating(movie) {
    const randomNum = this.generateRandomNumber(5);
    if (randomNum === movie.ratings) {
      return this.getRandomRating(movie);
    }
    return randomNum;
  }

  randomizeMovies() {
    const movie = this.getRandomMovie();
    const rating = this.getRandomRating(movie);
    console.log({
      title: movie.title,
      oldRating: movie.ratings,
      newRating: rating
    });
    movie.ratings = rating;
    this.store.dispatch(new UpdateMovie(movie));
  }

  reset() {
    this.movies.length = 0;
    this.randomizedMovieIndicies.length = 0;
  }

  timer(randomizeActivate) {
    if (randomizeActivate) {
      this.randomizeIntervalFunction = setInterval(() => {
        this.randomizeMovies();
      }, this.timeInterval);
    } else {
      this.reset();
      clearInterval(this.randomizeIntervalFunction);
    }
  }

  public randomize(movies, randomizeActivate) {
    this.movies = [...movies];
    this.timer(randomizeActivate);
  }
}
