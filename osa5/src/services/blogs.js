import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog, authToken) => {
  const header = `bearer ${authToken}`;
  await axios.post(baseUrl, blog, { headers: { Authorization: header } })
}

const likeBlog = async (blog, authToken) => {
  const header = `bearer ${authToken}`;
  const payload = {...blog, likes: blog.likes + 1 }
  await axios.put(
    `${baseUrl}/${blog._id}`,
    payload,
    { headers: { Authorization: header } }
  )
}

export default { getAll, createBlog, likeBlog }
