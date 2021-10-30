class TrailerController {
  constructor(trailerService) {
    this.trailerService = trailerService;
  }

  async getTrailer(req, res, next) {
    try {
      const result = await this.trailerService.getTrailer(req.query.url);
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
}

export default TrailerController;
