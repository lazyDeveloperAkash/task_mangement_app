import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'https://task-mangement-4nhh43v6x-akashs-projects-f9f05adc.vercel.app/api', // Set your API base URL here
    withCredentials: true
});