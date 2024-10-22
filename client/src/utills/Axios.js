import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'http://localhost:5000/api', // Set your API base URL here
    withCredentials: true
});