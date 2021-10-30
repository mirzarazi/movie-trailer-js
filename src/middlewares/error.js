import config from "config";
import httpStatus from "http-status";
import logger from "../utils/logger";
import ApiError from "../utils/ApiError";

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const { statusCode } = error;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.get("env") === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.get("env") === "development" && { stack: err.stack }),
  };

  if (config.get("env") === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
