const request = require("supertest");
const server = require("../server");

describe("GET /markingschemes", () => {
  describe("get all markingschemes", () => {
    jest.setTimeout(30000);

    //fetch all markingschemes
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/markingschemes").send();
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /markingschemes/files/download", () => {
  describe("download marking scheme files", () => {
    jest.setTimeout(30000);

    //trying to download a marking scheme file with a id as a param
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .get("/markingschemes/files/download/1653326170344")
        .send();
      expect(response.statusCode).toBe(200);
    });

    //download a marking scheme file with a invalid id as a param
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .get("/markingschemes/files/download/12345")
        .send();
      expect(response.statusCode).toBe(400);
    });

    //download a marking scheme file without id as a param
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .get("/markingschemes/files/download")
        .send();
      expect(response.statusCode).toBe(404);
    });
  });
});

describe("POST /markingschemes", () => {
  describe("create a new marking scheme", () => {
    jest.setTimeout(30000);

    //sending a request without username as a param
    test("should respond with a 404 status code", async () => {
      const response = await request(server)
        .post("/markingschemes")
        .send({
          name: "test",
          description: "",
          document: "scheme.doc",
          fileId: "12345",
          criterias: [{ criteria: "report", mark: 10 }],
          visibility: "Public",
        });
      expect(response.statusCode).toBe(404);
    });
  });

  //sending a request without access token
  test("should respond with a 400 status code", async () => {
    const response = await request(server)
      .post("/markingschemes/anjulasjay@gmail.com")
      .send({
        name: "test",
        description: "",
        document: "scheme.doc",
        fileId: "12345",
        criterias: [{ criteria: "report", mark: 10 }],
        visibility: "Public",
      });
    expect(response.statusCode).toBe(400);
  });

  //sending a request with access token
  test("should respond with a 200 status code", async () => {
    const response = await request(server)
      .post("/markingschemes/anjulasjay@gmail.com")
      .set({
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
      })
      .send({
        name: "test",
        description: "",
        document: "scheme.doc",
        fileId: "12345",
        criterias: [{ criteria: "report", mark: 10 }],
        visibility: "Public",
      });
    expect(response.statusCode).toBe(200);
  });
});
