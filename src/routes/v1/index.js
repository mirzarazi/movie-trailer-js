import express from "express";
import config from "config";
import trailerRoute from "./trailer.route";
import docsRoute from "./docs.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/trailers",
    route: trailerRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.get("env") === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
