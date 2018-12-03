const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {username: 1, name: 1})
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.sendStatus(400)
  }

  const blog = new Blog(request.body)
  if (!blog.likes) { blog.likes = 0 }

  let targetUser
  if (!blog.user) {
    targetUser = await User.findOne()
    blog.user = targetUser._id
  } else {
    targetUser = await User.findById(blog.user)
  }

  const result = await blog.save()
  targetUser.blogs = targetUser.blogs.concat(result._id)
  await targetUser.save()

  response.status(201).json(Blog.format(result))
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
    response.sendStatus(204)
  } catch (e) {
    response.status(404).send(e)
  }
})

module.exports = blogsRouter
