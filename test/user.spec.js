/* eslint-env node, mocha */
// Dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const Server = require('../app/server.js')

// Core
const server = new Server()

server.run()

const app = server.app

chai.use(chaiHttp)

let userCreate

/**
 * GET /user
 */
describe('/user', () => {
  it('POST /create should create an user', (done) => {
    const result = '{"image_profil":"https://www.g33kmania.com/wp-content/uploads/Tyrion-Lannister-400x400.jpg","email":"cyril@gmail.com","password":"123456789"}'
    const payload = { email: 'cyril@gmail.com', password: '123456789' }

    chai.request(app)
      .post('/user/create')
      .send(payload)
      .end((err, res) => {
        res.should.have.status(200)

        const response = JSON.parse(res.text)

        userCreate = JSON.parse(JSON.stringify(response))

        delete response.id

        JSON.stringify(response).should.be.eql(result)

        done()
      })
  })

  it('GET /show/:id should get an user by id', (done) => {
    let result = {
      image_profil: 'https://www.g33kmania.com/wp-content/uploads/Tyrion-Lannister-400x400.jpg',
      email: 'cyril@gmail.com',
      password: '123456789',
      id: userCreate.id
    }

    chai.request(app)
      .get(`/user/show/${result.id}`)
      .end((err, res) => {
        res.should.have.status(200)

        result = JSON.stringify(result)

        res.text.should.be.eql(result)

        done()
      })
  })
})
