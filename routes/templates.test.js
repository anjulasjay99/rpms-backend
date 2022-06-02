const request = require("supertest");
const server = require("../server");

describe("GET /templates", () => {
  describe("get all templates", () => {
    jest.setTimeout(30000);

    //fetch all templates
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/templates").send();
      expect(response.statusCode).toBe(200);
    });

    //fetch one template by id
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .get("/templates/62975ed7a6e785cc82636c73")
        .send();
      expect(response.statusCode).toBe(200);
    });
  });

  //trying to fetch a unavailable template
  test("should respond with a 400 status code", async () => {
    const response = await request(server).get("/templates/1234567").send();
    expect(response.statusCode).toBe(400);
  });
});

describe("GET /templates/files/download", () => {
  describe("download template files", () => {
    jest.setTimeout(30000);

    //trying to download a template file with a id as a param
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .get("/templates/files/download/1653535550260")
        .send();
      expect(response.statusCode).toBe(200);
    });

    //download a template file with a invalid id as a param
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .get("/templates/files/download/12345")
        .send();
      expect(response.statusCode).toBe(400);
    });

    //download a template file without id as a param
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .get("/templates/files/download")
        .send();
      expect(response.statusCode).toBe(404);
    });
  });
});

describe("POST /templates", () => {
  describe("create a new template", () => {
    jest.setTimeout(30000);

    //sending a request without username as a param
    test("should respond with a 404 status code", async () => {
      const response = await request(server).post("/templates").send({
        name: "test",
        description: "",
        document: "document.txt",
        fileId: "123456789",
        visibility: "Public",
      });
      expect(response.statusCode).toBe(404);
    });
  });

  //sending a request without access token
  test("should respond with a 400 status code", async () => {
    const response = await request(server)
      .post("/templates/anjulasjay@gmail.com")
      .send({
        name: "test",
        description: "",
        document: "document.txt",
        fileId: "123456789",
        visibility: "Public",
      });
    expect(response.statusCode).toBe(400);
  });

  //sending a request with access token
  test("should respond with a 200 status code", async () => {
    const response = await request(server)
      .post("/templates/anjulasjay@gmail.com")
      .set({
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
      })
      .send({
        name: "test",
        description: "",
        document: "document.txt",
        fileId: "123456789",
        visibility: "Public",
      });
    expect(response.statusCode).toBe(200);
  });
});
