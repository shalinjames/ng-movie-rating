import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxsModule } from "@ngxs/store";

import { RandomizeButtonComponent } from "./randomize-button.component";
import { MaterialModuleModule } from "../../material-module";
import { RandomizeRatingsService } from "../../utils/randomize-ratings/randomize-ratings.service";

describe("RandomizeButtonComponent", () => {
  let component: RandomizeButtonComponent;
  let fixture: ComponentFixture<RandomizeButtonComponent>;

  const ratingServiceStub = {
    randomize: (movie, randomize) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RandomizeButtonComponent],
      imports: [MaterialModuleModule, NgxsModule.forRoot()],
      providers: [
        { provide: RandomizeRatingsService, useValue: ratingServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomizeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Randomize button properties", () => {
    [
      {
        expectedValue: {
          type: "shuffle",
          buttonText: "shuffle Randomize",
          helpText: "Randomize the movie ratings!"
        },
        button: "SHUFFLE"
      },
      {
        expectedValue: {
          type: "stop",
          buttonText: "stop Stop",
          helpText: "Stop randomizing Movies"
        },
        button: "STOP"
      }
    ].forEach(setting => {
      it(`should have the button properties of ${setting.button}`, () => {
        component.button = component.BUTTONS[setting.button];
        fixture.detectChanges();
        const buttonEl = fixture.nativeElement.querySelector("button");
        const iconEl = fixture.nativeElement.querySelector("button mat-icon");
        expect(buttonEl.textContent.trim()).toEqual(
          setting.expectedValue.buttonText
        );
        expect(iconEl.textContent.trim()).toEqual(setting.expectedValue.type);
      });
    });
  });

  describe("#toggleRandomize", () => {
    it("should call the RandomizeRatingsService.rating when toggle is Triggered!", () => {
      // First click it initiates the randomize
      spyOn(component.randomizeRatings, "randomize");
      component.toggleRandomize();

      expect(component.randomizeRatings.randomize).toHaveBeenCalledWith(
        component.movies,
        true
      );
      expect(component.randomize).toBeTruthy();
      expect(component.button).toEqual(component.BUTTONS.STOP);

      component.toggleRandomize();

      expect(component.randomizeRatings.randomize).toHaveBeenCalledWith(
        component.movies,
        false
      );
      expect(component.randomize).toBeFalsy();
      expect(component.button).toEqual(component.BUTTONS.SHUFFLE);
    });
  });

  describe("#clicking the button", () => {
    it("should call the toggleRandomize on clicking the button", () => {
      spyOn(component, "toggleRandomize");
      const buttonEl = fixture.nativeElement.querySelector("button");
      buttonEl.click();
      expect(component.toggleRandomize).toHaveBeenCalled();
    });
  });
});
