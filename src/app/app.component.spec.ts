import { TestBed, async, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgxsModule } from "@ngxs/store";
import { OrderModule } from "ngx-order-pipe";
import { of } from "rxjs";

import { AppComponent } from "./app.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { MovieListItemComponent } from "./components/movie-list-item/movie-list-item.component";
import { MaterialModuleModule } from "./material-module";
import { StarRatingModule } from "angular-star-rating";
import { dummyMovies } from "./utils/test.util";

describe("AppComponent", () => {
  let comp, fixture;

  const setup = () => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    Object.defineProperty(comp, "movies$", { writable: true });
    comp.movies$ = of(dummyMovies);
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
        OrderModule,
        MaterialModuleModule,
        StarRatingModule.forRoot()
      ],
      declarations: [AppComponent, NavigationComponent, MovieListItemComponent]
    })
      .compileComponents()
      .then(() => {
        setup();
      });
  }));

  it("should create the app", () => {
    const app = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });

  it(`should have as title 'ngMovieRating'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("ngMovieRating");
  });

  it("should render navigation component", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll("app-navigation").length).toEqual(1);
  });

  it("should render three movie list item", async(() => {
    expect(
      fixture.nativeElement.querySelectorAll("app-movie-list-item").length
    ).toEqual(3);
  }));
  it("should render three movie with changed order after updating the ratings", async(() => {
    const updatedMovies = [...dummyMovies];
    updatedMovies[0].ratings = 1;
    updatedMovies[2].ratings = 4;
    comp.movies$ = of(updatedMovies);

    fixture.detectChanges();

    const movieList = fixture.nativeElement.querySelectorAll(
      "app-movie-list-item  mat-card-title"
    );

    movieList.forEach((movie, index) =>
      expect(movie.textContent.trim()).toEqual(dummyMovies[2 - index].title)
    );
  }));
});
