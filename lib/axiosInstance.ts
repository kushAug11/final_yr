// src/utils/axiosInstance.ts
import dotenv from 'dotenv';
import { config } from 'dotenv';
import axios from 'axios';
config();
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Your FastAPI backend URL
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
