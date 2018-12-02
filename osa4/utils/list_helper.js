const totalLikes = (blogs) => blogs.reduce(
  (acc, currentBlog) => acc + currentBlog.likes,
  0
)

module.exports = {
  totalLikes
}
