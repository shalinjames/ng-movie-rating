import { Component, Input } from "@angular/core";

import { Movie } from "../../type/movie";
@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent {
  @Input("movies") movies: Movie[];
}
