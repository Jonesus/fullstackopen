const totalLikes = (blogs) => blogs.reduce(
  (acc, currentBlog) => acc + currentBlog.likes,
  0
)

const favoriteBlog = (blogs) => blogs.reduce(
  (bestBlog, currentBlog) =>
    currentBlog.likes > bestBlog.likes ? currentBlog : bestBlog
)

const mostBlogs = (blogs) => {
  const blogCounts = blogs.reduce((result, currentBlog) => {
      result[currentBlog.author]
        ? result[currentBlog.author] += 1
        : result[currentBlog.author] = 1
      return result
    }, {}
  )
  const best = Object.keys(blogCounts).reduce((best, current) =>
    best.blogs > blogCounts[current]
      ? best
      : {"author": current, "blogs": blogCounts[current]},
    {}
  )
  return best
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}
