const request = require("supertest");
const server = require("../server");

describe("GET /roles", () => {
  describe("get all roles", () => {
    jest.setTimeout(30000);

    //trying to fetch roles
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .get("/roles")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send();
      expect(response.statusCode).toBe(200);
    });

    //trying to fetch roles without sending access token
    test("should respond with a 400 status code", async () => {
      const response = await request(server).get("/roles").send();
      expect(response.statusCode).toBe(400);
    });
  });
});
