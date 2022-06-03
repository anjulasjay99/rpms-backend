const request = require("supertest");
const server = require("../server");

describe("GET /assignedpanels", () => {
  describe("get all assigned panels", () => {
    jest.setTimeout(30000);

    //fetch all assigned panels
    test("should respond with a 200 status code", async () => {
      const response = await request(server).get("/assignedpanels").send();
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("POST /assignedpanels", () => {
  describe("assign a panel to a student group", () => {
    jest.setTimeout(30000);

    //sending a reuqets without access token
    test("should respond with a 400 status code", async () => {
      const response = await request(server).post("/assignedpanels").send({
        groupId: "RSH_GRP1",
        panel: "dilshan@gmail.com",
      });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets with access token
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .post("/assignedpanels")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send({
          groupId: "RSH_GRP1",
          panel: "dilshan@gmail.com",
        });
      expect(response.statusCode).toBe(200);
    });

    //sending a reuqets without group id in the body
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .post("/assignedpanels")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send({
          panel: "dilshan@gmail.com",
        });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets without panel in the body
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .post("/assignedpanels")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send({
          groupId: "RSH_GRP1",
        });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets without both group id and panel in the body
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .post("/assignedpanels")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send();
      expect(response.statusCode).toBe(400);
    });
  });
});
