import { TestBed } from "@angular/core/testing";

import { RandomizeRatingsService } from "./randomize-ratings.service";
import { NgxsModule } from "@ngxs/store";
import { dummyMovies } from "../test.util";
import { UpdateMovie } from "../../store/movie.actions";

describe("RandomizeRatingsService", () => {
  let service: RandomizeRatingsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()]
    });
    service = TestBed.get(RandomizeRatingsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("#generateRandomNumber", () => {
    it("should generate random number within max value supplied", () => {
      const randNum = (service as any).generateRandomNumber(6);
      expect(isNaN(randNum)).toBeFalsy();
      expect(randNum).toBeLessThanOrEqual(6);
    });
  });

  describe("#getRandomMovie", () => {
    it("should get a random movie every iteration", () => {
      (service as any).movies = [...dummyMovies];
      const randomMovies = [];
      (service as any).movies.forEach((movie, index) => {
        const randMovie = (service as any).getRandomMovie();
        expect(randomMovies.includes(randMovie)).toBeFalsy();
        expect((service as any).randomizedMovieIndicies.length).toEqual(
          index + 1
        );
        randomMovies.push(randMovie);
      });
      (service as any).getRandomMovie();
      expect((service as any).randomizedMovieIndicies.length).toEqual(1);

      (service as any).randomizedMovieIndicies.push(1);
      spyOn(service as any, "generateRandomNumber").and.returnValue(1);
      spyOn(service as any, "getRandomMovie");
      (service as any).getRandomMovie();
      expect((service as any).getRandomMovie).toHaveBeenCalledTimes(1);
    });
  });

  describe("#getRandomRating", () => {
    it("should return a different rating than the present movie rating", () => {
      const movie = dummyMovies[0];
      const rating = (service as any).getRandomRating(movie);
      expect(rating !== movie.ratings).toBeTruthy();

      spyOn(service as any, "generateRandomNumber").and.returnValue(
        movie.ratings
      );
      spyOn(service as any, "getRandomRating");
      (service as any).getRandomRating(movie);
      expect((service as any).getRandomRating).toHaveBeenCalledTimes(1);
    });
  });

  describe("#randomizeMovies", () => {
    it("should randomizeMovies and dispatch it to the store", () => {
      const movie = dummyMovies[1];
      (service as any).movies = [...dummyMovies];
      spyOn(service as any, "getRandomMovie").and.returnValue(movie);
      spyOn(service.store, "dispatch");
      (service as any).randomizeMovies();
      expect(service.store.dispatch).toHaveBeenCalledWith(
        new UpdateMovie(movie)
      );
    });
  });

  describe("#randomize", () => {
    beforeEach(function() {
      (service as any).timeInterval = 500;
      (service as any).movies = [...dummyMovies];
      spyOn((service as any).pauser, "next").and.returnValue(() => null);
    });

    it("should reset randomizedMovieIndicies array", () => {
      expect((service as any).randomizedMovieIndicies.length).toEqual(0);
    });

    it("should activate the timer and execute the randomizeMovies", () => {
      (service as any).randomize(true);
      expect((service as any).pauser.next).toHaveBeenCalledWith(true);
      (service as any).randomize(false);
      expect((service as any).pauser.next).toHaveBeenCalledWith(false);
    });
  });
});
