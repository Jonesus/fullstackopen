import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async (username, password) => {
  const payload = {username, password}
  const response = await axios.post(baseUrl, payload)
  return response.data
}

export default { login }
