import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Movie } from "../type/movie";
@Injectable({
  providedIn: "root"
})
export class MoviesService {
  readonly API_URL: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  public url(endpoint) {
    return `${this.API_URL}/${endpoint}`;
  }

  public getMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(this.url("movies"));
  }
}
