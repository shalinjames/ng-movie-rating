import { Injectable } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { interval, Subject, empty, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import { Movie } from "../../type/movie";
import { UpdateMovie, MoviesState } from "../../store";

@Injectable({
  providedIn: "root"
})
export class RandomizeRatingsService {
  private movies: Movie[];
  private timeInterval: number = 1000;
  private randomizedMovieIndicies = [];
  private pauser;

  @Select(MoviesState.getMovies) movies$: Observable<Movie[]>;

  constructor(public store: Store) {
    this.movies$.subscribe(movies => {
      this.movies = movies;
    });
    this.timer();
  }

  private generateRandomNumber(max: number): number {
    return Math.floor(Math.random() * max + 1);
  }

  private getRandomMovie(): Movie {
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

  private getRandomRating(movie: Movie): number {
    const randomNum = this.generateRandomNumber(5);
    if (randomNum === movie.ratings) {
      return this.getRandomRating(movie);
    }
    return randomNum;
  }

  private randomizeMovies(): void {
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

  private timer(): void {
    const source = interval(this.timeInterval);
    this.pauser = new Subject();
    const pausable = this.pauser.pipe(
      switchMap(activate => (activate ? source : empty()))
    );
    pausable.subscribe(x => this.randomizeMovies());
  }

  public randomize(randomizeActivate): void {
    this.randomizedMovieIndicies.length = 0;
    this.pauser.next(randomizeActivate);
  }
}
