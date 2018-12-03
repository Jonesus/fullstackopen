const Blog = require('../models/blog')
const User = require('../models/user')

const initialData = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
]

const formatBlog = (blog) => ({
  title: blog.title,
  author: blog.author,
  url: blog.url,
  likes: blog.likes
})

const getBlogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(formatBlog)
}

const getUsersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  initialData, formatBlog, getBlogsInDb, getUsersInDb
}
