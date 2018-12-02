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
    const resp = await api
      .post('/api/blogs')
      .send({
        'title': title,
        'author': 'testboi',
        'url': 'www.test.com',
        'likes': 7
      })

      expect(resp.status).toBe(201)
      expect(resp.body.title).toBe(title)
  })

  test('POST body without likes gets set to 0', async () => {
    const resp = await api
      .post('/api/blogs')
      .send({
        'title': 'likeless',
        'author': 'testboi',
        'url': 'www.test.com',
      })

    expect(resp.status).toBe(201)
    expect(resp.body.likes).toBe(0)
  })
})

afterAll(() => {
  server.close()
})
