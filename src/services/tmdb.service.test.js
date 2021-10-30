import Tmdb from "./tmdb.service";

describe("TmdbService", () => {
  let service;
  beforeAll(() => {
    jest.mock("axios", () => ({
      ...jest.requireActual("axios"),
      get: jest.fn().mockImplementation((url) => {
        if (url === "/3/movie/1/videos")
          return {
            id: 329865,
            results: [
              {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: '"Human" Clip',
                key: "PkYh9e-fvbA",
                site: "YouTube",
                size: 1080,
                type: "Trailer",
                official: true,
                published_at: "2016-11-17T23:50:25.000Z",
                id: "5cac1019c3a3685bfae3d764",
              },
            ],
          };
        throw new Error();
      }),
    }));
    const axios = require("axios");
    service = new Tmdb(axios);
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  it("check the value of the function", () => {
    service.movieTrailer("1").then((data) =>
      expect(data).toEqual({
        url: "https://www.youtube.com/watch?v=PkYh9e-fvbA",
      })
    );

    service
      .movieTrailer("2")
      .then()
      .catch((error) => {
        expect(error).toBeInstanceOf(Error);
      });
  });
});
