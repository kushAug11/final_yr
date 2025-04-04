// src/utils/axiosInstance.ts
import dotenv from 'dotenv';
import { config } from 'dotenv';
import axios from 'axios';
config();
const axiosInstance = axios.create({
    baseURL: '', // Your FastAPI backend URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
