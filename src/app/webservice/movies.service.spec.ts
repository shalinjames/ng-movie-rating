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

  describe("#getUsers", () => {
    it("should return an Observable<Array[Movie]> through GET method", () => {
      service.getMovies().subscribe(movies => {
        expect(movies.length).toBe(3);
        expect(movies).toEqual(dummyMovies);
      });

      const req = httpMock.expectOne(service.API_URL);
      expect(req.request.method).toBe("GET");
      req.flush(dummyMovies);
    });
  });

  it("should catch error incase of api response failure", () => {
    service.getMovies().subscribe(
      movies => movies,
      error => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual("URL not found");
      }
    );

    const req = httpMock.expectOne(service.API_URL);
    expect(req.request.method).toBe("GET");
    req.flush([], { status: 404, statusText: "URL not found" });
  });
});
