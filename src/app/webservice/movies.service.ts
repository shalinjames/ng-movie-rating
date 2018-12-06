import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { Movie } from "../type/movie";
@Injectable({
  providedIn: "root"
})
export class MoviesService {
  readonly API_URL: string = "assets/mock_service/movies.json";

  constructor(private http: HttpClient) {}

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.API_URL);
  }
}
