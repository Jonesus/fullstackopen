const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {username: 1, name: 1})
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'content missing!' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog(request.body)
  if (!blog.likes) { blog.likes = 0 }

  targetUser = await User.findById(decodedToken.id)
  blog.user = targetUser._id

  const result = await blog.save()
  targetUser.blogs = targetUser.blogs.concat(result._id)
  await targetUser.save()

  response.status(201).json(Blog.format(result))
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!blog.user || blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.sendStatus(204)
    } else {
      return response.status(401).json({ error: 'not your blog' })
    }

  } catch (e) {
    response.status(404).send(e)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.sendStatus(204)
  } catch (e) {
    response.status(404).send(e)
  }
})

module.exports = blogsRouter
