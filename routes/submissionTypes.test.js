const request = require("supertest");
const server = require("../server");

describe("GET /submissiontypes", () => {
  describe("get all submission types", () => {
    jest.setTimeout(30000);

    //fetch all submission types
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/submissiontypes").send();
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("POST /submissiontypes", () => {
  describe("create a new submission types", () => {
    jest.setTimeout(30000);

    //sending a reuqets without access token
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .post("/submissiontypes/anjulasjay@gmail.com")
        .send({
          name: "test",
          description: "",
          templateId: "12345",
          isEditable: true,
          isMultipleSubmissions: true,
          visibility: "Public",
        });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets without username as a parama
    test("should respond with a 404 status code", async () => {
      const response = await request(server)
        .post("/submissiontypes")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send({
          name: "test",
          description: "",
          templateId: "12345",
          isEditable: true,
          isMultipleSubmissions: true,
          visibility: "Public",
        });
      expect(response.statusCode).toBe(404);
    });

    //sending a reuqets with username as a parama
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .post("/submissiontypes/anjulasjay@gmail.com")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send({
          name: "test",
          description: "",
          templateId: "12345",
          isEditable: true,
          isMultipleSubmissions: true,
          visibility: "Public",
        });
      expect(response.statusCode).toBe(200);
    });

    //sending a reuqets without template id in the body
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .post("/submissiontypes/anjulasjay@gmail.com")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send({
          name: "test",
          description: "",
          isEditable: true,
          isMultipleSubmissions: true,
          visibility: "Public",
        });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets without template name in the body
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .post("/submissiontypes/anjulasjay@gmail.com")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send({
          description: "",
          templateId: "12345",
          isEditable: true,
          isMultipleSubmissions: true,
          visibility: "Public",
        });
      expect(response.statusCode).toBe(400);
    });
  });
});
