import TrailerService from "./trailer.service";

describe("TrailerService", () => {
  const viaplayService = {
    movieInfo: (url) => {
      if (url) {
        return {
          _embedded: {
            "viaplay:blocks": [
              {
                _embedded: {
                  "viaplay:product": {
                    content: {
                      imdb: {
                        id: "tt2543164",
                      },
                    },
                  },
                },
              },
            ],
          },
        };
      }
      throw new Error();
    },
  };
  const tmdbService = {
    movieTrailer: async () => ({
      url: "https://www.youtube.com/watch?v=tFMo3UJ4B4g",
    }),
  };

  const service = new TrailerService(viaplayService, tmdbService);

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("chack trailers", () => {
    service
      .getTrailer("https://content.viaplay.se/pc-se/film/arrival-2016")
      .then((data) => expect(data).toHaveProperty("url"));
    service
      .getTrailer(null)
      .then()
      .catch((error) => {
        expect(error).toBeInstanceOf(Error);
      });
  });
});
