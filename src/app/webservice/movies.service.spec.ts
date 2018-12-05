import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { dummyMovies } from "../utils/test.util";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
  let injector: TestBed;
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
    injector = getTestBed();
    service = injector.get(MoviesService);
    httpMock = injector.get(HttpTestingController);
  });

  it("should be created", () => {
    const service: MoviesService = TestBed.get(MoviesService);
    expect(service).toBeTruthy();
  });

  describe("#url", () => {
    it("should return the formatted Url", () => {
      expect(service.url("movies")).toEqual(`${service.API_URL}/movies`);
    });
  });

  describe("#getUsers", () => {
    it("should return an Observable<Array[Movie]>", () => {
      service.getMovies().subscribe(movies => {
        expect(movies.length).toBe(3);
        expect(movies).toEqual(dummyMovies);
      });

      const req = httpMock.expectOne(`${service.API_URL}/movies`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyMovies);
    });
  });
});
