import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'https://task-mangement-app-drab.vercel.app/api',
    withCredentials: true
});
