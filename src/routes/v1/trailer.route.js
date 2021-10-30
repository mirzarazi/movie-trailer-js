import config from "config";
import express from "express";
import axios from "axios";
import TrailerController from "../../controllers/trailer.controller";
import Trailer from "../../services/trailer.service";
import trailerValidation from "../../validations/trailer.validation";
import validate from "../../middlewares/validate";
import Tmdb from "../../services/tmdb.service";
import Viaplay from "../../services/viaplay.service";

if (config.get("env") === "test")
  axios.defaults.adapter = require("axios/lib/adapters/http");

const router = express.Router();

const tmdb = new Tmdb(axios.create());
const viaplay = new Viaplay(axios.create());
const trailerService = new Trailer(viaplay, tmdb);
const trailerController = new TrailerController(trailerService);
router
  .route("/")
  .get(
    validate(trailerValidation),
    trailerController.getTrailer.bind(trailerController)
  );

export default router;

/**
 * @swagger
 * /trailers/:
 *   get:
 *     summary: Get a movie trailer
 *     description: Get a movie trailer based on Viaplay url.
 *     tags: [Trailers]
 *     parameters:
 *       - in: query
 *         name: url
 *         example: https://content.viaplay.se/pc-se/film/arrival-2016
 *         required: true
 *         schema:
 *           type: string
 *         description: Viaplay URL
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Trailer'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
