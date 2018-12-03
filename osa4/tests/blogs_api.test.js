const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const helpers = require('./test_helper')

const api = supertest(app)

describe('/api/blogs', () => {
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
      .expect(201)
    const blogsAfter = await helpers.getBlogsInDb()

    expect(res.body.title).toBe(title)
    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(blogsAfter).toContainEqual({...newBlog, user: expect.anything()})
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
      .expect(201)
    const blogsAfter = await helpers.getBlogsInDb()

    expect(res.body.likes).toBe(0)
    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(blogsAfter).toContainEqual({...likelessBlog, likes: 0, user: expect.anything()})
  })

  test('POST body requires title', async () => {
    const brokenBlog = {
      'author': 'testboi',
      'url': 'www.test.com',
    }
    await api
      .post('/api/blogs')
      .send(brokenBlog)
      .expect(400)
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

  test('DELETE properly removes a blog', async () => {
    const deletableBlog = {
      'title': 'bad blog',
      'author': 'badboi',
      'url': 'www.bad.ru',
      'likes': 0
    }
    const delBlog = new Blog(deletableBlog)
    await delBlog.save()

    const blogsBefore = await helpers.getBlogsInDb()
    await api
      .delete(`/api/blogs/${delBlog._id}`)
      .expect(204)
    const blogsAfter = await helpers.getBlogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length - 1)
  })
  
  test('DELETE does nothing if used with incorrect ID', async () => {
    const blogsBefore = await helpers.getBlogsInDb()
    await api
      .delete('/api/blogs/lollers')
      .expect(404)
    const blogsAfter = await helpers.getBlogsInDb()

    expect(blogsAfter).toEqual(blogsBefore)
  })

  test('PUT edits the correct blog', async () => {
    const startLikes = 3
    const editableBlog = {
      'title': 'edit blog',
      'author': 'editboi',
      'url': 'www.ed.it',
      'likes': startLikes
    }
    const editBlog = new Blog(editableBlog)
    await editBlog.save()

    const blogsBefore = await helpers.getBlogsInDb()
    await api
      .put(`/api/blogs/${editBlog._id}`)
      .send({...editableBlog, likes: startLikes + 1})
      .expect(204)
    const blogsAfter = await helpers.getBlogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)
    expect(blogsAfter).toContainEqual({...editableBlog, likes: startLikes + 1})
  })
  
  test('PUT does nothing if used with incorrect ID', async () => {
    const blogsBefore = await helpers.getBlogsInDb()
    await api
      .put('/api/blogs/lollers')
      .expect(404)
    const blogsAfter = await helpers.getBlogsInDb()

    expect(blogsAfter.length).toEqual(blogsBefore.length)
  })
})
