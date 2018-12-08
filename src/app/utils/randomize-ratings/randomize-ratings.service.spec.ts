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
      const randNum = service.generateRandomNumber(6);
      expect(isNaN(randNum)).toBeFalsy();
      expect(randNum).toBeLessThanOrEqual(6);
    });
  });

  describe("#getRandomMovie", () => {
    it("should get a random movie every iteration", () => {
      service.movies = [...dummyMovies];
      const randomMovies = [];
      service.movies.forEach((movie, index) => {
        const randMovie = service.getRandomMovie();
        expect(randomMovies.includes(randMovie)).toBeFalsy();
        expect(service.randomizedMovieIndicies.length).toEqual(index + 1);
        randomMovies.push(randMovie);
      });
      service.getRandomMovie();
      expect(service.randomizedMovieIndicies.length).toEqual(1);

      service.randomizedMovieIndicies.push(1);
      spyOn(service, "generateRandomNumber").and.returnValue(1);
      spyOn(service, "getRandomMovie");
      service.getRandomMovie();
      expect(service.getRandomMovie).toHaveBeenCalledTimes(1);
    });
  });

  describe("#getRandomRating", () => {
    it("should return a different rating than the present movie rating", () => {
      const movie = dummyMovies[0];
      const rating = service.getRandomRating(movie);
      expect(rating !== movie.ratings).toBeTruthy();

      spyOn(service, "generateRandomNumber").and.returnValue(movie.ratings);
      spyOn(service, "getRandomRating");
      service.getRandomRating(movie);
      expect(service.getRandomRating).toHaveBeenCalledTimes(1);
    });
  });

  describe("#randomizeMovies", () => {
    it("should randomizeMovies and dispatch it to the store", () => {
      const movie = dummyMovies[1];
      service.movies = [...dummyMovies];
      spyOn(service, "getRandomMovie").and.returnValue(movie);
      spyOn(service.store, "dispatch");
      service.randomizeMovies();
      expect(service.store.dispatch).toHaveBeenCalledWith(
        new UpdateMovie(movie)
      );
    });
  });

  describe("#reset", () => {
    it("should reset both movies and randomizedMovieIndicies", () => {
      service.movies = [...dummyMovies];
      service.randomizedMovieIndicies = [2, 1, 0];
      service.reset();
      expect(service.movies.length).toEqual(0);
      expect(service.randomizedMovieIndicies.length).toEqual(0);
    });
  });

  describe("#timer", () => {
    let clearTimer;
    beforeEach(function() {
      jasmine.clock().install();
      service.timeInterval = 500;
      service.movies = [...dummyMovies];
      spyOn(service, "randomizeMovies").and.returnValue(() => null);
    });
    afterEach(function() {
      jasmine.clock().uninstall();
    });
    it("should activate the timer and execute the randomizeMovies", () => {
      service.timer(true);
      expect(service.randomizeMovies).not.toHaveBeenCalled();
      jasmine.clock().tick(501);
      expect(service.randomizeMovies).toHaveBeenCalled();
    });
    it("should clear the time when called with false", () => {
      spyOn(global, "clearInterval");
      service.timer(false);
      expect(global.clearInterval).toHaveBeenCalledWith(
        service.randomizeIntervalFunction
      );
    });
  });

  describe("#randomize", () => {
    it("should call the timer to activate the random rating", () => {
      const movies = [...dummyMovies];
      spyOn(service, "timer");
      service.randomize(movies, true);
      expect(service.timer).toHaveBeenCalledWith(true);
    });
  });
});
