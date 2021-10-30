import httpStatus from "http-status";
import _ from "lodash";
import ApiError from "../utils/ApiError";

class Trailer {
  constructor(viaplayService, tmdbService) {
    this.viaplayService = viaplayService;
    this.tmdbService = tmdbService;
  }
  /**
   * Get trailer by url
   * @param {string} url
   * @returns {Promise<{url: string}>}
   */

  async getTrailer(url) {
    try {
      const response = await this.viaplayService.movieInfo(url);
      const imdbId = _.get(
        response,
        [
          "_embedded",
          "viaplay:blocks",
          "0",
          "_embedded",
          "viaplay:product",
          "content",
          "imdb",
          "id",
        ],
        null
      );
      if (imdbId) return this.tmdbService.movieTrailer(imdbId);
      throw new ApiError(httpStatus.NOT_FOUND, "Imdb id not found");
    } catch (e) {
      throw new ApiError(httpStatus.NOT_FOUND, "Viaplay movie not found");
    }
  }
}

export default Trailer;
