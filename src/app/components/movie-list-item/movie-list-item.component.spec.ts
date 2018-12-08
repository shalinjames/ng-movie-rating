import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StarRatingModule } from "angular-star-rating";
import { NgxsModule } from "@ngxs/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MovieListItemComponent } from "./movie-list-item.component";
import { MaterialModule } from "../../material-module";
import { dummyMovies } from "../../utils/test.util";
import { UpdateMovie } from "../../store/movie.actions";

describe("MovieListItemComponent", () => {
  let component: MovieListItemComponent;
  let fixture: ComponentFixture<MovieListItemComponent>;
  const movie = { ...dummyMovies[0] };

  const setup = () => {
    fixture = TestBed.createComponent(MovieListItemComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListItemComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        StarRatingModule.forRoot(),
        NgxsModule.forRoot()
      ]
    })
      .compileComponents()
      .then(() => {
        setup();
      });
  }));

  it("should create movie list item", () => {
    expect(component).toBeTruthy();
  });

  describe("Movie visual elements", () => {
    it("should have the specified title", () => {
      const mvTitleEl = fixture.nativeElement.querySelector("mat-card-title");
      expect(mvTitleEl.textContent.trim()).toEqual(movie.title);
    });
  });

  describe("#getRatingLabelText", () => {
    [
      {
        expectedValue: "Below Average",
        rating: 1
      },
      {
        expectedValue: "Average",
        rating: 3
      },
      {
        expectedValue: "Good",
        rating: 5
      }
    ].forEach(setting => {
      it(`should be ${setting.expectedValue} for ${
        setting.rating
      } rating`, () => {
        expect(component.getRatingLabelText(setting.rating)).toEqual(
          setting.expectedValue
        );
      });
    });
  });

  describe("#starClickChange", () => {
    it("tracks that the spy was called", function() {
      const $event = { rating: 1 };
      spyOn((component as any).store, "dispatch");
      component.starClickChange($event, movie);
      expect(component.movie.ratings).toEqual($event.rating);
      expect((component as any).store.dispatch).toHaveBeenCalledWith(
        new UpdateMovie(movie)
      );
    });
  });
});
