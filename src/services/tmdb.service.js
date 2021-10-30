import httpStatus from "http-status";
import config from "config";
import ApiError from "../utils/ApiError";

class Tmdb {
  constructor(axios) {
    this.axios = axios;
    this.axios.interceptors.request.use((conf) => {
      const axiosConfig = conf;
      axiosConfig.baseURL = config.get("tmdb.baseUrl");
      axiosConfig.url = `${conf.url}?api_key=${config.get(
        "tmdb.apiKey"
      )}&language=en-US`;
      return axiosConfig;
    });
    this.axios.interceptors.response.use((response) => {
      return response.data;
    });
  }

  async movieTrailer(imdbId) {
    const response = await this.axios.get(`/3/movie/${imdbId}/videos`);
    const movieVideo = response.results
      .filter((video) => video.type === "Trailer" && video.site === "YouTube")
      .sort(
        (video1, video2) =>
          new Date(video1.published_at).getTime() -
          new Date(video2.published_at).getTime()
      )[0];
    if (movieVideo) {
      return {
        url: `https://www.youtube.com/watch?v=${movieVideo.key}`,
      };
    }

    throw new ApiError(httpStatus.NOT_FOUND, "trailer not found");
  }
}

export default Tmdb;
