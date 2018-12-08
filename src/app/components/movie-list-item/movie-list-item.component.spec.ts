import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StarRatingModule } from "angular-star-rating";
import { NgxsModule, Store } from "@ngxs/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MovieListItemComponent } from "./movie-list-item.component";
import { MaterialModuleModule } from "../../material-module";
import { dummyMovies } from "../../utils/test.util";
import { UpdateMovie } from "../../store/movie.actions";

describe("MovieListItemComponent", () => {
  let component: MovieListItemComponent;
  let fixture: ComponentFixture<MovieListItemComponent>;
  const movie = { ...dummyMovies[0] };
  let store: Store;

  const setup = () => {
    fixture = TestBed.createComponent(MovieListItemComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    // component.store = TestBed.get(Store);
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListItemComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModuleModule,
        StarRatingModule.forRoot(),
        NgxsModule.forRoot()
      ]
    })
      .compileComponents()
      .then(() => {
        setup();
      });
    store = TestBed.get(Store);
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
    let mockStore;
    let $event = { rating: 1 };
    beforeEach(() => {
      mockStore = {
        dispatch: () => {}
      };
    });

    it("tracks that the spy was called", function() {
      spyOn(component.store, "dispatch");
      component.starClickChange($event, movie);
      expect(component.movie.ratings).toEqual($event.rating);
      expect(component.store.dispatch).toHaveBeenCalledWith(
        new UpdateMovie(movie)
      );
    });
  });
});
