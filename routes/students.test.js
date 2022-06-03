const { JsonWebTokenError } = require("jsonwebtoken");
const request = require("supertest");
const server = require("../server");


describe("POST /students" , () =>{

    describe("Student Registration" ,() =>{
        jest.setTimeout(3000);

        // Required field is missing(Ex :First name)

        test("Should respond with a 400 status code" , async () => {
            const response = await request(server).post("/students/add").send({
                lastName : "Silva",
                IdNumber : "IT20203432",
                email : "it20206864@my.sliit.lk",
                nic : "200022003322",
                telNo : "0714323122"
            });
            expect(response.statusCode).toBe(400);
        });

        // All fields filled and submitted
        test("Should respond with a 200 status code" , async () => {
            const response = await request(server).post("/students/add").send({
                firstName : "Shehan",
                lastName : "Silva",
                IdNumber : "IT20203432",
                email : "it20206864@my.sliit.lk",
                nic : "200022003322",
                telNo : "0714323122"
            });
            expect(response.statusCode).toBe(200);
    })
})