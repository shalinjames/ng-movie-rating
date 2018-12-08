import { Component } from "@angular/core";

import { RandomizeRatingsService } from "../../utils/randomize-ratings/randomize-ratings.service";
import { BUTTON, BUTTONS } from "./button.props";

@Component({
  selector: "app-randomize-button",
  templateUrl: "./randomize-button.component.html",
  styleUrls: ["./randomize-button.component.css"]
})
export class RandomizeButtonComponent {
  public randomize = false;
  public button: BUTTON;

  constructor(public randomizeRatings: RandomizeRatingsService) {
    this.button = BUTTONS.SHUFFLE;
  }

  public toggleRandomize(): void {
    this.randomize = !this.randomize;
    this.button = this.randomize ? BUTTONS.STOP : BUTTONS.SHUFFLE;
    this.randomizeRatings.randomize(this.randomize);
  }
}
