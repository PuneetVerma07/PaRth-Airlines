import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000' // url form environment variable


const API = axios.create({
    baseURL: API_URL,
})

// Interceptor : token automatically attached with every request

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token")

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})

export default API;