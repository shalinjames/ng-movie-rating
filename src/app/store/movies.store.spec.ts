import { Store, NgxsModule } from "@ngxs/store";
import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MoviesState } from "./movies.store";
import { SetInitialState } from "./movie.actions";
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

  it("it initializes the store with the desired state", async(() => {
    store.dispatch(new SetInitialState());
    store.selectOnce(state => state.movies).subscribe(movies => {
      expect(movies.length).toEqual(3);
      expect(movies).toBe(dummyMovies);
    });
  }));
});
