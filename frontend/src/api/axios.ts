import axios from 'axios'

let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
if (baseURL && !baseURL.endsWith('api') && !baseURL.endsWith('api/')) {
    baseURL = baseURL.replace(/\/$/, '') + '/api'
}

const api = axios.create({
    baseURL,
    withCredentials:true
})

export default api