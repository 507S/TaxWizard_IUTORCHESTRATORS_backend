const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Usermodel = require('../models/userModel');
const PostModel = require('../models/postModel');
jest.setTimeout(20000);
const testBlog = {
    //creating a random string for the title
    title: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    //creating a random string for the content
    content: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    //creating a random string for email
    email: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@gmail.com'
}
//testing authentication
// describe('Login', () => {
//     it('should return a token', () => {
//         return request(app)
//             .post('/auth/login')
//             .send({
//                 email: '73@gmail.com',
//                 password: '123'
//             })
//             .expect(200)
//             .then(res => {
//                 expect(res.header).toHaveProperty('auth-token');
//                 const decoded = jwt.verify(res.header['auth-token'], process.env.TOKEN);
//                 expect(decoded.email).toBe('73@gmail.com');
//             }
//             );
//     }
//     );
// }
// );
//testing signup
describe('Signup', () => {
    it('should return a msg if same mail accont exists ', () => {
        return request(app)
            .post('/auth/signUp')
            .send({
                name: "Severus",
                mail: "70@gmail.com",
                password: "123",
                about: "not much lol"
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('message');
                console.log(res.body.message);
                expect(res.body.message).toBe("email already exists");

            }
            );
    }
    );
    it('should return a token if mail doesnt exits ', () => {
        //generating random email
        let mail = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "@gmail.com";

        return request(app)
            .post('/auth/signUp')
            .send({
                name: "Severus",
                mail: mail,
                password: "123",
                about: "not much lol"
            })
            .expect(200)
            .then(res => {
                //checking if the new object is inserted in monogdb
                Usermodel.findOne({ email: res.body.email })
                    .then(data => {
                        expect(data['email']).toBe(mail);
                    }
                    );

            }
            );

    }
    );
}
);







