const totalLikes = (blogs) => blogs.reduce(
  (acc, currentBlog) => acc + currentBlog.likes,
  0
)

const favoriteBlog = (blogs) => blogs.reduce(
  (bestBlog, currentBlog) =>
    currentBlog.likes > bestBlog.likes ? currentBlog : bestBlog
)

module.exports = {
  totalLikes,
  favoriteBlog
}
