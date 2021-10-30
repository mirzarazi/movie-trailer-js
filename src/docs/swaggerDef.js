import config from "config";

const { version } = require("../../package.json");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Viaplay API documentation",
    version,
    license: {
      name: "MIT",
      url: "https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE",
    },
  },
  servers: [
    {
      url: `http://localhost:${config.get("port")}/v1`,
    },
  ],
};

export default swaggerDef;
