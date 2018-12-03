const mongoose = require('mongoose')
const Blog = require('../models/blog')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => ({
  id: user._id,
  name: user.name,
  username: user.username,
  adult: user.adult,
  blogs: user.blogs
})

const User = mongoose.model('User', userSchema)

module.exports = User
