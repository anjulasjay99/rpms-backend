const request = require("supertest");
const server = require("../server");

describe("GET / groups" , () =>{

    describe("Get all groups" , () =>{
        jest.setTimeout(30000);

        // Fetch all groups

        test("Should respond with a status code 200" , async () =>{
            const response = await (await request(server).get("/groups")).send();
            expect(response.statusCode).toBe(200);
        });

    });
});

describe("POST /groups" ,() =>{
    describe("Add new group" , () =>{
        jest.setTimeout(3000);

        // Sending a request without data
        test("Should respond with a 400 status code" , async () => {
            const response = await request(server).post("/groups/add").send({

            });
            expect(response.statusCode).toBe(400);
        });
    });


});