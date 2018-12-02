const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const helpers = require('./test_helper')
const api = supertest(app)

describe('blogs', () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogs = await helpers.initialData.map(blog => new Blog(blog))
    await Promise.all(blogs.map(blog => blog.save()))
  })

  afterAll(() => {
    server.close()
  })

  test('GET returns all blogs in json', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.length).toBe(helpers.initialData.length)
  })

  test('POST accepts new items', async () => {
    const title = Math.random().toString(36).substring(2, 15)
    const newBlog = {
      'title': title,
      'author': 'testboi',
      'url': 'www.test.com',
      'likes': 7
    }

    const blogsBefore = await helpers.getBlogsInDb()
    const res = await api
      .post('/api/blogs')
      .send(newBlog)
    const blogsAfter = await helpers.getBlogsInDb()

    expect(res.status).toBe(201)
    expect(res.body.title).toBe(title)
    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(blogsAfter).toContainEqual(newBlog)
  })

  test('POST body without likes gets set to 0', async () => {
    const likelessBlog = {
      'title': 'likeless',
      'author': 'testboi',
      'url': 'www.test.com',
    }

    const blogsBefore = await helpers.getBlogsInDb()
    const res = await api
      .post('/api/blogs')
      .send(likelessBlog)
    const blogsAfter = await helpers.getBlogsInDb()

    expect(res.status).toBe(201)
    expect(res.body.likes).toBe(0)
    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(blogsAfter).toContainEqual({...likelessBlog, likes: 0})
  })

  test('POST body requires title', async () => {
    const brokenBlog = {
      'author': 'testboi',
      'url': 'www.test.com',
    }
    await api
      .post('/api/blogs')
      .send(brokenBlog)
      expect(400)
  })

  test('POST body requires url', async () => {
    const brokenBlog = {
      'title': 'lollers',
      'author': 'testboi',
    }
    await api
      .post('/api/blogs')
      .send(brokenBlog)
      .expect(400)
  })
})
