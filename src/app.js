import config from "config";
import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import compression from "compression";
import cors from "cors";
import httpStatus from "http-status";
import cacheManager from "cache-manager";
import ExpressCache from "./middlewares/cache";
import routes from "./routes/v1";
import { errorConverter, errorHandler } from "./middlewares/error";
import ApiError from "./utils/ApiError";
import {
  successHandler as morganSuccessHandler,
  errorHandler as morganErrorHandler,
} from "./utils/morgan";

const app = express();
const cacheMiddleware = new ExpressCache(
  cacheManager.caching({
    store: "memory",
    max: 10000,
    ttl: 3600,
  }),
  { routes: ["/v1/trailers"] }
);

cacheMiddleware.attach(app);

if (config.get("env") !== "test") {
  app.use(morganSuccessHandler);
  app.use(morganErrorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
