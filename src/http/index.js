import axios from 'axios';

export const API_URL_CONST = 'http://localhost:7000/api'
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL_CONST,
})

$api.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(config=>{
    return config
}, async error => {
    error.config._isRetry = false
    const originalRequest = error.config
    if (error.response.status === 404 && error.config && !error.config._isRetry) {
        error.config._isRetry = true
        try{
            const response = await axios.get (`${API_URL_CONST}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('not authorized')
        }
    }
    throw error
})

export default $api