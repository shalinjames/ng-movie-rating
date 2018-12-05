import { State, Action, StateContext, NgxsOnInit, Selector } from "@ngxs/store";

import { tap } from "rxjs/operators";

import { Movie } from "../type/movie";
import { MoviesService } from "../webservice/movies.service";
import { SetInitialState } from "./movie.actions";

export class MoviesStateModel {
  movies: Array<Movie>;
}

@State<MoviesStateModel>({
  name: "moviesState"
})
export class MoviesState implements NgxsOnInit {
  constructor(private movieService: MoviesService) {}

  ngxsOnInit({ dispatch }: StateContext<MoviesStateModel>) {
    dispatch(new SetInitialState());
  }

  @Action(SetInitialState)
  setInitState({ setState }: StateContext<MoviesStateModel>) {
    console.log("State Action SetInitialUserState");
    return this.movieService.getMovies().pipe(
      tap(movies => {
        setState({
          movies
        });
      })
    );
  }

  @Selector()
  static getMovies(state: MoviesStateModel) {
    return state.movies;
  }
}
