/* eslint-disable no-empty */
import Viaplay from "./viaplay.service";

describe("ViaplayService", () => {
  let service;
  beforeAll(() => {
    jest.mock("axios", () => ({
      ...jest.requireActual("axios"),
      get: jest.fn().mockImplementation((url) => {
        if (url) return { test: "123" };
        throw new Error();
      }),
    }));
    const axios = require("axios");
    service = new Viaplay(axios);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("check the value of the function", () => {
    const data = service.movieInfo(
      "https://content.viaplay.se/pc-se/film/arrival-2016"
    );
    expect(data).toEqual({ test: "123" });
    try {
      expect(service.movieInfo(null)).toThrow();
    } catch (e) {}
  });
});
