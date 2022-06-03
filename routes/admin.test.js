const request = require("supertest");
const server = require("../server");

describe("POST /admins", () => {
  describe("login to admin account", () => {
    jest.setTimeout(30000);

    //login to admin account with correct email and password
    test("should respond with a 200 status code", async () => {
      const response = await request(server).post("/admins/login").send({
        email: "anjulasjay@gmail.com",
        password: "abc123",
      });
      expect(response.statusCode).toBe(200);
    });

    //login to admin account with an invalid email
    test("should respond with a 400 status code", async () => {
      const response = await request(server).post("/admins/login").send({
        email: "anjulasjay",
        password: "abc123",
      });
      expect(response.statusCode).toBe(400);
    });

    //login to admin account with an incorrect password
    test("should respond with a 400 status code", async () => {
      const response = await request(server).post("/admins/login").send({
        email: "anjulasjay@gmail.com",
        password: "abc",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe("PUT /admins", () => {
  describe("update admin details", () => {
    jest.setTimeout(30000);

    //sending a reuqets without access token
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .put("/admins/627501332d82d9802f39828e")
        .send({
          firstName: "Anjula",
          lastName: "Jayasinghe",
          email: "anjulasjay@gmail.com",
          password: "abc123",
          telNo: "0772665133",
          role: "Admin",
        });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets without id as a parama
    test("should respond with a 404 status code", async () => {
      const response = await request(server)
        .put("/admins")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send({
          firstName: "Anjula",
          lastName: "Jayasinghe",
          email: "anjulasjay@gmail.com",
          password: "abc123",
          telNo: "0772665133",
          role: "Admin",
        });
      expect(response.statusCode).toBe(404);
    });

    //sending a reuqets with id as a parama
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .put("/admins/627501332d82d9802f39828e")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuanVsYXNqYXlAZ21haWwuY29tIiwidGVsTm8iOiIwNzcyNjY1MTMzIiwiaWF0IjoxNjUyNTAyNzM0fQ.aVmPU9lH8OVCdb0-8B2OyCPRFe8CURvf8vKiGFaK9YA",
        })
        .send({
          firstName: "Anjula",
          lastName: "Jayasinghe",
          email: "anjulasjay@gmail.com",
          password: "abc123",
          telNo: "0772665133",
          role: "Admin",
        });
      expect(response.statusCode).toBe(200);
    });
  });
});
