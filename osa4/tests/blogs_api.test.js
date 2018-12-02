const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

describe('blogs', () => {
  test('GET returns json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('POST accepts new items', async () => {
    const title = Math.random().toString(36).substring(2, 15)
    await api
      .post('/api/blogs')
      .send({
        'title': title,
        'author': 'testboi',
        'url': 'www.test.com',
        'likes': 7
      })
      .expect(201)
      .expect(res => res.body.title === title)
  })
})

afterAll(() => {
  server.close()
})
