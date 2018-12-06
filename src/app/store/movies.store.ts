import { State, Action, StateContext, NgxsOnInit, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { produce } from "immer";

import { Movie } from "../type/movie";
import { MoviesService } from "../webservice/movies.service";
import { SetInitialState, UpdateMovie } from "./movie.actions";

export class MoviesStateModel {
  movies: Movie[];
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

  @Action(UpdateMovie)
  updateMovie(
    { getState, patchState }: StateContext<MoviesState>,
    action: UpdateMovie
  ) {
    patchState(
      produce(getState(), draft => {
        draft[action.movieIndex] = action.movie;
      })
    );
  }
}
