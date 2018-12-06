import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MoviesState } from "./movies.store";
import { SetInitialState, UpdateMovie } from "./movie.actions";
import { dummyMovies } from "../utils/test.util";

export const SOME_DESIRED_STATE = {
  movies: dummyMovies
};

describe("MoviesState", () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([MoviesState])]
    }).compileComponents();

    store = TestBed.get(Store);
    store.reset(SOME_DESIRED_STATE);
  }));

  it("should initialize the store with the desired state", async(() => {
    store.dispatch(new SetInitialState());
    store
      .selectOnce(state => state.movies)
      .subscribe(movies => {
        expect(movies.length).toEqual(3);
        expect(movies).toBe(dummyMovies);
      });
  }));

  it("should update the movie with the given rating", async(() => {
    let movie = dummyMovies.slice(1, 2)[0];

    store.dispatch(new SetInitialState());

    store
      .selectOnce(state => state.movies)
      .subscribe(movies => {
        const selectedMovie = movies[1];
        const { ratings, id, title, year } = selectedMovie;
        expect(ratings).toEqual(3);
        expect(id).toEqual("2");
        expect(title).toEqual("Grottmannen Dug");
        expect(year).toEqual("2018");
      });

    movie.ratings = 5;
    movie.title = "Random Title";

    store.dispatch(new UpdateMovie(1, movie));

    store
      .selectOnce(state => state.movies)
      .subscribe(movies => {
        const selectedMovie = movies[1];
        const { ratings, id, title, year } = selectedMovie;
        expect(ratings).toEqual(5);
        expect(id).toEqual("2");
        expect(title).toEqual("Random Title");
        expect(year).toEqual("2018");
      });
  }));
});
