const request = require('supertest');
require('dotenv').config();

const app = require('../app');

describe("User Auth Tests", ()=> {

    it("Login User", ()=>{
        return request(app).post('/users/express-login').send({
            email:process.env.TEST_EMAIL,
            password:process.env.TEST_PASSWORD
        })
        .expect('Content-Type',/json/)
        .then((res)=>{
            expect(res.body).toEqual(
                expect.objectContaining({
                    'user':expect.any(Object)
                })
            )
        })
    })

    //Repeated credentials
    it("SignUp User", ()=>{
        return request(app).post('/users/express-signup').send({
            username:'Sans',
            email:process.env.TEST_EMAIL,
            password:process.env.TEST_PASSWORD
        })
        .expect('Content-Type',/json/)
        .then((res)=>{
            expect(res.body).toEqual(
                expect.objectContaining({
                    'error':expect.any(String)
                })
            )
        })
    })
})
