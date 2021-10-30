import request from "supertest";
import httpStatus from "http-status";
import app from "../../src/app";

jest.mock("config", () => ({
  ...jest.requireActual("config"),
  get: jest.fn().mockReturnValue("production"),
}));

describe("Docs routes", () => {
  let agent;
  beforeAll(async () => {
    agent = request.agent(app);
  });

  describe("GET /v1/docs", () => {
    test("should return 404 when running in production", async (done) => {
      await agent.get("/v1/docs/").send().expect(httpStatus.NOT_FOUND);
      done();
    });
  });
});
