import axios from 'axios'
const baseUrl = '/api/names'

const getAll = async () => {
  const response = await axios.get('http://localhost:3003/api/names')
  return response.data
}

export default { getAll }