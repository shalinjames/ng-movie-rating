import { Component, Input } from "@angular/core";

import { RandomizeRatingsService } from "../../utils/randomize-ratings/randomize-ratings.service";
import { Movie } from "../../type/movie";

type BUTTON = {
  type: string;
  buttonText: string;
  helpText: string;
};

@Component({
  selector: "app-randomize-button",
  templateUrl: "./randomize-button.component.html",
  styleUrls: ["./randomize-button.component.css"]
})
export class RandomizeButtonComponent {
  public randomize = false;
  public BUTTONS;
  public button: BUTTON;
  public buttonHelpText;
  @Input("movies") movies: Movie[];

  constructor(public randomizeRatings: RandomizeRatingsService) {
    this.BUTTONS = {
      SHUFFLE: {
        type: "shuffle",
        buttonText: "Randomize",
        helpText: "Randomize the movie ratings!"
      },
      STOP: {
        type: "stop",
        buttonText: "Stop",
        helpText: "Stop randomizing Movies"
      }
    };
    this.button = this.BUTTONS.SHUFFLE;
  }

  public toggleRandomize() {
    this.randomize = !this.randomize;
    this.button = this.randomize ? this.BUTTONS.STOP : this.BUTTONS.SHUFFLE;
    this.randomizeRatings.randomize(this.movies, this.randomize);
  }
}
