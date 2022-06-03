const { JsonWebTokenError } = require("jsonwebtoken");
const request = require("supertest");
const server = require("../server");

describe("POST /topicReg" ,() =>{

    describe("Register topic" , () =>{
        jest.setTimeout(3000);

        // Topic Registration when Group Id is passed
        test("Should respond with a 200 status code" , async() =>{
            const response = await request(server).post("/topicReg/add/RSH_GRP-2").send({
                field : "Machine Learning" ,
                topic : "Cloud Computing",
                supervisorId : "SF3422",
            });

            expect(response.statusCode).toBe(200);
        })
    })

        // Topic Registration when Group ID is not passed

        test("Should respond with a 404 status code" ,async() =>{
            const response = await request(server).post("/topicReg/add").send({
                field : "Deep Learning" ,
                topic : "Cloud Computing",
                supervisorId : "SF3422",
            })

            expect(response.statusCode).toBe(404);
        })

        // Topic Registration when topic is not submitted

        test("Should respond with a 400 status code" ,async() =>{
            const response = await request(server).post("/topicReg/add/RSH_GRP-2").send({
                field : "Deep Learning" ,
                supervisorId : "SF3422",
            })

            expect(response.statusCode).toBe(400);
        })
})

describe("GET /topicReg" , () =>{

    describe("Get Registered Topics By Group ID" , () =>{
        jest.setTimeout(3000);

        // Fetching topics by group passing group ID

        test("Should respond with a 400 status code" , async() =>{

            const response = await request(server).get("/topicReg/RSH_GRP-3").send();
            expect(response.statusCode).toBe(200);
        })

        // Fetching topics without passing group ID

        test("Should respond with an object of all topics from every group" , async() =>{

            const response = await request(server).get("/topicReg").send();
            expect(response.body.submission).toBeDefined();
        })
    })
})

describe("PUT /topicReg" ,() =>{

    describe("Request co supervisor",() =>{
        jest.setTimeout(3000);

        //  Co-supervisor ID is passed

        test("Should respond with a 200 status code"  ,async() =>{
            const response = await request(server).put("/topicReg/coSupervisor/SF2432").send();
            expect(response.statusCode).toBe(200);
        })

        // Co-supervisor ID is not passed
        test("Should respond with a 400 status code"  ,async() =>{
            const response = await request(server).put("/topicReg/coSupervisor/").send();
            expect(response.statusCode).toBe(400);
        })
    })
})