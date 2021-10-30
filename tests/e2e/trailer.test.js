import request from "supertest";
import httpStatus from "http-status";
import app from "../../src/app";

describe("GET /v1/trailers", () => {
  let agent;
  beforeAll(async () => {
    agent = request.agent(app);
  });

  test("should return 200 and trailer video url", async (done) => {
    const res = await agent
      .get(
        "/v1/trailers/?url=http%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Ffilm%2Fthe-trip-to-greece-2020"
      )
      .set("Accept", "application/json")
      .send()
      .expect(httpStatus.OK);
    expect(res.body).toHaveProperty("url");
    done();
  });

  test("should return 400 send valid url", async (done) => {
    await request(app)
      .get(
        "/v1/trailers/?url=htttps%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Ffilm%2Farrival-2016"
      )
      .send()
      .expect(httpStatus.BAD_REQUEST);
    done();
  });

  test("should return 404 trailer not found", async (done) => {
    await request(app)
      .get(
        "/v1/trailers/?url=https%3A%2F%2Fcontent.viaplay.se%2Fpc-se%2Ffilm%2Farrival-2018"
      )
      .send()
      .expect(httpStatus.NOT_FOUND);
    done();
  });
});
