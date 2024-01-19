import axios from 'axios'
import jwt_decode from 'jwt-decode';

const baseURL = process.env.REACT_APP_BASE_URL

const api = axios.create({
    baseURL,
});

api.interceptors.request.use(async req => {
    const access_token = localStorage.getItem('access_token') || null;
    const refresh_token = localStorage.getItem('refresh_token') || null;
    if (access_token) {
        req.headers.Authorization = `Bearer ${access_token}`
        // Check if token has expired
        const { exp } = jwt_decode(access_token)
        const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
        const isExpired = currentTime > exp

        if (isExpired) {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}new-access-token`, {
                refreshToken: refresh_token
            });
            const newAccessToken = response?.data?.newAccessToken;
            localStorage.setItem('access_token', newAccessToken);
            req.headers.Authorization = `Bearer ${newAccessToken}`
        }
        return req
    } else {
        localStorage.removeItem('refresh_token');
        window.location.href = '/userlogin';
    }
}, (error) => {
    return Promise.reject(error)
})


export default api;