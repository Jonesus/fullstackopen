const supertest = require('supertest')
const { app, server } = require('../index')
const User = require('../models/user')
const helpers = require('./test_helper')

const api = supertest(app)

describe('/api/users', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  afterAll(() => {
    server.close()
  })

  test('POST succeeds with a fresh username', async () => {
    const usersBefore = await helpers.getUsersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helpers.getUsersInDb()
    const usernames = usersAfter.map(u => u.username)

    expect(usersAfter.length).toBe(usersBefore.length + 1)
    expect(usernames).toContain(newUser.username)
  })

  test('POST fails if username already taken', async () => {
    const usersBefore = await helpers.getUsersInDb()
  
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body).toEqual({ error: 'username must be unique'})
  
    const usersAfter = await helpers.getUsersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
  })
})