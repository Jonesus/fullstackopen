import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async (username, password) => {
  const payload = {username, password}
  try {
    const response = await axios.post(baseUrl, payload)
    return response.data
  } catch (e) {
    return null
  }
}

export default { login }
