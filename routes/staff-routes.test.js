const request = require("supertest");
const server = require("../server");


describe("Get staff", ()=>{
    describe("get all staff", () =>{
        jest.setTimeout(30000);
    })

    //get all registreed staff
    test("should respond with a 200 status code", async () =>{
        const response = await request(server).get("/staff/getAll").send();
        expect(response.statusCode).toBe(200)
    })

    //fetch supervisors
    test("should respond with a 200 status code", async () =>{
        const response = await request(server).get("/staff/getSupervisors").send();
        expect(response.statusCode).toBe(200)
    })

     //get total number of staff members
     test("should respond with a 200 status code", async () =>{
        const response = await request(server).get("/staff/totalusers").send();
        expect(response.statusCode).toBe(200)
    })
    // fetch co-supervisors
    test("should respond with a 200 status code", async () =>{
        const response = await request(server).get("/staff/getcoSupervisors").send();
        expect(response.statusCode).toBe(200)
    })


})

describe("Post staff", ()=>{
    describe("Add  and update staff", () =>{
        jest.setTimeout(30000);
    })

    //register staff member
    test("should respond with a 200 status code", async () =>{
        const response = await request(server).post("/staff/save").send({
            firstName : "Rishitha",
            lastName : "Dilshan",
            sliitEmail : "st19967080@my.sliit.lk",
            staffId  :"st19967080",
            telNo : "0770701923",
            field : "Machine learning",
            password :"Password123#",
            role : "staff"

        });
        expect(response.statusCode).toBe(200)

        
    })
    //register students without Sliit email
    test("should respond with a 400 status code", async () =>{
        const response = await request(server).post("/staff/save").send({
            firstName : "Rishitha",
            lastName : "Dilshan",
            staffId  :"st19967080",
            telNo : "0770701923",
            field : "Machine learning",
            password :"Password123#",
            role : "staff"
        });
        expect(response.statusCode).toBe(400)

        
    })


    //update staff
    test("should respond with a 200 status code", async () =>{
        const response = await request(server).put("/staff/update/629907276bd4a64c79d74e52").send({
            firstName : "Kamal",
            lastName : "Ranasinghe",
            sliitEmail : "st99967080@my.sliit.lk",
            staffId  :"st99967080",
            telNo : "0770701924",
            field : "Deep learning",
            password :"Rishitha123",
            role : "staff"
        });
        expect(response.statusCode).toBe(200)
    })

})

describe("Delete staff", ()=>{
    describe("get all", () =>{
        jest.setTimeout(30000);
    })

    //delete staff
    test("should respond with a 200 status code", async () =>{
        const response = await request(server).delete("/staff/delete/6299088d5e9d949e718c8cdc").send();
        expect(response.statusCode).toBe(200)
    })
     //delete unavailable staff
     test("should respond with a 400 status code", async () =>{
        const response = await request(server).delete("/staff/delete/6299088d5e9d949e7").send();
        expect(response.statusCode).toBe(400)
    })
   
})