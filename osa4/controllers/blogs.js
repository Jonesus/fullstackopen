const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.send(400)
  }

  const blog = new Blog(request.body)
  if (!blog.likes) { blog.likes = 0 }

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.send(204)
  } catch (e) {
    response.status(404).send(e)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.send(204)
  } catch (e) {
    response.status(404).send(e)
  }
})

module.exports = blogsRouter
