class Viaplay {
  constructor(axios) {
    this.axios = axios;
    this.axios.interceptors.response.use((response) => {
      return response.data;
    });
  }

  movieInfo(url) {
    return this.axios.get(url);
  }
}
export default Viaplay;
