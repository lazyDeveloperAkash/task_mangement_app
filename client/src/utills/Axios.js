import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'https://task-mangement-app-t0jx.onrender.com/api',
    withCredentials: true
});
